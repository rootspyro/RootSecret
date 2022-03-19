import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function getUsers(){
	const usersList = await prisma.app_users.findMany();
	return usersList;
}


const passwServices = { getUsers };

export default passwServices;
