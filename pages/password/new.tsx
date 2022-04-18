import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import jwt from  'jsonwebtoken';
import { getCookie } from 'cookies-next';
import Router from 'next/router';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

 
export default function NPassword(){ 
 	

	const [appName, setAppName] = useState('');
	const [username, setUsername] = useState('');
	const [ email, setEmail ] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [ userPassword  , setUserPassword ] = useState('');

	const [ userData  , setUserData ] = useState<any>({});


	async function NewPassword ( e ) {
		
		e.preventDefault();

		if ( password != confirmPassword ) { 
			alert("confirm that the password is the same");
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
				alert(  json.ivError );
			}

			if ( json.success ) { 
				Router.push('/')
			}

			if ( json.success === false ) { 
				alert( json.message );
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

	return(
		<div className="">
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
