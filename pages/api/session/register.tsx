import { NextApiRequest, NextApiResponse } from "next";
import sessionServices from "../../../services/session-services";

export default async function Register(req : NextApiRequest, res: NextApiResponse) { 

	const userData = JSON.parse(req.body);

	const data = await sessionServices.Register(userData);

	res.json(data)

}
