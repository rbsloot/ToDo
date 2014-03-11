<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Board
 *
 * @author Remi
 */
class Board extends DBModel {
    //put your code here
    
    public $id;
    public $name;
    
    protected $tableName = "board";
    
    public function __construct($id = null, $name = null) {
        $this->id = $id;
        $this->name = $name;
    }
    
    public function properties() {
        return array('id','name');
    }
}

?>
