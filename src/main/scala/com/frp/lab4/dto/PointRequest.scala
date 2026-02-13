package com.frp.lab4.dto

import com.fasterxml.jackson.annotation.JsonProperty

case class PointRequest(x: Double, y: Double, r: Double, @JsonProperty("type") reqType: String)