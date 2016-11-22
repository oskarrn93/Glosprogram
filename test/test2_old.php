    <?php

        if(!isset($_GET["glosforhor"]))
            return;

        $conn = mysql_connect("localhost","glosprogram","qVccjvnFcfvBv2cU") or die ("Problem connecting to DataBase");
        mysql_select_db("glosprogram", $conn);
        mysql_query("set names 'utf8'");


        $query = "SELECT lang_one, lang_two FROM glosor WHERE glosforhor='$_GET[glosforhor]'";
        $result  = mysql_query($query, $conn) or die(mysql_error());

        echo nl2br(" \n \n ");


        if ($result)
        {

            $array = mysql_fetch_array($result);
            echo json_encode($array);

        }
        else
        {
            echo "No data.";
        }

    ?>
