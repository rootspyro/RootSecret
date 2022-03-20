import { useEffect, useState } from "react";
import {GetServerSideProps} from "next";
import jwt from "jsonwebtoken";
import { getCookie } from "cookies-next";
import Router from "next/router";


// PASSWORD BOX
import PasswordBox from "../components/password-box";

export default function Index(){

	const [ passwords, setPasswords ] = useState([]);
	const [ deleted  , setDeleted  ] = useState(false);

	const user = jwt.decode(getCookie("authorization"));

	async function getPasswords(){
		// passwords
		const passwords = await fetch("/api/passwords/"+ user.id , { 
			method: "GET",
		});

		const passwordsJson = await passwords.json();
		setPasswords(passwordsJson);

	}

	async function logout(){

		const response = await fetch("/api/session/logout", {
			method : "POST"
		})

		const data = await response.json();

		if ( data.success ) { 

			Router.push("/session/login");

		}

	}

	useEffect	(() => {
		getPasswords();
	},[ deleted ]);

	return(
		<div>
			<h1>RootSecret</h1>
			<h3>Password Manager</h3>
			<br/>
			<div className="password-list">
				{
					
					passwords.length > 0 
						? passwords.map( password => {

							async function decrypt(id : number) { 
								//decyprt password
								const decrypted = await fetch("/api/password/"+password.id, {
									method: "GET",
								});

								const decryptedPassword = await decrypted.json();
								alert(decryptedPassword.password);
							}

							async function deletePassword(id : number) { 
								//delete password
								const deleted = await fetch("/api/password/"+password.id, {
									method : "DELETE"
								})

								const deletedPassword = await deleted.json();
								
								if ( deletedPassword.success ) { 
									setDeleted(!deleted);
									console.log("Password deleted");
								}

							}
							return (
								<>
									<div>
										<PasswordBox key={password.id} { ... password } />
										<button onClick={()=> decrypt(password.id)}>Decrypt Password</button>
										<button onClick={()=> deletePassword(password.id)}>Delete Password</button>
									</div>
								</>
							)
						})
						: "No hay passwords"
				}
			</div>
			<br />
			<button onClick={logout}>Logout</button>
		</div>
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
