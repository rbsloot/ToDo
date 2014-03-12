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
        $params = $request->parameters;
        if(isset($params['_user'])) {
            // Get for user
            $user = $params['_user'];
            $board = new Board();
            $boardSelStr = $board->createSelectString(null, null, null, false);
        
            $query = "SELECT $boardSelStr FROM `board` INNER JOIN `user_has_board` ON `user_has_board`.`board_id` = `board`.`id` WHERE `user_has_board`.`user_id` = :uid";
            $this->db->prepareQuery($query);
            $this->db->bindParam(":uid", $user->id, DatabaseConnection::ConvertTypeToPDOParam("integer"));
        
            $dataRows = $this->db->executeAndGetDatarows();
            
            header(BaseController::$HEADERS[200]);
            return $dataRows;
//            return array(
//                array('id' => 1, 'name' => 'MyBoard'),
//                array('id' => 4, 'name' => 'BoardSomething'),
//                array('id' => 10, 'name' => 'Please')
//            );
        } else {
            // Get all
            header(BaseController::$HEADERS[404]);
            return null;
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
