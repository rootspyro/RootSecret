export default function PasswordBox( password : any ){ 
	return(
		<>
			<div className="passwor-box">
				<p>App : {password.appname}</p>
				<p> Username : { password.usermame === '' ? "Username not provided" : password.username }</p>
				<p> Email : { password.email === '' ? "Email not provided" : password.email }</p>
				<button>Decrypt Password</button>
			</div>
		</>
	)
}
