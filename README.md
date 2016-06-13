# Bona-Petite



## Benefits of Bona Petite

Bona Petite is a computer system maintained by an Arduino micro-controller, and a RaspberryPi motherboard. It has built in sensors to collect temperature and electrical conductivity data of a solution. Bona Petite is smart and connected to the Bona Petite web app. Alert notifications via email when ideal conditions are not met

######FUTURE DEVELOPMENTS

SMS update feature

System solar panel for power

Increase test coverage


## Code Example

*Show what the library does as concisely as possible, developers should be able to figure out* **how** *your project solves their problem by looking at the code example. Make sure the API you are showing off is obvious, and that your code is short and concise.*



## The Solution
Air temperature and nutrient levels are all maintained via an Arduino board. The Arduino is networked to a Raspberry Pi using I2C to allow all system parameters to be monitored and updated. The Raspberry Pi is further used to maintain a historical log of all the systems running data and make it available via an API. A companion web app interacts with the Raspberry Pi allowing monitoring of your entire system from anywhere in the world. An email alert system will notify you if levels change from expected



## Installation

*Provide code examples and explanations of how to get the project.*



## API Reference

The API reference for Bona Petite's web app is located here:

http://bonapetite.herokuapp.com/api/

The API holds information on users, and sensor data. Both API's are built on the Django REST framework. The users database includes each user's URL, registration name, and email address. The sensors database nicknamed "mister" includes a user identification number, a reading for electrical conductivity, a reading for temperature, and the time the information was collected.

The API reference for the Bona Petite computer system is located here:

https://github.com/TIY-BonaPetite/arduino_scripts

This includes all materials associated with hardware development. In this repository you will find; a bill of materials for the project, a schematic for the Arduino circuit, a visual pattern to follow for circuit development, all of the Arduino C scripts used in development, and the Python bridge program.



## Tests

*Describe and show how to run the tests with code examples.*



## Contributors

*Let people know how they can dive into the project, include important links to things like issue trackers, irc, twitter accounts if applicable.*



## License

*A short snippet describing the license (MIT, Apache, etc.)*
