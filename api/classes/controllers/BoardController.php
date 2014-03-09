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
            header(BaseController::$HEADERS[200]);
            return array(
                array('id' => 1, 'name' => 'MyBoard'),
                array('id' => 4, 'name' => 'BoardSomething'),
                array('id' => 10, 'name' => 'Please')
            );
        } else {
            // Get all
            header(BaseController::$HEADERS[200]);
            return array(
                array('id' => 1, 'name' => 'MyBoard'),
                array('id' => 4, 'name' => 'BoardSomething'),
                array('id' => 10, 'name' => 'Please')
            );
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
