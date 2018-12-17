// On initialise la base de donnée et passport, on gère les données transmises pour
// l'identification de 2 façons différentes, cors et les "headers" mentionné à la fin

import express from 'express';
import cors from 'cors';
import bodyParser from'body-parser';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser'

import passport from 'passport'
import Local  from 'passport-local';
import expressSession from 'express-session';


const app = express();
const router = express.Router();

const LocalStrategy = Local.Strategy;

app.use(cors({
	origin : 'http://localhost:4200',
	credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

// On initialise passport avec une express session qui permet de sauvegarder l'info ds les cooki
// Permet la persistance
app.use(expressSession({
	secret: 'mySecretKey',
	resave : true,
	saveUninitialized: false
	}));



app.use(passport.initialize());
app.use(passport.session());


mongoose.connect('mongodb://localhost:27017/issues');

const connection = mongoose.connection;

connection.once('open', () => {
	console.log('MongoDB database connection established successfully')
})




import {routess} from './routes/index';
app.use('/', routess());

import {routespass} from './routes/passport';
app.use('/', routespass(passport));

import {init} from './passport/init';
init(passport);


/*import Account from './models/account';
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());*/

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next()
});

app.listen(4000, () => console.log('Express server running on port 4000 '));