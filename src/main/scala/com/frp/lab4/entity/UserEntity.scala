package com.frp.lab4.entity

import jakarta.persistence._
import scala.beans.BeanProperty

@Entity
@Table(name = "users")
class UserEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @BeanProperty var id: Long = _

  @Column(unique = true, nullable = false)
  @BeanProperty var username: String = _

  @Column(nullable = false)
  @BeanProperty var password: String = _
}