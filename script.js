// menangkap pilihan computer
// membangkitkan bilangan random
function getPilihanComputer() {
  const comp = Math.random();
  if (comp < 0.34) return "paper";
  if (comp >= 0.34 && comp < 0.67) return "rock";
  return "scissors";
}

// menentukan rules
function getHasil(comp, player) {
  if (player == comp) return "SERI!";
  if (player == "paper") return comp == "rock" ? "MENANG!" : "KALAH!";
  if (player == "scissors") return comp == "rock" ? "KALAH!" : "MENANG!";
  if (player == "rock") return comp == "paper" ? "KALAH" : "MENANG!";
}

function putar() {
  const imgComputer = document.querySelector(".img-computer");
  const gambar = ["paper", "rock", "scissors"];
  let i = 0;
  const waktuMulai = new Date().getTime();
  setInterval(function () {
    if (new Date().getTime() - waktuMulai > 1000) {
      clearInterval;
      return;
    }
    imgComputer.setAttribute("src", "img/" + gambar[i++] + ".jpg");
    if (i == gambar.length) i = 0;
  }, 150);
}

const pilihan = document.querySelectorAll(".area-player img");
pilihan.forEach(function (pilih) {
  pilih.addEventListener("click", function () {
    const pilihanComp = getPilihanComputer();
    const pilihanPlayer = pilih.className;
    const hasil = getHasil(pilihanComp, pilihanPlayer);
    const info = document.querySelector(".info");
    const versus = document.querySelector(".versus");
    versus.style.display = "inherit";
    info.style.display = "none";

    putar();

    setTimeout(function () {
      const imgComputer = document.querySelector(".img-computer");
      imgComputer.setAttribute("src", "img/" + pilihanComp + ".jpg");
    }, 1000);

    setTimeout(function () {
      const versus = document.querySelector(".versus");
      const info = document.querySelector(".info");
      info.innerHTML = hasil;
      info.style.display = "inherit";
      versus.style.display = "none";
    }, 1500);

    setTimeout(function () {
      const hadiah = document.querySelector(".hadiah");
      const audioMenang = document.getElementById("menang-audio");
      const audioKalah = document.getElementById("kalah-audio");

      if (hasil == "MENANG!") {
        hadiah.style.display = "flex";
        audioMenang.play();
      } else {
        audioKalah.play();
        audioKalah.currentTime = 0.4;
      }
    }, 2500);
  });
});

const closeBtn = document.querySelector(".close-btn");
closeBtn.addEventListener("click", function () {
  const hadiah = document.querySelector(".hadiah");
  hadiah.style.display = "none";
});

const bukaHadiahBtn = document.querySelector(".buka-hadiah");
bukaHadiahBtn.addEventListener("click", function () {
  const prank = document.querySelector(".prank");
  const jumpscare = document.getElementById("jumpscare-audio");
  prank.style.display = "flex";
  const hadiah = document.querySelector(".hadiah");
  hadiah.style.display = "none";
  jumpscare.play();
  jumpscare.currentTime = 3;
});
