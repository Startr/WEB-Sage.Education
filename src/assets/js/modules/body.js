function ready() {

  const body = document.getElementsByTagName('body')[0];
  const userAgent = navigator.userAgent

  const isIosApp = /Sage iOS/i.test(userAgent)
  const isAndroidApp = /BC3 Android/i.test(userAgent)

  const isEdge = /edg/i.test(userAgent)
  const isChrome = (/chrome/i.test(userAgent) && !isEdge)
  const isSafari = (/safari/i.test(userAgent) && !isEdge && !isChrome)
  const isFirefox = /firefox/i.test(userAgent)

  if(isIosApp && !/replace-sheet/.test(navigator.userAgent)) body.classList.add("ios")
  if(isAndroidApp) body.classList.add("android")

  if(isEdge) body.setAttribute("data-browser", "edge")
  if(isChrome) body.setAttribute("data-browser", "chrome")
  if(isSafari) body.setAttribute("data-browser", "safari")
  if(isFirefox) body.setAttribute("data-browser", "firefox")

}

export { ready };
