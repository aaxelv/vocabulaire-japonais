// Ce fichier gère les routes liés au compte. Identification et registration mais 
// également accès aux comptes, modification de comptes, suppression de compte
// par le super-admin

import express from 'express';
const router = express.Router();
import Account from './../models/account'



const isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/salut');
}

export function routespass(passport){



router.get('/', function(req,res){
	res.json("fail")
})
	/* GET login page. */
	
router.get('/login', function(req,res){
      res.json("success " + req.user.class);
})

	/* Handle Login POST */
router.post('/login',passport.authenticate('login',{
		successRedirect: '/login',
		failureRedirect: '/',
		failureFlash : true  
	})
	);

/*
router.post('/login',
  passport.authenticate('login'),function(req,res){
  	res.redirect('/home/login')
  });



	/* GET Registration Page */
	/*res.render('register',{message: "req.flash('message')"})*/
	router.get('/signup', function(req, res){
		res.json("signup");
	});

	/* Handle Registration POST */
	/**/
	router.post('/signup',passport.authenticate('signup',{
		failureRedirect : '/',
		successRedirect: '/signup'
	})
	);

	/* GET Home Page 
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});*/

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.json("déconnecté")
			});


	router.route('/account').get((req,res)=> {
		if (!req.user){
			res.json("Not logged in")
		}	
		else if (req.user.class == 'superadmin') {
			Account.find((err,account) =>{
			if (err)
				console.log(err);
			else
				res.json(account);	
		});
		}
		else {
			res.json('Not logged in')
		}
	});

	router.route('/account/:id').delete((req,res) => {
		if (!req.user){
			res.json('Not logged in');
		}
		else {	
		Account.findByIdAndRemove({_id: req.params.id}, (err,account) =>{
			if (err)
				res.json(err)
			else
				res.json('Remove successfully');
		})
	}
	})

	router.route('/account/:id').get((req,res)=> {
		Account.findById(req.params.id, (err,account) =>{
			if (err)
				console.log(err);
			else
				res.json(account);
		});
	});

	router.route('/account/:id').put((req,res) => {
		if (!req.user){
			res.json('Not logged in')
		}
		else {
		Account.findById(req.params.id, (err,account) => {
			if (!account){
				return (new Error('Could not load document'))
				}
			else {
				account.username = req.body.username;
				account.class = req.body.class;
				account.connection = req.body.connection;
				account.save().then(account => {
					res.json('Update done');

				}).catch(err => {
					res.status(400).send('Update failed');
				});
			}
		})
		}	
	})

	return router;
}
