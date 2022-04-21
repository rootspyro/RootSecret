import passwServices from "../../../services/passw-services";
import jwt from "jsonwebtoken";
import { NextApiRequest,  NextApiResponse } from "next";

export default async function passwordsHandler( req : NextApiRequest ,res : NextApiResponse) { 

	if ( req.cookies.token ) { 

		const { id } = req.query;
		const token = req.cookies.token;
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		switch(req.method) { 

			// GET PASSWORD DECRYPTED BY ID 
			case 'GET' : 
				const epassword = await passwServices.SendPassword(id);
				
				if ( epassword.user_id === decoded.id ) { 
					res.status(200).json(epassword);
				} else { 
					res.status(401).json({ message : "You are not authorized to access this resource" });
				}
				break;


			// CREATE A NEW PASSWORD
			case 'POST' :

				const userData = await req.body;
				const newPassword = await passwServices.AddPassword(userData, id);

				res.json( newPassword );
				break;

				
			// UPDATE A PASSWORD
			case 'PUT' :
				const updatePassword = await req.body;
				const updatedPassword = await passwServices.UpdatePassword(updatePassword);
				res.json(updatedPassword);
				break;

			// DELETE A PASSWORD
			case 'DELETE' :
				const deletedPassword = await passwServices.DeletePassword(id);
				res.json(deletedPassword);
				break;

			default:
				break;
		}

	} else {
		res.status(401).json({ message: "Unauthorized" });
	}

}
