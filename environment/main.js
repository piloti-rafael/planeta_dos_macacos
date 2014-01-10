var environment = function(){
	'use strict';

	var local = {
		gravity : 9.78,
		time : 1000,
		totalPopulation : 5000000000
	};

	return {
		getGravity : function(){
			return local.gravity;
		},
		
		getPeso : function(massa){
			return local.gravity * massa;
		},
		getTime : function(){
			return local.time;
		}
	};
}();

module.exports = environment;