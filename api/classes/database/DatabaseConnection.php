<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of DatabaseConnection
 *
 * @author Remi
 */
class DatabaseConnection {
    //put your code here
    private $con;
    /**
     * 
     * @var PDOStatement
     */
    private $stmnt;
    
    public function __construct($dbconfig) {
        $dbinfo = 'mysql:host='.$dbconfig['host'].';dbname='.$dbconfig['database'].';charset='.$dbconfig['charset'];
        try {
            $this->con = new PDO($dbinfo,$dbconfig['username'], $dbconfig['password']);
            $this->con->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            $this->con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            //echo $e->getMessage();
            throw $e;
        }
    }
    
    public function prepareQuery($query) {
        $query .= ';';
        $this->stmnt = $this->con->prepare($query);
    }
        
    public function bindParam($placeholder, $variable, $pdostate = null) {
        if (isset($pdostate)) {
            $this->stmnt->bindParam($placeholder, $variable, $pdostate);
        } else {
            $this->stmnt->bindParam($placeholder, $variable);
        }
    }

    public function executeAndGetDatarows() {
        $this->stmnt->execute();
        return $this->stmnt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function execute() {
        $this->stmnt->execute();
    }
    
    public function getResultsAsObjects($objName) {
        return $this->stmnt->fetchAll(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, $objName);
    }
    
    public function getLastInsertId() {
        return $this->con->lastInsertId();
    }
    
    public static function ConvertTypeToPDOParam($type) {
        switch($type) {
            case "NULL":
                return PDO::PARAM_NULL;
            case "integer":
                return PDO::PARAM_INT;
            case "string":
                return PDO::PARAM_STR;
            case "blob":
                return PDO::PARAM_LOB;
            case "boolean":
                return PDO::PARAM_BOOL;
            default:
                return PDO::PARAM_STR;
        }
    }
}

?>
