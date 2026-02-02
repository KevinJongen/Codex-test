const banana = document.querySelector(".banana");
const statusText = document.querySelector(".puzzle-status");
const hint = document.querySelector(".puzzle-hint");
const redirectUrl = "https://www.mens-en-natuur.nl";

const steps = [
  "Tik op de 🍌 om te beginnen!",
  "Wiggel de banaan: klik 3x.",
  "Voer het geheime woord in: banaan.",
  "Kies de juiste schil: geel, groen of blauw?",
  "Gelukt! Doorsturen naar mens-en-natuur.nl...",
];

let stepIndex = 0;
let wiggleCount = 0;

const setStatus = (text) => {
  statusText.textContent = text;
};

const setHint = (text) => {
  hint.textContent = text;
};

const advanceStep = () => {
  stepIndex += 1;
  setStatus(steps[stepIndex]);
};

const startPuzzle = () => {
  if (stepIndex !== 0) {
    return;
  }
  banana.classList.add("banana--active");
  advanceStep();
  setHint("Klik 3 keer op de banaan.");
};

const handleWiggle = () => {
  if (stepIndex !== 1) {
    return;
  }
  wiggleCount += 1;
  setHint(`Nog ${Math.max(0, 3 - wiggleCount)} keer!`);
  if (wiggleCount >= 3) {
    advanceStep();
    setHint("Typ het woord en druk op enter.");
  }
};

const handleSecretWord = (event) => {
  if (stepIndex !== 2) {
    return;
  }
  if (event.key !== "Enter") {
    return;
  }
  const value = event.target.value.trim().toLowerCase();
  if (value === "banaan") {
    advanceStep();
    setHint("Tip: de juiste schil is de kleur van zon." );
  } else {
    setHint("Dat woord is het niet. Probeer: banaan.");
  }
};

const handleShellChoice = (event) => {
  if (stepIndex !== 3) {
    return;
  }
  const choice = event.target.dataset.choice;
  if (!choice) {
    return;
  }
  if (choice === "geel") {
    advanceStep();
    setHint("Je wordt doorgestuurd...");
    window.setTimeout(() => {
      window.location.href = redirectUrl;
    }, 1500);
  } else {
    setHint("Oei, probeer opnieuw. Welke kleur is rijp?");
  }
};

banana.addEventListener("click", () => {
  if (stepIndex === 0) {
    startPuzzle();
  } else if (stepIndex === 1) {
    handleWiggle();
  }
});

hint.addEventListener("click", handleShellChoice);

const secretInput = document.querySelector("#banana-secret");
secretInput.addEventListener("keydown", handleSecretWord);

setStatus(steps[stepIndex]);
setHint("Klik op de banaan om de puzzel te starten.");
