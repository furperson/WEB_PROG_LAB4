package com.frp.lab4.controller

import com.frp.lab4.dto.AuthRequest
import com.frp.lab4.entity.UserEntity
import com.frp.lab4.repository.UserRepository
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.web.bind.annotation._

@RestController
@RequestMapping(Array("/api/auth"))
class AuthController(userRepo: UserRepository, passwordEncoder: BCryptPasswordEncoder) {

  @PostMapping(Array("/register"))
  def register(@RequestBody req: AuthRequest): ResponseEntity[String] = {
    if (userRepo.findByUsername(req.username) != null) {
      return ResponseEntity.badRequest().body("Error: User already exists")
    }

    val newUser = new UserEntity
    newUser.username = req.username
    newUser.password = passwordEncoder.encode(req.password)

    userRepo.save(newUser)
    ResponseEntity.ok("User registered successfully")
  }

  @GetMapping(Array("/user"))
  def getCurrentUser(@AuthenticationPrincipal user: UserDetails): ResponseEntity[String] = {
    ResponseEntity.ok(user.getUsername)
  }
}