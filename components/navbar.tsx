import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Router from "next/router"


async function logout(){

	const response = await fetch("/api/session/logout", {
		method : "POST"
	})

	const data = await response.json();

	if ( data.success ) { 

		Router.push("/session/login");

	}

}

function MobileMenu({isOpen, setIsOpen }) { 

	const projectUrl : string = "https://github.com/rootspyro/RootSecret";

	return( 
		<>
			<div id="mobile-menu" className={`fixed h-screen w-full bg-bg transform ${isOpen ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md`}>
				<ul>
					<li className="w-full"><Link href="/"><a onClick={()=>setIsOpen(!isOpen)} ><FontAwesomeIcon icon={"home"} className="text-theme"/> Home</a></Link></li>
					<li className="w-full"><Link href="/password/new"><a onClick={()=>setIsOpen(!isOpen)}><FontAwesomeIcon icon={"key"} className="text-theme"/> New Password</a></Link></li>
					<li className="w-full"><Link href="/"><a onClick={()=>setIsOpen(!isOpen)}><FontAwesomeIcon icon={"user"} className="text-theme"/> My Account</a></Link></li>
					<li className="w-full"><a href={projectUrl} target="_blank" onClick={()=>setIsOpen(!isOpen)}><FontAwesomeIcon icon={["fab","github"]} className="text-theme"/> Project</a></li>
					<li className="w-full"><a onClick={()=>{ setIsOpen(!isOpen); logout(); }}><FontAwesomeIcon icon={"sign-out"} className="text-theme"/> Logout</a></li>
				</ul>
			</div>
		</>
	)
}


export default function Navbar() { 

	const router = useRouter();
	const [isOpen, setIsOpen] = useState<boolean>(false)

	function toggleMenu() {
		setIsOpen(!isOpen);
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

	if ( router.pathname === "/session/login" || router.pathname === "/session/register" ) {
		return null;
	} 

	return(
		<div className="w-full fixed top-0">
			{ /* -- MOBILE MENU -- */ }
			<div className="bg-box sm:hidden p-2 flex justify-end">
				<button onClick={toggleMenu} className="mr-2 text-xl active:text-theme outline-none"><FontAwesomeIcon icon={"bars"} /></button>
			</div>
			<MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />

			{ /* -- DESKTOP MENU -- */ }
			<div id="desktop-menu" className="hidden sm:flex ">
				<ul className="flex p-5 w-2/4 justify-start ml-5">
					<li className="mr-5"><Link href="/"><a className="font-bold text-lg hover:text-theme"><FontAwesomeIcon className="text-theme" icon={"home"} /> Home</a></Link></li>
					<li className="mr-5"><Link href="/password/new"><a className="font-bold text-lg hover:text-theme"><FontAwesomeIcon className="text-theme" icon={"key"} /> New Password</a></Link></li>
				</ul>
				<ul className="flex p-5 w-2/4 justify-end">
					<li className="mr-5"><Link href="#"><a className="font-bold text-lg hover:text-theme"><FontAwesomeIcon className="text-theme" icon={"user"} /> My account</a></Link></li>
					<li className="mr-5"><a className="font-bold text-lg hover:text-theme cursor-pointer" onClick={logout}><FontAwesomeIcon className="text-theme" icon={"sign-out"} /> Logout</a></li>
				</ul>
			</div>

		</div>
	)
}
