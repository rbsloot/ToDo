<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of BoardController
 *
 * @author Remi
 */
class BoardController extends BaseController {
    
    public function __construct($dbcon) {
        parent::__construct($dbcon);
    }
    
    public function get($request) {
        if(isset($request->parameters['_user'])) {
            // Get for user
        } else {
            // Get all
            header(BaseController::$HEADERS[200]);
            return "test";
        }
    }
    
    public function post($request) {
        // Create board
    }
    
    public function put($request) {
        // Edit board data
    }
    
    public function delete($request) {
        // Delete board
    }
    
}

?>
