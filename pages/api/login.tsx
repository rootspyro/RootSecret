import { NextApiRequest, NextApiResponse } from "next";
import sessionServices from "../../services/session-services";

export default async function Login(req : NextApiRequest, res : NextApiResponse) { 

	if ( req.method == "POST" ) { 

		const data = req.body;
		const user = await sessionServices.Login(data);

		if ( user != null ) { 
			res.json({user : "logged"}); 
		}

		else { 
			res.json({user : "not logged"}); 
		}

	}
}
