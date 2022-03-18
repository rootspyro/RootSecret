import { PrismaClient } from "@prisma/client";
export default async function passwordsHandler( req,res ) { 

	const prisma = new PrismaClient();

	async function getUsers() { 
		const usersList = await prisma.app_users.findMany();
		return usersList;
	}

	switch(req.method) { 
		// GET THE LIST OF PASSWORDS
		case 'GET' : 
			const users = await getUsers();
			console.log(users);
			res.json(users);
			break;

		// CREATE A NEW PASSWORD
		case 'POST' :
			res.json({method: "POST"}).end();
			break;

		// UPDATE A PASSWORD
		case 'PUT' :
			res.json({method: "PUT"}).end();
			break;

		// DELETE A PASSWORD
		case 'DELETE' :
			res.json({method: "DELETE"}).end();
			break;

		default:
			break;
	}
}
