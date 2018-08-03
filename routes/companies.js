const express = require('express');
const companyRouter = express.Router();
const Company = require('../models/company');


// Create a company
companyRouter.post('/create', (req, res, next) => {
  const newCompany = new Company(req.body);
  console.log("========================inside create company",req.body)
  newCompany.save()
    .then((responseFromDb) => res.status(200).json(responseFromDb))
    .catch(err => res.status(411).json(err));
});

// Get all companies
companyRouter.get('/', (req, res, next) => {
  Company.find()
    .then(companiesFromDb => res.status(200).json(companiesFromDb))
    .catch(err => res.status(412).json(err));
});

// Get one company
companyRouter.get('/:id', (req, res, next) => {
  let compId = req.params.id;
  Company.findById(compId)
    .then(companyFromDb => res.status(200).json(companyFromDb))
    .catch(err => res.status(413).json(err));
});

// Edit one company
companyRouter.put('/edit/:id', (req, res, next) => {
  let compId = req.params.id;
  let updatedComp = req.body;
  Company.findByIdAndUpdate(compId,updatedComp)
    .then(responseFromDb => res.status(200).json({message:"editado correctamente",responseFromDb}))
    .catch(err => res.status(414).json(err));
});

// Toggle company status
companyRouter.put('/changeStatus/:id', (req, res, next) => {
  let compId = req.params.id;
  Company.findById(compId)
    .then(companyFromDb =>{
      Company.findByIdAndUpdate(compId,{status:!companyFromDb.status})
        .then(companyFromDb => res.status(200).json({message:"se cambio el estado correctamente",companyFromDb}))
        .catch(err => res.status(415).json(err))
    })
    .catch(err => res.status(416).json(err));
});

module.exports = companyRouter;