var baseLayer = new ol.layer.Group({
    'title': 'Base maps',
    layers: [
new ol.layer.Tile({
    'title': 'OpenWeatherMap Snow',
    'type': 'base',
    source: new ol.source.XYZ({
        url: 'http://tile.openweathermap.org/map/snow/{z}/{x}/{y}.png',
        attributions: [new ol.Attribution({html: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'})]
    })
})
]
});
var format_admin7 = new ol.format.GeoJSON();
var features_admin7 = format_admin7.readFeatures(geojson_admin7, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_admin7 = new ol.source.Vector();
jsonSource_admin7.addFeatures(features_admin7);var lyr_admin7 = new ol.layer.Vector({
                source:jsonSource_admin7, 
                style: style_admin7,
                title: "admin7"
            });var format_admin9 = new ol.format.GeoJSON();
var features_admin9 = format_admin9.readFeatures(geojson_admin9, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_admin9 = new ol.source.Vector();
jsonSource_admin9.addFeatures(features_admin9);var lyr_admin9 = new ol.layer.Vector({
                source:jsonSource_admin9, 
                style: style_admin9,
                title: "admin9"
            });

lyr_admin7.setVisible(true);lyr_admin9.setVisible(true);
var layersList = [baseLayer,lyr_admin7,lyr_admin9];
lyr_admin7.set('fieldAliases', {'NAME': 'NAME', 'ADMIN_LEVE': 'ADMIN_LEVE', 'jaras_main_TOPIC': 'jaras_main_TOPIC', 'jaras_main_PROPORTION': 'jaras_main_PROPORTION', 'jaras_topik_TOPICS': 'jaras_topik_TOPICS', 'jaras_topik_DESCRIPTIONS': 'jaras_topik_DESCRIPTIONS', });
lyr_admin9.set('fieldAliases', {'NAME': 'NAME', 'ADMIN_LEVE': 'ADMIN_LEVE', 'jaras_main_TOPIC': 'jaras_main_TOPIC', 'jaras_main_PROPORTION': 'jaras_main_PROPORTION', 'jaras_topik_TOPICS': 'jaras_topik_TOPICS', 'jaras_topik_DESCRIPTIONS': 'jaras_topik_DESCRIPTIONS', });
lyr_admin7.set('fieldImages', {'NAME': 'TextEdit', 'ADMIN_LEVE': 'TextEdit', 'jaras_main_TOPIC': 'TextEdit', 'jaras_main_PROPORTION': 'TextEdit', 'jaras_topik_TOPICS': 'TextEdit', 'jaras_topik_DESCRIPTIONS': 'TextEdit', });
lyr_admin9.set('fieldImages', {'NAME': 'TextEdit', 'ADMIN_LEVE': 'TextEdit', 'jaras_main_TOPIC': 'TextEdit', 'jaras_main_PROPORTION': 'TextEdit', 'jaras_topik_TOPICS': 'TextEdit', 'jaras_topik_DESCRIPTIONS': 'TextEdit', });
lyr_admin7.set('fieldLabels', {'NAME': 'header label', 'ADMIN_LEVE': 'no label', 'jaras_main_TOPIC': 'inline label', 'jaras_main_PROPORTION': 'inline label', 'jaras_topik_TOPICS': 'inline label', 'jaras_topik_DESCRIPTIONS': 'inline label', });
lyr_admin9.set('fieldLabels', {'NAME': 'header label', 'ADMIN_LEVE': 'no label', 'jaras_main_TOPIC': 'inline label', 'jaras_main_PROPORTION': 'inline label', 'jaras_topik_TOPICS': 'inline label', 'jaras_topik_DESCRIPTIONS': 'inline label', });
lyr_admin9.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});