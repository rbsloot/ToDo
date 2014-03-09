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
    
}

?>
