# lecture-league

<p align="center">
  <img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/front1.png" alt="HomeScreen" width="600">
</p>

## Description

**Lecture League** is a dynamic and responsive web application that serves as a platform for students to review and rate academic courses. This project is an evolution of **the original "Rate My Course" app**, which can be found [here](https://github.com/mrmallam/Rate_My_Course). My contribution to this earlier version was primarily focused on the backend development, along with frontend features such as the search bar and API services.

The inception was driven by a pressing need to address the time constraints that impacted our earlier design. The original version, while functional, had several frontend aspects that we couldn't fully develop due to limited time. Recognizing this, I spearheaded a comprehensive redesign of the frontend, with a specific focus on enhancing the user experience and interface. This redesign wasn't just an aesthetic overhaul; it was a strategic move to incorporate and complete the essential frontend features that our team initially envisioned but couldn't implement.

<p align="center">
  <img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/frontold.png" alt="HomeScreen" width="500">
  <img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/front1.png" alt="HomeScreen" width="500">
</p>

In Lecture League, the user experience and interface have been reimagined and executed with a high level of precision and attention to detail, making the application more intuitive and user-friendly. Further information about the specific UX/UI improvements can be found in the "Usage" section of this documentation.

The tech stack for Lecture League includes React JS, Tailwind CSS, Django, and SQLite, creating a robust and scalable application. The primary aim of the app remains to serve as a platform for students to review and discuss academic courses, fostering a collaborative and informed educational community.

For deployment purposes, Lecture League is fully containerized using Docker, segregated into Frontend, Backend, and NGINX containers. This setup ensures efficient deployment and scalability. Stay updated with the latest developments of Lecture League by visiting the personal website: https://kaihochak.github.io/

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

**Note:** From the admin page, you can manage users, reviews, add universities, add courses, and everything else

## Usage

To understand how to use the app and its features, refer to the below images. The app includes the following screens:

- Home Screen

<table align="center">
  <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/front1.png" alt="HomeScreen" height="450"></td>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/frontm1.png" alt="HomeScreen Mobile" height="450"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/front2.png" alt="HomeScreen" height="450"></td>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/frontm2.png" alt="HomeScreen Mobile" height="450"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/front3.png" alt="HomeScreen" height="450"></td>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/frontm3.png" alt="HomeScreen Mobile" height="450"></td>
  </tr>
</table>

<!-- Original Design -->
<p align="center">
  <img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/frontold.png" alt="Original HomeScreen" height="450">
</p>


- University Screen 

<table align="center">
  <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/uni1.png" alt="HomeScreen" height="450"></td>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/unim1.png" alt="HomeScreen Mobile" height="450"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/uni2.png" alt="HomeScreen" height="450"></td>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/unim2.png" alt="HomeScreen Mobile" height="450"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/uni3.png" alt="HomeScreen" height="450"></td>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/unim3.png" alt="HomeScreen Mobile" height="450"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/uni4.png" alt="HomeScreen" height="450"></td>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/unim4.png" alt="HomeScreen Mobile" height="450"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/uni5.png" alt="HomeScreen" height="450"></td>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/unim5.png" alt="HomeScreen Mobile" height="450"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/uni6.png" alt="HomeScreen" height="450"></td>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/unim6.png" alt="HomeScreen Mobile" height="450"></td>
  </tr>
</table>

<!-- Original Design -->
<p align="center">
  <img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/uniold.png" alt="Original HomeScreen" height="450">
</p>

- Course Screen

<table align="center">
  <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/course1.png" alt="HomeScreen" height="450"></td>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/coursem1.png" alt="HomeScreen Mobile" height="450"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/course2.png" alt="HomeScreen" height="450"></td>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/coursem2.png" alt="HomeScreen Mobile" height="450"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/course3.png" alt="HomeScreen" height="450"></td>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/coursem3.png" alt="HomeScreen Mobile" height="450"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/course4.png" alt="HomeScreen" height="450"></td>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/coursem4.png" alt="HomeScreen Mobile" height="450"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/course5.png" alt="HomeScreen" height="450"></td>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/coursem5.png" alt="HomeScreen Mobile" height="450"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/course6.png" alt="HomeScreen" height="450"></td>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/coursem6.png" alt="HomeScreen Mobile" height="450"></td>
  </tr>
    <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/course7.png" alt="HomeScreen" height="450"></td>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/coursem7.png" alt="HomeScreen Mobile" height="450"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/course8.png" alt="HomeScreen" height="450"></td>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/coursem8.png" alt="HomeScreen Mobile" height="450"></td>
  </tr>
</table>

<!-- Original Design -->
<p align="center">
  <img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/courseold.png" alt="Original HomeScreen" height="450">
</p>

- Review Screen


<table align="center">
  <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/review1.png" alt="HomeScreen" height="450"></td>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/reviewm1.png" alt="HomeScreen Mobile" height="450"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/review2.png" alt="HomeScreen" height="450"></td>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/reviewm2.png" alt="HomeScreen Mobile" height="450"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/review3.png" alt="HomeScreen" height="450"></td>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/reviewm3.png" alt="HomeScreen Mobile" height="450"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/review4.png" alt="HomeScreen" height="450"></td>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/reviewm4.png" alt="HomeScreen Mobile" height="450"></td>
  </tr>
</table>

<!-- Original Design -->
<p align="center">
  <img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/reviewold.png" alt="Original HomeScreen" height="450">
</p>

- Profile Screen


<table align="center">
  <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/profile1.png" alt="HomeScreen" height="450"></td>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/profilem1.png" alt="HomeScreen Mobile" height="450"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/profile2.png" alt="HomeScreen" height="450"></td>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/profilem2.png" alt="HomeScreen Mobile" height="450"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/profile3.png" alt="HomeScreen" height="450"></td>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/profilem3.png" alt="HomeScreen Mobile" height="450"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/profile4.png" alt="HomeScreen" height="450"></td>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/profilem4.png" alt="HomeScreen Mobile" height="450"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/profile5.png" alt="HomeScreen" height="450"></td>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/profilem5.png" alt="HomeScreen Mobile" height="450"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/profile6.png" alt="HomeScreen" height="450"></td>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/profilem6.png" alt="HomeScreen Mobile" height="450"></td>
  </tr>
    <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/profile7.png" alt="HomeScreen" height="450"></td>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/profilem7.png" alt="HomeScreen Mobile" height="450"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/profile8.png" alt="HomeScreen" height="450"></td>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/profilem8.png" alt="HomeScreen Mobile" height="450"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/profile9.png" alt="HomeScreen" height="450"></td>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/profilem9.png" alt="HomeScreen Mobile" height="450"></td>
  </tr>
</table>

<!-- Original Design -->
<table align="center">
  <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/profileold.png" alt="HomeScreen" height="450"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/profileold2.png" alt="HomeScreen" height="450"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/kaihochak/lecture-league/blob/main/screenshots/profileold3.png" alt="HomeScreen" height="450"></td>
  </tr>
</table>

## Contributing

Contributions to Lecture League are welcome! If you are interested in contributing to this project, please feel free to reach out to me. You can contact me via email at [jacobchakkaiho@gmail.com](mailto:jacobchakkaiho@gmail.com). I'm always open to collaboration and eager to incorporate new ideas and perspectives to enhance the application further.

## Credits

Lecture League has been a journey of learning and growth, made possible by the foundational efforts of my peers in the "Rate My Course" project. I am grateful for their contributions and would like to acknowledge each one for their unique role: 

- **Mohammed Allam**
- **Haris Ahmad**
- **Anish Pokhrel**
- **Haider Tawfik**
- **Yiannis Hontzias**


### Inspiration

The development of Lecture League was also inspired by the following platforms, which have set high standards in course and professor rating systems:

- [Rate My Courses](https://www.ratemycourses.io/)
- [Rate My Professors](https://www.ratemyprofessors.com/)

### Acknowledgements

Special thanks to Professor Steve Sutcliffe and TA Seyed Nami Modarressi from the SENG 513 Web-Based Systems course at the University of Calgary in 2023. Their immense support, guidance, and expertise have been pivotal in the evolution of this project.


## Contact Information

- GitHub: [kaihochak](https://github.com/kaihochak)
- Portfolio: [kaihochak.github.io](https://kaihochak.github.io/)
