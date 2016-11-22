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

    $data   = json_decode($_GET["data"], true);


    //echo nl2br("glosforhor: ".$data[sizeof($data)-1]["glosforhor"]."\n");
    $glosforhorID = $data[sizeof($data)-1]["glosforhor"];
    for($a = 0; $a < sizeof($data) - 1; $a++)
    {
        //echo nl2br($data[$a]["lang1"]." ".$data[$a]["lang2"]."\n");
        insertIntoDatabaseGlosor($db, $glosforhorID, $data[$a]["lang1"] , $data[$a]["lang2"]);
    }

    function insertIntoDatabaseGlosor($db, $glosforhor, $lang_one , $lang_two)
    {
        $statement = $db->prepare('INSERT INTO glosor(id, glosforhor, lang_one, lang_two, tid) VALUES (NULL, ?, ?, ?, NOW() )');

        $statement->bindValue(1, $glosforhor, PDO::PARAM_INT);
        $statement->bindValue(2, $lang_one, PDO::PARAM_STR);
        $statement->bindValue(3, $lang_two, PDO::PARAM_STR);
        $statement->execute();
    }
?>
