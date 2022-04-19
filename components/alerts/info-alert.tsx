export function InfoAlert( message : any) {

	return (
		<>
			<div className="fixed bg-box text-theme right-5 top-5 py-3 px-5 rounded-md shadow-lg">
				<h2 className="font-bold text-lg">{message.type}</h2>
				<p className="text-white">{message.message}</p>
			</div>
		</>
	)
}
