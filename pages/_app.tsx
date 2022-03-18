import { Layout } from "../components/Layout";
import Head from "next/head";

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
