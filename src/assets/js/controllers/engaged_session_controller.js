import { Controller } from './../packages/stimulus.js';

export default class extends Controller {

  connect() {
    this.loadEngagedSessionTracker()
  }

  loadEngagedSessionTracker() {
    this.timer = setInterval(() => this.checkEngagedSessionStatus(), 1000)
  }

  checkEngagedSessionStatus() {
    if (this.sessionHasEngaged()) {
      return clearInterval(this.timer)
    }

    if (this.sessionTimeIsOverThreshold()) {
      this.trackEngagedSessionWithPlausible()
      this.markSessionAsEngaged()
    }
  }

  setSessionParam(key, value){
    let existingParams = this.getSessionParams()
    let thirtyMinutes = 30 / (1 * 24 * 60)
    existingParams[key] = value

    setCookie("session_details", JSON.stringify(existingParams), thirtyMinutes)
  }

  getSessionParams(key) {
    const cookie = getCookie("session_details")
    const sessionParams =  cookie ? JSON.parse(cookie) : {}

    if (key) {
      return sessionParams[key]
    }

    return sessionParams
  }

  trackEngagedSessionWithPlausible() {
    if (window.plausible) {
      plausible("EngagedSession")
    }
  }

  sessionHasEngaged() {
    return Boolean(this.getSessionParams("already_engaged"))
  }

  markSessionAsEngaged() {
    this.setSessionParam("already_engaged", true)
  }

  sessionTimeIsOverThreshold() {
    const thresholdSeconds = 60;

    return (new Date - this.getEngagedSessionStartTime()) >= thresholdSeconds * 1000
  }

  getEngagedSessionStartTime() {
    const entryTime = this.getSessionParams('entry_time')

    if (entryTime) {
      return new Date(entryTime)
    }

    const now = new Date;
    this.setSessionParam('entry_time', now)

    return now;
  }

}
