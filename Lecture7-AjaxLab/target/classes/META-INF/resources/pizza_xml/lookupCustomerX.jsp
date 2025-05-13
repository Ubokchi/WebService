<%@ page language="java" contentType="text/xml; charset=UTF-8" pageEncoding="UTF-8" buffer="none" %><%@ page import="java.util.*, example.ajax.pizza.*" %><%
    response.setContentType("text/xml; charset=UTF-8");

    Map<String, Customer> customerMap = new HashMap<>();
    customerMap.put("123-4567", new Customer("Mary Jenkins",
        new Address("123 Main St", "Springfield", "IL", "62701"), "123-4567"));
    customerMap.put("555-1234", new Customer("John Doe",
        new Address("456 Elm St", "Fairfield", "CA", "94533"), "555-1234"));

    String phone = request.getParameter("phone");
    Customer c = customerMap.get(phone);

    if (c != null) {
        out.println("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
        out.println("<result>");
        out.println("  <name>" + c.getName() + "</name>");
        out.println("  <address>");
        out.println("    <street>" + c.getAddress().getStreet() + "</street>");
        out.println("    <city>" + c.getAddress().getCity() + "</city>");
        out.println("    <state>" + c.getAddress().getState() + "</state>");
        out.println("    <zip>" + c.getAddress().getZipCode() + "</zip>");
        out.println("  </address>");
        out.println("</result>");
    } else {
        response.setStatus(404);
    }
%>