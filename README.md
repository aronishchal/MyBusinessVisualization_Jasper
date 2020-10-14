# MyBusinessVisualization_Jasper
Jaspersoft Studio Report with custom component to visualize data on Openlayers Map

<h2>Introduction</h2>
This is a simple TIBCO Jaspersoft Studio Report with a CVC (Custom Visualization Component) Openlayers map to visualize Business Entities with a name and address. Built using Jaspersoft Studio (v6.14.0), JasperReports Server (v7.8.0), JQuery (v3.5.1) and Openlayers (v6.4.3).

<h2>Prerequisites</h2>
The Business Service is required to be running for this webapp - https://github.com/aronishchal/MyBusinessService. Business Entities to be visualized can be added as per the README there.

<h2>Setup</h2>
Publish the Jaspersoft Studio report (.jrxml) to JasperReports Server along with the "MyBusinessService.xml" data adapter - in the data source configuration step, do not select any data source.