import { useState } from "react"
export default function Login(){

	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	async function login(){

		const requestBody = { 
			user : username,
			password : password
		}

		const data = await fetch("/api/login", {
			method : "POST",
			body : JSON.stringify(requestBody),
		})

		const json = await data.json()
		console.log(json)

	} 

	return(
		<>
			<form>
				<input type="text" name="user" placeholder="username or email" value={username} onChange={(e)=>setUsername(e.target.value)}></input>
				<input type="password" name="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
				<button type="button" onClick={login}>Login</button>
			</form>
		</>
	)
}
