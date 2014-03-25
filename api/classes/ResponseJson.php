<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ResponseJson
 *
 * @author Remi
 */
class ResponseJson {
    /**
     * Response data.
     *
     * @var string
     */
    private $data;
    
    /**
     * Constructor.
     *
     * @param string $data
     */
    public function __construct($data)
    {
        $this->data = $data;
        return $this;
    }
    
    /**
     * Render the response as JSON.
     * 
     * @return string
     */
    public function render()
    {
        header('Content-Type: application/json');
        echo json_encode($this->data);
    }
}

?>
