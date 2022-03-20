import passwServices from "../../../services/passw-services";
import { NextApiRequest,  NextApiResponse } from "next";

export default async function ListPasswords( req : NextApiRequest, res : NextApiResponse ) { 

	if ( req.method == "GET" ) { 

		const { id } = req.query;

		const passwords = await passwServices.GetPasswords(parseInt(id[0])); 
		res.json(passwords);

	}

}
