package com.frp.lab4.config

import com.frp.lab4.repository.UserRepository
import org.springframework.context.annotation.{Bean, Configuration}
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.core.userdetails.{User, UserDetailsService, UsernameNotFoundException}
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.web.SecurityFilterChain

@Configuration
class SecurityConfig {

  @Bean
  def passwordEncoder: BCryptPasswordEncoder = new BCryptPasswordEncoder()

  @Bean
  def securityFilterChain(http: HttpSecurity): SecurityFilterChain = {
    http
      .csrf(csrf => csrf.disable())
      .authorizeHttpRequests(auth => auth
        .requestMatchers("/api/auth/register", "/", "/index.html", "/static/**", "/manifest.json", "/favicon.ico").permitAll()
        .anyRequest.authenticated()
      )
      .httpBasic(Customizer.withDefaults())

    http.build()
  }

  @Bean
  def userDetailsService(userRepository: UserRepository): UserDetailsService = username => {
    val userEntity = userRepository.findByUsername(username)
    if (userEntity == null) {
      throw new UsernameNotFoundException(s"User '$username' not found")
    }

    User.builder()
      .username(userEntity.username)
      .password(userEntity.password)
      .roles("USER")
      .build()
  }
}