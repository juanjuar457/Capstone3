'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = Schema({
    customerName: String,
    customerPhone: String,
    customerAddress: String,
    itemName: String,
    textArea: String,
});

CustomerSchema.methods.apiRepr = function() {
    return {
        id: this._id,
        customerName: this.customerName,
        customerPhone: this.customerPhone,
        customerAddress: this.customerAddress,
        itemName: this.itemName,
        textArea: this.textArea,
    };
};

const Customer = mongoose.model("customers", CustomerSchema);

//
module.exports = {Customer};
// module.exports.models = {Customer};  //Es6 short hand prop short hand.