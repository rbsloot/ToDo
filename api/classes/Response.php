<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Response
 *
 * @author Remi
 */
class Response {
    /**
     * Constructor.
     *
     * @param string $data
     * @param string $format
     */
    public static function create($data, $format)
    {
        switch ($format) {
            case 'application/json':
            default:
                $obj = new ResponseJson($data);
            break;
        }
        return $obj;
    }
}

?>
