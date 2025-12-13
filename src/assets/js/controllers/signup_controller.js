import { Controller } from './../packages/stimulus.js';

export default class extends Controller {

  track() {
    this.appendTrackedParams()
    this.trackConversion()
  }

  trackLogin() {
    this.trackLoginWithGoogle()
    this.trackLoginWithMicrosoft()
  }

  appendTrackedParams() {
    this.element.href = this.urlWithTrackedParams
  }

  trackConversion() {
    this.trackConversionWithGoogle()
    this.trackConversionWithReddit()
    this.trackConversionWithLinkedIn()
    this.trackConversionWithPlausible()
    this.trackConversionWithChoozle()
    this.trackConversionWithMicrosoft()
  }

  trackConversionWithGoogle() {
    if (window.gtag) {
      gtag("event", "conversion", { "send_to": "AW-882027520/tONxCJ_Zi44DEIDYyqQD" })
    }
  }

  trackLoginWithGoogle() {
    if (window.gtag) {
      gtag('event', 'conversion', {'send_to': 'AW-882027520/isWhCK_PxfUDEIDYyqQD', 'aw_remarketing_only': true});
    }
  }

  trackConversionWithReddit() {
    if (window.rdt) {
      rdt("track", "SignUp")
    }
  }

  trackConversionWithLinkedIn() {
    if (window.lintrk) {
      window.lintrk("track", { conversion_id: 8533540 })
    }
  }

  trackConversionWithPlausible() {
    if (window.plausible) {
      plausible("TrialButtonClick")
    }
  }

  trackConversionWithChoozle() {
    if (window.Bootstrapper) {

      let choozleFrame = document.createElement('iframe');
      choozleFrame.src = '//insight.adsrvr.org/tags/39xjf87/z9ha8px/iframe';
      choozleFrame.width = choozleFrame.height = '1px';
      choozleFrame.style.display = 'none';
      document.getElementsByTagName('body')[0].appendChild(choozleFrame)
    }
  }

  trackConversionWithMicrosoft() {
    if (window.uetq) {
      window.uetq = window.uetq || []
      window.uetq.push('event', 'submit_lead_form', {})
    }
  }

  trackLoginWithMicrosoft() {
    if (window.uetq) {
      window.uetq = window.uetq || []
      window.uetq.push('event', 'login', {})
    }
  }

  get urlWithTrackedParams() {
    const url = new URL(this.element.href)
    for (const [ key, value ] of Object.entries(this.trackedParams)) {
      url.searchParams.set(key, value)
    }
    return url
  }

  get trackingPermissionGranted() {
    return getCookie("tracking_permission") === "granted"
  }

  get trackedParams() {
    const params = getCookie("tracking_params")
    return params ? JSON.parse(params) : {}
  }

}
