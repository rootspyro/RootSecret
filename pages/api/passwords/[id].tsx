export default function passwordsHandler( req,res ) { 

	switch(req.method) { 
		// GET THE LIST OF PASSWORDS
		case 'GET' : 
			res.json({method: "GET"}).end();
			break;

		// CREATE A NEW PASSWORD
		case 'POST' :
			res.json({method: "POST"}).end();
			break;

		// UPDATE A PASSWORD
		case 'PUT' :
			res.json({method: "PUT"}).end();
			break;

		// DELETE A PASSWORD
		case 'DELETE' :
			res.json({method: "DELETE"}).end();
			break;

		default:
			break;
	}
}
