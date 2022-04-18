import { NextApiRequest, NextApiResponse } from "next";
import { removeCookies } from "cookies-next";

export default async function Logout ( req : NextApiRequest, res : NextApiResponse ) {
	if ( req.method == "POST" ) { 

		removeCookies( "token", { req, res } );

		res.json({success : true})
	}
}
