(function () {
  var track = document.querySelector(".store-carousel__track");
  if (!track) return;

  var realSlides = track.children.length;
  if (realSlides < 2) return;

  // Nhân bản slide đầu tiên, gắn vào cuối track — để khi trượt hết vòng,
  // hiệu ứng vẫn tiếp tục trượt 1 chiều (trái -> phải) thay vì giật lùi
  // về lại slide đầu.
  var firstClone = track.children[0].cloneNode(true);
  track.appendChild(firstClone);

  var index = 0;
  var slideWidth = 1440;

  function goToNext() {
    index += 1;
    track.style.transition = "transform 0.8s ease";
    track.style.transform = "translateX(-" + index * slideWidth + "px)";

    if (index === realSlides) {
      track.addEventListener(
        "transitionend",
        function handler() {
          track.removeEventListener("transitionend", handler);
          track.style.transition = "none";
          track.style.transform = "translateX(0)";
          index = 0;
        },
        { once: true }
      );
    }
  }

  setInterval(goToNext, 3000);
})();
