app.controller('UserCRUDCtrl', ['$scope','UserCRUDService', 
  function ($scope,UserCRUDService) {
	  $scope.errorMessage = false;
      $scope.getUser = function () {
    	  if($scope.user != null && $scope.user.id){
    		  var id = $scope.user.id;
              UserCRUDService.getUser($scope.user.id)
                .then(function success(response) {
                    $scope.user = response.data;
                    $scope.user.id = id;
                    $scope.errorMessage = false;
                },
                function error (response) {
                    if (response.status === 404){
                        $scope.errorMessage = 'Contato não encontrado!';
                        $scope.user.name = '';
                  	  	$scope.user.email = '';
                  	  	$scope.user.phone = '';
                  	    limpa_formulário_cep();
                    }
                });
    	  } else {
    		  errorMessage();
    	  }
      };
      
      $scope.addUser = function () {
    	    if ($scope.user != null && $scope.user.name) {
    	    	removeDuplicatesWord();
    	        UserCRUDService.addUser($scope.user.name, $scope.user.email, $scope.user.phone, $scope.user.cep, $scope.user.rua, $scope.user.bairro, $scope.user.cidade, $scope.user.estado)
    	          .then (function success(response){
    	        	  clearFields();
    	        	  limpa_formulário_cep();
    	        	  UserCRUDService.getAllUsers()
    	    	      .then(function success(response) {
    	    	          $scope.users = response.data;
    	    	      });
    	          });
    	    }
    	    else {
    	    	$scope.errorMessage = 'Insira o nome do contato';
    	    }
    	}
      
      $scope.updateUser = function () {
    	  if($scope.user != null && $scope.user.id){
    		  removeDuplicatesWord();
    	    UserCRUDService.updateUser($scope.user.id, 
    	      $scope.user.name, $scope.user.email, $scope.user.phone, $scope.user.cep, $scope.user.rua, $scope.user.bairro, $scope.user.cidade, $scope.user.estado)
    	      .then(function success(response) {
    	    	  clearFields();
    	    	  limpa_formulário_cep();
    	    	  UserCRUDService.getAllUsers()
        	      .then(function success(response) {
        	          $scope.users = response.data;
        	      });
    	      });
    	  } else {
    		  errorMessage();
    	  }
    	}
    	 
    	$scope.deleteUser = function () {
    		if($scope.user != null && $scope.user.id){
    			UserCRUDService.deleteUser($scope.user.id)
      	      .then (function success(response) {
      	    	  clearFields();
      	    	  limpa_formulário_cep();
      	          $scope.User = null;
      	          UserCRUDService.getAllUsers()
          	      .then(function success(response) {
          	          $scope.users = response.data;
          	      });
      	      });
    		}  else {
    			errorMessage();
    		}
    	}
    	
    	$scope.getAllUsers = function () {
    	    UserCRUDService.getAllUsers()
    	      .then(function success(response) {
    	          $scope.users = response.data;
    	          $scope.errorMessage = false;
    	      });
    	}
    	
    	$scope.getClearFields = function(){
    		clearFields();
	    	limpa_formulário_cep();
    	}
    	
    	$scope.pesquisacep = function() {

            //Nova variável "cep" somente com dígitos.
            var cep = $scope.user.cep.replace(/\D/g, '');

            //Verifica se campo cep possui valor informado.
            if (cep != "") {

                //Expressão regular para validar o CEP.
                var validacep = /^[0-9]{8}$/;

                //Valida o formato do CEP.
                if(validacep.test(cep)) {
                	UserCRUDService.getCep($scope.user.cep)
                  	      .then(function success(response) {
	                  	    	$scope.user.cep=response.data.cep;
	                    		$scope.user.rua=response.data.logradouro;
	                    		$scope.user.bairro=response.data.bairro;
	                    		$scope.user.cidade=response.data.localidade;
	                    		$scope.user.estado=response.data.uf;
                  	      });
                }
                else {
                    //cep é inválido.
                    limpa_formulário_cep();
                    alert("Formato de CEP inválido.");
                }
            } 
            else {
                //cep sem valor, limpa formulário.
                limpa_formulário_cep();
            }
        }
    	
    	function clearFields(){
    		//Limpa os campos da tela (contatos)
    		$scope.user.id = '';
    		$scope.user.name = '';
      	  	$scope.user.email = '';
      	  	$scope.user.phone = '';
      	  	$scope.errorMessage = false;
    	}
    	
    	function errorMessage(){
    		$scope.errorMessage = 'Insira o ID do contato';
    	}
    	
    	function removeDuplicatesWord(){
    		var uniqueList=$scope.user.name.split(' ').filter(function(item,i,allItems){
    		    return i==allItems.indexOf(item);
    		}).join(' ');
    		$scope.user.name = uniqueList;
    	}
    	
    	function limpa_formulário_cep() {
            //Limpa os campos da tela (CEP).
    		$scope.user.cep='';
    		$scope.user.rua='';
    		$scope.user.bairro='';
    		$scope.user.cidade='';
    		$scope.user.estado='';
    	}
}]);