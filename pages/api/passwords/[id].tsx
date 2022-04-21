import passwServices from "../../../services/passw-services";
import { NextApiRequest,  NextApiResponse } from "next";
import jwt from "jsonwebtoken";


export default async function ListPasswords( req : NextApiRequest, res : NextApiResponse ) { 

	if ( req.cookies.token  ) {

		const  { id }  = req.query;
		const token = req.cookies.token;
		const decoded = await jwt.verify( token, process.env.JWT_SECRET );

		if ( decoded.id == id ) { 

			if ( req.method == "GET" ) { 

				const passwords = await passwServices.GetPasswords(id); 
				res.json(passwords);

			} else {
				res.status(405).json({ message: "Method not allowed" });
			}

		} else {
			res.status(401).json({ message: "Unauthorized" });
		} 

	} else {
		res.status(401).json({ message: "Unauthorized" });
	}


}
