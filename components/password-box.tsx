import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import Router from "next/router";

export default function PasswordBox( password : any ){ 


	const [ isOpen , setIsOpen ] = useState( true );
	const [ lockIcon , setLockIcon ] = useState<any>( "lock" );
	const [dPassword, setDPassword] = useState("");

	function CopyPassword() { 
		navigator.clipboard.writeText( dPassword );
	}

	async function DeletePassword() { 

		const response = await fetch( `/api/password/${password.id}`, {
			method: "DELETE",
		});

		const data = await response.json();

		if( data.success ) {
			Router.push( "/" );
		}
		
	}

	async function OpenPasswd() {

		setIsOpen( !isOpen );
		const pbox =  document.getElementById( "pbox-body-" + password.id );

		if ( isOpen ) { 

			setLockIcon("lock-open");
			pbox.style.display = "block";
		
			if ( dPassword === '' ) { 
				//DECRYPT
				const data = await fetch("/api/password/" + password.id);
				const json = await data.json();
				setDPassword(json.password);
			}
			
			
		} else { 
			setLockIcon("lock");
			pbox.style.display = "none";
		}

	}

	return(
		<>
			<div className=" x-10 password-box bg-box mb-5 rounded-lg p-4 shadow-lg w-full sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl">
				<div className="pbox-head text-theme  grid grid-cols-2">
					<h2 className="font-bold lg:text-xl">{password.appname}</h2>
					<div className="flex justify-end">
						<button className="lg:text-xl" onClick={OpenPasswd}><FontAwesomeIcon icon={["fas" , lockIcon ]}/></button>
					</div>
				</div>
				<div id={"pbox-body-" + password.id } className="hidden mt-3">
					<p className="text-white"><span className="text-theme font-semibold">Username: </span>{password.username == '' ? "User not provided" : password.username}</p>
					<p className="text-white"><span className="text-theme font-semibold">Email: </span>{password.email == '' ? "Email not provided" : password.email}</p>

					<button onClick={CopyPassword} className="mt-5 text-sm bg-theme text-box font-semibold px-3 py-2 rounded-md">Copy Password <FontAwesomeIcon className="text-lg" icon={["far", "copy"]} /></button>
					<button className="mt-5 text-sm bg-theme text-box font-semibold px-3 py-2 rounded-md ml-3"><FontAwesomeIcon className="text-lg" icon={["far", "edit"]} /></button>
					<button onClick={DeletePassword} className="mt-5 text-sm bg-theme text-box font-semibold px-3 py-2 rounded-md ml-3"><FontAwesomeIcon className="text-lg" icon={["far", "trash-alt"]} /></button>

				</div>
			</div>
		</>
	)
}
