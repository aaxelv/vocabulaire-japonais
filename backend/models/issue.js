// Les notes de frais, qu'on appellera issues sont définies comme souhaites
// On ajoute une objection et une justification optionnelle pour l'user / l'admin

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Issue = new Schema({
	title: {
		type : String
	},
	responsible: {
		type: String
	},
	date: {
		type: String
	},
	ammount : {
		type : String
	},
	devise : {
		type: String
	},
	description : {
		type : String
	},
	status: {
		type: String,
		default: 'Non validé'
	},
	justification : {
		type: String,
		default : ""
	},
	objection : {
		type: String,
		default:''
	}
});

export default mongoose.model('Issue',Issue);
