var Global = {};

Global.getInstances = function(_class, namespace){
	var result = [];

	for (var key in namespace) {
		var obj = namespace[key];
		if(typeof obj != 'function'){

			if(obj instanceof _class) {
				result.push(obj);
			}

		}
	}
	return result.length;
};

Global.find = function(_class, namespace, attr, value){
	var result = [];
	for (var key in namespace) {
		var obj = namespace[key];
		if(typeof obj != 'function'){

			if(obj instanceof _class) {
				if(obj[attr] == value)
					result.push(obj);
			}

		}
	}
	return result;

};

Global.findRandonOpositeSex = function(_class, namespace, value){
	var result = [];
	for (var key in namespace) {
		var obj = namespace[key];
		if(typeof obj != 'function'){

			if(obj instanceof _class) {
				if(obj.sexo != value)
					result.push(obj);
			}

		}
	}
	
	return result[Math.floor(Math.random()*result.length)];
};
module.exports = Global;