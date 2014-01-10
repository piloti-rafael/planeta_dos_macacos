var IO = function() {


	return {
		ask : function(question){
			var stdin = process.stdin,
			stdout = process.stdout;

			stdin.resume();

			stdout.write(question+ " ");

			stdin.on('data', function (chunk) {
				stdout.write('Prazer, ' + chunk);
			});
			process.exit();
		}
	};
}();

module.exports = IO;