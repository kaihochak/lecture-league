# lecture-league

<p align="center">
  <img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/front1.png" alt="HomeScreen" width="600">
</p>

## Description

**Lecture League** is a dynamic and responsive web application that serves as a platform for students to review and rate academic courses. This project is an evolution of the original "Rate My Course" app, which can be found [here](https://github.com/mrmallam/Rate_My_Course). My contribution to this earlier version was primarily focused on the backend development, along with frontend features such as the search bar and API services.

<p align="center">
  <img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/frontold.png" alt="HomeScreen" width="400">
  <img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/front1.png" alt="HomeScreen" width="400">
</p>


For Lecture League, I undertook a comprehensive redesign of the frontend, greatly enhancing the user experience and user interface. The new UX/UI is crafted with meticulous attention to detail, providing a seamless and intuitive experience for users. More details about the UX/UI changes and their impact are available in the "Usage" section of this documentation.

Under the hood, Lecture League is built using a robust stack that includes React JS, Tailwind CSS for responsive design, Django as the backend framework, and SQLite for database management. The app is specifically designed for students to share their insights and feedback on various courses, fostering an informed and engaged academic community.

In terms of deployment, the application is fully containerized using Docker. This encapsulation includes separate containers for the Frontend, Backend, and NGINX, ensuring streamlined deployment and scalability. To stay updated with the latest developments and enhancements of Lecture League, please visit my website: [kaihochak.github](https://kaihochak.github).


## Installation

Since the app is for demonstration purposes only and is not deployed, follow these steps to set it up:

1. Navigate to the root folder where the `docker-compose.yml` file is located.
2. Run the following commands: `docker-compose up --build`
3. Access the application at `localhost:3000`.
   
### Admin Page
For the admin page, visit `localhost/admin`.

**Credentials:**
- Username: `kai`
- Password: `123`

**Note:** From the admin page, you can manage users, reviews, add universities, add courses, and everything els

## Usage

To understand how to use the app and its features, refer to the below images. The app includes the following screens:

- HomeScreen

<img src="https://github.com/kaihochak/PickAFilm/blob/master/assets/images/RPReplay_Final1693035745.gif?raw=true" alt="HomeScreen" width="300">

- FilmScreen

<img src="https://github.com/kaihochak/PickAFilm/blob/master/assets/images/RPReplay_Final1693035745%203.gif?raw=true" alt="FilmScreen" width="300">

- PersonScreen

<img src="https://github.com/kaihochak/PickAFilm/blob/master/assets/images/RPReplay_Final1693035745%204.gif?raw=true" alt="PersonScreen" width="300">

- SearchScreen

<img src="https://github.com/kaihochak/PickAFilm/blob/master/assets/images/RPReplay_Final1693035745%202.gif?raw=true" alt="SearchScreen" width="300">

The app also supports light mode.

<img src="https://github.com/kaihochak/PickAFilm/blob/master/assets/images/RPReplay_Final1693036385.gif?raw=true" alt="lightMode" width="300">

## Contributing

While contributions are appreciated, please note that this project is primarily intended for showcasing purposes. If you're interested in contributing, consider waiting for the upcoming version with more functionalities.

## Credits

- The original inspiration for this project came from [this repository](https://github.com/syednomishah/Movie-App-React-Native), although significant modifications have been made.
- TMDB API is utilized for fetching film information.

## Contact Information

- GitHub: [kaihochak](https://github.com/kaihochak)
- Portfolio: [kaihochak.github.io](https://kaihochak.github.io/)
