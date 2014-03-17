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
			$params = $request->parameters;
            $name = $params["name"];
            $listId = $params["listId"];
			
			$query = "INSERT INTO task (name, list_id, end_date) VALUES (:name, :listId, '0000-00-00 00:00:00')";
			$this->db->prepareQuery($query);
			$this->db->bindParam(":listId", $listId, DatabaseConnection::ConvertTypeToPDOParam("string"));
			$this->db->bindParam(":name", $name, DatabaseConnection::ConvertTypeToPDOParam("string"));
			$this->db->execute();
    }
    
    public function put($request) {
        // Edit task data
    }
    
    public function delete($request) {
        // Delete task
		$params = $request->parameters;
            $taskId = $params["id"];
			
			if(!empty($taskId))
			{
				$query = "DELETE FROM task WHERE id= :id";
				$this->db->prepareQuery($query);
				$this->db->bindParam(":id", $taskId, DatabaseConnection::ConvertTypeToPDOParam("string"));
				$this->db->execute();
			} else {
				header(BaseController::$HEADERS[404]);
			}
    }
    
}

?>
