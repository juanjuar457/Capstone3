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
        $.ajax({
        type: "POST",
        url: '/savecustomer',
        data: JSON.stringify(customer),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            customer.id = data.id;
            state.requestedCustomerReserveInfo.push(customer);
            renderCustomer();
        }
    });
});

// function renderCustomer() {
//     console.log('got to renderCustomer Render ME! ');
//     //got to render
// }

function renderCustomer() {
    console.log('got to real render customer');
    var dom = $('#outputCustomer');
    dom.empty();
    console.log(state.requestedCustomerReserveInfo);
    for (i = 0; i < state.requestedCustomerReserveInfo.length; i++) {
        dom.append('<div class="output-entry-box col-4 white ">' + state.requestedCustomerReserveInfo[i].customerName + '<div class="customer">' + state.requestedCustomerReserveInfo[i].customerPhone + '<br>'+
            state.requestedCustomerReserveInfo[i].customerAddress + '</div>' + state.requestedCustomerReserveInfo[i].itemName + '<br>' + state.requestedCustomerReserveInfo[i].textArea +
            '</div>');
    }
}



// Todo: clear button!!?
//Todo: consolidate class colors in css!!!
//Todo: set up default form, so no empty boxes can be put in.
// Todo: set up input boxes in html to be able to hook the jquery to get the values***
// Todo: set a variable to customerReserveInfo***
// Todo: ajax call on load
//Todo: ajax call to DEL and GET
//Todo: set DEL button w/ image (similar to cap1 back and forward arrows)
//Todo: set up mongoDB + mlab and set up config file with the right credentials***
