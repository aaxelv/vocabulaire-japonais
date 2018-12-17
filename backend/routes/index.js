// Ce fichier gère les routes pour les notes de frais : acquérir les notes de frais,
// les modifier, supprimer


import express from 'express';
import Issue from './../models/issue'
import Account from './../models/account'
import Voc from './../models/voc'
import random from 'mongoose-simple-random'


const router = express.Router();

export function routess() {

	router.route('/issues').get((req,res)=> {
		if (!req.user){
			res.json("Not logged in")
		}
		else if (req.user.class === 'admin') {
			Issue.find({responsible: req.user.connection}, (err,issues) => {
				if (err)
					consolelog(err)
				else
					res.json(issues);
			})
		}	
		else {
			Issue.find({responsible: req.user.username},(err,issues) =>{
			if (err)
				console.log(err);
			else
				res.json(issues);	
		});
		}
	});

	router.route('/voc/random').get((req,res)=>{
		if(!req.user){
			res.json("Not logged in")
		}
		else{
			Voc.findOneRandom({_id: req.user.voc1},(err,voc)=>{
			if (err)
				console.log(err);
			else
				res.json(voc);	
			})
		}
	})

// Si il réussit le mot, on le fait augmenter de classe
	router.route('/vocUp/:id').get((req,res)=>{
		if (!req.user){
			res.json('Not logged in')
		}
		else if (req.user.voc1.indexOf(req.params.id)!=-1){
			console.log(req.user.voc1.indexOf(req.params.id));
			req.user.voc1.splice(req.user.voc1.indexOf(req.params.id),1);
			req.user.voc2.push(req.params.id);
			req.user.save();
			res.json("");
		}
		else if (req.user.voc2.indexOf(req.params.id) != -1){
			req.user.voc2.splice(req.user.voc2.indexOf(req.params.id),1);
			req.user.voc3.push(req.params.id);
			res.json("");
		}
		});

	router.route('/issues/:id').get((req,res)=> {
		Issue.findById(req.params.id, (err,issue) =>{
			if (err)
				console.log(err);
			else
				res.json(issue);
		});
	});

// Utile pour les recherches par nom
	router.route('/issues/search/:name').get((req,res)=> {
	Issue.find({title :req.params.name, responsible : req.user.username}, (err,issue) =>{
			if (err)
				console.log(err);
			else
				res.json(issue);
		});	
	});

	router.route('/voc').post((req,res) => {
		if (!req.user){
			res.json('Not logged in')
		}
		else {
		let french = String(req.body.french);
		let japanese = String(req.body.japanese);
		let lesson = String(req.body.lesson);
		let memo1 = String(req.body.memo1);

		let voc = new Voc({french, japanese, lesson, memo1});
		voc.save()
			.then(issue => {
				res.status(200).json({'issue': 'Added successfully'});
			})
			.catch(err => {
				res.status(400).send('Failed to create new record');
			})
		}
	})

	router.route('/issues/:id').put((req,res) => {
		if (!req.user){
			res.json('Not logged in')
		}
		else {
		Issue.findById(req.params.id, (err,issue) => {
			if (!issue){
				return (new Error('Could not load document'))
				}
			else {
				issue.title = req.body.title;
				issue.date = req.body.date;
				issue.ammount = req.body.ammount;
				issue.devise = req.body.devise;
				issue.description = req.body.description;
				issue.status = req.body.status;
				issue.justification = req.body.justification;
				issue.objection = req.body.objection;
				issue.save().then(issue => {
					res.json('Update done');

				}).catch(err => {
					res.status(400).send('Update failed');
				});
			}
		})
		}	
	})

	router.route('/issues/:id').delete((req,res) => {
		if (!req.user){
			res.json('Not logged in');
		}
		else {	
		Issue.findByIdAndRemove({_id: req.params.id}, (err,issue) =>{
			if (err)
				res.json(err)
			else
				res.json('Remove successfully');
		})
	}
	})
	return router;
}
