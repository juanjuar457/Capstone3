const mongoose = require("mongoose");
const models = require('./models');
const Customer = models.Customer;

module.exports = {
    deleteCustomer: (req, res) => {
        Customer
            .findByIdAndRemove(req.params.id)
            .exec()
            .then(() => {
                res.status(200).json("");
            })
            .catch(err => {
                console.error(err);
                res.status(500).json("");
            });
    },
    getCustomer: (req, res) => {
        Customer
        // this is a convenience method Mongoose provides for searching
        // by the object _id property
            .findById(req.params.id)
            .exec()
            .then(customer => res.json(customer.apiRepr()))
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' })
            });
    },
    getCustomers: (req, res) => {
        Customer
            .find()
            .limit(100)
            .exec()
            .then(customer => {
                res.json({
                    customers: customers.map(
                        (customer) => customer.apiRepr())
                });
            })
            .catch(
                err => {
                    console.error(err);
                    res.status(500).json({ message: 'Internal Server error' });
                });
    },
    postCustomer: (req, res) => {
        const requiredFields = ['customerName', 'customerPhone', 'customerAddress', 'itemName', 'textArea'];
        for (let i = 0; i < requiredFields.length; i++) {
            const field = requiredFields[i];
            if (!(field in req.body)) {
                const message = `Missing \ ${field}\` in request body`;
                console.error(message);
                return res.status(400).send(message);
            }
        }
        Customer
            .create({
                customerName: req.body.customerName,
                customerPhone: req.body.customerPhone,
                customerAddress: req.body.customerAddress,
                itemName: req.body.itemName,
                textArea: req.body.textArea
            })
            .then(
                customer => res.status(201).json(customer.apiRepr()))
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            });
    }
};


