app.service('UserCRUDService', [ '$http', function($http) {
 
    this.getUser = function getUser(userId) {
        return $http({
            method : 'GET',
            url : 'contacts/' + userId
        });
    }
    
    this.addUser = function addUser(name, email, phone) {
        return $http({
            method : 'POST',
            url : 'contacts',
            data : {
                name : name,
                email: email,
                phone: phone
            }
        });
    }
    
    this.updateUser = function updateUser(id, name, email, phone) {
        return $http({
            method : 'PUT',
            url : 'contacts/' + id,
            data : {
                name : name,
                email: email,
                phone: phone
            }
        });
    }
    
    this.deleteUser = function deleteUser(id) {
        return $http({
            method : 'DELETE',
            url : 'contacts/' + id
        })
    }
    
    this.getAllUsers = function getAllcontacts() {
        return $http({
            method : 'GET',
            url : 'contacts'
        });
    }
} ]);