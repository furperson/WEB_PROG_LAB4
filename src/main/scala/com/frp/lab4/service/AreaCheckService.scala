package com.frp.lab4.service

import com.frp.lab4.dto.PointRequest
import org.springframework.stereotype.Service

@Service
class AreaCheckService {

  def check(x: Double, y: Double, r: Double): Boolean = {
    if (r <= 0) return false

    if (x >= 0 && y >= 0) {
      return (x * x + y * y) <= (r * r)
    }

    if (x <= 0 && y >= 0) {
      return x >= -r / 2.0 && y <= r
    }

    if (x <= 0 && y <= 0) {
      return y >= -2 * x - r
    }

    false
  }

  @throws[IllegalArgumentException]
  def validate(req: PointRequest): Unit = {
    if (req.r <= 0) throw new IllegalArgumentException("R must >0!")

    if (req.reqType == "FORM") {
      val validX = Set(-4, -3, -2, -1, 0, 1, 2, 3, 4)
      if (!validX.contains(req.x.toInt) || req.x != req.x.toInt) {
        throw new IllegalArgumentException("X is celiy -4 to 4")
      }

      if (req.y < -5 || req.y > 3) {
        throw new IllegalArgumentException("Y in (-5 , 3)")
      }

      val validR = Set(-4, -3, -2, -1, 0, 1, 2, 3, 4)
      if (!validR.contains(req.r.toInt)) {
        throw new IllegalArgumentException("R -  -4 to 4")
      }

    } else {
      if (Math.abs(req.x) > 1000 || Math.abs(req.y) > 1000) {
        throw new IllegalArgumentException("out of graph!")
      }
    }
  }
}