angular.module("tellbuzzCTRLMain",[])
.controller('tellbuzzControllerMain', function($scope,$http,$window,$interval,$timeout) {
	var synth = window.speechSynthesis;

	var voices = [];
	
	var socket = io.connect('http://127.0.0.1:3000');
	
	socket.on('news', function (dados) {
		console.log(dados);
		$scope.zerarRetorno();
		$scope.dadosretorno = dados;
	});
	
	$scope.zerarRetorno = function() { $scope.dadosretorno = {	title		: '',
    															description	: '',
    															link		: '',
    															pubdate		: '',
    															src			: '',
    															language	: ''};
									 };
	

	var restFind = function(Url) {
    	$http({	url: Url,
        		method: "GET",
        		params: {}
    			}).then(function mySucces(retorno) {
        					console.log(retorno);
							$scope.zerarRetorno();
							$scope.dadosretorno = retorno.data;
    			}, function myError(retorno) {
        				console.log(retorno);
    			});
	};
	
    var initFind = function() { 
		$scope.zerarRetorno();
		restFind('http://tellbuzz.lenines.info/api/v001/news');
    };
						
	initFind();
	
	$scope.voice = function(seq) {
		console.log(seq);
		var texto = 'Título: ' + $scope.dadosretorno[seq].title + ', ' + $scope.dadosretorno[seq].description;

		var voices = synth.getVoices();
		
		var utterThis = new SpeechSynthesisUtterance(texto);
		utterThis.volume	= 1; // o default é o valor 1, ou seja o volume máximo.
		utterThis.pitch 	= 1; // o default é o valor 1.
		utterThis.rate 		= 1; // o default é o valor 1.
		utterThis.lang		= $scope.dadosretorno[seq].language;
		utterThis.voice		= voices[15];
		
		synth.speak(utterThis);
	};

});