import passwServices from "../../../services/passw-services";
import { NextApiRequest,  NextApiResponse } from "next";

export default async function passwordsHandler( req : NextApiRequest ,res : NextApiResponse) { 

	const { id } = req.query;

	switch(req.method) { 
		// GET THE LIST OF PASSWORDS
		case 'GET' : 
			const passwords = await passwServices.GetPasswords(parseInt(id[0]));
			res.json(passwords);
			break;


		// CREATE A NEW PASSWORD
		case 'POST' :

			const userData = await JSON.parse(req.body);

			const newPassword = await passwServices.AddPassword(userData, parseInt(id[0]));
			console.log(newPassword);

			res.json(  newPassword );
			break;

			
		// UPDATE A PASSWORD
		case 'PUT' :
			res.json({method: "PUT"});
			break;

		// DELETE A PASSWORD
		case 'DELETE' :
			res.json({method: "DELETE"});
			break;

		default:
			break;
	}
}
