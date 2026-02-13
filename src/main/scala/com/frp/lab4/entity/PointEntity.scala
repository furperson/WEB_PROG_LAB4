package com.frp.lab4.entity

import jakarta.persistence._
import java.util.Date
import scala.beans.BeanProperty

@Entity
@Table(name = "results")
class PointEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @BeanProperty var id: Long = _

  @BeanProperty var x: Double = _
  @BeanProperty var y: Double = _
  @BeanProperty var r: Double = _
  @BeanProperty var hit: Boolean = _

  @Temporal(TemporalType.TIMESTAMP)
  @BeanProperty var checkDate: Date = _

  @BeanProperty var executionTime: Long = _

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  @BeanProperty var user: UserEntity = _
}