const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema(
  {
   // nombre: {type: String, maxlength: 20, required: true, unique: true},
    nombre: String,
    identificacion:{
       tipo: String,
       numero: Number,
    },
    nombreComercial: String,
    ubicacion:{
       provincia: String,
       canton: String,
       distrito: String,
       barrio: String,
       OtrasSenas: String,
    },
    telefono:{
       codigoPais: Number,
       numTelefono: Number,
    },
    telefono:{
      codigoPais: Number,
      numTelefono: Number,
   },
   correoElectronicco: String,
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;

// nombre: {type: String, maxlength: 20, required: true, unique: true},
