import { useEffect, useState } from "react";
import {GetServerSideProps} from "next";
import jwt from "jsonwebtoken";
import { getCookie } from "cookies-next";
import Router from "next/router";


// PASSWORD BOX
import PasswordBox from "../components/password-box";

export default function Index(){

	const [ passwords, setPasswords ] = useState([]);

	const user = jwt.decode(getCookie("authorization"));

	async function getPasswords(){
		// passwords
		const passwords = await fetch("/api/passwords/"+ user.id , { 
			method: "GET",
		});

		const passwordsJson = await passwords.json();
		setPasswords(passwordsJson);

	}

	async function logout(){

		const response = await fetch("/api/session/logout", {
			method : "POST"
		})

		const data = await response.json();

		if ( data.success ) { 

			Router.push("/session/login");

		}

	}

	useEffect	(() => {
		getPasswords();
	},[]);

	return(
		<div>
			<h1>RootSecret</h1>
			<h3>Password Manager</h3>
			<br/>
			<div className="password-list">
				{
					passwords.length > 0 
						? passwords.map( password =>  <PasswordBox key = {password.id} { ... password } /> )
						: "No hay passwords"
				}
			</div>
			<br />
			<button onClick={logout}>Logout</button>
		</div>
	)
}

export const getServerSideProps : GetServerSideProps = async (context) => {
	
	const cookies = context.req.cookies;

	if ( !cookies.authorization ) { 
		return { 
			redirect : {
				permanent : false,
				destination : '/session/login'
			},
			props : {}
		}
	}

	return { props : {} }
}
