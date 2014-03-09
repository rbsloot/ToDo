<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Task
 *
 * @author Remi
 */
class Task extends DBModel {
    //put your code here
    
    public $id;
    public $name;
    public $description;
    public $end_date;
    public $status;
    public $list_id;
    
    protected $tableName = "task";
    
    public function __construct($id = null, $name = null, $description = null, $end_date = null, $status = null, $list_id = null) {
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->end_date = $end_date;
        $this->status = $status;
        $this->list_id = $list_id;
    }
    
    public function properties() {
        return array('id','name', 'description', 'end_date', 'status' , 'list_id');
    }
    
}

?>
