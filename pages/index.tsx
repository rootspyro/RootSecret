import { useEffect, useState } from "react";
import {GetServerSideProps} from "next";
import jwt from "jsonwebtoken";
import { getCookie } from "cookies-next";
import Router from "next/router";


// PASSWORD BOX
import PasswordBox from "../components/password-box";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export default function Index(){

	const [ passwords, setPasswords ] = useState([]);
	const [ user, setUser ] = useState<any>('');
	
	async function getPasswords(id : number){
		// passwords
		const passwords = await fetch("/api/passwords/"+ id, { 
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

			console.log("logout");
			Router.push("/session/login");

		}

	}

	useEffect(() => {
		if ( user.id ) { 
			getPasswords(user.id);
		} else {
			setUser(jwt.decode(getCookie("token")));
		}
	}, [user]);

	return(
		<>
			<h1 className="text-theme mt-16 text-3xl font-semibold text-center">Root<span className="font-normal">_Secret</span></h1>
			<h3 className="text-lg text-center mt-3"> Welcome <span className="text-theme text-semibold">{user.username}</span>...</h3>

			<div className="passwords-container p-5 lg:p-10 mt-8 flex flex-wrap justify-center">



				{ passwords.map( p  => {

					return(
						<PasswordBox { ...  p } key={p.id} />
					)

				})}

				<div className="flex justify-center mt-10 w-full">
					<button onClick={()=>Router.push("/password/new")}>
						<FontAwesomeIcon icon="plus-circle" className="text-theme text-5xl" />
					</button>
				</div>

				<button onClick={logout}>Logout</button>

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
