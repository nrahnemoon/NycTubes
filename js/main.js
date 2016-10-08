var map;
var stationsCsv;
var stations;
var stationNameIndex = 0;
var stationLineIndex = 1;
var stationNumberIndex = 2;
var stationLatitudeIndex = 3;
var stationLongitudeIndex = 4;
var stationIDIndex = 5;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 40.7128, lng: -74.0059},
		zoom: 10
	});
	initCSV();
}

function initCSV() {
	var csvXMLHttpRequest = new XMLHttpRequest();
	csvXMLHttpRequest.open("GET", "https://raw.githubusercontent.com/nrahnemoon/NycTubes/master/stations.csv", true);
	csvXMLHttpRequest.onreadystatechange = function () {
	    if(csvXMLHttpRequest.readyState === 4) {
	        if(csvXMLHttpRequest.status === 200 || csvXMLHttpRequest.status == 0) {
	            stationsCsv = csvXMLHttpRequest.responseText;
	            stations = Papa.parse(stationsCsv);
	            plotStations();
	        }
	    }
	}
	csvXMLHttpRequest.send(null);
}

function plotStations() {
    for (var i = 1; i < stations.data.length; i++) {
        var station = stations.data[i];
    	console.log("Plotting " + station[stationNameIndex]);
        var stationLatLng = {
        	lat: parseFloat(station[stationLatitudeIndex]),
        	lng: parseFloat(station[stationLongitudeIndex])
        };
        var image = {
          url: 'https://github.com/nrahnemoon/NycTubes/blob/master/images/stationSymbol.png?raw=true',
          // This marker is 20 pixels wide by 32 pixels high.
          size: new google.maps.Size(26, 26),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(13, 13)
        };
        var marker = new google.maps.Marker({
            position: stationLatLng,
            map: map,
            icon: image,
            title: station[stationNameIndex]
        });
    }
}
