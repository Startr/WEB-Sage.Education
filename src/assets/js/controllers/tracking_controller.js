import { Controller } from './../packages/stimulus.js';

export default class extends Controller {

  static get targets() {
    return [ "permissionDialog" ]
  }

  connect() {
    this.rememberTrackedParams()

    if (this.hasTrackedParams) {
      if (this.skipPermissionsCheck) {
        this.permissionGranted()
      } else {
        this.permissionRequired()
      }
    }
  }

  grant(event) {
    event.preventDefault()
    this.permission = "granted"
    this.permissionGranted()
  }

  deny(event) {
    event.preventDefault()
    this.permission = "denied"
    this.permissionDenied()
  }

  rememberTrackedParams() {
    if (Object.keys(this.trackedParamsFromRequest).length) {
      setCookie("tracking_params", JSON.stringify(this.trackedParams), 30, null, includingSubdomainsScope())
    }
  }

  forgetTrackedParams() {
    setCookie("tracking_params", "", -1, null, includingSubdomainsScope())
  }

  get trackedParams() {
    return { ...this.trackedParamsFromCookie, ...this.trackedParamsFromRequest }
  }

  get trackedParamsFromCookie() {
    const params = getCookie("tracking_params")
    return params ? JSON.parse(params) : {}
  }

  get trackedParamsFromRequest() {
    const params = {}
    for (const [ key, value ] of this.params) {
      if (key.startsWith("utm_") || key === "network") {
        params[key] = value
      }
    }
    return params
  }

  get params() {
    return new URL(document.location).searchParams
  }

  permissionRequired() {
    switch (this.permission) {
      case "granted":
        this.permissionGranted()
        break
      case "denied":
        this.permissionDenied()
        break
      default:
        this.requestPermission()
    }
  }

  requestPermission() {
    this.showPermissionDialog()
  }

  permissionGranted() {
    this.hidePermissionDialog()
    this.loadAdTracker()
  }

  permissionDenied() {
    this.forgetTrackedParams()
    this.hidePermissionDialog()
  }

  showPermissionDialog() {
    this.permissionDialogTarget.classList.remove(this.permissionDialogHiddenClass)
    this.permissionDialogTarget.removeAttribute("aria-hidden")
  }

  hidePermissionDialog() {
    this.permissionDialogTarget.classList.add(this.permissionDialogHiddenClass)
    this.permissionDialogTarget.setAttribute("aria-hidden", true)
  }

  get permissionDialogHiddenClass() {
    return this.permissionDialogTarget.dataset.hiddenClass
  }

  get hasTrackedParams() {
    return Object.keys(this.trackedParams).length !== 0
  }

  get skipPermissionsCheck() {
    return true
  }

  get permission() {
    return getCookie("tracking_permission")
  }

  set permission(value) {
    setCookie("tracking_permission", value, 30)
  }

  loadAdTracker() {
    if (this.trackedParams["network"] === "google") {
      this.loadGoogleTagManager()
    } else if (this.trackedParams["network"] === "choozle") {
      this.loadChoozleTracker();
    } else if (this.trackedParams["network"] === "microsoft") {
      this.loadMicrosoftTracker();
    } else if (this.trackedParams["network"] === "linkedin") {
      this.loadLinkedInTracker()
    } else if (this.trackedParams["network"] === "reddit") {
      this.loadRedditTracker()
    } else if (this.trackedParams["network"] === "zencastr") {
      this.loadZencastrTracker()
    }
  }

  loadChoozleTracker() {
    if (this.choozleTrackerLoaded) return

    const script = document.createElement("script")
    script.async = true
    script.src = "//nexus.ensighten.com/choozle/16916/Bootstrap.js"
    document.head.appendChild(script)

    this.choozleTrackerLoaded = true;
  }

  loadGoogleTagManager() {
    if (this.googleTagManagerLoaded) return

    const gtm_id = "AW-882027520"

    const script = document.createElement("script")
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gtm_id}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    window.gtag = function() { dataLayer.push(arguments) }

    gtag("js", new Date())
    gtag("config", gtm_id)
    gtag("config", gtm_id, { "transport_type": "beacon" })

    this.googleTagManagerLoaded = true
  }

  loadLinkedInTracker() {
    if (this.linkedInTrackerLoaded) return

    window._linkedin_partner_id = "4021556"
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []
    window._linkedin_data_partner_ids.push(_linkedin_partner_id)

    window.lintrk = function(a,b){ window.lintrk.q.push([a,b]) }
    window.lintrk.q = []

    const script = document.createElement("script")
    script.async = true
    script.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js"

    document.head.appendChild(script)

    this.linkedInTrackerLoaded = true
  }

  loadMicrosoftTracker() {
    if (this.microsoftTrackerLoaded) return

    const script = document.createElement("script")
    script.innerHTML = "(function(w,d,t,r,u){var f,n,i;w[u]=w[u]||[],f=function(){var o={ti:'343003711'};o.q=w[u],w[u]=new UET(o),w[u].push('pageLoad')},n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&s!=='loaded'&&s!=='complete'||(f(),n.onload=n.onreadystatechange=null)},i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)})(window,document,'script','//bat.bing.com/bat.js','uetq');"
    document.head.appendChild(script)

    this.microsoftTrackerLoaded = true
  }

  loadRedditTracker() {
    if (this.redditTrackerLoaded) return

    const script = document.createElement("script")
    script.innerHTML = "!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement(\"script\");t.src=\"https://www.redditstatic.com/ads/pixel.js\",t.async=!0;var s=d.getElementsByTagName(\"script\")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','t2_55g6ue5f', {\"optOut\":false,\"useDecimalCurrencyValues\":true});rdt('track', 'PageVisit');"
    document.head.appendChild(script)

    this.redditTrackerLoaded = true
  }

  loadZencastrTracker() {
    if (this.zencastrTrackerLoaded) return

    const script = document.createElement("script")
    script.innerHTML = "!function (e, t, n, a, i, p, s) {e[a] || ((i = e[a] = function () {i.process ? i.process.apply(i, arguments) : i.queue.push(arguments)}).queue = [], i.t = +new Date, (p = t.createElement(n)).async = 1, p.src = \"https://media.zencastr.com/zpix.min.js?t=\" + 864e5 * Math.ceil(new Date / 864e5), (s = t.getElementsByTagName(n)[0]).parentNode.insertBefore(p, s))}(window, document, \"script\", \"zpix\"), zpix(\"init\", \"62d0541f8bda552da9545443\"), zpix(\"event\", \"pageload\");"
    document.head.appendChild(script)

    this.zencastrTrackerLoaded = true
  }
}
