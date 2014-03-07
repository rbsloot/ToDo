<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ListController
 *
 * @author Remi
 */
class ListController extends BaseController {
    
    public function __construct($dbcon) {
        parent::__construct($dbcon);
    }
    
    public function get($request) {
        if(isset($request->parameters['bid'])) {
            // Get lists for board
        } else {
            // Get all lists
        }
    }
    
    public function post($request) {
        // Create list for board
    }
    
    public function put($request) {
        // Edit list data
    }
    
    public function delete($request) {
        // Delete list
    }
    
}

?>
