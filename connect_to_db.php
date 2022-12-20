  <?php
  // header("content-type: text/html; charset=utf-8");
  $host = "db"; // the hostname "db" from our compose.yml file
  $username = "root"; // we use the root 
  // TODO: store pw as secret when migrating to production!
  $pw = "mexigo!root!pw"; // the password we set as env variable

  $conn = new mysqli($host, $username, $pw);

  if($conn->connect_errno > 0){
      echo "Debug print: MySQL Connection failed: " . $conn->connect_error;
  } else {
      echo "Debug print: MySQL Connection successful\n\n";
  }