<?php
    require("credentials.php");

    try {
        $db = new PDO($dsn, $username, $password); // also allows an extra parameter of configuration
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch(PDOException $e) {
        die('Could not connect to the database:<br/>' . $e);
    }

    if(isset($_GET["glosforhor"]))
    {
         $glosID = $_GET["glosforhor"];
         printGlosor($db, $glosID);
    }

    /*if(isset($_GET["insertGlosforhor"]))
    {
        /*$glosforhor = $_GET["insertGlosforhor"];
        $lang_one   = $_GET["lang_one"];
        $lang_two   = $_GET["lang_two"];

        insertIntoDatabaseGlosor($db, $glosforhor, $lang_one , $lang_two);
        insertIntoDatabaseGlosor($db, 1, "barn" , "children");*/

       /* $glosforhor = $_GET["insertGlosforhor"];
        $data   = json_decode($_GET["data"]);

        foreach ($data as $value)
        {
            insertIntoDatabaseGlosor($db, $glosforhor, $value["lang1"] , $value["lang2"]);
            //echo $value["lang1"] . " : " + $value["lang2"] . "   :::    ";
        }

    }*/

    function printGlosor($db, $glosID)
    {
        $statement = $db->prepare('SELECT * FROM glosor WHERE glosforhor=?');

        $statement->bindValue(1, $glosID, PDO::PARAM_INT);
        $statement->execute();

        $results = $statement->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($results);
    }
   /* function insertIntoDatabaseGlosor($db, $glosforhor, $lang_one , $lang_two)
    {
        $statement = $db->prepare('INSERT INTO glosor(id, glosforhor, lang_one, lang_two, tid) VALUES (NULL, ?, ?, ?, NOW() )');

        $statement->bindValue(1, $glosforhor, PDO::PARAM_INT);
        $statement->bindValue(2, $lang_one, PDO::PARAM_STR);
        $statement->bindValue(3, $lang_two, PDO::PARAM_STR);
        $statement->execute();
    }*/
?>
