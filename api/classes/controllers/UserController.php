<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of UserController
 *
 * @author Remi
 */
class UserController extends BaseController {
    
    public function __construct($dbcon) {
        parent::__construct($dbcon);
    }
    
    public function login($request) {
        $params = $request->parameters;
		$name = $params["name"];
		$password = $params["password"];
		
		$query = "SELECT id FROM user WHERE username = :name AND password = :password";
		$this->db->prepareQuery($query);
		$this->db->bindParam(":name", $name, DatabaseConnection::ConvertTypeToPDOParam("string"));
		$this->db->bindParam(":password", $password, DatabaseConnection::ConvertTypeToPDOParam("string"));
		$dataRows = $this->db->executeAndGetDatarows();
		
		if(isset($dataRows[0])) {
			$dataRow = $dataRows[0];			
			$id = $dataRow['id'];
			$token = md5($id);
			
			
			$query = "UPDATE user SET session_token = :token WHERE id = :id";
			$this->db->prepareQuery($query);
			$this->db->bindParam(":token", $token, DatabaseConnection::ConvertTypeToPDOParam("string"));
			$this->db->bindParam(":id", $id, DatabaseConnection::ConvertTypeToPDOParam("integer"));
			$this->db->execute();
			
			return array("token"=>$token);
			
		} else {			
			header(BaseController::$HEADERS[404]);
		}
			
    }
    
    public function logout($request) {
        
    }
    
    public function getUserByToken($request) {
        $params = $request->parameters;
        $token = $params["token"];
        
        $query = "SELECT * FROM user WHERE session_token = :token";
        $this->db->prepareQuery($query);
        $this->db->bindParam(":token", $token, DatabaseConnection::ConvertTypeToPDOParam("string"));
        $dataRows = $this->db->executeAndGetDatarows();
        
        if(isset($dataRows[0])) {
            $dataRow = $dataRows[0];

            $id = $dataRow['id'];
            $username = $dataRow['username'];
            $password = $dataRow['password'];
            $session_token = $dataRow['session_token'];

            return new User($id, $username, $password, $session_token);
        }
        return null;
    }
    
}

?>
