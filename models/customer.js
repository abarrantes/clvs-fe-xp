const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  // nombre: {type: String, maxlength: 20, required: true, unique: true},

  ownerComp: {
    type: Schema.Types.ObjectId,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  nombre: String,
  identificacion: {
    tipo: {
      type: String,
      required: true
    },
    numero: Number,
  },
  nombreComercial: String,
  ubicacion: {
    provincia: String,
    canton: String,
    distrito: String,
    barrio: String,
    OtrasSenas: String,
  },
  telefono: {
    codigoPais: Number,
    numTelefono: Number,
  },
  telefono: {
    codigoPais: Number,
    numTelefono: Number,
  },
  correoElectronicco: String,
}, {
  timestamps: true,
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;

// nombre: {type: String, maxlength: 20, required: true, unique: true},
