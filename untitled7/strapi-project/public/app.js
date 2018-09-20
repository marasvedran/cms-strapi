let products = [];

$.getJSON( "http://localhost:1337/product", function( data ) {
  products = data;
  console.log(products);

  let items = [];
  $.each( data, function( key, product ) {
    items.push( "<li id='" + key + "'>" + product.Name + " " +
      "<img src="+"http://localhost:1337" + product.Pictures.url+">" + product.Price + " " + product.Category + " " + product.InStock +
      "<button onclick='myFunction()'>Add to cart</button>" + "<button id='rev'>Read Review</button>" +  "</li>" );
  });

  $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "body" );

  $(document).ready(function(){
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $(".my-new-list li").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });

});

let i = 0;

function add() {
  return i += 1;
}

function myFunction() {
  document.getElementById('quanty').innerHTML  = add();
}


let reviews = [];

$.getJSON( "http://localhost:1337/review", function( data ) {
  reviews = data;
  console.log(reviews);

  let recension = [];
  $.each( data, function( key, review ) {
    $("body").delegate("#rev", "click", function () {
      $(this).after( "<li id='" + key + "'>" + review.Review + " " + " " + review.Rating +"</li>"
      );
    })
  })
});

$(document).ready(function(){
  $("#cat").click(function(){
    $.get( "http://localhost:1337/product?_sort=Category", function(data, status){
      alert("Data: " + data + "\nStatus: " + status);
    });
  });
});

