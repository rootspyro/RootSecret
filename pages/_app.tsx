import  "../styles/global.css"
import { Layout } from "../components/Layout";
import Head from "next/head";

//FONTAWESOME
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fab, fas, far);

export default function App({Component, pageProps}){
	return(
		<>
			<Head>
				<title>RootSecret - Password Manager</title>
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	)
}
