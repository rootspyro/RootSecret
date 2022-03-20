export default function PasswordBox( password : any ){ 

	async function decrypt(id : number) { 
		//decyprt password
		const decrypted = await fetch("/api/password/"+password.id, {
			method: "GET",
		});

		const decryptedPassword = await decrypted.json();
		console.log(decryptedPassword);
	}

	return(
		<>
			<div className="password-box">
				<p>App : {password.appname}</p>
				<p> Username : { password.usermame === '' ? "Username not provided" : password.username }</p>
				<p> Email : { password.email === '' ? "Email not provided" : password.email }</p>
				<button onClick={()=> decrypt(password.id)}>Decrypt Password</button>
			</div>
		</>
	)
}
