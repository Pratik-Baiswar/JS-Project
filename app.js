$(document).ready(function () {
  $(".center").slick({
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 680,
        settings: {
          variableWidth: true,
          arrows: false,
          centerMode: true,
          dots: false,
          centerPadding: "40px",
          slidesToShow: 1,
          swipeToSlide: true,
        },
      },
    ],
  });
  function createHomepageCards(data) {
    var productCard = $("<div>").addClass("product-card");
    var imageContainer = $("<a>").attr("href", "./product details/pd.html?s=" + data.id);
    var image = $("<img>").addClass("product-image").attr("src", data.preview);
    imageContainer.append(image);
    var productDetails = $("<div>").addClass("product-details");
    var productName = $("<h4>").html(data.name);
    var brandName = $("<h5>").html(data.brand);
    var price = $("<p>").html("Rs " + data.price);
    productDetails.append(productName, brandName, price);
    productCard.append(imageContainer, productDetails);
    if (data.isAccessory == false) {
      $("#clothing-wrapper").append(productCard);
    } else {
      $("#accessories-wrapper").append(productCard);
    }
  }
  $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product", function (response) {
    for (i = 0; i <= response.length; i++) {
      createHomepageCards(response[i]);
    }
  });
});
