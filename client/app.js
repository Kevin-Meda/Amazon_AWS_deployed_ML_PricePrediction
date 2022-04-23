function onPageLoad() {
  console.log( "document loaded" );
  //var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
  var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  $.get(url,function(data, status) {
      console.log("got response for get_location_names request");
      if(data) {
          var locations = data.locations;
          var uiLocations = document.getElementById("uiLocations");
          $('#uiLocations').empty();
          for(var i in locations) {
              var opt = new Option(locations[i]);
              $('#uiLocations').append(opt);
          }
      }
  });
}

window.onload = onPageLoad;

function getRoomsValue() {
  var uiRooms = document.getElementsByName("uiRooms");
  for(var i in uiRooms) {
    if(uiRooms[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function getParkingsValue() {
  var uiParkings = document.getElementsByName("uiParkings");
  for(var i in uiParkings) {
    if(uiParkings[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function getPetsValue() {
  var uiPets = document.getElementsByName("uiPets");
  for(var i in uiPets) {
    if(uiPets[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function getBalconsValue() {
  var uiBalcons = document.getElementsByName("uiBalcons");
  for(var i in uiBalcons) {
    if(uiBalcons[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function getGardensValue() {
  var uiGardens = document.getElementsByName("uiGardens");
  for(var i in uiGardens) {
    if(uiGardens[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function getNewsValue() {
  var uiNews = document.getElementsByName("uiNews");
  for(var i in uiNews) {
    if(uiNews[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}


function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");

  var rooms = getRoomsValue();
  var parkings = getParkingsValue();
  var pets = getPetsValue();
  var balcons = getBalconsValue();
  var gardens = getGardensValue();
  var news = getNewsValue();
  var location = document.getElementById("uiLocations");
  var sqft = document.getElementById("uiSqft");
  var estPrice = document.getElementById("uiEstimatedPrice");

  
  //var url = "http://127.0.0.1:5000/predict_home_price";  //Use this if you are NOT using nginx which is first 7 tutorials
  var url = "/api/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  
  $.post(url, {
  location: location.value,
  noRooms: rooms,
  noParkSpaces: parkings,
  petsAllowed: pets,
  balcony: balcons,
  garden: gardens,
  newlyConst: news,
  livingSpace: parseFloat(sqft.value)


  },function(data, status) {
    console.log(data.estimated_price);
    estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Euros</h2>";
    console.log(status);
  });

}







  /*
  function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft");
    var rooms = getRoomsValue("uiRoom");
    var parkings = getParkingsValue("uiParkings");
    var pets = getPetsValue("uiPets");
    var balcons = getBalconsValue("uiBalcons");
    var gardens = getGardensValue("uiGardens");
    var news = getNewsValue("uiNews");
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");
  
    var url = "http://127.0.0.1:5000/predict_home_price"; //Use this if you are NOT using nginx which is first 7 tutorials
    //var url = "/api/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
    

    
  //}

  */
   
  
  