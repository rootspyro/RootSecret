import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
export default function PasswordBox( password : any ){ 

	const [ isOpen , setIsOpen ] = useState( true );
	const [ lockIcon , setLockIcon ] = useState<any>( "lock" );
	const [dPassword, setDPassword] = useState("");

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
			<div className="password-box bg-box mb-5 rounded-lg p-4">
				<div className="pbox-head text-theme  grid grid-cols-2">
					<h2 className="font-bold">{password.appname}</h2>
					<div className="flex justify-end">
						<button className="" onClick={OpenPasswd}><FontAwesomeIcon icon={["fas" , lockIcon ]}/></button>
					</div>
				</div>
				<div id={"pbox-body-" + password.id } className="hidden text-sm mt-3">
					<p className="text-white"><span className="text-theme font-semibold">Username: </span>{password.username}</p>
					<p className="text-white"><span className="text-theme font-semibold">Email: </span>{password.email}</p>
					<p className="text-white"><span className="text-theme font-semibold">Password: </span>{dPassword}</p>
				</div>
			</div>
		</>
	)
}
