// ********STATE

let state = {
    requestedCustomerReserveInfo: []
};

// ********STATE RENDER

populateRequestedCustomerReserveInfo(); //long af;

//initial GET
function populateRequestedCustomerReserveInfo() {
    $('#formError').hide(); //so it starts hidden..
    $.ajax({
        type: "GET",
        url: "/customers",
        dataType: "json",
        success: function (data) {
            state.requestedCustomerReserveInfo = data.customers;
            renderCustomer();
        }
    })
}

$("form").trigger("reset");

// ********EVENT HANDLERS
//will also be your POST!!

//.submit on the jquery selector didn't work, b/c the main id needs to be on the form looks like..

$('#mainSubmitBtn').submit(function addCustomer(event) {
    event.preventDefault();
    $('#formError').hide();
    let customer = {
        customerName: $('#customerName').val(),
        customerPhone: $('#customerPhone').val(),
        customerAddress: $('#customerAddress').val(),
        itemName: $('#itemName').val(),
        textArea: $('#textArea').val()
    };
    if(!customer.itemName && !customer.textArea){
        $('#formError').show()
    }
    else(
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
        })
    )
});

// function renderCustomer() {
//     console.log('got to renderCustomer Render ME! ');
//     //got to render
// }
//
function deleteCustomerClick(event) {
    event.originalEvent.cancelBubble = true;
    event.originalEvent.stopPropagation();
    $.ajax({
        id: event.data.id,
        url: '/deletecustomer/' + event.currentTarget.id,
        type: 'DELETE',
        success: function () {
            for (i = 0; i < state.requestedCustomerReserveInfo.length; i++) {
                if (event.data.id === state.requestedCustomerReserveInfo[i].id) {
                    return state.requestedCustomerReserveInfo.splice(i, 1)
                    break;
                }
            }
            renderCustomer();
        }
    });
}

function renderCustomer() {
    var dom = $('#outputCustomer');
    dom.empty();
    for (i = 0; i < state.requestedCustomerReserveInfo.length; i++) {
        dom.append('<div class="output-entry-box col-4 white "><div class="row"><button id="' + state.requestedCustomerReserveInfo[i].id + '" class="delBtn" type="submit"><img src="delete.png"></button></div><h4>'
            + state.requestedCustomerReserveInfo[i].customerName + '</h4>'  +
            '<div class="customer">' + state.requestedCustomerReserveInfo[i].customerPhone + '<br>'+
            state.requestedCustomerReserveInfo[i].customerAddress + '</div><h3>' + state.requestedCustomerReserveInfo[i].itemName + '</h3>' +
            state.requestedCustomerReserveInfo[i].textArea + '</div>');
        $('#' + state.requestedCustomerReserveInfo[i].id).click({ event: this, id: state.requestedCustomerReserveInfo[i].id }, deleteCustomerClick)
    }
}

//Todo: LANDING PAGE with link! and desc
// Todo: clear button!!?***
//Todo: consolidate class colors in css!!!***
//Todo: set up default form, so no empty boxes can be put in. ***
// Todo: set up input boxes in html to be able to hook the jquery to get the values***
// Todo: set a variable to customerReserveInfo***
// Todo: ajax call on load ***
//Todo: ajax call to DEL and GET ***
//Todo: set DEL button w/ image (similar to cap1 back and forward arrows)**
//Todo: set up mongoDB + mlab and set up config file with the right credentials***
//Todo: Random fixes: 7/18:
// fix the footer to stay fixed on the bottom
