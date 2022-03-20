import { PrismaClient } from "@prisma/client";
import sessionServices from "./session-services";
import crypto from "crypto";

const prisma = new PrismaClient();


function EncryptPassword( password : string, iv : string ) {

	// encrypt password
	//
	const algorithm = 'aes-256-cbc';
	const key = process.env.SECRET;

	const cipher = crypto.createCipheriv(algorithm, key, iv);

	let encrypted = cipher.update(password, 'utf8', 'hex');

	return encrypted ;

}


async function AddPassword( userData : any , userId : number ) { 

	prisma.$connect()

	// USER PASSWORD AUTH
	const iv = userData.userPassword; 

	const pHash = await prisma.app_users.findFirst({
		select : {
			password : true
		},
		where : { 
			id : userId
		}
	})


	// VALIDATE PASSWORD

	if ( sessionServices.validatePassword(iv , pHash.password) ) { 



		// ADD PASSWORD
		const pData : any = { 

			appname : userData.appName,
			username : userData.username,
			email : userData.email,
			iv : "test",
			epassword : userData.password,
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
