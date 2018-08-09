const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({

  status: { type: Boolean, default: true },
  nombre: String,
  identificacion: Number
}, {
    timestamps: true,
  });

const Company = mongoose.model("Company", companySchema);

module.exports = Company;

// const companySchema = new Schema({
// status: {
//   type: Boolean,
//   default: true
// },
// nombre: String,
// identificacion: {
//   tipo: {
//     type: String,
//     required: true
//   },
//   numero: Number,
// },
// nombreComercial: String,
// ubicacion: {
//   provincia: String,
//   canton: String,
//   distrito: String,
//   barrio: String,
//   OtrasSenas: String,
// },
// telefono: {
//   codigoPais: Number,
//   numTelefono: Number,
// },
// telefono: {
//   codigoPais: Number,
//   numTelefono: Number,
// },
// correoElectronicco: String,
// }, {
// timestamps: true,
// });