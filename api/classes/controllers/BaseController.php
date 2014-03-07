<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of BaseController
 *
 * @author Remi
 */
abstract class BaseController {
    
    protected $db;
    
    public static $HEADERS = array(
        200 => 'HTTP/1.1 200 OK',
        201 => 'HTTP/1.1 201 Created',
        404 => 'HTTP/1.1 404 Not Found',
        500 => 'HTTP/1.1 500 Internal server error'
    );
    
    public function __construct($dbcon) {
        $this->db = $dbcon;
    }
    
}

?>
