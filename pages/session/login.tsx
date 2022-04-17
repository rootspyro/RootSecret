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
		<div>
			<div className="flex justify-center flex-wrap">
				<h1 className="text-theme mt-16 text-3xl font-semibold text-center w-full">Root<span className="font-normal">_Secret</span></h1>
				<form onSubmit={login} className=" w-4/5 lg:w-1/3 mt-10 text-white bg-box p-7 rounded-lg shadow-lg">
					<input className=" w-full focus:outline-none focus:border-2 focus:border-theme bg-bg p-2 rounded-md shadow-inner mb-5" type="text" name="user" placeholder="username or email" value={username} onChange={(e)=>setUsername(e.target.value)}></input>
					<input  className=" w-full focus:outline-none focus:border-2 focus:border-theme bg-bg p-2 rounded-md shadow-inner mb-5" type="password" name="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
					<div className="flex justify-center"> 
						<button className=" w-full text-bg bg-theme font-bold py-2 px-4 rounded-md hover:bg-bg hover:text-theme">Login</button>
					</div>
				</form>
			</div>
			<Link href="/session/register">
				<div className="flex justify-center mt-5">
					<a>sign up</a>
				</div>
			</Link>
		</div>
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
