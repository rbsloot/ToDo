<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of List
 *
 * @author Remi
 */
class Lists extends DBModel {
    //put your code here
    
    public $id;
    public $name;
    public $board_id;
    
    protected $tableName = "list";
    
    public function __construct($id = null, $name = null, $board_id = null) {
        $this->id = $id;
        $this->name = $name;
        $this->board_id = $board_id;
    }
    
    public function properties() {
        return array('id','name');
    }
}
?>
