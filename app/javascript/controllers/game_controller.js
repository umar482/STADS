import { Controller } from "stimulus"
import http from "../packs/http";

export default class extends Controller {

  static targets = [ "id", "price", "minutes", "output", "total-price", "total-minutes"]
  add(e) {
    http.put(`/games/${this.id}`, {game:{minutes_booked: this.minutes}}).then((res) => {
      this.minutesTarget.textContent = this.minutes + 1;
      this.output(+1 ,this.price)
    })
  }
  minus() {
    if (this.minutes > 0) {
      http.put(`/games/${this.id}`, {game:{minutes_booked: this.minutes}}).then((res) => {
        this.minutesTarget.textContent = this.minutes -1
        this.output(-1 ,-this.price)
      })
    }
  }

  output(min, price) {
    var controller = this.application.controllers.slice(-1)[0];
    controller.data.set("total-minutes", this.total_minutes + min)
    controller.data.set("total-price", this.total_price + price)
    controller.outputTarget.textContent =  this.total_minutes+"min added . added "+ this.total_price 
 
  }
  get minutes() {
    return  parseInt(this.minutesTarget.textContent)
  }
  get id() {
    if (this.data.has("id")) {
      return parseInt(this.data.get("id"))
    }
  }
  get total_price() {
    var controller = this.application.controllers.slice(-1)[0];
    if (controller.data.has("total-price")) {
      return parseInt(controller.data.get("total-price"))
    }
  }
  get total_minutes() {
    var controller = this.application.controllers.slice(-1)[0];
    if (controller.data.has("total-minutes")) {
      return parseInt(controller.data.get("total-minutes"))
    }
  }
  get price() {
    if (this.data.has("price")) {
      return parseInt(this.data.get("price"))
    }
  }
}