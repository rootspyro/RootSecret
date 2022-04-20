import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { useState } from "react"
import Link from "next/link"
import Router from "next/router"

function MobileMenu({isOpen, setIsOpen }) { 

	const projectUrl : string = "https://github.com/rootspyro/RootSecret";

	async function logout(){

		setIsOpen(!isOpen);
		const response = await fetch("/api/session/logout", {
			method : "POST"
		})

		const data = await response.json();

		if ( data.success ) { 

			console.log("logout");
			Router.push("/session/login");

		}

	}

	return( 
		<>
			<div id="mobile-menu" className={`fixed h-screen w-full bg-bg transform ${isOpen ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md`}>
				<ul>
					<li className="w-full"><Link href="/"><a onClick={()=>setIsOpen(!isOpen)} ><FontAwesomeIcon icon={"home"} className="text-theme"/> Home</a></Link></li>
					<li className="w-full"><Link href="/password/new"><a onClick={()=>setIsOpen(!isOpen)}><FontAwesomeIcon icon={"key"} className="text-theme"/> New Password</a></Link></li>
					<li className="w-full"><Link href="/"><a onClick={()=>setIsOpen(!isOpen)}><FontAwesomeIcon icon={"user"} className="text-theme"/> My Account</a></Link></li>
					<li className="w-full"><a href={projectUrl} target="_blank" onClick={()=>setIsOpen(!isOpen)}><FontAwesomeIcon icon={["fab","github"]} className="text-theme"/> Project</a></li>
					<li className="w-full"><a onClick={logout}><FontAwesomeIcon icon={"sign-out"} className="text-theme"/> Logout</a></li>
				</ul>
			</div>
		</>
	)
}


export default function Navbar() { 

	const [isOpen, setIsOpen] = useState<boolean>(false)

	function toggleMenu() {
		setIsOpen(!isOpen);
	}


	return(
		<div className="w-full fixed top-0">
			{ /* -- MOBILE MENU -- */ }
			<div className="bg-box sm:hidden p-2 flex justify-end">
				<button onClick={toggleMenu} className="mr-2 text-xl active:text-theme outline-none"><FontAwesomeIcon icon={"bars"} /></button>
			</div>
			<MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />

			{ /* -- DESKTOP MENU -- */ }
			<div className="hidden sm:block w-full ">
				<h1>My desktop menu</h1>
			</div>

		</div>
	)
}
