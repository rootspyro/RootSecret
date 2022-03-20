export default function PasswordBox( password : any ){ 

	return(
		<>
			<div className="password-box">
				<p>App : {password.appname}</p>
				<p> Username : { password.usermame === '' ? "Username not provided" : password.username }</p>
				<p> Email : { password.email === '' ? "Email not provided" : password.email }</p>
			</div>
		</>
	)
}
