function getCustomerInfo() {
    var phone = $("#phone").val();

    if (phone === "") {
        $("#address").val("");
        $("#order").val("");
    } else {
        $.ajax({
            type: "GET",
            url: "/AjaxLab/pizza_xml/lookupCustomerX.jsp?phone=" + phone,
            dataType: "xml",
            success: function(xml) {
                console.log("XML loaded", xml); // 디버깅용
                updatePage(xml);
            },
            error: function(jqXHR) {
                alert("Customer not found (status: " + jqXHR.status + ")");
            }
        });
    }
}

function updatePage(xml) {
	const name = $(xml).find("name").text();
	const street = $(xml).find("street").text();
	const city = $(xml).find("city").text();
	const state = $(xml).find("state").text();
	const zip = $(xml).find("zip").text();
	const recentOrder = $(xml).find("recentOrder").text();

	const fullAddress = `${street}, ${city}, ${state} ${zip}`;

	$("#greeting").text(`Hi, ${name}! Your last order was: ${recentOrder}`);
	$("#address").val(fullAddress);
	$("#order").val(recentOrder);
	$("#order-area").show();
	$("#order").focus();
}

function submitOrder() {
    var data = {
        "phone": $("#phone").val(),
        "address": $("#address").val(),
        "order": $("#order").val()
    };

    $.ajax({
        type: "POST",
        url: "/AjaxLab/pizza_xml/placeOrderX.jsp",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        dataType: "text",
        success: showConfirmation,
        error: function(jqXHR) {
            var message = jqXHR.getResponseHeader("Status");
            if (!message || message.length <= 0) {
                alert("Error! Request status is " + jqXHR.status);
            } else {
                alert(message);
            }
        }
    });
}

function showConfirmation(response) {
    var p = document.createElement("p");
    p.innerHTML = `Your order should arrive within ${response} minutes. Enjoy your pizza!`;

    $("#order-form").replaceWith(p);
}

$(document).ready(function() {
  $("#order-form").on("submit", function(e) {
    e.preventDefault();
  });
});