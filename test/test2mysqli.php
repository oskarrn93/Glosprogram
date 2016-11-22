    <?php

        //if(!isset($_GET["glosforhor"]))
        //    return;

         //$glosID = mysql_real_escape_string(trim($_GET['glosforhor']));
         $glosID = $_GET["glosforhor"];
         echo "asd: ".$glosID;
        //$hurr = $_GET["glosforhor"];

        //Open a new connection to the MySQL server
        $mysqli = new mysqli('localhost','glosprogram','qVccjvnFcfvBv2cU','glosprogram');

        //Output any connection error
        if ($mysqli->connect_error) {
            die('Error : ('. $mysqli->connect_errno .') '. $mysqli->connect_error);
        }

        if ($stmt = $mysqli->prepare("SELECT * FROM glosor WHERE glosforhor=?"))
        {
            /* bind parameters for markers */
            $stmt->bind_param("i", $glosID);

            /* execute query */
            $stmt->execute();

            /* bind result variables */
            $stmt->bind_result($array);

            /* fetch value */
            //$stmt->fetch();


            while ($stmt->fetch()) {
              foreach($row as $key => $val) {
                $x[$key] = $val;
              }
              $results[] = $x;
            }

            foreach($results as $val)
            {
                echo("arr: " . $val);
            }


            /* close statement */
            $stmt->close();
        }

        //MySqli Select Query
        //$results = $mysqli->query("SELECT lang_one, lang_two FROM glosor WHERE glosforhor = '$hurr')");

        /*print '<table border="1">';
        while($row = $results->fetch_assoc()) {
            print '<tr>';
            print '<td>'.$row["lang_one"].'</td>';
            print '<td>'.$row["lang_two"].'</td>';
            print '</tr>';
        }
        print '</table>';

        // Frees the memory associated with a result
        $results->free();
*/
        // close connection
        $mysqli->close();


    ?>
