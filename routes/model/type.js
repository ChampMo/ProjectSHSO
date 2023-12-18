const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const express = require('express');
const router = express.Router();



const TypeSchema = new Schema({
    type_id:String,
    type_name: String,
    sub_type: String,
});

const CatelogSchema = new Schema({
    id_product:String,
    type_id: String,
});





const Type = mongoose.model('type', TypeSchema);
const Catelog = mongoose.model('Catelog', CatelogSchema);

module.exports = { Type, Catelog };





















