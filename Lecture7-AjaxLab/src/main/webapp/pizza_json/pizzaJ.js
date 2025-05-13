function getCustomerInfo() {
	const phone = $("#phone").val();

	if (phone === "") {
		$("#address").val("");
		$("#order").val("");
	} else {
		$.ajax({
			type: "GET",
			url: "/AjaxLab/pizza_json/lookupCustomerJ.jsp?phone=" + phone, // ✅ 고객 조회용
			dataType: "json",
			success: updatePage,
			error: function(jqXHR) {
				alert("Customer not found (status: " + jqXHR.status + ")");
			}
		});
	}
}

function updatePage(json) {
	const fullAddress = `${json.address.street}, ${json.address.city}, ${json.address.state} ${json.address.zipCode}`;
	$("#greeting").text(`Hi, ${json.name}! Your last order was: ${json.recentOrder}`);
	$("#address").val(fullAddress);
	$("#order").val(json.recentOrder);
	$("#order-area").show();
	$("#order").focus();
}

function submitOrder() {
	const data = {
		phone: $("#phone").val(),
		address: $("#address").val(),
		order: $("#order").val()
	};

	$.ajax({
		type: "POST",
		url: "/AjaxLab/pizza_json/placeOrderJ.jsp", // ✅ 주문 제출용
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: data,
		dataType: "text",
		success: showConfirmation,
		error: function(jqXHR) {
			const message = jqXHR.getResponseHeader("Status");
			if (!message || message.length <= 0) {
				alert("Error! Request status is " + jqXHR.status);
			} else {
				alert(message);
			}
		}
	});
}

function showConfirmation(response) {
	const p = document.createElement("p");
	p.innerHTML = `Your order should arrive within ${response} minutes. Enjoy your pizza!`;
	$("#order-form").replaceWith(p);
}

$(document).ready(function() {
	$("#order-form").on("submit", function(e) {
		e.preventDefault();
		submitOrder();
	});
});