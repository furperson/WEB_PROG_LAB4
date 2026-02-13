package com.frp.lab4.repository

import com.frp.lab4.entity.{PointEntity, UserEntity}
import org.springframework.data.domain.{Page, Pageable}
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
trait PointRepository extends JpaRepository[PointEntity, java.lang.Long] {
  def findAllByUser(user: UserEntity, pageable: Pageable): Page[PointEntity]
  def deleteByUser(user: UserEntity): Unit
}