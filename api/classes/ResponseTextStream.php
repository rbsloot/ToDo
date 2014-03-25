<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ResponseObj
 *
 * @author Remi
 */
class ResponseTextStream {
    //put your code here
    private $data;
    
    public function __construct($data) {
        $this->data = $data;
    }
    
    public function render() {
        $data = $this->data;
        $scriptT = $data['scriptTime'];
        $sleepT = $data['sleepTime'];
        $function = $data['func'];
        
        ob_end_clean();
        
        set_time_limit($scriptT);
        while(true) {
            header('Content-Type: text/event-stream');
            header('Cache-Control: no-cache');
            echo $function();
            
            ob_flush();
            flush();
            sleep($sleepT);
        }
    }
    
}

?>
