import { PrismaClient } from "@prisma/client";
import sessionServices from "./session-services";

const prisma = new PrismaClient();

async function getUsers(){
	prisma.$connect();
	const usersList = await prisma.app_users.findMany();
	return usersList;
	prisma.$disconnect();
}

async function AddPassword( userData : any , userId : number ) { 

	prisma.$connect()

	const iv = userData.userPassword; 

	const pHash = await prisma.app_users.findFirst({
		select : {
			password : true
		},
		where : { 
			id : userId
		}
	})

	if ( sessionServices.validatePassword(iv , pHash.password) ) { 

		const pData : any = { 

			appname : userData.appName,
			username : userData.username,
			email : userData.email,
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


const passwServices = { getUsers, AddPassword };

export default passwServices;
