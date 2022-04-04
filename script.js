/*
    Ödev:
        OpenStreetMap üzerinden harita altlığını çek, 
        daha sonra site üzerinden belirli yerlerin konumu göster.
        Leaflet OSM üzerinden veriler çekilecek ve  icon eklenecek.
*/

/*
    Koordinat sistemi:
        WGS 84 Coğrafi koordinatlar olacak.
        (Longitude) Lon: 35.252
        (Latitude) Lat: 39.031 
        Zoom: 7
        EPGS: "EPSG:4326"
*/

/*
    Türkiye veya Dünya gösterilecek konumlar:
        Belli bir konu seçip Dünya veya Türkiye 
        harita altlığı üzerinden yerlerin konummunu göster.
*/


var map = L.map('map').setView([39.031, 35.252], 6);

L.tileLayer('https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}.jpg?key=oop72p6o0U8XFLHsWmCt', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
}).addTo(map);
var marker = L.marker([39.92077, 32.85411]).addTo(map);



//document.write("OpenStretMap");
//alert("Helloo Mada Faka!!!");

/*
map = new OpenLayers.Map("mapdiv");
map.addLayer(new OpenLayers.Layer.OSM());

// transform from WGS 1984 
// to Spherical Mercator Projection
var lonLat = new OpenLayers.LonLat( 35.252, 39.031 )
.transform(
    new OpenLayers.Projection("EPSG:4326"), 
    map.getProjectionObject()
);
    
var zoom = 7;

var markers = new OpenLayers.Layer.Markers( "Markers" );
map.addLayer(markers);

//var test = new OpenLayers.lonLat(37.252, 39.031)

markers.addMarker(new OpenLayers.Marker(lonLat));

map.setCenter (lonLat, zoom);
*/