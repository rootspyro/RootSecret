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

	const [ deleted , setDeleted ] = useState( false );

	async function getPasswords(id : number){
		// passwords
		const passwords = await fetch("/api/passwords/"+ id, { 
			method: "GET",
		});

		const passwordsJson = await passwords.json();
		setPasswords(passwordsJson);

	}

	useEffect(() => {
		if ( user.id ) { 
			getPasswords(user.id);
		} else {
			setUser(jwt.decode(getCookie("token")));
		}
	}, [user, deleted]);

	return(
		<>
			<h1 className="text-theme mt-24 text-3xl font-semibold text-center">Root<span className="font-normal">_Secret</span></h1>
			<h3 className="text-lg text-center mt-3"> Welcome <span className="text-theme text-semibold">{user.username}</span>...</h3>

			<div className="passwords-container p-5 lg:p-10 mt-8 flex flex-wrap justify-center">



				{ passwords.map( p  => {

					return(
						<PasswordBox password={ p } key={p.id} deleted={deleted} setDeleted={setDeleted} />
					)

				})}

				<div className="flex justify-center mt-10 w-full">
					<button onClick={()=>Router.push("/password/new")}>
						<FontAwesomeIcon icon="plus-circle" className="text-theme text-5xl" />
					</button>
				</div>

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
