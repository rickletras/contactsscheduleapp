app.service('UserCRUDService', [ '$http', function($http) {
 
    this.getUser = function getUser(userId) {
        return $http({
            method : 'GET',
            url : 'contacts/' + userId
        });
    }
    
    this.addUser = function addUser(name, email, phone, cep, rua, bairro, cidade, estado) {
        return $http({
            method : 'POST',
            url : 'contacts',
            data : {
                name : name,
                email: email,
                phone: phone,
                cep: cep,
                rua: rua,
                bairro: bairro,
                cidade: cidade,
                estado: estado
            }
        });
    }
    
    this.updateUser = function updateUser(id, name, email, phone, cep, rua, bairro, cidade, estado) {
        return $http({
            method : 'PUT',
            url : 'contacts/' + id,
            data : {
                name : name,
                email: email,
                phone: phone,
                cep: cep,
                rua: rua,
                bairro: bairro,
                cidade: cidade,
                estado: estado
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
    
    this.getCep = function getCep(cep) {
        return $http({
            method : 'GET',
            url : 'https://viacep.com.br/ws/'+ cep + '/json'
        });
    }
    
} ]);