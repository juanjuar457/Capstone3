const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

// this makes the should syntax available throughout
const should = chai.should();

const {Customer} = require('../models');
const {app, runServer, closeServer} = require('../server');
const {DATABASE_URL} = require('../config');
chai.use(chaiHttp);

function seedCustomerData() {
    console.info('seeding Customer data');
    const seedData = [];
    return Customer.insertMany(seedData);
}

function generateCustomerName() {
    console.log('got to customer name');
    const customerName = ["Bob", "Dave", "Bill"];
    return customerName[Math.floor(Math.random() * customerName.length)];
}

function generateCustomerPhone() {
    console.log('got to customer phone');
    const customerPhone = [
        '777-777', '888-8888', '111-1111', '123-1234'];
    return customerPhone[Math.floor(Math.random() * customerPhone.length)];
}

function generateCustomerAddress() {
    const customerAddress = ["123 Main St", "1234 Main st Rd", "123745 main st way"];
    return customerAddress[Math.floor(Math.random() * customerAddress.length)];
}

function generateItemName() {
    const itemName = ["Multi Vitamin", "Pain Cream", "Vegas Anti Allergy Cocktail"];
    return itemName[Math.floor(Math.random() * itemName.length)];
}

function generateTextArea() {
    const unitSize = ["placholder text 1 goes here, notes for the customers will go here 1", "placholder text 1 goes here, notes for the customers will go here 2",
        "placholder text 1 goes here, notes for the customers will go here 3"];
    return unitSize[Math.floor(Math.random() * unitSize.length)];
}

//note how the functions call other functions to about the module to execute the tests...
//to execute on the tests...

function generateCustomerData() {
    return {
        customerName: generateCustomerName(), //not sure whats up with the faker npm!
        customerPhone: generateCustomerPhone(), //make function for this
        customerAddress: generateCustomerAddress(),
        itemName: generateItemName(),
        textArea: generateTextArea(),
    }
}

function tearDownDb() {
    console.warn('Deleting database');
    // return mongoose.connection.dropDatabase();
}

describe('Customer API resource', function () {
    before(function () {
        return runServer(DATABASE_URL);
    });

    beforeEach(function () {
        return seedCustomerData();
    });

    afterEach(function () {
        return tearDownDb();
    });

    after(function () {
        return closeServer();
    });

    describe('DELETE endpoint', function () {
        it('delete a customer by id', function () {
            let customer;
            return Customer
                .findOne()
                .exec()
                .then(function (_customer) {
                    customer = _customer;
                    return chai.request(app).delete(`/deletecustomer/${customer._id}`);
                })
                .then(function (res) {
                    res.should.have.status(204);
                    return Customer.findById(customer.id).exec();
                })
                .then(function (_customer) {

                    should.not.exist(_customer);
                })
        })
    });

    describe('GET endpoint', function () {
        it('should return all existing customer', function () {
            let res;
            return chai.request(app)
                .get('/customers')
                .then(function (_res) {
                    res = _res;
                    res.should.have.status(200);
                    res.body.customer.should.have.length.of.at.least(1);
                    return Customer.count();
                })
                .then(function (count) {
                    res.body.customers.should.have.length.of(count);
                });
        });
        it('should return Customers with right fields', function () {
            let resCustomer;
            return chai.request(app)
                .get('/customers')
                .then(function (res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.customers.should.be.a('array');
                    res.body.customers.should.have.length.of.at.least(1);
                    res.body.customers.forEach(function (customer) {
                        customer.should.be.a('object');
                        customer.should.include.keys(
                            'customerName', 'customerPhone', 'customerAddress', 'itemName', 'textArea');
                    });
                    resCustomer = res.body.customers[0];
                    return Customer.findById(resCustomer.id);
                })
                .then(function (customer) {
                    resCustomer.id.should.equal(customer.id);
                    resCustomer.customerName.should.equal(customer.customerName);
                    resCustomer.customerPhone.should.equal(customer.customerPhone);
                    resCustomer.customerAddress.should.equal(customer.customerAddress);
                    resCustomer.itemName.should.equal(customer.itemName);
                    resCustomer.textArea.should.equal(customer.textArea);
                });
        });
    });
});


