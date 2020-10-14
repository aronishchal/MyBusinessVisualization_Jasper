({
    //optimize: 'none', // Uncomment this property to disable the uglify of the libraries
    baseUrl: '',
    paths: {		
			'MyBusinessVis': 'MyBusinessVis' ,
			'ol': 'ol',
			'jquery': 'jquery.min'
	}, 
		
	wrap: {
        start: "(function(root){\n\nvar define = root.define;\n\n",
        end: "\n\n}(typeof __visualize__ != 'undefined' ? __visualize__ : (typeof __jrio__ != 'undefined' ? __jrio__ : window)));"
    },
    
    name: "MyBusinessVis",
    out: "MyBusinessVis.min.js"
})
