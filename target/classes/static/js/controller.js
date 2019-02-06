app.controller('UserCRUDCtrl', ['$scope','UserCRUDService', 
  function ($scope,UserCRUDService) {
      $scope.getUser = function () {
    	  if($scope.user != null && $scope.user.id){
    		  var id = $scope.user.id;
              UserCRUDService.getUser($scope.user.id)
                .then(function success(response) {
                    $scope.user = response.data;
                    $scope.user.id = id;
                },
                function error (response) {
                    if (response.status === 404){
                        $scope.errorMessage = 'Contato não encontrado!';
                    }
                });
    	  } else {
    		  errorMessage();
    	  }
      };
      
      $scope.addUser = function () {
    	    if ($scope.user != null && $scope.user.name) {
    	    	removeDuplicatesWord();
    	        UserCRUDService.addUser($scope.user.name, $scope.user.email, $scope.user.phone)
    	          .then (function success(response){
    	        	  clearFields();
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
    	      $scope.user.name, $scope.user.email, $scope.user.phone)
    	      .then(function success(response) {
    	    	  clearFields();
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
    	          $scope.errorMessage = '';
    	      });
    	}
    	
    	function clearFields(){
    		$scope.user.id = '';
    		$scope.user.name = '';
      	  	$scope.user.email = '';
      	  	$scope.user.phone = '';
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
}]);