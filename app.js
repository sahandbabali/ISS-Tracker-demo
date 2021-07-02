var locations = [
  {
    name: "ISS",
    radius: 25,
    fillKey: "ISS",
    date: "1953-08-12",
    latitude: 50.07,
    longitude: 78.43,
  },
];

function getissloc() {
  //   console.log("getissloc started");

  fetch("http://api.open-notify.org/iss-now.json")
    .then((response) => response.json())
    .then((data1) => {
      console.log(data1);
      locations[0].latitude = data1.iss_position.latitude;
      locations[0].longitude = data1.iss_position.longitude;
      locations[0].date = data1.timestamp;

      map.bubbles(locations, {
        popupTemplate: function (geo, data) {
          return [
            '<div class="hoverinfo">' + data.name,
            "<br/>Date: " + data.date + "",
            "<br/>latitude: " + data.latitude + "",
            "<br/>longitude: " + data.longitude + "",

            "</div>",
          ].join("");
        },
      });
    });
}

var map = new Datamap({
  element: document.getElementById("mapbox"),
  responsive: true,
  fills: {
    defaultFill: "#2a9d8f", //the keys in this object map to the "fillKey" of [data] or [bubbles]

    ISS: "#000000",
  },
});

window.setInterval(function () {
  map.bubbles([]);
  getissloc();
}, 5000);

window.addEventListener("resize", function () {
  map.resize();
});
