import { useState } from "react"
import Router from "next/router"
import Link from "next/link"
import { GetServerSideProps } from "next"

export default function Login(){

	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	async function login(e){

		e.preventDefault()

		const requestBody = { 
			user : username,
			password : password
		}

		const data = await fetch("/api/session/login", {
			method : "POST",
			body : JSON.stringify(requestBody),
		})

		const response = await data.json()

		if ( response.error ) { 

			alert(response.error);

		} else {

			Router.push("/")

		}

	} 


	return(
		<>
			<h1>Login</h1>
			<form onSubmit={login} className="text-gray-700">
				<input  type="text" name="user" placeholder="username or email" value={username} onChange={(e)=>setUsername(e.target.value)}></input>
				<input  type="password" name="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
				<button>Login</button>
			</form>
			<Link href="/session/register">
				<a>sign up</a>
			</Link>
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
