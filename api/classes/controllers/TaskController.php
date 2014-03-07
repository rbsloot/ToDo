<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of TaskController
 *
 * @author Remi
 */
class TaskController extends BaseController {
    
    public function __construct($dbcon) {
        parent::__construct($dbcon);
    }
    
    public function get($request) {
        if(isset($request->parameters['lid'])) {
            // Get all tasks for list
        } else {
            // Get all tasks
        }
    }
    
    public function post($request) {
        // Create task for list
    }
    
    public function put($request) {
        // Edit task data
    }
    
    public function delete($request) {
        // Delete task
    }
    
}

?>
