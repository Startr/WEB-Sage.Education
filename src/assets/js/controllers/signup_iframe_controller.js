import { Controller } from './../packages/stimulus.js';

export default class extends Controller {

  connect() {
    this.appendTrackedParams()
  }

  appendTrackedParams() {
    this.element.src = this.urlWithTrackedParams
  }

  get urlWithTrackedParams() {
    const url = new URL(this.element.dataset.sourceValue) // TODO upgrade Stimulus to use the Values API

    for (const [ key, value ] of Object.entries(this.trackedParams)) {
      url.searchParams.set(key, value)
    }

    url.searchParams.set("iframe_host", window.location.href)

    return url
  }

  get trackedParams() {
    const params = getCookie("tracking_params")
    return params ? JSON.parse(params) : {}
  }

}
