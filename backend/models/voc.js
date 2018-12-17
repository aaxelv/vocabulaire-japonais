import mongoose from 'mongoose';
import random from 'mongoose-simple-random'

const Schema = mongoose.Schema;

let Voc = new Schema({
	japanese: {
		type : String
	},
	french: {
		type: String
	},
	lesson:{
		type : Number
	},
	memo1: {
		type: String
	},
	memo2 : {
		type : String,
		default: ""
	}
});

Voc.plugin(random);


export default mongoose.model('Voc',Voc);
