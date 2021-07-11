$(document).ready(function () {
  function createProductCard(data) {
    var checkoutCard = $("<div>").addClass("checkout-card");
    var firstDiv = $("<div>");
    var checkoutImg = $("<img>").addClass("checkout-img").attr("src", data.preview);
    firstDiv.append(checkoutImg);
    var secondDiv = $("<div>");
    var title = $("<h4>").html(data.name);
    var count = $("<p>").html("x" + data.count);
    var productAmount = $("<p>");
    var amountLabel = $("<span>").html("Amount: Rs");
    var amount = $("<span>").html(Number(data.count) * Number(data.price));
    productAmount.append(amountLabel, amount);
    secondDiv.append(title, count, productAmount);
    checkoutCard.append(firstDiv, secondDiv);
    $("#card-list-left").append(checkoutCard);
  }
  var productList = window.localStorage.getItem("product-list");
  productList = productList === null || productList === "" ? [] : productList;
  productList = productList.length > 0 ? JSON.parse(productList) : [];

  var grandTotal = 0;
  for (var i = 0; i < productList.length; i++) {
    createProductCard(productList[i]);
    var totalForCurrentProduct =
      parseFloat(productList[i].count) * parseFloat(productList[i].price);
    grandTotal = grandTotal + totalForCurrentProduct;
  }
  console.log(productList);
  $("#item-count").html(productList.length);
  $("#amount-count").html(grandTotal);

  $("#btn-place-order").click(function () {
    var orderItemArr = [];
    for (var i = 0; i < productList.length; i++) {
      var prodObj = {
        id: productList[i].id,
        brand: productList[i].brand,
        name: productList[i].name,
        price: productList[i].price,
        preview: productList[i].preview,
        isAccessory: productList[i].isAccessory,
      };

      orderItemArr.push(prodObj);
    }
    var dataObj = {
      amount: grandTotal,
      products: orderItemArr,
    };
    $.post("https://5d76bf96515d1a0014085cf9.mockapi.io/order", dataObj, function () {
      alert("Order Placed Successfully");
      localStorage.setItem("product-list", []);
      location.assign("/create order/co.html");
    });
  });
});
