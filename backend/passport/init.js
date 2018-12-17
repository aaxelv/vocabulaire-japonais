// le dossier passport gère l'authentification
// les stratégies de login et de de registration sont définies dans les fichiers du même
// nom

import {login}  from './login' ;
import {registration} from './registration';
import Account from './../models/account';
import Local  from 'passport-local';

const LocalStrategy = Local.Strategy
 

export function init(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user: ');console.log(user);
        done(null, user);
    });

    passport.deserializeUser(function(id, done) {
        Account.findOne(  {_id: id} , function(err, user) {
            console.log('deserializing user:',user);
            done(err, user);
        });
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    registration(passport);

}


