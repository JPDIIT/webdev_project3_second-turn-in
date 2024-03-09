// Create the script tag, set the appropriate attributes
/*  var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap';
script.async = true;*/

$(document).ready(function(){

  $('.bxslider').bxSlider({
    mode: 'fade',
    auto: true
    
  });

  /* Show the hamburger menu */
  function showmenu(){
    const nav = document.getElementById("main-nav");
    const isVisible = nav.checkVisibility();
    console.log(isVisible);
    /* Toggle clicks */
    if (isVisible) {
      nav.style.display = "none";
      nav.style.visibility = "collapse"
    }
    else {
      nav.style.display = "block";
      nav.style.visibility = "visible";
    }
    
  }

  /* Click on the hamburger to reveal the menu*/
  function init(){
    const menu = document.getElementById("menu");
    menu.addEventListener("click", (event) => showmenu());
    window.addEventListener('resize', function(event) {
      const nav = document.getElementById("main-nav")
      const showing_burger = menu.checkVisibility();
      if(showing_burger){
        nav.style.display = "none";
        nav.style.visibility = "collapse"
      }
      else {
        nav.style.display = "block";
        nav.style.visibility = "visible";
      }
    }, true);
  }
  

});

 /* Generate the latitude and longitude coordinates of the eclipse's path. */
function genCoords(){
   const coordinates = [];
 
  for ( var x = -156; x < -23; x+=1){
      var y = 29*Math.cos(0.023*x+1.1)+20;
      coordinates.push({lat: y, lng: x});
    }
    return coordinates;
}

/* Plot the path in red. */
function initMap() {
  var coordinates = genCoords();
  var maxTotality = new google.maps.LatLng(26.77,-102.70);
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: { lat: 25, lng: -90 },
    mapTypeId: "hybrid",
  });

  const eclipsePath = new google.maps.Polyline({
    path: coordinates,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 0.5,
    strokeWeight: 20,
  });
  
  var marker = new google.maps.Marker({
    position: maxTotality,
    map: map,
    animation: google.maps.Animation.BOUNCE,
    icon: 'images/eclipse_icon.png'
  });

  var contentString = '<h3>Maximum Totality</h3><p>The total eclipse will last for a maximum of 4 minutes and 30 seconds near 26.77 N Latitude, 102.70 W Longitude</p>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  google.maps.event.addListener(marker, 'mouseover', function() {
    infowindow.open(map, marker);
  });

  eclipsePath.setMap(map);
}

window.onload = init;

window.initMap = initMap;