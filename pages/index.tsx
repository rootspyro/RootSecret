import {GetServerSideProps} from "next";
import Router from "next/router";

export default function Index(){

	async function getUsers(){

		const users = await fetch('http://localhost:3000/api/passwords/1');
		const data = await users.json();
		console.log(data);

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

	return(
		<div>
			<h1>RootSecret</h1>
			<h3>Password Manager</h3>
			<br/>
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
