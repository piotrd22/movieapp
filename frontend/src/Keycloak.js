import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://keycloak:8080",
  realm: "SpringReactKeycloak",
  clientId: "spring-react-keycloak-client",
});

export default keycloak;
