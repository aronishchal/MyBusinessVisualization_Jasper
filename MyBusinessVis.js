define('MyBusinessVis', ['ol', 'jquery'], function(ol, $) {
    function visualizeBusinesses(instanceData) {
        var iconFeatures = [];

        if (instanceData.series[0]) {
            $.each(instanceData.series[0], $.proxy(function(index, business) {
                var iconFeature = new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.transform([business.lon, business.lat], 'EPSG:4326', 'EPSG:3857')),
                    name: business.name,
                    address: business.address
                });
                iconFeature.setStyle(this.iconStyle);
                iconFeatures.push(iconFeature);
            }, this));
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

        this.iconStyle = new ol.style.Style({
            image: new ol.style.Icon({
                src: 'http://localhost:8081/mybusinessvis/data/icon.png',
                scale: 0.1
            })
        });

        this.highlightStyle = new ol.style.Style({
            image: new ol.style.Icon({
                src: 'http://localhost:8081/mybusinessvis/data/icon_hover.png',
                scale: 0.1
            })
        });

        var selected = null;
        var container = $("<div id='popup' class='ol-popup'></div>");
        var content = $("<div id='popup-content'></div>");
        
        document.body.append(container);
       	container.append(content);

       	var overlay = new ol.Overlay({
            element: container[0],
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });
        
        this.map = new ol.Map({
            target: instanceData.id,
            size: [instanceData.width, instanceData.height],
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            overlays: [overlay],
            view: new ol.View({
                center: ol.proj.fromLonLat([0, 0]),
                zoom: 1
            })
        });

        visualizeBusinesses(instanceData);

        this.map.on('pointermove', $.proxy(function(e) {
            this.map.forEachFeatureAtPixel(e.pixel, $.proxy(function(f) {
                if (selected !== null) {
                    selected.setStyle(iconStyle);
                    selected = null;
                }

                if (f instanceof ol.Feature) {
                    selected = f;
                    f.setStyle(highlightStyle);
                    content[0].innerHTML = '<div style="font-family: Helvetica; font-size: medium; color:#0D4D93; margin-bottom: 5px;"><span style="font-weight: bold;">Name: </span>' + f.getProperties().name + '</div>';
                    content[0].innerHTML += '<div style="font-family: Helvetica; font-size: medium; color:#0D4D93;"><span style="font-weight: bold;">Address: </span>' + f.getProperties().address + '</div>';
                    overlay.setPosition(f.getGeometry().getCoordinates());
                    return true;
                } else {
                    overlay.setPosition(undefined);
                    return false;
                }
            }, this));
       }, this));
    };
});