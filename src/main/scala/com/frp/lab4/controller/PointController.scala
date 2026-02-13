package com.frp.lab4.controller

import com.frp.lab4.dto.PointRequest
import com.frp.lab4.entity.PointEntity
import com.frp.lab4.repository.{PointRepository, UserRepository}
import com.frp.lab4.service.AreaCheckService
import org.springframework.data.domain.{Page, Pageable}
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation._

import java.util.Date

@RestController
@RequestMapping(Array("/api/points"))
class PointController(
                       pointRepo: PointRepository,
                       userRepo: UserRepository,
                       checkService: AreaCheckService
                     ) {

  @GetMapping
  def getPoints(@AuthenticationPrincipal userDetails: UserDetails, pageable: Pageable): Page[PointEntity] = {
    val user = userRepo.findByUsername(userDetails.getUsername)
    pointRepo.findAllByUser(user, pageable)
  }

  @PostMapping
  def addPoint(@RequestBody req: PointRequest, @AuthenticationPrincipal userDetails: UserDetails): ResponseEntity[_] = {
    try {
      checkService.validate(req)

      val startTime = System.nanoTime()
      val isHit = checkService.check(req.x, req.y, req.r)
      val endTime = System.nanoTime()

      val point = new PointEntity
      point.x = req.x
      point.y = req.y
      point.r = req.r
      point.hit = isHit
      point.checkDate = new Date()
      point.executionTime = (endTime - startTime)
      point.user = userRepo.findByUsername(userDetails.getUsername)

      val savedPoint = pointRepo.save(point)
      ResponseEntity.ok(savedPoint)

    } catch {
      case e: IllegalArgumentException =>
        ResponseEntity.badRequest().body(java.util.Map.of("error", e.getMessage))
    }
  }

  @DeleteMapping
  @Transactional
  def clearPoints(@AuthenticationPrincipal userDetails: UserDetails): ResponseEntity[Void] = {
    val user = userRepo.findByUsername(userDetails.getUsername)
    pointRepo.deleteByUser(user)
    ResponseEntity.ok().build()
  }
}