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
        $separator = "|";
        $list = new Lists();
        $task = new Task();
        $listSelStr = $list->createSelectString();
        $taskSelStr = $task->createSelectString(null, "GROUP_CONCAT", "SEPARATOR '$separator'");
        
        $params = $request->parameters;
        
        if(isset($params['bid'])) {
            // Get lists for board
            $boardid = $params['bid'];
            
            $query = "SELECT $listSelStr, $taskSelStr FROM `list` LEFT JOIN `task` ON `task`.`list_id` = `list`.`id` WHERE `list`.`board_id` = :bid GROUP BY `list`.id";
            $this->db->prepareQuery($query);
            $this->db->bindParam(":bid", $boardid, DatabaseConnection::ConvertTypeToPDOParam("integer"));
        } else {
            // Get all lists
            $query = "SELECT $listSelStr, $taskSelStr FROM `list` LEFT JOIN `task` ON `task`.`list_id` = `list`.`id` GROUP BY `list`.id";
            $this->db->prepareQuery($query);
        }
        
        $dataRows = $this->db->executeAndGetDatarows();
            
        $data = array();

        foreach($dataRows as $dataRow) {
            $list = array(
                'tasks' => array()
            );

            foreach($dataRow as $key => $value) {
                $keyParts = explode("$", $key);
                $table = $keyParts[0];
                $propName = $keyParts[1];
                switch($table) {
                    case "list":
                        $list[$propName] = $value;
                        break;
                    case "task":
                        $valuesArray = explode($separator, $value);
                        if($propName == 'id' && ($valuesArray[0] == null || $valuesArray[0] == "")) {
                            $list['tasks'] = array();
                            break 2;
                        }
                        for($i = 0; $i < count($valuesArray);$i++) {
                            if(!isset($list['tasks'][$i])) {
                                $list['tasks'][$i] = array();
                            }
                            $list['tasks'][$i][$propName] = $valuesArray[$i];
                        }
                        break;
                }
            }
            array_push($data, $list);
        }

        return $data;
    }
    
    public function post($request) {
        // Create list for board
			$params = $request->parameters;
            $listName = $params["name"];
            $boardId = $params["boardId"];
			
			$query = "INSERT INTO list (name, board_id) VALUES (:listName, :boardId)";
			$this->db->prepareQuery($query);
			$this->db->bindParam(":boardId", $boardId, DatabaseConnection::ConvertTypeToPDOParam("string"));
			$this->db->bindParam(":listName", $listName, DatabaseConnection::ConvertTypeToPDOParam("string"));
			$this->db->execute();
    }
    
    public function put($request) {
        // Edit list data
    }
    
    public function delete($request) {
        // Delete list
			$params = $request->parameters;
            $listId = $params["id"];
			
			if(!empty($listId))
			{
				$query = "DELETE FROM list WHERE id= :id";
				$this->db->prepareQuery($query);
				$this->db->bindParam(":id", $listId, DatabaseConnection::ConvertTypeToPDOParam("string"));
				$this->db->execute();
			} else {
				header(BaseController::$HEADERS[404]);
			}
    }
    
}

?>
