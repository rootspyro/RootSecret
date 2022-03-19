export default function Login(){
	return(
		<>
			<form method="POST" action="/api/login">
				<input type="text" name="user" placeholder="username or email"></input>
				<input type="password" name="password" placeholder="password"></input>
				<button>Login</button>
			</form>
		</>
	)
}
