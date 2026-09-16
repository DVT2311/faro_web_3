(function () {
  var btn = document.getElementById("back-to-top");
  if (!btn) return;

  var SHOW_AFTER_PX = 600;

  function toggle() {
    if (window.scrollY > SHOW_AFTER_PX) {
      btn.classList.add("is-visible");
    } else {
      btn.classList.remove("is-visible");
    }
  }

  window.addEventListener("scroll", toggle, { passive: true });
  toggle();

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
