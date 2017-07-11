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
$('#mainSubmitBtn').click(function(event){
        event.preventDefault(); //also stops <a> tag submit defaults
        console.log('poop');
});

//example from cap2

$('#main_submit').submit(function (event) { //id is in main_page.html
    event.preventDefault();
    var material = {
        vendor: $('#vendor').val(),
        quantity: $('#quantity').val(),
        productName: $('#productName').val(),
        catalogNumber: $('#catalogNumber').val(),
        units: $('#units').val(),
        unitSize: $('#unitSize').val(),
        onBackOrder: false
    };
    $.ajax({
        type: "POST",
        url: '/savematerial',
        data: JSON.stringify(material),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            material.id = data.id;
            state.requestedMaterials.push(material);
            renderMaterial();
        }
    });
});

//Todo: set up default form, so no empty boxes can be put in.
//Todo: set up input boxes in html to be able to hook the jquery to get the values
// Todo: set a variable to customerReserveInfo
// Todo: ajax call on load
//Todo: ajax call to DEL
//Todo: set DEL button w/ image (similar to cap1 back and forward arrows)
//Todo: set up mongoDB + seed fake data, and set up config file with the right credentials
