import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();


// PASSWORD HASHING FUNCTIONS

function validatePassword(password : string ,hash : string) { 

	const result = bcrypt.compareSync(password, hash);
	return result;

} 

function hashPassword ( password: string ) { 

	return bcrypt.hashSync(password, 10);

}

function isEmail(  email : string ) {

	const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(email);

}

// END OF PASSWORD HASHING FUNCTIONS


// SESSION FUNCTIONS 

async function Register( userData : any ) { 

	prisma.$connect();

	const validateUser = await prisma.app_users.findFirst({
		where : {
			OR : [

				{ username : userData.username },
				{ email : userData.email }

			]
		}
	})


	if ( validateUser != null ) { 

		prisma.$disconnect()
		return { error : "User already exist" }

	} else {

		userData.password = hashPassword(userData.password);

		const newUser = await prisma.app_users.create( { 
			data : userData
		})	

		if ( newUser == null ) { 

			prisma.$disconnect()
			return { error : "User could not be registered" }
		
		} else {

			prisma.$disconnect() 
			return { success : "User registered successfully" }

		}

	}

}


async function Login( userData : any ) { 
	
	if ( isEmail(userData.user) ) { 
		userData.user = userData.user.toLowerCase();
	}

	prisma.$connect();
	const user = await prisma.app_users.findFirst({
		where : {
			OR: [
				{ email: userData.user },
				{ username: userData.user }
			]
		}
	})

	prisma.$disconnect()

	if ( user != null  ) {

		const result = validatePassword(userData.password, user.password);

		if ( result ) { 
			return user 
		} else { 
			return null;
		}

	} else {

		return null;

	}

}


// END OF SESSION FUNCTIONS


const sessionServices = { Login, Register };

export default sessionServices;


