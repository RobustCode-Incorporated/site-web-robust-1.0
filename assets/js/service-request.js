/* "Request yours" form: posts to /api/service-request and shows the result
   in the page language. Messages live as hidden data-i18n spans in the HTML,
   so they are translated by i18n.js like the rest of the page. */
(function () {
  var form = document.getElementById("request-form");
  if (!form) return;
  var started = Date.now();
  var status = document.getElementById("request-status");
  var button = form.querySelector("button[type=submit]");
  function msg(id) { var el = document.getElementById(id); return el ? el.textContent : ""; }
  function show(kind, text) {
    status.textContent = text;
    status.className = "vr-status vr-status--" + kind;
    status.hidden = false;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    form.querySelectorAll(".is-invalid").forEach(function (el) { el.classList.remove("is-invalid"); });
    if (!form.checkValidity()) {
      form.querySelectorAll(":invalid").forEach(function (el) { el.classList.add("is-invalid"); });
      show("error", msg("req-msg-invalid"));
      return;
    }
    var fd = new FormData(form);
    var payload = {};
    fd.forEach(function (v, k) { payload[k] = v; });
    payload.consent = form.consent.checked;
    payload.elapsed = Date.now() - started;
    payload.lang = (document.documentElement.getAttribute("lang") || "en").slice(0, 2);
    button.disabled = true;
    // Only swap the label span, so the glint sweep span inside the button survives.
    var labelEl = button.querySelector("[data-i18n]") || button;
    var label = labelEl.textContent;
    labelEl.textContent = msg("req-msg-sending");
    fetch("/api/service-request", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json().catch(function () { return { ok: false }; }).then(function (j) { return { status: r.status, body: j }; }); })
      .then(function (res) {
        if (res.body && res.body.ok) {
          form.reset();
          form.hidden = true;
          show("ok", msg("req-msg-ok"));
          if (window.va) window.va("event", { name: "service_request", data: { service: payload.service } });
        } else if (res.status === 400 && res.body && res.body.fields) {
          res.body.fields.forEach(function (f) { var el = form.elements[f]; if (el) el.classList.add("is-invalid"); });
          show("error", msg("req-msg-invalid"));
        } else {
          show("error", msg("req-msg-error"));
        }
      })
      .catch(function () { show("error", msg("req-msg-error")); })
      .then(function () { button.disabled = false; labelEl.textContent = label; });
  });
})();
