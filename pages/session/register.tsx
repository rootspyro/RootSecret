import { GetServerSideProps } from "next"
import { useState } from "react";
import Router from "next/router";

export default function Register(){

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [rePassword, setRePassword] = useState("");
	
	async function signUp(e){

		e.preventDefault();

		if ( password != rePassword ) {
		
			alert ("Passwords do not match");
		
		} else {

			const userData = { username, email, password };
			userData.email = userData.email.toLowerCase();

			const data = await fetch("/api/session/register", {
				method : "POST",
				body : JSON.stringify(userData)
			})

			const response = await data.json();

			if ( response.error ) { 
				alert(response.error)
				console.error(response.error);
			}

			if ( response.success ) { 
				Router.push("/session/login");
			}

		}

	}

	return(
		<>
			<h1>New User</h1>
			<form onSubmit={signUp} className="text-gray-700">
				<input required type="text" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)} /><br/>
				<input required type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/><br/>
				<input required type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
				<input required type="password" placeholder="confirm password" value={rePassword} onChange={(e)=>setRePassword(e.target.value)}/><br/>
				<button>Create User</button>
			</form>
		</>
	)
}

export const getServerSideProps : GetServerSideProps = async (context) => {
	
	const cookies = context.req.cookies;

	if ( cookies.token ) { 
		return { 
			redirect : {
				permanent : false,
				destination : '/'
			},
			props : {}
		}
	}

	return { props : {} }
}
