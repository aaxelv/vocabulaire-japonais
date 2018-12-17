// les comptes sont définies par un nom d'utilisateur, en mdp, la class( utilisateur
//admin ou super admin) et leur relatin. Un admin est relié à ses users



import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;

let Account = new Schema ({
	username : String,
	password : String,
	class: {
		type : String,
		default: "user"
	},
	voc1 : {
		type: Array,
		default: []
	},
	voc2 : {
		type: Array,
		default: []
	},
	voc3 : {
		type: Array,
		default: []
	}

});

Account.plugin(passportLocalMongoose);


export default mongoose.model('Account',Account);
