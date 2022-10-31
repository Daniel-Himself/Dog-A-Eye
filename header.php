<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>

    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/dataTables.bootstrap5.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">

    <!-- Fonts -->
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Raleway:300,400,600" rel="stylesheet" type="text/css">

    <!--    local css stylesheet-->
    <link rel="stylesheet" href="css/style.css">

    <!-- Favicon -->
    <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon">
    <link rel="icon" href="/images/favicon.ico" type="image/x-icon">

    <!-- jQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/dataTables.bootstrap5.min.js"></script>

    <!-- local JS file -->
    <script src="scripts.js"></script>
    <title>Recipes</title>
</head>
<body>
<header class="m-xxl-5">
    <!-- Navbar new -->
    <nav
        class="navbar navbar-expand-lg navbar-dark py-3 fixed-top pb-2 bg-dark"
    >
        <a href="index.php" class="navbar-brand"
        >Ali and Daniel's Recipe Book</a>
        <div class="collapse ml-auto navbar-collapse" id="navmenu">
            <ul class="navbar-nav ms-auto">
                <?php if(!isset($_SESSION['user_email'])) { ?>
                    <li class="nav-item">
                        <a href="registration_page.php" class="nav-link">Sign Up</a>
                    </li>
                    <li class="nav-item">
                        <a href="login_page.php" class="nav-link">Login</a>
                    </li>
                <?php } else { ?>
                    <li class="nav-item">
                        <a href="logout.php" class="nav-link">Logout</a>
                    </li>
                <?php } ?>
            </ul>
        </div>
        <button
            class="navbar-toggler ml-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
    </nav>
</header>