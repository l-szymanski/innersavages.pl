(() => {
  "use strict";

  const panel = document.getElementById("analytics-consent");
  if (!panel || !panel.dataset.analyticsToken) return;

  const storageKey = "innersavages.analytics.consent";
  const version = 1;
  const lifetime = 180 * 24 * 60 * 60 * 1000;
  const settings = document.querySelector("[data-analytics-settings]");
  let beaconRequested = false;
  let returnFocus = false;

  function readDecision() {
    try {
      const record = JSON.parse(window.localStorage.getItem(storageKey));
      if (!record || record.version !== version) return null;
      if (record.decision !== "granted" && record.decision !== "denied") return null;
      if (!Number.isFinite(record.decidedAt)) return null;
      const age = Date.now() - record.decidedAt;
      return age >= 0 && age < lifetime ? record.decision : null;
    } catch {
      // Niedostępny magazyn lub uszkodzony zapis nie oznaczają zgody.
      return null;
    }
  }

  function saveDecision(decision) {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({
        decision, version, decidedAt: Date.now()
      }));
    } catch {
      // Decyzja nadal obowiązuje w bieżącym dokumencie.
    }
  }

  function loadAnalytics() {
    if (beaconRequested || document.getElementById("cloudflare-analytics-beacon")) return;
    beaconRequested = true;
    const beacon = document.createElement("script");
    beacon.id = "cloudflare-analytics-beacon";
    beacon.type = "module";
    beacon.src = "https://static.cloudflareinsights.com/beacon.min.js";
    beacon.setAttribute("data-cf-beacon", JSON.stringify({ token: panel.dataset.analyticsToken }));
    document.body.appendChild(beacon);
  }

  function showPanel(fromSettings = false) {
    returnFocus = fromSettings;
    panel.hidden = false;
    if (settings) settings.setAttribute("aria-expanded", "true");
    if (fromSettings) panel.focus({ preventScroll: true });
  }

  function hidePanel() {
    const restoreFocus = returnFocus || panel.contains(document.activeElement);
    panel.hidden = true;
    if (settings) {
      settings.setAttribute("aria-expanded", "false");
      if (restoreFocus) settings.focus({ preventScroll: true });
    }
    returnFocus = false;
  }

  function withdrawAnalytics() {
    // Beacon może wysyłać końcowy pomiar podczas zamykania dokumentu.
    // Na czas przeładowania blokujemy tylko jego transporty; pozostałe
    // żądania strony nadal korzystają z oryginalnych metod przeglądarki.
    const isAnalyticsUrl = url => {
      try {
        const hostname = new URL(url, window.location.href).hostname;
        return hostname === "cloudflareinsights.com" || hostname.endsWith(".cloudflareinsights.com");
      } catch {
        return false;
      }
    };
    if (typeof navigator.sendBeacon === "function") {
      const sendBeacon = navigator.sendBeacon.bind(navigator);
      navigator.sendBeacon = (url, data) => isAnalyticsUrl(url) ? false : sendBeacon(url, data);
    }
    const analyticsRequests = new WeakSet();
    const open = XMLHttpRequest.prototype.open;
    const send = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.open = function (method, url, ...args) {
      if (isAnalyticsUrl(url)) analyticsRequests.add(this);
      else analyticsRequests.delete(this);
      return open.call(this, method, url, ...args);
    };
    XMLHttpRequest.prototype.send = function (data) {
      if (analyticsRequests.has(this)) this.abort();
      else return send.call(this, data);
    };
    // Usunięcie elementu nie usuwa listenerów uruchomionego beacona.
    // Nowy dokument uruchomi się już z odmową (lub bez zapisanej zgody).
    document.getElementById("cloudflare-analytics-beacon")?.remove();
    window.location.reload();
  }

  panel.querySelectorAll("[data-analytics-decision]").forEach(button => {
    button.addEventListener("click", () => {
      const decision = button.dataset.analyticsDecision;
      saveDecision(decision);
      hidePanel();
      if (decision === "granted") loadAnalytics();
      else if (beaconRequested) withdrawAnalytics();
    });
  });

  if (settings) {
    settings.hidden = false;
    settings.addEventListener("click", () => showPanel(true));
  }

  panel.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      event.preventDefault();
      hidePanel();
    }
  });

  function synchronizeDecision() {
    const decision = readDecision();
    if (decision !== "granted" && beaconRequested) {
      withdrawAnalytics();
    } else if (decision === "granted") {
      hidePanel();
      loadAnalytics();
    } else if (decision === "denied") {
      hidePanel();
    } else {
      showPanel();
    }
  }

  // Wycofanie lub usunięcie zgody w innej karcie dotyczy również tej strony.
  window.addEventListener("storage", event => {
    if (event.key === storageKey || event.key === null) synchronizeDecision();
  });

  // Powrót przyciskiem Wstecz może przywrócić już uruchomiony dokument.
  window.addEventListener("pageshow", event => {
    if (event.persisted) synchronizeDecision();
  });

  synchronizeDecision();
})();
