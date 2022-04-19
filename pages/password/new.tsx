import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import jwt from  'jsonwebtoken';
import { getCookie } from 'cookies-next';
import Router from 'next/router';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import { InfoAlert } from '../../components/alerts/info-alert';

 
export default function NPassword(){ 
 	
	const [ alertData, setAlertData ] = useState<any>({});

	const [appName, setAppName] = useState('');
	const [username, setUsername] = useState('');
	const [ email, setEmail ] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [ userPassword  , setUserPassword ] = useState('');

	const [ userData  , setUserData ] = useState<any>({});


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

	async function NewPassword ( e ) {
		
		e.preventDefault();

		if ( password != confirmPassword ) { 
			displayAlert({
				type: "error",
				message: "Passwords do not match"
			});
			return;
		}
		else {

			const data = { 
				appName,
				username,
				email,
				password,
				userPassword
			}

			const response = await fetch('/api/password/' + userData.id , {
				method : 'POST',
				headers : {
					'Content-Type' : 'application/json'
				},
				body : JSON.stringify(data)
			});

			const json = await response.json();

			if ( json.ivError ) { 
				displayAlert({
					type: "error",
					message: json.ivError
				});
				return;
			}

			if ( json.success ) { 
				Router.push('/')
			}

			if ( json.success === false ) { 
				displayAlert({
					type: "error",
					message: json.message
				});
			}

		}

	} 

	useEffect(()=>{

		if ( userData.id ) {
			return;
		}
		else {
			setUserData(jwt.decode(getCookie("token")));
		}

	},[])

	function generatePassword(){

		var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var passwordLength = 12;
		var password = "";

		for (var i = 0; i <= passwordLength; i++) {
			var randomNumber = Math.floor(Math.random() * chars.length);
			password += chars.substring(randomNumber, randomNumber +1);
		}

		//copy password to clipboard

		setPassword(password);
		setConfirmPassword(password);

		navigator.clipboard.writeText( password );

		displayAlert({
			type: "success",
			message: "Password copied to clipboard"
		});

	}

	return(
		<div className="">

			<div className="hidden transition-all duration-700" id="alert-container">
				<InfoAlert { ...alertData } />
			</div>
			<div className="flex justify-center flex-wrap mb-10">
				<h1 className="mt-20 font-bold text-3xl text-theme w-full text-center">New<span className="font-normal">_Password</span></h1>
				<form onSubmit={NewPassword} >
					<input required type="text" placeholder="App name" value={appName} onChange={ e => setAppName(e.target.value) }/> <br />
					<input type="text" placeholder="Username" value={username} onChange={ e => setUsername(e.target.value) }/> <br />
					<input type="text" placeholder="Email" value={email} onChange={ e => setEmail(e.target.value) }/> <br />
					<input required type="password" placeholder="New password" value={password} onChange={ e => setPassword(e.target.value) }/> <br />
					<input required type="password" placeholder="Confirm password" value={confirmPassword} onChange={ e => setConfirmPassword(e.target.value) }/> <br /> <br />
					<input required type="password" placeholder="RootSecret password" value={userPassword} onChange={ e => setUserPassword(e.target.value) }/> <br />
					<div className="flex justify-center">
						<button>Add Password <FontAwesomeIcon icon="key" /></button>
					</div>
				</form>
			</div>
			<div className="text-center">
				<p><a onClick={generatePassword} className="text-theme hover:font-bold cursor-pointer underline decoration-1 hover:decoration-2">Click here!</a> for autogenerate a password.</p>
			</div>
		</div>
	)
}


export const getServerSideProps : GetServerSideProps = async (context) => {
	
	const cookies = context.req.cookies;

	if ( !cookies.token ) { 
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
