define('MyBusinessVis', ['ol', 'jquery'], function(ol, $) {
    function visualizeBusinesses(instanceData) {
        var iconFeatures = [];

        var iconStyle = new ol.style.Style({
            image: new ol.style.Icon({
                src: 'http://localhost:8081/mybusinessvis/data/icon.png',
                scale: 0.1
            })
        });

        if (instanceData.series[0]) {
            $.each(instanceData.series[0], function(index, business) {
                var iconFeature = new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.transform([business.lon, business.lat], 'EPSG:4326', 'EPSG:3857')),
                    name: business.name
                });
                iconFeature.setStyle(iconStyle);
                iconFeatures.push(iconFeature);
            });
        }

        var vectorSource = new ol.source.Vector({
            features: iconFeatures
        });

        var vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });

        this.map.addLayer(vectorLayer);
    }

    return function(instanceData) {
        var svg = window.document.createElementNS("http://www.w3.org/2000/svg", "svg");
        window.document.getElementById(instanceData.id).appendChild(svg);
        svg.style.display = "none";

        this.map = new ol.Map({
            target: instanceData.id,
            size: [instanceData.width, instanceData.height],
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([0, 0]),
                zoom: 1
            })
        });

        visualizeBusinesses(instanceData);
    };
});