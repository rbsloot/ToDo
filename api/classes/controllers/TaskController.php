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
    
    public function getScheduledTasksForUser($request) {
        $params = $request->parameters;
        $user = $params['_user'];
        $days = ((isset($params['days'])) ? $params['days'] : 6 ) +1;
        
        $board = new Board();
        $list = new Lists();
        $task = new Task();
        $boardSelStr = $board->createSelectString();
        $listSelStr = $list->createSelectString();
        $taskSelStr = $task->createSelectString();
        
        $query = "SELECT $boardSelStr, $listSelStr, $taskSelStr FROM `task` INNER JOIN `list` ON `task`.`list_id` = `list`.`id` INNER JOIN `board` ON `list`.`board_id` = `board`.`id` INNER JOIN `user_has_board` ON `user_has_board`.`board_id` = `board`.`id` WHERE `user_has_board`.`user_id` = :userId AND `task`.`end_date` < CURDATE() + INTERVAL :days DAY AND `task`.`end_date` >= CURDATE() ORDER BY DATE(`task`.`end_date`) ASC";
        $this->db->prepareQuery($query);
        $this->db->bindParam(":userId", $user->id, DatabaseConnection::ConvertTypeToPDOParam("interger"));
        $this->db->bindParam(":days", $days);
        $dataRows = $this->db->executeAndGetDatarows();
        
        header(BaseController::$HEADERS[200]);
        return $dataRows;
    }
    
    public function post($request) {
        $params = $request->parameters;
        $name = $params["name"];
        $listId = $params["list_id"];

        $query = "INSERT INTO task (name, list_id, end_date) VALUES (:name, :listId, '0000-00-00 00:00:00')";
        $this->db->prepareQuery($query);
        $this->db->bindParam(":listId", $listId, DatabaseConnection::ConvertTypeToPDOParam("integer"));
        $this->db->bindParam(":name", $name, DatabaseConnection::ConvertTypeToPDOParam("string"));
        $this->db->execute();
        
        return array("id" => $this->db->getLastInsertId());
    }
    
    public function put($request) {
        // Edit task data
        $params = $request->parameters;
        $taskId = $params["id"];
        
        if(isset($taskId)) {
            $name = "name";
            $description = "description";
            $end_date = "end_date";
            $status = "status";
            
            $strType = DatabaseConnection::ConvertTypeToPDOParam("string");
            
            $query = "UPDATE `task` SET `$name` = :$name, `$description` = :$description, `$end_date` = :$end_date, `$status` = :$status WHERE `id` = :id";
            
            $this->db->prepareQuery($query);
            $this->db->bindParam(":id", $taskId, DatabaseConnection::ConvertTypeToPDOParam("integer"));
            $this->db->bindParam(":".$name, $params[$name], $strType);
            $this->db->bindParam(":".$description, $params[$description], $strType);
            $this->db->bindParam(":".$end_date, $params[$end_date]);
            $this->db->bindParam(":".$status, $params[$status], $strType);
            $this->db->execute();
            
        } else {
            header(BaseController::$HEADERS[404]);
        }
    }
    
    public function delete($request) {
        // Delete task
        $params = $request->parameters;
        $taskId = $params["id"];
			
        if(!empty($taskId))
        {
                $query = "DELETE FROM task WHERE id= :id";
                $this->db->prepareQuery($query);
                $this->db->bindParam(":id", $taskId, DatabaseConnection::ConvertTypeToPDOParam("integer"));
                $this->db->execute();
        } else {
                header(BaseController::$HEADERS[404]);
        }
    }
    
}

?>
