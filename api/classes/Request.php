<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Request
 *
 * @author Remi
 */
class Request {
    /**
     * URL elements.
     *
     * @var array
     */
    public $url_elements = array();
    
    /**
     * The HTTP method used.
     *
     * @var string
     */
    public $method;
    
    /**
     * Any parameters sent with the request.
     *
     * @var array
     */
    public $parameters;
}

?>
