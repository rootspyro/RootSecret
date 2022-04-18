import { useState } from "react"
import Router from "next/router"
import Link from "next/link"
import { GetServerSideProps } from "next"
import { InfoAlert } from "../../components/alerts/info-alert"

export default function Login(){

	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const [ alertData, setAlertData ] = useState<any>({});

	function displayAlert( data : any ){

		setAlertData(data);

		const alert = document.getElementById("alert-container");

			alert.classList.remove("hidden");
			alert.classList.add("block");
			setTimeout(() => {
				alert.classList.remove("block");
				alert.classList.add("hidden");
			}, 3000);

	}

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

			displayAlert({
				type : "error",
				message : response.error
			})

		} else {

			Router.push("/")

		}

	} 


	return(
		<div>
			<div className="hidden transition-all duration-700" id="alert-container">
				<InfoAlert { ...alertData } />
			</div>
			<div className="flex justify-center flex-wrap">
				<h1 className="text-theme mt-16 text-3xl font-semibold text-center w-full">Root<span className="font-normal">_Secret</span></h1>
				<form onSubmit={login}>
					<input type="text" name="user" placeholder="username or email" value={username} onChange={(e)=>setUsername(e.target.value)}></input>
					<input type="password" name="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
					<div className="flex justify-center"> 
						<button className="">Login</button>
					</div>
				</form>
			</div>
			<div className="flex justify-center mt-5">
				<Link href="/session/register">
					<a className="cursor-pointer">sign up</a>
				</Link>
			</div>
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
