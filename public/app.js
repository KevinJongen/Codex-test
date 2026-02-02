const banana = document.querySelector(".banana");
const statusText = document.querySelector(".puzzle-status");
const hintText = document.querySelector(".puzzle-hint-text");
const redirectUrl = "https://www.mens-en-natuur.nl";
const submitButton = document.querySelector(".puzzle-submit");
const secretInput = document.querySelector("#banana-secret");
const shellInputs = document.querySelectorAll("input[name=\"banana-shell\"]");

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
  hintText.textContent = text;
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
    setHint("Tip: de juiste schil is de kleur van zon.");
  } else {
    setHint("Dat woord is het niet. Probeer: banaan.");
  }
};

const getSelectedShell = () => {
  const selected = Array.from(shellInputs).find((input) => input.checked);
  return selected ? selected.value : "";
};

const submitShellChoice = () => {
  if (stepIndex !== 3) {
    return;
  }
  const choice = getSelectedShell();
  if (!choice) {
    setHint("Kies eerst een kleur en klik op inleveren.");
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

submitButton.addEventListener("click", submitShellChoice);

secretInput.addEventListener("keydown", handleSecretWord);

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && stepIndex === 3) {
    submitShellChoice();
  }
});

setStatus(steps[stepIndex]);
setHint("Klik op de banaan om de puzzel te starten.");
