import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { getCookie } from 'cookies-next';
import jwt from  'jsonwebtoken';

export default  function EditPassword(){

	const router = useRouter();
	const { id } = router.query;

	const [appName, setAppName] = useState('');
	const [username, setUsername] = useState('');
	const [ email, setEmail ] = useState('');
	const [password, setPassword] = useState('');
	//const [confirmPassword, setConfirmPassword] = useState('');

	const [ userData  , setUserData ] = useState<any>({});

	async function updateData(e) { 

		e.preventDefault();

		const body = {
			id : id,
			password: password,
			email: email,
			username: username,
			appName: appName
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
		} else {
			alert('Something went wrong');
		}
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
		<div className="flex-wrap flex justify-center">
			<h1 className="mt-20 font-bold text-3xl text-theme w-full text-center">Edit<span className="font-normal">_Password</span></h1>
			<form onSubmit={e=>updateData(e)}>
				<input required type="text" placeholder="App name" value={appName} onChange={ e => setAppName(e.target.value) }/> <br />
				<input type="text" placeholder="Username" value={username} onChange={ e => setUsername(e.target.value) }/> <br />
				<input type="text" placeholder="Email" value={email} onChange={ e => setEmail(e.target.value) }/> <br />
				<input required type="password" placeholder="New password" value={password} onChange={ e => setPassword(e.target.value) }/> <br />
				<div className="flex justify-center">
					<button>Edit Password Data <FontAwesomeIcon icon="key" /></button>
				</div>
			</form>
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
