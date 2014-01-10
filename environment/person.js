var Global = require("../lib/constants.js");
var Nomes = require("../lib/nomes.js");
var environment = require("./main.js");

var Person = function(tempo, sexo){
	this.sexo = sexo || null;

	var countPerson = Global.getInstances(Person, Global);
	this.tempo = tempo;
	this.idade = 0;
	this.idadeMorte = null;
	this.anos = null;
	this.nome = null;
	this.status = "Vivo";
	Global["Person"+countPerson] = this;
	this.id = countPerson;
	this.countFilho = 0;
	this.raiva = 1;
	// setters and  getters
	this.setIdade = function(idade){
		this.idade = idade;
	};

	this.getIdade = function(){
		return this.idade;
	};

	this.getIdadeMorte = function(){
		return this.idadeMorte;
	};

	this.setSexo = function(sexo){
		this.sexo = sexo;
	};

	this.setStatus = function(status){
		this.status = status;
	};

	this.setName = function(name){
		this.nome = name;
	};
	
	this.setCountFilho = function(filhos){
		this.countFilho = filhos;
	};
	this.setRaiva = function(raiva){
		this.raiva = raiva;
	};
};


Person.prototype = {

	iniciar: function() {
		var sexoArray = [ 'Masculino', 'Feminino' ];
		var sexo = Math.floor(Math.random()*sexoArray.length);
		var nome = Math.floor(Math.random()*Nomes.length);
		if (this.sexo === null)
			this.setSexo(sexoArray[sexo]);

		this.setName(Nomes[nome]);
		this.idadeMorte = Math.floor((Math.random()*100)+1);

		Person.prototype.aumentaIdade(this);

	},
	
	suicidio : function(self){
		console.log("Infelizmente o Sr. " + self.nome + "Cometeu-se o assassinato de si mesmo");
		console.log("-----");
		self.morrer();
	},

	morrer: function(rip){
		this.setStatus("Morto");

		clearInterval(this.anos);
	},

	andar: function () {
		console.log("andar");
	},

	reproduzir: function(mate) {
		mate.countFilho += 1;
		this.setCountFilho(this.countFilho + 1);
		mate.setRaiva(1);
		this.setRaiva(1);

		// self.setRaiva((self.raiva*0.1) - self.raiva);


		var novo = new Person(environment.getTime());
			novo.nascer();
	},

	nascer : function(){
		this.iniciar(this);
	},

	aumentaIdade : function(self){
		var idadeMorte = self.getIdadeMorte();
		var vivos = Global.find(Person, Global, "status", "Vivo");
		self.anos = setInterval(function(){
			var idadeAtual = self.getIdade();
				self.setIdade(idadeAtual + 1);
				self.setRaiva((self.raiva*0.2)+ self.raiva);
				var mate = Global.findRandonOpositeSex(Person, Global, self.sexo);

				if (typeof mate !== undefined && mate.idade > 18 && mate.countFilho < 3)
					self.reproduzir(mate);

			if(self.raiva > 500){
				self.suicidio(self);
			}

			if((idadeAtual + 1) == idadeMorte){
				self.morrer("Sr. "+ self.nome +"\nMorreu com "+ idadeMorte + " Anos");
			}
			
		}, self.tempo);
	}
};

module.exports = Person;
