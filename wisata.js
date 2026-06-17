const mongoose = require("mongoose");

const wisataSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true
  },
  lokasi: {
    type: String,
    required: true
  },
  kategori: {
    type: String,
    required: true
  },
  deskripsi: {
    type: String,
    required: true
  },
  gambar: {
    type: String,
    required: true
  },

  gallery: {
    type: [string],
    default:[]
  },
  
  harga: {
    type: String,
    default: ""
  },
  mapsLink: {
    type: String,
    default: ""
  },
  like: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Wisata", wisataSchema);