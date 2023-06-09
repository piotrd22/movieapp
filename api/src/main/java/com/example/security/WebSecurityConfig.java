package com.example.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    public static final String ADMIN = "admin";
    public static final String USER = "user";

    private final JwtAuthConverter jwtAuthConverter;

    public WebSecurityConfig(JwtAuthConverter jwtAuthConverter) {
        this.jwtAuthConverter = jwtAuthConverter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests()
                .requestMatchers(HttpMethod.POST, "/review/**").hasAnyRole(USER, ADMIN)
                .requestMatchers(HttpMethod.PUT, "/review/**").hasAnyRole(USER, ADMIN)
                .requestMatchers(HttpMethod.DELETE, "/review/**").hasAnyRole(USER, ADMIN)
                .requestMatchers(HttpMethod.POST, "/movie/**").hasRole(ADMIN)
                .requestMatchers(HttpMethod.DELETE, "/movie/**").hasRole(ADMIN)
                .requestMatchers(HttpMethod.PUT, "/movie/**").hasRole(ADMIN)
                .requestMatchers(HttpMethod.PUT, "/user/**").hasAnyRole(USER, ADMIN)
                .requestMatchers(HttpMethod.DELETE, "/user/**").hasAnyRole(USER, ADMIN)
                .requestMatchers("/", "/**").permitAll()
                .anyRequest().authenticated();
        http.oauth2ResourceServer()
                .jwt()
                .jwtAuthenticationConverter(jwtAuthConverter);
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.cors().and().csrf().disable();
        return http.build();
    }

}
