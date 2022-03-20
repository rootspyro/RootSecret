import { PrismaClient } from "@prisma/client";
import sessionServices from "./session-services";
import crypto from "crypto";

const prisma = new PrismaClient();


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


const passwServices = { AddPassword };

export default passwServices;
