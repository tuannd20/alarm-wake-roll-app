(function () {
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem("awr-theme");
    if (saved) root.setAttribute("data-theme", saved);
  } catch (e) {}

  var btn = document.getElementById("theme");
  if (btn) {
    var sync = function () {
      btn.textContent = root.getAttribute("data-theme") === "light" ? "🌙" : "☀️";
    };
    sync();
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("awr-theme", next); } catch (e) {}
      sync();
    });
  }

  var clock = document.getElementById("clock");
  if (clock) {
    var pad = function (n) { return String(n).padStart(2, "0"); };
    var tick = function () {
      var d = new Date();
      clock.firstChild.nodeValue = pad(d.getHours()) + ":" + pad(d.getMinutes());
    };
    tick();
    setInterval(tick, 1000);
  }

  var els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add("in"); });
  }

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
