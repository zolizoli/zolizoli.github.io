var wms_layers = [];
var format_Legend_0 = new ol.format.GeoJSON();
var features_Legend_0 = format_Legend_0.readFeatures(json_Legend_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Legend_0 = new ol.source.Vector({
    attributions: '<a href=""></a>',
});
jsonSource_Legend_0.addFeatures(features_Legend_0);var lyr_Legend_0 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Legend_0, 
                style: style_Legend_0,
    title: 'Legend<br />\
    <img src="styles/legend/Legend_0_0.png" />  -4.00<br />\
    <img src="styles/legend/Legend_0_1.png" />  -3.00<br />\
    <img src="styles/legend/Legend_0_2.png" />  -2.00<br />\
    <img src="styles/legend/Legend_0_3.png" />  -1.00<br />\
    <img src="styles/legend/Legend_0_4.png" />  0.00<br />\
    <img src="styles/legend/Legend_0_5.png" />  1.00<br />\
    <img src="styles/legend/Legend_0_6.png" />  2.00<br />\
    <img src="styles/legend/Legend_0_7.png" />  3.00<br />\
    <img src="styles/legend/Legend_0_8.png" />  4.00<br />\
    <img src="styles/legend/Legend_0_9.png" />  5.00<br />\
    <img src="styles/legend/Legend_0_10.png" />  6.00<br />'
        });

lyr_Legend_0.setVisible(true);
var layersList = [lyr_Legend_0];
lyr_Legend_0.set('fieldAliases', {'NUTS5NAME': 'NUTS5NAME', 'NUTS5KSH': 'NUTS5KSH', 'NUTS5RANG': 'NUTS5RANG', 'NUTS4NAME': 'NUTS4NAME', 'NUTS4CODE': 'NUTS4CODE', 'NUTS4CENTE': 'NUTS4CENTE', 'NUTS3NAME': 'NUTS3NAME', 'NUTS3CODE': 'NUTS3CODE', 'NUTS2NAME': 'NUTS2NAME', 'NUTS2CODE': 'NUTS2CODE', 'NUTS1NAME': 'NUTS1NAME', 'NUTS1CODE': 'NUTS1CODE', 'NUTS0NAME': 'NUTS0NAME', 'NUTS0CODE': 'NUTS0CODE', 'PLACE': 'PLACE', 'ZIP': 'ZIP', 'NEPESSEG20': 'NEPESSEG20', 'NO20160101': 'NO20160101', 'FERFI20160': 'FERFI20160', 'JARASNEV': 'JARASNEV', 'JARASKOZPO': 'JARASKOZPO', 'JARASKOD': 'JARASKOD', 'hencie_field_1': 'hencie_field_1', 'hencie_NUTS5NAME': 'hencie_NUTS5NAME', 'hencie_2018': 'hencie_2018', 'hencie_1986': 'hencie_1986', 'hencie_absolute': 'hencie_absolute', 'hencie_Unnamed: 5': 'hencie_Unnamed: 5', 'hencie_percent': 'hencie_percent', 'hencie_categories': 'hencie_categories', });
lyr_Legend_0.set('fieldImages', {'NUTS5NAME': 'TextEdit', 'NUTS5KSH': 'TextEdit', 'NUTS5RANG': 'TextEdit', 'NUTS4NAME': 'TextEdit', 'NUTS4CODE': 'TextEdit', 'NUTS4CENTE': 'TextEdit', 'NUTS3NAME': 'TextEdit', 'NUTS3CODE': 'TextEdit', 'NUTS2NAME': 'TextEdit', 'NUTS2CODE': 'TextEdit', 'NUTS1NAME': 'TextEdit', 'NUTS1CODE': 'TextEdit', 'NUTS0NAME': 'TextEdit', 'NUTS0CODE': 'TextEdit', 'PLACE': 'TextEdit', 'ZIP': 'TextEdit', 'NEPESSEG20': 'TextEdit', 'NO20160101': 'TextEdit', 'FERFI20160': 'TextEdit', 'JARASNEV': 'TextEdit', 'JARASKOZPO': 'TextEdit', 'JARASKOD': 'TextEdit', 'hencie_field_1': 'TextEdit', 'hencie_NUTS5NAME': 'TextEdit', 'hencie_2018': '', 'hencie_1986': '', 'hencie_absolute': 'TextEdit', 'hencie_Unnamed: 5': 'TextEdit', 'hencie_percent': 'TextEdit', 'hencie_categories': 'TextEdit', });
lyr_Legend_0.set('fieldLabels', {'NUTS5NAME': 'inline label', 'NUTS5KSH': 'no label', 'NUTS5RANG': 'no label', 'NUTS4NAME': 'no label', 'NUTS4CODE': 'no label', 'NUTS4CENTE': 'no label', 'NUTS3NAME': 'no label', 'NUTS3CODE': 'no label', 'NUTS2NAME': 'no label', 'NUTS2CODE': 'no label', 'NUTS1NAME': 'no label', 'NUTS1CODE': 'no label', 'NUTS0NAME': 'no label', 'NUTS0CODE': 'no label', 'PLACE': 'no label', 'ZIP': 'no label', 'NEPESSEG20': 'no label', 'NO20160101': 'no label', 'FERFI20160': 'no label', 'JARASNEV': 'no label', 'JARASKOZPO': 'no label', 'JARASKOD': 'no label', 'hencie_field_1': 'no label', 'hencie_NUTS5NAME': 'no label', 'hencie_2018': 'no label', 'hencie_1986': 'no label', 'hencie_absolute': 'no label', 'hencie_Unnamed: 5': 'no label', 'hencie_percent': 'inline label', 'hencie_categories': 'no label', });
lyr_Legend_0.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});