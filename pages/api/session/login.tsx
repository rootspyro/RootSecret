import { NextApiRequest, NextApiResponse } from "next";
import sessionServices from "../../../services/session-services";
import jwt from "jsonwebtoken";
import { setCookies } from "cookies-next";

export default async function Login(req : NextApiRequest, res : NextApiResponse) { 

	if ( req.method == "POST" ) { 

		const data = JSON.parse(req.body);
		const user = await sessionServices.Login(data);

		if ( user != null ) { 
			const token = jwt.sign({ 

				id : user.id,
				email : user.email,
				username : user.username,

			}, process.env.JWT_SECRET);

			let exDate = new Date();
			exDate.setDate(exDate.getDate() + 1);

			setCookies("token", token, { req, res, expires: exDate} );
			res.json({success : "user login"})

		} 

		else { 
			res.json({ error :  "Invalid username or password" })
		}
	} else { 
		res.json({ error : "Invalid request" })
	}
}

