import { GetServerSideProps } from 'next';
import { useState } from 'react';
import jwt from  'jsonwebtoken';
import { getCookie } from 'cookies-next';

export default function Password(){ 
	

	const [appName, setAppName] = useState('');
	const [username, setUsername] = useState('');
	const [ email, setEmail ] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [ userPassword  , setUserPassword ] = useState('');


	const userData = getCookie('authorization');
	const user = jwt.decode(userData);

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

			const response = await fetch('/api/password/' + user.id , {
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

	return(
		<>
			<h1>Add Password</h1>
			<form onSubmit={NewPassword} className="text-gray-800">
				<input required type="text" placeholder="App name" value={appName} onChange={ e => setAppName(e.target.value) }/> <br />
				<input type="text" placeholder="Username" value={username} onChange={ e => setUsername(e.target.value) }/> <br />
				<input type="text" placeholder="Email" value={email} onChange={ e => setEmail(e.target.value) }/> <br />
				<input required type="password" placeholder="New password" value={password} onChange={ e => setPassword(e.target.value) }/> <br />
				<input required type="password" placeholder="Confirm password" value={confirmPassword} onChange={ e => setConfirmPassword(e.target.value) }/> <br /> <br />
				<input required type="password" placeholder="User password" value={userPassword} onChange={ e => setUserPassword(e.target.value) }/> <br />
				<button>Add Password</button>
			</form>
		</>
	)
}


export const getServerSideProps : GetServerSideProps = async (context) => {
	
	const cookies = context.req.cookies;

	if ( !cookies.authorization ) { 
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
