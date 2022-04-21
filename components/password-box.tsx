import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import Router from "next/router";
import { InfoAlert } from "./alerts/info-alert";

function PasswordModal( { modalOpen, setModalOpen, passwordInfo, deletePassword } ) { 

	const [ confirmed, setConfirmed ] = useState<boolean>(false);

	function confirmName( inputName : string ) { 
		if ( passwordInfo.appname === inputName ) {
			setConfirmed(true);
		} else { 
			setConfirmed(false);
		}
	}

	return(
		<div id="identity-container" className={` ${ modalOpen ? "fixed" : "hidden"} w-full h-screen top-0 bottom-0 right-0 left-0 p-5`}>
			<style>{`
				#identity-container { 
					background-color: rgba(0,0,0,0.5);
					z-index: 100;
				}
			`}</style>

			<div className="flex flex-wrap justify-center mt-16 md:mt-24">
				<div className="bg-bg px-10 py-10 rounded-lg max-w-md">
					<h1 className="text-center text-xl font-normal"> Are you sure you want to delete your <span className="font-bold text-theme">{ passwordInfo.appname }</span> password?</h1>
					<div className="mt-10">
						{/*APPNAME INPUT*/}
						<label className="ml-1 mb-3 block">Please type <span className="font-bold text-theme">{passwordInfo.appname}</span> to confirm: </label>
						<input type="text" placeholder={passwordInfo.appname} onChange={ e=> confirmName(e.target.value)} className="w-full focus:outline-none focus:border-2 focus:border-theme bg-box p-2 rounded-md shadow-inner mb-5" />
					</div>
					<div className="flex">
						<button disabled={!confirmed} onClick={deletePassword} className="disabled:bg-red-900 disabled:text-red-300 w-full bg-red-600 py-2 rounded-lg hover:text-red-500 hover:bg-box">Yes, I want to delete this password</button>
					</div>
				</div>
				{/*Close button*/}
				<div className="w-full flex justify-center mt-16"><button onClick={ ()=>{setModalOpen(false)} } className="bg-bg px-5 py-3 rounded-full hover:bg-box text-theme font-bold">cancel X </button></div>
			</div>

		</div>
	)
}


export default function PasswordBox( { password,  deleted, setDeleted } ){ 

	const [ alertData, setAlertData ] = useState<any>({});

	const [ isOpen , setIsOpen ] = useState( true );
	const [ lockIcon , setLockIcon ] = useState<any>( "lock" );
	const [ passData , setPassData ] = useState<any>( {} );

	const [ modalOpen , setModalOpen ] = useState( false );

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
			setDeleted( !deleted );
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
					<button onClick={()=>{ setModalOpen(true) }} className="hover:bg-bg hover:text-theme mt-5 text-sm bg-theme text-box font-semibold px-3 py-2 rounded-md ml-3"><FontAwesomeIcon className="text-lg" icon={["far", "trash-alt"]} /></button>

				</div>
			</div>
			<PasswordModal 
				modalOpen={modalOpen} 
				setModalOpen={setModalOpen} 
				passwordInfo={passData}
				deletePassword={DeletePassword}
			/>
		</>
	)
}
