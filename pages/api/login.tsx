import { NextApiRequest, NextApiResponse } from "next";
import sessionServices from "../../services/session-services";
import jwt from "jsonwebtoken";

export default async function Login(req : NextApiRequest, res : NextApiResponse) { 

	if ( req.method == "POST" ) { 

		const data = JSON.parse(req.body);
		const user = await sessionServices.Login(data);


		if ( user != null ) { 
			res.json({ 
				token : jwt.sign({ 
					id : user.id,
					username : user.username,
					email : user.email,
				}, process.env.SECRET),
			})
		}

		else { 
			res.json({ error :  "Invalid username or password" })
		}

	}
}
