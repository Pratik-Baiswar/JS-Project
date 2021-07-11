$(document).ready(function () {
  $("#bars").click(function () {
    $(".sidebar").toggleClass("sidebar-active");
    $("#bars").toggleClass("toggle");
  });
  $("#cross").click(function () {
    $("#sidebar").css("transform", "translateX(-100%)");
  });
  var productList = window.localStorage.getItem("product-list");
  productList = productList == null || productList == "" ? [] : productList;
  productList = productList.length > 0 ? JSON.parse(productList) : [];

  var totalCount = 0;
  for (var i = 0; i < productList.length; i++) {
    totalCount = totalCount + productList[i].count;
  }
  $("#cart-count").html(totalCount);
});
