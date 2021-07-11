$(document).ready(function () {
  var productId = window.location.search.split("=")[1];
  currentData = [];
  function createProduct(data) {
    var imageWrapper = $("<div>").addClass("image-wrapper");
    var imagePreview = $("<img>").attr("id", "image-preview").attr("src", data.preview);
    imageWrapper.append(imagePreview);
    $("#product-image").append(imageWrapper);

    var productTitle = $("<h1>").addClass("product-title").html(data.name);
    var productBrand = $("<h1>").addClass("product-brand").html(data.brand);
    var priceHeading = $("<h4>").addClass("section-heading").html("Price: Rs ");
    var productPrice = $("<span>").addClass("product-price").html(data.price);
    priceHeading.append(productPrice);
    var descriptionHeading = $("<h4>").addClass("section-heading").html("Description");
    var description = $("<p>").addClass("description").html(data.description);
    var productPreview = $("<h4>").addClass("section-heading").html("Product Preview");
    var productImages = $("<div>").addClass("product-images");
    for (let i = 0; i < data.photos.length; i++) {
      var images = $("<img>")
        .attr("src", data.photos[i])
        .attr("id", "img" + Number(i + 1));
      if (i == 0) {
        images.addClass("active-image");
      }
      productImages.append(images);
      images.click(function () {
        $(".product-images img").removeClass("active-image");
        $("#" + "img" + Number(i + 1)).addClass("active-image");
        $("#image-preview").attr("src", data.photos[i]);
      });
    }
    var btnCart = $("<button>").addClass("btn-cart").html("Add to Cart");
    $("#product-details").append(
      productTitle,
      productBrand,
      priceHeading,
      descriptionHeading,
      description,
      productPreview,
      productImages,
      btnCart
    );
  }
  $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + productId, function (response) {
    currentData = response;
    createProduct(response);
    $(".btn-cart").click(function () {
      $(".btn-cart").addClass("bigger");
      setTimeout(function () {
        $(".btn-cart").removeClass("bigger");
      }, 200);

      var productList = window.localStorage.getItem("product-list");
      productList = productList == null || productList == "" ? [] : productList;
      productList = productList.length > 0 ? JSON.parse(productList) : [];
      console.log(productList);

      var foundAtPositon = -1;
      for (i = 0; i < productList.length; i++) {
        if (Number(productList[i].id) == Number(currentData.id)) {
          foundAtPositon = i;
        }
      }
      console.log(currentData);
      if (foundAtPositon > -1) {
        productList[foundAtPositon].count = productList[foundAtPositon].count + 1;
        window.localStorage.setItem("product-list", JSON.stringify(productList));
        console.log(productList[foundAtPositon].count);
      } else {
        currentData.count = 1;
        productList.push(currentData);
        console.log(productList);
        window.localStorage.setItem("product-list", JSON.stringify(productList));
      }
      var totalCount = 0;
      for (var i = 0; i < productList.length; i++) {
        totalCount = totalCount + productList[i].count;
      }
      $("#cart-count").html(totalCount);
    });
  });
});
