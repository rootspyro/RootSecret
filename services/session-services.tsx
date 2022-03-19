import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

function validatePassword(password : string ,hash : string) { 

	const result = bcrypt.compareSync(password, hash);
	return result;

} 


async function Login( userData : any ) { 

	const user = await prisma.app_users.findFirst({
		where : {
			OR: [
				{ email: userData.user },
				{ username: userData.user }
			]
		}
	})

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

const sessionServices = { Login }

export default sessionServices;
