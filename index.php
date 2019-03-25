<!DOCTYPE html>
<html lang="en" ng-app="myNinjaApp">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">    
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>try AngularJS from TheNetNinja</title>
        <link rel="stylesheet" href="content/css/styles.css" type="text/css">
        <script src="app/lib/angular.min.js"></script>
        <script src="app/lib/angular-route.min.js"></script>
        <script src="app/lib/angular-animate.min.js"></script>
        <script src="app/app.js"></script>
    </head>
    <body>
        <header ng-include="'header.html'"></header>        
        <main ng-view></main>
    </body>
</html>