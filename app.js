var locations = [
  {
    name: "ISS",
    radius: 15,
    fillKey: "ISS",
    date: "",
    latitude: 0,
    longitude: 0,
  },
];

var pathnodes = [];

function getissloc() {
  map.bubbles([]);
  fetch("http://api.open-notify.org/iss-now.json")
    .then((response) => response.json())
    .then((data1) => {
      // console.log(data1);

      locations[0] = {
        name: "ISS",
        radius: 15,
        fillKey: "ISS",
        date: "",
        latitude: 0,
        longitude: 0,
      };

      locations[0].latitude = data1.iss_position.latitude;
      locations[0].longitude = data1.iss_position.longitude;
      locations[0].date = data1.timestamp;

      pathnodes.push(locations[0]);

      // pathnodes[pathnodes.length - 1].fillKey = "path";
      // pathnodes[pathnodes.length - 1].radius = 10;
      // pathnodes[pathnodes.length - 1].name = "path";

      map.bubbles(pathnodes, {
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

      // map.bubbles(locations, {
      //   popupTemplate: function (geo, data) {
      //     return [
      //       '<div class="hoverinfo">' + data.name,
      //       "<br/>Date: " + data.date + "",
      //       "<br/>latitude: " + data.latitude + "",
      //       "<br/>longitude: " + data.longitude + "",

      //       "</div>",
      //     ].join("");
      //   },
      // });
    });
}

var map = new Datamap({
  element: document.getElementById("mapbox"),
  responsive: true,
  fills: {
    defaultFill: "#2B454E", //the keys in this object map to the "fillKey" of [data] or [bubbles]

    ISS: "#000000",
    path: "#ffffff",
  },
  geographyConfig: {
    hideAntarctica: true,
    borderWidth: 1,
    borderOpacity: 1,

    popupOnHover: true, //disable the popup while hovering
    highlightOnHover: true,
    highlightFillColor: "#576b72",
  },
});

getissloc();
window.setInterval(function () {
  getissloc();
}, 10000);

window.addEventListener("resize", function () {
  map.resize();
});

// map.bubbles([]);
