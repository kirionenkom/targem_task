<?php
$link = new PDO("mysql:host=localhost;dbname=targem", "root", "admin");
$link->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$link->query("DROP TABLE IF EXISTS players;
          CREATE TABLE players (nick VARCHAR(50), email VARCHAR(50), registered INTEGER, status VARCHAR(4));");


$row = 0;
if (($handle = fopen("data.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
        $row++;
        if ($row == 1) {
            continue;
        }
        $milliseconds = strtotime($data[2]);
        $query = "INSERT INTO players (nick, email, registered, status) VALUES ('$data[0]', '$data[1]', $milliseconds, '$data[3]');";
        $link->query($query);
    }
    fclose($handle);
}

$query = "SELECT nick, email, registered, status FROM players WHERE status = 'On';";
foreach ($link->query($query) as $row) {
    print $row['nick'] . "\t";
    print $row['email'] . "\t";
    print $row['registered'] . "\t";
    print $row['status'] . "\n";
}
