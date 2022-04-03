import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import jwt from  'jsonwebtoken';
import { getCookie } from 'cookies-next';

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
				body : JSON.stringify(data)
			});

			const json = await response.json();

			if ( json.ivError ) { 
				alert(  json.ivError );
			}

			if ( json.success ) { 
				alert( json.message );
				setAppName('');
				setUsername('');
				setEmail('');
				setPassword('');
				setConfirmPassword('');
				setUserPassword('');
			}

			if ( json.success === false ) { 
				alert( json.message );
			}

		}

	} 

	useEffect(()=>{

		if ( userData.id ) {

			console.log( userData );
			return;
		}
		else {
			setUserData(jwt.decode(getCookie("token")));
		}

	},[])

	return(
		<div className="">
			<div className="flex justify-center flex-wrap">
				<h1 className="mt-20 font-bold text-3xl text-theme w-full text-center">New_Password</h1>
				<form onSubmit={NewPassword} className=" w-4/5 lg:w-1/3 mt-10 text-white bg-box p-7 rounded-lg shadow-lg">
					<input required className=" w-full focus:outline-none focus:border-2 focus:border-theme bg-bg p-2 rounded-md shadow-inner mb-5" type="text" placeholder="App name" value={appName} onChange={ e => setAppName(e.target.value) }/> <br />
					<input className=" w-full focus:outline-none focus:border-2 focus:border-theme bg-bg p-2 rounded-md shadow-inner mb-5" type="text" placeholder="Username" value={username} onChange={ e => setUsername(e.target.value) }/> <br />
					<input className=" w-full focus:outline-none focus:border-2 focus:border-theme bg-bg p-2 rounded-md shadow-inner mb-5" type="text" placeholder="Email" value={email} onChange={ e => setEmail(e.target.value) }/> <br />
					<input className=" w-full focus:outline-none focus:border-2 focus:border-theme bg-bg p-2 rounded-md shadow-inner mb-5" required type="password" placeholder="New password" value={password} onChange={ e => setPassword(e.target.value) }/> <br />
					<input className=" w-full focus:outline-none focus:border-2 focus:border-theme bg-bg p-2 rounded-md shadow-inner mb-5" required type="password" placeholder="Confirm password" value={confirmPassword} onChange={ e => setConfirmPassword(e.target.value) }/> <br /> <br />
					<input className=" w-full focus:outline-none focus:border-2 focus:border-theme bg-bg p-2 rounded-md shadow-inner mb-5" required type="password" placeholder="User password" value={userPassword} onChange={ e => setUserPassword(e.target.value) }/> <br />
					<div className="flex justify-center">
						<button className="text-bg bg-theme font-bold py-2 px-4 rounded-md hover:bg-bg hover:text-theme">Add Password <FontAwesomeIcon icon="key" /></button>
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
