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
class User {
    
    public $id;
    public $username;
    public $password;
    public $session_token;
    
    public function __construct($id, $username, $password, $session_token) {
        $this->id = $id;
        $this->username = $username;
        $this->password = $password;
        $this->session_token = $session_token;
    }
    
}

?>
