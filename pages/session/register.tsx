import { GetServerSideProps } from "next"
import { useState } from "react";
import Router from "next/router";
import { InfoAlert } from "../../components/alerts/info-alert"

export default function Register(){

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [rePassword, setRePassword] = useState("");

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
	
	async function signUp(e){

		e.preventDefault();

		if ( password != rePassword ) {
		
			displayAlert({
				type: "error",
				message: "Passwords do not match"
			});
			return;
		
		} else {

			const userData = { username, email, password };
			userData.email = userData.email.toLowerCase();

			const data = await fetch("/api/session/register", {
				method : "POST",
				body : JSON.stringify(userData)
			})

			const response = await data.json();

			if ( response.error ) { 
				displayAlert({
					type: "error",
					message: response.error
				});
				return;
			}

			if ( response.success ) { 
				Router.push("/session/login");
			}

		}

	}

	return(
		<div className="flex-wrap flex justify-center">

			<div className="hidden transition-all duration-700" id="alert-container">
				<InfoAlert { ...alertData } />
			</div>

			<h1 className="text-theme mt-16 text-3xl font-semibold text-center w-full">New<span className="font-normal">_User</span></h1>
			<form onSubmit={signUp} className="w-4/5 lg:w-1/3 mt-10 text-white bg-box p-7 rounded-lg shadow-lg">
				<input  required type="text" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)} /><br/>
				<input  required type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/><br/>
				<input  required type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
				<input  required type="password" placeholder="confirm password" value={rePassword} onChange={(e)=>setRePassword(e.target.value)}/><br/>
				<div className="flex justify-center"> 
					<button>Create User</button>
				</div>
			</form>
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
