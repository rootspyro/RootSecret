import  "../styles/global.css"
import { Layout } from "../components/Layout";
import Head from "next/head";

//FONTAWESOME
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fab, fas);

export default function App({Component, pageProps}){
	return(
		<>
			<Head>
				<title>SecretRoot - Password Manager</title>
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	)
}
