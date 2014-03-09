<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of DBModel
 *
 * @author Remi
 */
abstract class DBModel {
    //put your code here
    
    private $aliasSep = "$";
    
    // Override in children
    public function properties() {
        return null;
    }
    
    public function createSelectString($columnNames = null, $captureBetween = null, $afterArguments = null, $withAlias = true) {
        if(!isset($columnNames)) {
            $columnNames = $this->properties();
        }
        $isBetween = isset($captureBetween);
        $afterArgs = isset($afterArguments);
        $selectStr = "";
        foreach($columnNames as $columnName) {
            $selectStr .= ','.(($isBetween) ? $captureBetween.'(' : "").$this->addQuotesOnValue($this->tableName).'.'.$this->addQuotesOnValue($columnName).(($afterArgs) ? ' '.$afterArguments.' ' : "").(($isBetween) ? ')' : "").(($withAlias) ? ' AS '.$this->tableName.$this->aliasSep.$columnName : '');
        }
        return substr($selectStr, 1);
    }
    
    
    private function addQuotesOnValue($dotValue) {
        return '`'.$dotValue.'`';
    }
    
}

?>
