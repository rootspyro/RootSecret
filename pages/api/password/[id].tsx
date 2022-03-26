import passwServices from "../../../services/passw-services";
import { NextApiRequest,  NextApiResponse } from "next";

export default async function passwordsHandler( req : NextApiRequest ,res : NextApiResponse) { 

	const { id } = req.query;

	switch(req.method) { 
		// GET THE LIST OF PASSWORDS
		case 'GET' : 
			const epassword = await passwServices.SendPassword(id);
			res.status(200).json(epassword);
			break;


		// CREATE A NEW PASSWORD
		case 'POST' :

			const userData = await JSON.parse(req.body);


			const newPassword = await passwServices.AddPassword(userData, id);

			res.json(  newPassword );
			break;

			
		// UPDATE A PASSWORD
		case 'PUT' :
			res.json({method: "PUT"});
			break;

		// DELETE A PASSWORD
		case 'DELETE' :
			const deletedPassword = await passwServices.DeletePassword(id);
			res.json(deletedPassword);
			break;

		default:
			break;
	}
}
