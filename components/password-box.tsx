import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import Router from "next/router";

import { InfoAlert } from "./alerts/info-alert";

export default function PasswordBox( password : any ){ 

	const [ alertData, setAlertData ] = useState<any>({});

	const [ isOpen , setIsOpen ] = useState( true );
	const [ lockIcon , setLockIcon ] = useState<any>( "lock" );
	const [ passData , setPassData ] = useState<any>( {} );

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

	function ShowAlert( message : string ){
		const data = { message, type : "info" };
	}

	function CopyPassword() { 
		navigator.clipboard.writeText( passData.dPassword );

		displayAlert({ message : "Password Copied", type : "success" });
	}

	async function DeletePassword() { 

		const response = await fetch( `/api/password/${password.id}`, {
			method: "DELETE",
		});

		const data = await response.json();

		if( data.success ) {
			location.reload();
		}
		
	}

	async function OpenPasswd() {

		setIsOpen( !isOpen );
		const pbox =  document.getElementById( "pbox-body-" + password.id );

		if ( isOpen ) { 

			setLockIcon("lock-open");
			pbox.style.display = "block";
		
			if ( !passData.username ) { 
				//DECRYPT
				const data = await fetch("/api/password/" + password.id);
				const json = await data.json();
				setPassData( json );
			}
			
			
		} else { 
			setLockIcon("lock");
			pbox.style.display = "none";
		}

	}

	return(
		<>
			<div className="hidden transition-all duration-700" id="alert-container">
				<InfoAlert { ...alertData } />
			</div>
			<div className=" x-10 password-box bg-box mb-5 rounded-lg p-4 shadow-lg w-full sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl">
				<div className="pbox-head text-theme  grid grid-cols-2">
					<h2 className="font-bold lg:text-xl">{password.appname}</h2>
					<div className="flex justify-end">
						<button className="lg:text-xl" onClick={OpenPasswd}><FontAwesomeIcon icon={["fas" , lockIcon ]}/></button>
					</div>
				</div>
				<div id={"pbox-body-" + password.id } className="hidden mt-3">
					<p className="text-white"><span className="text-theme font-semibold">Username: </span>{passData.username == '' ? "User not provided" : passData.username}</p>
					<p className="text-white"><span className="text-theme font-semibold">Email: </span>{passData.email == '' ? "Email not provided" : passData.email}</p>

					<button onClick={CopyPassword} className="hover:bg-bg hover:text-theme mt-5 text-sm bg-theme text-box font-semibold px-3 py-2 rounded-md">Copy Password <FontAwesomeIcon className="text-lg" icon={["far", "copy"]} /></button>
					<button onClick={ () => Router.push("/password/edit/"+password.id) }className="hover:bg-bg hover:text-theme mt-5 text-sm bg-theme text-box font-semibold px-3 py-2 rounded-md ml-3"><FontAwesomeIcon className="text-lg" icon={["far", "edit"]} /></button>
					<button onClick={DeletePassword} className="hover:bg-bg hover:text-theme mt-5 text-sm bg-theme text-box font-semibold px-3 py-2 rounded-md ml-3"><FontAwesomeIcon className="text-lg" icon={["far", "trash-alt"]} /></button>

				</div>
			</div>
		</>
	)
}
