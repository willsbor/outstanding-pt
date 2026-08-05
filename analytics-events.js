(function () {
  function sendEvent(link) {
    if (typeof window.gtag !== "function") return;

    var eventName = link.dataset.trackEvent;
    if (!eventName) return;

    var params = {
      page_path: window.location.pathname || "/",
      transport_type: "beacon"
    };

    if (link.href) {
      params.link_url = link.href;
    }

    if (eventName === "line_booking_click") {
      params.placement = link.dataset.trackPlacement || "unknown";
      params.value = 1;
    } else if (eventName === "social_click") {
      params.platform = link.dataset.trackPlatform || "unknown";
      params.placement = link.dataset.trackPlacement || "unknown";
    } else if (eventName === "map_click") {
      params.placement = link.dataset.trackPlacement || "unknown";
      params.value = 1;
    } else if (eventName === "nav_click") {
      params.nav_label = (link.textContent || "").trim();
      params.from_path = window.location.pathname || "/";
      params.to_url = link.href;
      delete params.link_url;
      delete params.page_path;
    }

    window.gtag("event", eventName, params);
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest("a[data-track-event]");
    if (!link) return;
    sendEvent(link);
  });
})();
