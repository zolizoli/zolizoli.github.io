var format_budapest_hungary_osm_landusages = new ol.format.GeoJSON();
var features_budapest_hungary_osm_landusages = format_budapest_hungary_osm_landusages.readFeatures(geojson_budapest_hungary_osm_landusages, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_budapest_hungary_osm_landusages = new ol.source.Vector();
jsonSource_budapest_hungary_osm_landusages.addFeatures(features_budapest_hungary_osm_landusages);var lyr_budapest_hungary_osm_landusages = new ol.layer.Vector({
                source:jsonSource_budapest_hungary_osm_landusages, 
                style: style_budapest_hungary_osm_landusages,
                title: "budapest_hungary_osm_landusages"
            });

lyr_budapest_hungary_osm_landusages.setVisible(true);
var layersList = [lyr_budapest_hungary_osm_landusages];
lyr_budapest_hungary_osm_landusages.set('fieldAliases', {'id': 'id', 'osm_id': 'osm_id', 'name': 'name', 'type': 'type', 'area': 'area', 'z_order': 'z_order', });
lyr_budapest_hungary_osm_landusages.set('fieldImages', {'id': 'TextEdit', 'osm_id': 'TextEdit', 'name': 'TextEdit', 'type': 'TextEdit', 'area': 'TextEdit', 'z_order': 'TextEdit', });
lyr_budapest_hungary_osm_landusages.set('fieldLabels', {'id': 'no label', 'osm_id': 'no label', 'name': 'no label', 'type': 'header label', 'area': 'no label', 'z_order': 'no label', });
lyr_budapest_hungary_osm_landusages.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});