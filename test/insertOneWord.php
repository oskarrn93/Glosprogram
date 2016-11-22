<?php

    $dsn = 'mysql:dbname=glosprogram;host=localhost;charset=utf8';
    $username = 'glosprogram';
    $password = 'qVccjvnFcfvBv2cU';
    try
    {
        $db = new PDO($dsn, $username, $password); // also allows an extra parameter of configuration
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch(PDOException $e)
    {
        die('Could not connect to the database:<br/>' . $e);
    }

    $glosforhor = $_GET["glosforhor"];
    $lang_one = $_GET["lang_one"];
    $lang_two = $_GET["lang_two"];

    $statement = $db->prepare('INSERT INTO glosor(id, glosforhor, lang_one, lang_two, tid) VALUES (NULL, ?, ?, ?, NOW() )');

    $statement->bindValue(1, $glosforhor, PDO::PARAM_INT);
    $statement->bindValue(2, $lang_one, PDO::PARAM_STR);
    $statement->bindValue(3, $lang_two, PDO::PARAM_STR);
    $statement->execute();
?>
