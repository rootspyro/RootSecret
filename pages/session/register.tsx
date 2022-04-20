import { GetServerSideProps } from "next"
import { useState } from "react";
import Router from "next/router";
import { InfoAlert } from "../../components/alerts/info-alert"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Register(){

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [rePassword, setRePassword] = useState("");

	const [ alertData, setAlertData ] = useState<any>({});

	function validateForm( ) { 

		if( username.length < 3 ){
			displayAlert({
				type: "danger",
				message: "Username must be at least 3 characters long"
			})
			return false;
		}

		if( password.length < 8 ){
			displayAlert({
				type: "danger",
				message: "Password must be at least 8 characters long"
			});
			return false;
		}

		var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
		
		if ( !strongRegex.test(password) ) {
			displayAlert({
				type: "danger",
				message: "Passwords is not strong enough, follow the instructions."
			});
			return false;
		}

		if( password !== rePassword ){
			displayAlert({
				type: "danger",
				message: "Passwords do not match"
			});
			return false;
		}

		if( !email.includes("@") ){
			displayAlert({
				type: "danger",
				message: "Email is not valid"
			});
			return false;
		}

		return true;

	}

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

		if ( validateForm() ) {
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

			<h1 className="text-theme mt-16 text-3xl font-semibold text-center w-full"><FontAwesomeIcon className="text-2xl" icon={"user"} /> New<span className="font-normal">_User</span> </h1>
			<form onSubmit={signUp} className="w-4/5 lg:w-1/3 mt-10 text-white bg-box p-7 rounded-lg shadow-lg">
				<input  required type="text" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)} /><br/>
				<input  required type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/><br/>
				<input  required type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
				<input  required type="password" placeholder="confirm password" value={rePassword} onChange={(e)=>setRePassword(e.target.value)}/><br/>
				<div className="flex justify-center"> 
					<button>Create User</button>
				</div>
			</form>
			<p className=" mb-10 md:text-md w-full text-center mt-10 text-xs px-10">Please choose a stronger password and <span className="text-red-500 font-bold ">do not lose it</span>. <br/><br/> Password must contain: UPPERCASE, lowercase, numb3rs and $pecial ch@racters.</p>
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
