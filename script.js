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

// fungsi acak tangan/putar
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

// menangkap hasil
addPoin = 0;
let isKlikDiizinkan = true;

const pilihan = document.querySelectorAll(".area-player img");
pilihan.forEach(function (pilih) {
  pilih.addEventListener("click", function () {
    pilihan.forEach(function (img) {
      if (img !== pilih) {
        img.style.opacity = "0";
      }
    });
    if (isKlikDiizinkan) {
      isKlikDiizinkan = false;
      const pilihanComp = getPilihanComputer();
      const pilihanPlayer = pilih.className;
      const hasil = getHasil(pilihanComp, pilihanPlayer);
      const info = document.querySelector(".info");
      const versus = document.querySelector(".versus");
      const copyright = document.getElementById("copyright");
      versus.style.display = "inherit";
      info.style.display = "none";
      copyright.style.display = "none";

      putar();

      setTimeout(function () {
        const imgComputer = document.querySelector(".img-computer");
        imgComputer.setAttribute("src", "img/" + pilihanComp + ".jpg");
      }, 1000);

      // mengubah vs menjadi info
      setTimeout(function () {
        const audioKalah = document.getElementById("kalah-audio");
        const versus = document.querySelector(".versus");
        const info = document.querySelector(".info");
        info.innerHTML = hasil;
        info.style.display = "inherit";
        versus.style.display = "none";
        if (hasil == "KALAH!") {
          audioKalah.play();
          audioKalah.currentTime = 0.4;
        }
      }, 1500);

      // memutar audio & memunculkan hadiah berdasarkan info
      setTimeout(function () {
        const hadiah = document.querySelector(".hadiah");
        const audioMenang = document.getElementById("menang-audio");
        let score = document.getElementById("score");

        if (hasil == "MENANG!") {
          addPoin += 1;
          score.innerText = "Score:" + " " + addPoin;
          hadiah.style.display = "flex";
          audioMenang.play();
        } else if (hasil == "KALAH!" && addPoin >= 0) {
          addPoin -= 1;
          score.innerText = "Score:" + " " + addPoin;
        }
      }, 3000);

      // kembalikan tampilan
      setTimeout(function () {
        const imgComputer = document.querySelector(".img-computer");
        imgComputer.setAttribute("src", "img/questionmark.jpg");
        info.style.display = "none";
        versus.style.display = "inherit";
        isKlikDiizinkan = true;

        pilihan.forEach(function (img) {
          img.style.opacity = "1";
        });
      }, 3500);
    }
  });
});

// fungsi close button difitur hadiah
const closeBtn = document.querySelector(".close-btn");
closeBtn.addEventListener("click", function () {
  const hadiah = document.querySelector(".hadiah");
  hadiah.style.display = "none";
});

// fungsi tombol buka hadiah
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

// mouse hover pilihan player

pilihan.forEach(function (pilih) {
  pilih.addEventListener("mouseover", function () {
    pilih.style.animation = "none";
  });

  pilih.addEventListener("mouseout", function () {
    pilih.style.animation = "nyala 1s infinite";
  });
});
