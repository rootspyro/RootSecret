import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { useState } from "react"

function MobileMenu({isOpen, setIsOpen }) { 

	if ( isOpen ) {
		return( 
			<>
				<div id="mobile-menu" className="fixed h-screen w-full bg-bg">
					Hello
				</div>
			</>
		)
	} else {
		return  <></>
	}
}

export default function Navbar() { 

	const [isOpen, setIsOpen] = useState<boolean>(false)

	function toggleMenu() {
		setIsOpen(!isOpen);

		/*
		const mobileMeny = document.getElementById("mobile-menu");

		if ( isOpen ) {
			mobileMeny.style.display = "block";
		} else {
			mobileMeny.style.display = "none";
		}
		*/
	}

	return(
		<div className="w-full fixed top-0 shadow-md">
			{ /* -- MOBILE MENU -- */ }
			<div className="bg-box sm:hidden p-2 flex justify-end">
				<button onClick={toggleMenu} className="mr-2 text-xl active:text-theme outline-none"><FontAwesomeIcon icon={"bars"} /></button>
			</div>
			<MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />

			{ /* -- DESKTOP MENU -- */ }

		</div>
	)
}
