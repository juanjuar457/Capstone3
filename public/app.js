// ********STATE

var state = {
    requestedCustomerReserveInfo: []
};

// ********STATE RENDER

// function renderCustomerInfo() {
//     var dom = $('#')
// }



// ********EVENT HANDLERS
//will also be your POST!!

//.submit on the jquery selector didn't work, b/c the main id needs to be on the form looks like..

$('#mainSubmitBtn').click(function addCustomer(event) {
    event.preventDefault();
        let customer = {
            customerName: $('#customerName').val(),
            customerPhone: $('#customerPhone').val(),
            customerAddress: $('#customerAddress').val(),
            itemName: $('#itemName').val(),
            textArea: $('#textArea').val()
        };
        renderCustomer();
    //     $.ajax({
    //     type: "POST",
    //     url: '/savecustomer',
    //     data: JSON.stringify(customer),
    //     contentType: "application/json; charset=utf-8",
    //     dataType: "json",
    //     success: function (data) {
    //         customer.id = data.id;
    //         state.requestedCustomerReserveInfo.push(customer);
    //         renderCustomer();
    //     }
    // });
});

function renderCustomer() {
    console.log('poop');
    //got to render
}

//how does addCustomer work into the eqxn


//example from cap2


// function addMaterial() {
//     var material = {};
//     material.product = $('#product').val();
//     state.requestedMaterials.push(material);
//     material.quantity = $('#quantity').val();
//     material.vendor = $('#vendor').val();
//     material.catalogNumber = $('#catalogNumber').val();
//     material.units = $('#units').val();
// }
//



//Todo: consolidate class colors in css!!!
//Todo: set up default form, so no empty boxes can be put in.
// Todo: set up input boxes in html to be able to hook the jquery to get the values***
// Todo: set a variable to customerReserveInfo***
// Todo: ajax call on load
//Todo: ajax call to DEL and GET
//Todo: set DEL button w/ image (similar to cap1 back and forward arrows)
//Todo: set up mongoDB + mlab and set up config file with the right credentials***
