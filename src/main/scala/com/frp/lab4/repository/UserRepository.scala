package com.frp.lab4.repository

import com.frp.lab4.entity.UserEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
trait UserRepository extends JpaRepository[UserEntity, java.lang.Long] {
  def findByUsername(username: String): UserEntity
}