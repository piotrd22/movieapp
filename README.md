# movieapp

The app is a simple version of the movie library where you can log in, leave reviews and check out the best movies. In addition, the application is equipped with an administrator panel where we can moderate the content of the website.

The project was aimed at securing login with the OAuth 2.0 standard (with Keycloak) and dockerization of the entire application. In addition, the application uses Nginx (static frontend and reverse proxy for the backend).

Technologies used:

Backend:
- Java, Spring Boot, Spring Data Jpa, Spring Security, Postgres

Authorization server:
- Keycloak with Postgres

Frontend:
- JavaScript, React, Tailwind

Future improvements:
- I would like the application to eventually use K8s