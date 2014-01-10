var Global = require("./lib/constants.js");
(function(){
	'use strict';
	var environment = require("./environment/main.js");
	var Person = require("./environment/person.js");
	var process = require("./lib/process.js");

	var pessoas = [];

	var a = new Person(environment.getTime());
	var b = new Person(environment.getTime());
	var c = new Person(environment.getTime());
	var d = new Person(environment.getTime());
	
	a.nascer();
	b.nascer();
	c.nascer();
	d.nascer();

	Global.getInstances(Person, Global);
	var mostraStats = setInterval(function(){
		var vivos = Global.find(Person, Global, "status", "Vivo");
		var mortos = Global.find(Person, Global, "status", "Morto");
		console.log("Pessoas Vivas: "+vivos.length);
		console.log("Pessoas Mortas: "+mortos.length);
		console.log("-----");
		if(vivos.length === 0)
			clearInterval(mostraStats);
	}, 10000);
	// console.log(Global);

	// console.log(Global);


})();

