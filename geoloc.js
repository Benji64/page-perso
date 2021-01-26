
//debut api ip
var Urlp = "https://api.ipify.org/?format=json";
var xhrp = new XMLHttpRequest();
var ip = "";
xhrp.open('GET', Urlp, true);
xhrp.send();
xhrp.onreadystatechange = processRequestp;
function processRequestp() {
  if (xhrp.readyState == 4 && xhrp.status == 200) {
    //alert(xhrp.responseText);
    var responsep = JSON.parse(xhrp.responseText);
    ip = responsep.ip;
    return ip;
  }
}

//debut api ville
var Urlv = "http://ip-api.com/json/"+ip+"?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query";
var xhrv = new XMLHttpRequest();
var lat = "";
var lon = "";
var ville = "";
xhrv.open('GET', Urlv, true);
xhrv.send();
xhrv.onreadystatechange = processRequestv;
function processRequestv() {
 if (xhrv.readyState == 4 && xhrv.status == 200) {
   //alert(xhrv.responseText);
   var responsev = JSON.parse(xhrv.responseText);
   // you should not "return" anything inside that function; 
   // what you want is set the ville/lat/lon variable
   // when you return inside a function it goes out and don't execut the rest of the code below
   /* return */ ville = responsev.city;
   /* return */ lat = responsev.lat;
   /* return */ lon = responsev.lon;
 }
}
// fin json donnee geoloc ip

// debut api meteo
var Urlm = "https://openweathermap.org/data/2.5/weather?q=" + ville + ",fr&appid=439d4b804bc8187953eb36d2a8c26a02";
var xhrm = new XMLHttpRequest();
var temp = 0;
var description = "";
xhrm.open('GET', Urlm, true);
xhrm.send();
xhrm.onreadystatechange = processRequestm;
function processRequestm() {
 if (xhrm.readyState == 4 && xhrm.status == 200) {
   //alert(xhrm.responseText);
   var responsem = JSON.parse(xhrm.responseText);
   /* return */ temp = responsem.temp;
   /* return */ description = responsem.description;
   // same here 
 }
}

// debut procedure map
var macarte = null;
// Fonction d'initialisation de la carte
function initMap() {
    // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
    macarte = L.map('map').setView([43.55852311511972, -1.4443478000000076], 11);
    // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        // Il est toujours bien de laisser le lien vers la source des données
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 1,
        maxZoom: 20
    }).addTo(macarte);
}
window.onload = function(){
// Fonction d'initialisation qui s'exécute lorsque le DOM est chargé
initMap();
// Nous définissons le dossier qui contiendra les marqueurs
var iconBase = 'image/autres.png';
// Nous ajoutons un marqueur  [ville,responsem,temp,description]
var markervs = L.marker([lat, lon]).addTo(macarte);
markervs.bindPopup(ville);
var markerOn = L.marker([43.55852311511972, -1.4443478000000076]).addTo(macarte);
markerOn.bindPopup('ondres');
}
