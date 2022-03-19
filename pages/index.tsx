export default function Index(){

	async function getUsers(){

		const users = await fetch('http://localhost:3000/api/passwords/1');
		const data = await users.json();
		console.log(data);

	}
	return(
		<div>
			<h1>Hola Mundo</h1>
			<button onClick={()=>getUsers()}>Get Users</button>
		</div>
	)
}
