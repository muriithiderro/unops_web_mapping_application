var mymap;
var lyrOSM;
var lyrImagery;
var lyrTopo;
var lyrWaterColor;
var lyrOutdoors;
var lyrPoly;
var lyrSearch;

var lyrMarkerCluster;
var mrkCurrentLocation;
var popZocalo;
var ctlAttribute;
var ctlScale;
var ctlPan;
var ctlZoomslider;
var ctlMouseposition;
var ctlMeasure;
var ctlEasybutton;
var ctlSidebar;
var ctlSearch;
var ctlLayers;
var ctlStyle;

var objBasemaps;
var ObjOverlays;

var arCollidorIDs = [];

var arPopulationIDs = [];
var arCattleIDs = [];
var arGoatIDs = [];
var arSheepIDs = [];
var arPoultryIDs = [];



var arFacilityIDs = [];
var arEventIDs = [];
var arCollidorIDs = [];
var buffered;


var legend;

var blocking;
var critical;
var extended;
var food;
var market;
var muddy;
var bridge;
var refugee;
var settlement;
var trading;
var truck;

var assessedRoads;
var primary;
var secondary;
var university;
var healthFacilities;
var lyrMarkerCluster;
var districts;
var healthIcn;


$(document).ready(function(){
    mymap = L.map('mapdiv', {center:[3.2173, 31.42914], zoom:10, zoomControl:false, attributionControl:false});
    var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="http://mapbox.com">Mapbox</a>';

    var mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZGVyeSIsImEiOiJjaWY5anJyN3YwMDI5dGNseHoyZzM4Z3R4In0.dToOXYIZ30LH_7VtFbKW4A';

    var base_layer = L.tileLayer(mbUrl, {
    id: 'mapbox.light',
    attribution: mbAttr
    }).addTo(mymap);
    

    ctlStyle = L.control.styleEditor({position:'topright'}).addTo(mymap);
    ctlPan = L.control.pan().addTo(mymap);
    ctlZoomslider = L.control.zoomslider({position:'topright'}).addTo(mymap);
    ctlMeasure = L.control.polylineMeasure().addTo(mymap);
    ctlSidebar = L.control.sidebar('side-bar').addTo(mymap);
    ctlEasybutton = L.easyButton('glyphicon-transfer', ()=>ctlSidebar.toggle()).addTo(mymap);
    ctlSearch = L.Control.openCageSearch({ limit:10}).addTo(mymap);
    ctlAttribute = L.control.attribution({position:'bottomleft'}).addTo(mymap);
    ctlAttribute.addAttribution('OSM');
    ctlAttribute.addAttribution('&copy; <a href="http://reactgis"</a>');
    ctlScale = L.control.scale({position:'bottomleft', metric:false, maxWidth:200}).addTo(mymap);
    ctlMouseposition = L.control.mousePosition().addTo(mymap);

    
// *************layer initialization *************

    lyrOSM = L.tileLayer.provider('OpenStreetMap.Mapnik');
    lyrImagery = L.tileLayer.provider('Esri.WorldImagery');
    lyrTopo = L.tileLayer.provider('OpenTopoMap');
    lyrWaterColor = L.tileLayer.provider('Stamen.Watercolor');
    lyrOutdoors = L.tileLayer.provider('Thunderforest.Outdoors');
    mymap.addLayer(lyrOSM);


//    **********************overlay layer control ************

    objBasemaps = {
        "Open Street Maps" : lyrOSM,
        "Topo Map" : lyrTopo,
        "Imagery" : lyrImagery,
        "Outdoors" : lyrOutdoors,
        "Watercolor" : lyrWaterColor
    };
    // icons
    healthIcn = L.icon({iconUrl:'http://localhost:8000/static/img/health.svg', iconSize:[40,40], iconAnchor:[20,24]});
    // datasets
    var base_url = "http://localhost:8000/"
    blocking = L.geoJSON.ajax(base_url+'infrastructure/api/blocking/');
    critical = L.geoJSON.ajax(base_url+'infrastructure/api/critical/');
    extended = L.geoJSON.ajax(base_url+'infrastructure/api/extended/');
    food = L.geoJSON.ajax(base_url+'infrastructure/api/food/');
    market = L.geoJSON.ajax(base_url+'infrastructure/api/market/');
    muddy = L.geoJSON.ajax(base_url+'infrastructure/api/muddy/');
    bridge = L.geoJSON.ajax(base_url+'infrastructure/api/bridge/');
    refugee = L.geoJSON.ajax(base_url+'infrastructure/api/refugee/');
    settlement = L.geoJSON.ajax(base_url+'infrastructure/api/settlement');
    trading = L.geoJSON.ajax(base_url+'infrastructure/api/trading/');
    truck = L.geoJSON.ajax(base_url+'infrastructure/api/truck/');
    assessedRoads = L.geoJSON.ajax(base_url+'roads/assessed').addTo(mymap);
    primary = L.geoJSON.ajax(base_url+'schools/api/primary/');
    secondary = L.geoJSON.ajax(base_url+'schools/api/secondary/');
    university = L.geoJSON.ajax(base_url+'schools/api/university/');
    healthFacilities = L.geoJSON.ajax(base_url+'health/facilities',{onEachFeature:eachHealth,pointToLayer:returnHeathMarker});
    districts = L.geoJSON.ajax(base_url+'infrastructure/api/districts/').addTo(mymap);
    
    lyrMarkerCluster =L.markerClusterGroup();
    
    ObjOverlays = {
        "blocking": lyrMarkerCluster,
        "critical": lyrMarkerCluster,
        "extended":lyrMarkerCluster,
        "food" : lyrMarkerCluster,
        "market": lyrMarkerCluster, 
        "muddy": lyrMarkerCluster,
        "bridge": lyrMarkerCluster,
        "refugee": lyrMarkerCluster,
        "settlement": lyrMarkerCluster,
        "trading": lyrMarkerCluster,
        "truck": lyrMarkerCluster,
        "assessedRoads": assessedRoads,
        "primary": lyrMarkerCluster,
        "secondary": lyrMarkerCluster,
        "university": lyrMarkerCluster,
        "healthFacilities": lyrMarkerCluster,
        "districts": districts,
      };


    ctlLayers = L.control.layers(objBasemaps, ObjOverlays).addTo(mymap);
    primary.on('data:loaded', function(){
        lyrMarkerCluster.addLayer(blocking);
        lyrMarkerCluster.addLayer(critical);
        lyrMarkerCluster.addLayer(extended);
        lyrMarkerCluster.addLayer(food);
        lyrMarkerCluster.addLayer(market);
        lyrMarkerCluster.addLayer(muddy);
        lyrMarkerCluster.addLayer(bridge);
        lyrMarkerCluster.addLayer(refugee);
        lyrMarkerCluster.addLayer(settlement);
        lyrMarkerCluster.addLayer(trading);
        lyrMarkerCluster.addLayer(truck);
        lyrMarkerCluster.addLayer(primary);
        lyrMarkerCluster.addLayer(secondary);
        lyrMarkerCluster.addLayer(university);
        lyrMarkerCluster.addLayer(healthFacilities);
        lyrMarkerCluster.addTo(mymap);
        });


    
    });

    function returnHeathMarker(json, latlng){
        var att = json.properties;
        return L.marker(latlng, {icon:healthIcn});
        };

    function eachHealth (feature, layer) {
        var rd =  new Date(feature.properties.report_date);
        var ad =  new Date(feature.properties.accident_date)
        var content = "<table class='table table-striped table-bordered table-condensed'>" +
        "</td></tr>" + "<tr><th>Id</th><td>" + feature.properties.pk + 
        "</td></tr>" + "<tr><th>report date</th><td>" +rd  + 
            "<tr><th>Accident Date</th><td>" +ad  + 
            "</td></tr>" + "<tr><th>Cause</th><td>" + feature.properties.cause + 
            "</td></tr>" + "<tr><th>Persons</th><td>" + feature.properties.persons + 
            "</td></tr>" + "<tr><th>Victims</th><td>" + feature.properties.victims + 
            "</td></tr>" + "<tr><th>Road</th><td>" + feature.properties.road + 
            "</td></tr>" + "<tr><th>Category</th><td>" + feature.properties.categories + 
            "</td></tr>" + "<tr><th>Description</th><td>" + feature.properties.description + 
            "</td></tr>" + "<tr><th>Cars involved</th><td>" + feature.properties.cars_involved + 
            "</td></tr>" + "<table>";

            layer.on({click: function(e){
                // mymap.addControl(rightSidebar);
                // $('#feature-list').html(content)
                return layer.bindPopup(content).addTo(mymap);
              
            }});
        };



