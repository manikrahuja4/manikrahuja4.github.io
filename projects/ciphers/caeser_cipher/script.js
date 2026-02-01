const prepareBtn = document.getElementById('prepareBtn');
const nextBtn = document.getElementById('nextStep');
const prevBtn = document.getElementById('prevStep');
const stepsDiv = document.getElementById('steps');
const outputDiv = document.getElementById('output');

let steps = [];
let currentStep = 0;

prepareBtn.addEventListener('click', () => {
  const text = document.getElementById('plaintext').value.toUpperCase();
  const shift = parseInt(document.getElementById('shift').value) % 26;
  steps = [];
  currentStep = 0;
  stepsDiv.innerHTML = '';
  outputDiv.innerHTML = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char >= 'A' && char <= 'Z') {
      const shiftedChar = String.fromCharCode(((char.charCodeAt(0) - 65 + shift + 26) % 26) + 65);
      steps.push({original: char, shifted: shiftedChar, description: `${char} shifted by ${shift} → ${shiftedChar}`});
    } else {
      steps.push({original: char, shifted: char, description: `${char} unchanged`});
    }
  }

  // Initialize output div with all letters
  for (let i = 0; i < steps.length; i++) {
    const span = document.createElement('span');
    span.textContent = steps[i].original;
    span.classList.add('letter', 'original');
    outputDiv.appendChild(span);
  }

  renderStep();
  updateButtons();
});

function renderStep() {
  stepsDiv.innerHTML = '';
  const step = steps[currentStep];
  const stepElem = document.createElement('div');
  stepElem.innerHTML = `<span class="current-step">${step.original}</span> → <span class="shifted">${step.shifted}</span> : ${step.description}`;
  stepsDiv.appendChild(stepElem);

  // Update output letters
  const letters = outputDiv.querySelectorAll('.letter');
  letters.forEach((l, idx) => {
    if (idx <= currentStep) {
      l.textContent = steps[idx].shifted;
      l.classList.remove('original');
      l.classList.add('shifted');
    } else {
      l.textContent = steps[idx].original;
      l.classList.remove('shifted');
      l.classList.add('original');
    }
  });
}

function updateButtons() {
  prevBtn.disabled = currentStep === 0;
  nextBtn.disabled = currentStep === steps.length -1;
}

nextBtn.addEventListener('click', () => {
  if (currentStep < steps.length -1) {
    currentStep++;
    renderStep();
    updateButtons();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentStep > 0) {
    currentStep--;
    renderStep();
    updateButtons();
  }
});