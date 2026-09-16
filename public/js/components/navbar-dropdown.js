(function () {
  var item = document.querySelector(".navbar__item--dropdown");
  var toggle = document.querySelector(".navbar__dropdown-toggle");
  var dropdown = document.getElementById("navbar-about-menu");
  if (!item || !toggle || !dropdown) return;

  function close() {
    item.classList.remove("is-open");
    dropdown.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  function open() {
    item.classList.add("is-open");
    dropdown.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
  }

  toggle.addEventListener("click", function (e) {
    e.stopPropagation();
    if (dropdown.classList.contains("is-open")) {
      close();
    } else {
      open();
    }
  });

  document.addEventListener("click", function (e) {
    if (!item.contains(e.target)) close();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });
})();
