const bcrypt = require('bcrypt');

async function hashPassword(password) { 
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	console.log(hash)
}

async function validatePassword(password, hash){ 
	const result = await bcrypt.compare(password, hash);
	console.log(result)
}


validatePassword("ciscoclass", '$2b$10$qAANb7jtu3j2c8x2w5V3QuDYlUKv97OS/ujdjKnmDVeHe8enMatGS');
