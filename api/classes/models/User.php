<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of User
 *
 * @author Remi
 */
class User extends DBModel {
    
    public $id;
    public $username;
    public $password;
    public $session_token;
    
    protected $tableName = "user";
    
    public function __construct($id = null, $username = null, $password = null, $session_token = null) {
        $this->id = $id;
        $this->username = $username;
        $this->password = $password;
        $this->session_token = $session_token;
    }
    
    public function properties() {
        return array('id','username','password','session_token');
    }
    
    public function updateToken($token, $db) {
        $query = "UPDATE `user` SET `session_token` = :token WHERE `id` = :id";
        $db->prepareQuery($query);
        $db->bindParam(":token", $token, DatabaseConnection::ConvertTypeToPDOParam("string"));
        $db->bindParam(":id", $this->id, DatabaseConnection::ConvertTypeToPDOParam("integer"));
        $db->execute();
    }
    
    public function setLoggedState($state, $db) {
        $query = "UPDATE `user` SET `status` = :state WHERE `id` = :id";
        $db->prepareQuery($query);
        $db->bindParam(':state', $state, DatabaseConnection::ConvertTypeToPDOParam("string"));
        $db->bindParam(':id', $this->id, DatabaseConnection::ConvertTypeToPDOParam("integer"));
        $db->execute();
    }
    
}

?>
