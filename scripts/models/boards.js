/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

app.service('boards', function($http) {    
    
    var b_url = root_path + '/board';
    
    this.getBoards = function(success) {
        $http.get(b_url,{params:{token:localStorage.getItem("token")}})
        .success(success)
        .error(function(data, status, headers, config) {
            console.log(data);
            if(status == 404) {
                localStorage.removeItem("token");
            }
        });
    }
    
    this.addBoard = function(boardName, success) {
       if(boardName) {
           $http({
               url:b_url,
               method:"POST",
               data:{bName:boardName,token:localStorage.token}
           }).success(success)
           .error(function(data, status, headers, config) {
               alert("Something went wrong while adding the new board, '"+boardName+"'");
           });
       }
   } 
   
   this.editBoard = function(editName, id, success) {
      $http({
          url:b_url,
          method:"PUT",
          data:{bName:editName, bid:id}
      }).success(success)
      .error(function(data, status, headers, config){
          console.log(data);
      });
//      callback();
   }
   
   this.removeBoard = function(bid, success) {
       $http({
          url:b_url,
          method:"DELETE",
          data:{bid:bid}
      }).success(success)
      .error(function(data, status, headers, config){
          console.log(data);
      });
   }
    
});
