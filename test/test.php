<!DOCTYPE html>
<html lang="se">

<meta charset="UTF-8">
<title>Test</title>
<body>

    asdasdasd


    <?php
        echo nl2br(" \n \n ");

        echo " hej åäö \r\n";

        echo nl2br(" \n \n ");


        if(isset($_GET["a"]))
            echo "a is : ".$_GET["a"];
        else
            echo "a is not set\n";

        echo nl2br(" \n \n ");

        $conn = mysql_connect("localhost","glosprogram","qVccjvnFcfvBv2cU") or die ("Problem connecting to DataBase");
        mysql_select_db("glosprogram", $conn);
        mysql_query("set names 'utf8'");


        echo nl2br(" \n \n ");

        $query = "SELECT * FROM glosor";
        $result = mysql_query($query, $conn) or die(mysql_error());

        if ($result)
        {
            echo "Hittade följande Poster i tabellen:<br><p></p>";
            echo "<table width=90% align=center border=1><tr>
            <td align=center bgcolor=#c4c4c7>ID</td>
            <td align=center bgcolor=#c4c4c7>Lang1</td>
            <td align=center bgcolor=#c4c4c7>Lang2</td>
            <td align=center bgcolor=#c4c4c7>Tid</td>
            </tr>";

            while ($r = mysql_fetch_array($result))
            {
                $id = $r["id"];
                $lang1 = $r["lang1"];
                $lang2 = $r["lang2"];
                $tid = $r["tid"];

                echo "<tr>
                <td align=center>$id</td>
                <td align=center>$lang1</td>
                <td align=center>$lang2</td>
                <td align=center>$tid</td>
                </tr>";
            }
            echo "</table>";
        }
        else
        {
            echo "No data.";
        }

        echo nl2br(" \n \n ");

        $query = "SELECT * FROM glosforhor";
        $result = mysql_query($query, $conn) or die(mysql_error());

        if ($result)
        {
            echo "Hittade följande Poster i tabellen:<br><p></p>";
            echo "<table width=90% align=center border=1><tr>
            <td align=center bgcolor=#c4c4c7>ID</td>
            <td align=center bgcolor=#c4c4c7>Tid</td>
            </tr>";

            while ($r = mysql_fetch_array($result))
            {
                $id = $r["id"];
                $tid = $r["tid"];

                echo "<tr>
                <td align=center>$id</td>
                <td align=center>$tid</td>
                </tr>";
            }
            echo "</table>";
        }
        else
        {
            echo "No data.";
        }

        echo nl2br(" \n \n ");

        $query = "SELECT * FROM glosforhor";
        $result = mysql_query($query, $conn) or die(mysql_error());

        if ($result)
        {
            echo "Hittade följande Poster i tabellen:<br><p></p>";
            echo "<table width=90% align=center border=1><tr>
            <td align=center bgcolor=#c4c4c7>ID</td>
            <td align=center bgcolor=#c4c4c7>Lang1</td>
            <td align=center bgcolor=#c4c4c7>Lang2</td>
            <td align=center bgcolor=#c4c4c7>Tid</td>
            <td align=center bgcolor=#c4c4c7>Glosforhor ID</td>
            </tr>";

            while ($r = mysql_fetch_array($result))
            {

                $glosID = $r["id"];
                $query2 = "SELECT * FROM glosor WHERE glosforhor='$glosID'";
                $result2 = mysql_query($query2, $conn) or die(mysql_error());

                if ($result2)
                {
                    while ($r2 = mysql_fetch_array($result2))
                    {
                        $id = $r2["id"];
                        $lang1 = $r2["lang1"];
                        $lang2 = $r2["lang2"];
                        $tid = $r2["tid"];

                        echo "<tr>
                        <td align=center>$id</td>
                        <td align=center>$lang1</td>
                        <td align=center>$lang2</td>
                        <td align=center>$tid</td>
                        <td align=center>$glosID</td>

                        </tr>";
                    }
                }
            }
            echo "</table>";
        }
        else
        {
            echo "No data.";
        }

    ?>

</body>
</html>
