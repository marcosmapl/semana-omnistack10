# Dev Radar

> Tool for find Developers that are 10 KM near of a search area and use some required technologies.

> \#semanaomnistack \#rocketseat \#Node.js \#ReactJST \#ReactNative \#MongoDB \#express \#axios \#socket.io

This project was developed during the *10th OmniStack Week* promoted by *Rocketseat*, whose objective was to present the Node.js, ReactJS and React Native technologies, developing a complete application (Back-end, Front-end and Mobile) from zero.

Back-end was built using Node.js and Express. It makes use of the MongoDB database through the Mongoose (data model objects). Axios was used for HTTP requests and JSON protocol is used for data trade. GitHub API is used for obtain some informations about the developer (Avatar, Bio, Name, Location). And for real-time communication between the Back-end and all clients, Socket.io was used.

Frontend is a web application made in ReactJS. It allows the registration of developers on the platform, informing his GitHub username, all technologies he uses and his latitude and longitude. Displays a list of all developers registered on the platform.

The Mobile application was developed using React Native and Expo (for build and deploy for iOS and Android). It displays a map (Google Map) for choosing a initial location for search and a input field where the desired technologies must be inserted. After the search, all developers, within a radius of 10 km, who use any of the desired technologies, are displayed on the map.

![](header.png)

## Usage example

## Running Back-end

To run Back-end application, navigate to 'backend/' folder and run the command:

```sh
yarn dev
```

and wait Nodemon puts application up.

## Running Front-end

To run Front-end web application, navigate to 'web/' folder and run the command:

```sh
yarn start
```

and wait until compilation ends. 

After it the web application will appears in a tab on your default web browser. Otherwise, open your browser and access `http://localhost:3333/`

## Running Mobile App

To run Mobile App we use `Expo`, navigate to 'web/' folder and run the command:

```sh
yarn start
```

and wait until compilation ends. 

After it the web application will appears in a tab on your default web browser. Otherwise, open your browser and access `http://localhost:3333/`

_For more examples and usage, please refer to the [Wiki][wiki]._

## Development setup

Describe how to install all development dependencies and how to run an automated test-suite of some kind. Potentially do this for multiple platforms.

```sh
make install
npm test
```

## Release History

* 0.0.1
    * Work in progress

## Meta

Marcos Lima – [@marcosmapl](linkedin.com/in/marcosmapl) – marcos.lima@icomp.ufam.edu.br

[See project on GitHub](https://github.com/marcosmapl/semana-oministack10/)

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2015 © <a href="http://fvcproductions.com" target="_blank">FVCproductions</a>.

## Contributing

1. Fork it (<https://github.com/marcosmapl/semana-oministack10/>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

<!-- Markdown link & img dfn's -->
[wiki]: https://github.com/marcosmapl/semana-oministack10/wiki
