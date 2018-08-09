const express = require('express');
const invoiceRouter = express.Router();
const Invoice = require('../models/invoice');

//Get invoices
invoiceRouter.get('/', (req, res, next) => {
  console.log("reached route get of invoices") //borrar
  Invoice.find({ownerComp:req.user.activeComp})
    .then(invoicesFromDb => res.status(200).json(invoicesFromDb))
    .catch(err => res.status(412).json(err))
})

//Create invoices 
invoiceRouter.post('/create', (req, res, next) => {

  console.log("======== req.body: ",req.body);

  const invoice = req.body;
  const theCompany = req.user.activeComp;
  invoice.ownerComp = theCompany;

  console.log("============= invoice: ", invoice);

  const newInvoice = new Invoice(invoice);

  newInvoice.save()
    .then((responseFromDb) => res.status(200).json(responseFromDb))
    .catch(err => res.status(411).json(err));

});

module.exports = invoiceRouter;