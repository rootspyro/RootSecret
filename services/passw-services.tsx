import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function getUsers(){
	prisma.$connect();
	const usersList = await prisma.app_users.findMany();
	return usersList;
	prisma.$disconnect();
}


const passwServices = { getUsers };

export default passwServices;
