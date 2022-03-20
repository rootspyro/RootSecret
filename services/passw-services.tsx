import { PrismaClient } from "@prisma/client";
import sessionServices from "./session-services";
import crypto from "crypto";

const prisma = new PrismaClient();


function DecryptPassword ( iv : string, encrypted : string ) { 

	const algorithm = 'aes-256-cbc';
	const key = process.env.CRYPTO_SECRET;

	const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), Buffer.from(iv, 'hex'));

	let decrypted = decipher.update(encrypted, 'hex', 'utf8');

	decrypted += decipher.final('utf8');

	return decrypted;

}


function EncryptPassword( password : string ) {

	// encrypt password
	//
	const algorithm = 'aes-256-cbc';
	const iv = crypto.randomBytes(16);
	const key = process.env.CRYPTO_SECRET;


	const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);

	let encrypted = cipher.update(password, 'utf8', 'hex');

	encrypted += cipher.final('hex');

	return {  iv : iv.toString('hex'), encrypted : encrypted }

}


async function GetPasswords( id : number ) { 

	prisma.$connect()

	const passwordList = await prisma.user_passwords.findMany({
		where : {
			user_id : id
		}
	})

	if ( passwordList === null ) {
		prisma.$disconnect();
		return [];
	} 

	else { 
		prisma.$disconnect();
		return passwordList;
	}
}


async function SendPassword( id : number ) { 

	prisma.$connect();

	const ePassword = await prisma.user_passwords.findFirst({
		select : { 
			iv : true,
			epassword : true,
		},
		where : { 
			id : id
		}
	})

	const password = DecryptPassword(ePassword.iv, ePassword.epassword);

	return { password : password };

	prisma.$disconnect();
}


async function AddPassword( userData : any , userId : number ) { 

	prisma.$connect()

	// USER PASSWORD AUTH
	const rootPassword = userData.userPassword; 

	const pHash = await prisma.app_users.findFirst({
		select : {
			password : true
		},
		where : { 
			id : userId
		}
	})



	// VALIDATE PASSWORD

	if ( sessionServices.validatePassword(rootPassword, pHash.password) ) { 

		// ENCRYPT PASSWORD
		const pEncrypted = EncryptPassword(userData.password);

		// ADD PASSWORD
		const pData : any = { 

			appname : userData.appName,
			username : userData.username,
			email : userData.email,
			iv : pEncrypted.iv,
			epassword : pEncrypted.encrypted,
			user_id : userId

		}

		const newPassword = await prisma.user_passwords.create({
			data : pData
		})

		if ( newPassword != null ) { 
			
			prisma.$disconnect()
			return  { success :  true , message : "Password added successfully" }

		} else {

			prisma.$disconnect()
			return { success :  false , message : "Password not added" }
	
		}


	} else {
		prisma.$disconnect();
		return { ivError :  " Incorrect User Password " }
	}

}


async function DeletePassword( id : number ) { 

	prisma.$connect();

	const response = await prisma.user_passwords.delete({
		where : {
			id : id
		}
	})

	return {  success : true , message : "Password deleted successfully" }

	prisma.$disconnect();

}

const passwServices = { AddPassword, GetPasswords , SendPassword, DeletePassword };

export default passwServices;
