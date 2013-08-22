# CMAccountWebsite

> This repository contains the static content (JavaScript, CSS, Images) for the CyanogenMod Account website.

## Getting Started
This project uses Grunt and Bower to help simplify development.  To run Grunt and Bower, you will first need NodeJS installed.

Once you have NodeJS installed, install Grunt and Bower.

```shell
npm install -g grunt-cli bower
```

Once Grunt and Bower are installed, you will need to install Grunt's dependencies.

```shell
npm install
```

## Running the Development Server
You can start a development server using Grunt.  This allows you to make changes and test them against the CyanogenMod Account server.

```shell
grunt server
```

Once the development server is running, it can be accessed at [http://localhost:8080/](http://localhost:8080).

The development server watches for changes to HTML and JavaScript files and automatically reloads the application.

## Submitting patches or pull requests
The CyanogenMod project does not accept pull requests on GitHub.  Please submit all changes to our [Gerrit](http://r.cyanogenmod.org/) instance.
