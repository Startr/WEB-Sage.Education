function ready() {

  const pwaGuideLink = document.getElementById("pwa-guide-link")
  const browser = document.body.hasAttribute("data-browser") ? document.body.getAttribute("data-browser") : null

  if(pwaGuideLink && browser) {

    const hash = document.getElementById(`pwa-guide-section-${browser}`)?.value || ""
    pwaGuideLink.href += `#${hash}`

  }

}

export { ready };
