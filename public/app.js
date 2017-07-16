// ********STATE

var state = {
    requestedCustomerReserveInfo: []
};

// ********STATE RENDER

populateRequestedCustomerReserveInfo(); //long af;

//initial GET
function populateRequestedCustomerReserveInfo() {
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
//
function deleteCustomerClick(event) {
    event.originalEvent.cancelBubble = true;
    event.originalEvent.stopPropagation();
    // evet.stopPropagation();
    console.log('got through event prop stuff');
    $.ajax({
        id: event.data.id,
        url: '/deletecustomer/' + event.data.id,
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
        dom.append('<div class="output-entry-box col-4 white ">' + state.requestedCustomerReserveInfo[i].customerName +
            '<div class="customer">' + state.requestedCustomerReserveInfo[i].customerPhone + '<br>'+
            state.requestedCustomerReserveInfo[i].customerAddress + '</div>' + state.requestedCustomerReserveInfo[i].itemName + '<br>' +
            state.requestedCustomerReserveInfo[i].textArea + '<div>' +
            '<button type="submit"><img id="del-button' + state.requestedCustomerReserveInfo[i].id + '"src="delete.png"></button>' + '<div>' +
            '</div>');
        $('#del-button' + state.requestedCustomerReserveInfo[i].id).click({ event: this, id: state.requestedCustomerReserveInfo[i].id }, deleteCustomerClick)
    }
}
// '<button> <img id="del-button" src="delete.png"> </button>'


// <button>
// <img id="del-button" src="delete.png">
//     </button>
//hook into the del-button id, vs making one, render the del with each cell, wipe the ones on the DB
//make the landing.
// //
// function renderMaterial() {
//     var dom = $('#requestedMaterials');
//     dom.empty(); //flushes out material
//     for (i = 0; i < state.requestedMaterials.length; i++) {
//         dom.append('<div id="R' + state.requestedMaterials[i].id + '" class="row exampleEntry ' + (state.requestedMaterials[i].onBackOrder ? "onBackOrder" : "") +
//             '"><div class="col-md-2">' + state.requestedMaterials[i].vendor + '</div>' +
//             '<div class="col-md-1">' + state.requestedMaterials[i].quantity + '</div>' +
//             '<div class="col-md-2">' + state.requestedMaterials[i].productName + '</div>' +
//             '<div class="col-md-2">' + state.requestedMaterials[i].catalogNumber + '</div>' +
//             '<div class="col-md-2">' + state.requestedMaterials[i].unitSize + '</div>' +
//             '<div class="col-md-2">' + getUnitKey(state.requestedMaterials[i].units) + '</div>' +
//             '<div class="col-md-1"><i id="D' + state.requestedMaterials[i].id + '" class="glyphicon glyphicon-remove pull-right"></i></div>' +
//             '</div>');
//         $('#D' + state.requestedMaterials[i].id).click({ event: this, id: state.requestedMaterials[i].id }, deleteMaterialClick);
//         $('#R' + state.requestedMaterials[i].id).click({ event: this, id: state.requestedMaterials[i].id }, setBackOrderClick);
//     }
// }


//Todo: LANDING PAGE with link! and desc
// Todo: clear button!!?
//Todo: consolidate class colors in css!!!
//Todo: set up default form, so no empty boxes can be put in.
// Todo: set up input boxes in html to be able to hook the jquery to get the values***
// Todo: set a variable to customerReserveInfo***
// Todo: ajax call on load
//Todo: ajax call to DEL and GET
//Todo: set DEL button w/ image (similar to cap1 back and forward arrows)
//Todo: set up mongoDB + mlab and set up config file with the right credentials***
