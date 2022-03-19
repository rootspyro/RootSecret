import { useState } from "react"
import { GetServerSideProps } from "next"
import Router from "next/router"

export default function Login(){

	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	async function login(e){

		e.preventDefault()

		const requestBody = { 
			user : username,
			password : password
		}

		const data = await fetch("/api/login", {
			method : "POST",
			body : JSON.stringify(requestBody),
		})

		const response = await data.json()

		if ( response.error ) { 

			console.log(response.error)

		} else {

			Router.push("/")

		}

	} 

	return(
		<>
			<form onSubmit={login}>
				<input type="text" name="user" placeholder="username or email" value={username} onChange={(e)=>setUsername(e.target.value)}></input>
				<input type="password" name="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
				<button>Login</button>
			</form>
		</>
	)
}

export const getServerSideProps : GetServerSideProps = async (context) => {
	
	const cookies = context.req.cookies;

	if ( cookies.authorization ) { 
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
