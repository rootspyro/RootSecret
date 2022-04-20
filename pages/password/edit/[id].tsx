import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { getCookie } from 'cookies-next';
import jwt from  'jsonwebtoken';

import { InfoAlert } from '../../../components/alerts/info-alert'; 

export default  function EditPassword(){

	const router = useRouter();
	const { id } = router.query;

	const [ alertData, setAlertData ] = useState<any>({});

	const [appName, setAppName] = useState('');
	const [username, setUsername] = useState('');
	const [ email, setEmail ] = useState('');
	const [password, setPassword] = useState('');

	const [ userPassword  , setUserPassword ] = useState('');
	//const [confirmPassword, setConfirmPassword] = useState('');

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

	async function updateData(e) { 

		e.preventDefault();

		const body = {
			id : id,
			password: password,
			email: email,
			username: username,
			appName: appName,
			userPassword: userPassword
		};

		const data = await fetch(`/api/password/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})

		const response = await data.json();

		if (response.success) {
			router.push('/');
		} 
		else if ( response.ivError ) { 
			displayAlert({ type: 'error', message: response.ivError });
			return
		} 
		else if ( !response.success ) { 
			displayAlert({ type: 'error', message: response.message });
			return
		}
	}

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

		navigator.clipboard.writeText( password );

		displayAlert({
			type: "success",
			message: "Password copied to clipboard"
		});

	}

	useEffect( ()=> {

		if ( userData.id ) {

			fetch(`/api/password/${id}`)
				.then(res => res.json())
				.then(data => {
					setAppName(data.appname);
					setUsername(data.username);
					setEmail(data.email);
					setPassword(data.dPassword);
				});
			return;
		}
		else {
			setUserData(jwt.decode(getCookie("token")));
		}

	}, [userData]);

	return (
		<>
		<div className="hidden transition-all duration-700" id="alert-container">
			<InfoAlert { ...alertData } />
		</div>
		<div className="flex-wrap flex justify-center">
			<h1 className="mt-20 font-bold text-3xl text-theme w-full text-center">Edit<span className="font-normal">_Password</span></h1>
			<form onSubmit={e=>updateData(e)}>
				<input required type="text" placeholder="App name" value={appName} onChange={ e => setAppName(e.target.value) }/> <br />
				<input type="text" placeholder="Username" value={username} onChange={ e => setUsername(e.target.value) }/> <br />
				<input type="text" placeholder="Email" value={email} onChange={ e => setEmail(e.target.value) }/> <br />
				<input required type="password" placeholder="New password" value={password} onChange={ e => setPassword(e.target.value) }/> <br />
				<input className="mt-5" required type="password" placeholder="RootSecret password" value={userPassword} onChange={ e => setUserPassword(e.target.value) }/> <br />
				<div className="flex justify-center">
					<button>Edit Password Data <FontAwesomeIcon icon="key" /></button>
				</div>
			</form>
		</div>
		<div className="text-center mt-10 px-5 mb-20">
			<p><a onClick={generatePassword} className="text-theme hover:font-bold cursor-pointer underline decoration-1 hover:decoration-2">Click here!</a> for autogenerate a password.</p>
		</div>
		</>
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
