<?php

/**
 * Generic class autoloader.
 * 
 * @param string $class_name
 */
function autoload_class($class_name) {
    $directories = array(
        'classes/',
        'classes/controllers/',
        'classes/models/',
        'classes/database/'
    );
    foreach ($directories as $directory) {
        $filename = $directory . $class_name . '.php';
        if (is_file($filename)) {
            require($filename);
            break;
        }
    }
}

/**
 * Register autoloader functions.
 */
spl_autoload_register('autoload_class');

/**
 * Parse the incoming request.
 */
$request = new Request();
if (isset($_SERVER['PATH_INFO'])) {
    $request->url_elements = explode('/', trim($_SERVER['PATH_INFO'], '/'));
}
$request->method = strtoupper($_SERVER['REQUEST_METHOD']);
switch ($request->method) {
    case 'GET':
        $request->parameters = $_GET;
    break;
    case 'POST':
        $request->parameters = $_POST;
    break;
    case 'PUT':
        parse_str(file_get_contents('php://input'), $request->parameters);
    break;
    case 'DELETE':
        $request->parameters = array();
    break;
}

/**
 * Route the request.
 */
if (!empty($request->url_elements)) {
    $controller_name = ucfirst($request->url_elements[0]) . 'Controller';
    if (class_exists($controller_name)) {
        $dbconfig = include 'classes/database/DatabaseConfig.php';
        try {
            $dbcon = new DatabaseConnection($dbconfig['settings']);

            if(isset($request->parameters['token'])) {
                $userController = new UserController($dbcon);
                $user = $userController->getUserByToken($request);
                if(isset($user)) {
                    $request->parameters['_user'] = $user;
                } else {
                    // No user found for token
                    header(BaseController::$HEADERS[404]);
                    echo "Invalid token";
                    return;
                }
            }
            
            $controller = new $controller_name($dbcon);
            $action_name = (isset($request->url_elements[1])) ? strtolower($request->url_elements[1]) : strtolower($request->method);
            $response_str = call_user_func_array(array($controller, $action_name), array($request));
        } catch(Exception $e) {
            header(BaseController::$HEADERS[500]);
            echo $e->getMessage();
            return;
        }
    }
    else {
        //header('HTTP/1.1 404 Not Found');
        header(BaseController::$HEADERS[404]);
        $response_str = 'Unknown request: ' . $request->url_elements[0];
    }
}
else {
    $response_str = 'Unknown request';
}

/**
 * Send the response to the client.
 */
$response_obj = Response::create($response_str, $_SERVER['HTTP_ACCEPT']);
echo $response_obj->render();
?>