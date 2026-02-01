let steps = []; // All steps will be stored here
let currentStep = 0;
let matrix = [];
let matrixDiv, stepsDiv, outputDiv;

document.getElementById('prepareBtn').addEventListener('click', () => {
    prepareCipherSteps();
    showStep(0);
});

document.getElementById('nextStep').addEventListener('click', () => {
    if (currentStep < steps.length - 1) showStep(currentStep + 1);
});

document.getElementById('prevStep').addEventListener('click', () => {
    if (currentStep > 0) showStep(currentStep - 1);
});

function prepareCipherSteps() {
    const plaintextRaw = document.getElementById('plaintext').value.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g,'I');
    const keyRaw = document.getElementById('key').value.toUpperCase().replace(/[^A-Z]/g,'').replace(/J/g,'I');

    matrixDiv = document.getElementById('matrix');
    stepsDiv = document.getElementById('steps');
    outputDiv = document.getElementById('output');

    matrixDiv.innerHTML = '';
    stepsDiv.innerHTML = '';
    outputDiv.innerHTML = '';
    steps = [];
    currentStep = 0;

    // --- Build 5x5 Key Matrix ---
    const seen = new Set();
    const keyString = keyRaw + "ABCDEFGHIKLMNOPQRSTUVWXYZ";
    const matrixLetters = [];
    for (let c of keyString) {
        if (!seen.has(c)) {
            seen.add(c);
            matrixLetters.push(c);
        }
    }
    matrix = [];
    for (let i=0; i<5; i++) matrix.push(matrixLetters.slice(i*5, i*5+5));

    matrixLetters.forEach(letter => {
        const cell = document.createElement('div');
        cell.classList.add('cell','matrix-cell');
        if(document.body.classList.contains('dark')) cell.classList.add('dark');
        cell.textContent = letter;
        matrixDiv.appendChild(cell);
    });

    // --- Prepare plaintext with repeated letters handling ---
    let prepared = "";
    for(let i=0;i<plaintextRaw.length;i++){
        prepared += plaintextRaw[i];
        if(i<plaintextRaw.length-1 && plaintextRaw[i] === plaintextRaw[i+1]){
            steps.push({
                type: 'insertX',
                message: `Repeated letter "${plaintextRaw[i]}" detected → insert "X"`,
                prepared
            });
            prepared += "X";
        }
    }
    if(prepared.length % 2 !== 0){
        steps.push({
            type: 'padX',
            message: `Plaintext has odd length → pad last letter with "X"`,
            prepared
        });
        prepared += "X";
    }

    const digraphs = [];
    for(let i=0;i<prepared.length;i+=2) digraphs.push([prepared[i],prepared[i+1]]);

    // --- Encrypt each digraph with detailed steps ---
    let cipherSoFar = "";
    digraphs.forEach(d => {
        let [a,b] = d;
        let posA,posB;
        for(let r=0;r<5;r++){
            for(let c=0;c<5;c++){
                if(matrix[r][c]===a) posA=[r,c];
                if(matrix[r][c]===b) posB=[r,c];
            }
        }
        steps.push({
            type:'digraph',
            message:`Processing digraph: "${a}${b}"`,
            highlight:[posA,posB],
            cipher:cipherSoFar
        });

        if(posA[0]===posB[0]){
            // Same row
            const newA = matrix[posA[0]][(posA[1]+1)%5];
            const newB = matrix[posB[0]][(posB[1]+1)%5];
            steps.push({
                type:'row',
                message:`"${a}${b}" are in the same row → shift right: ${newA}${newB}`,
                highlight:[[posA[0],(posA[1]+1)%5],[posB[0],(posB[1]+1)%5]],
                cipher:cipherSoFar+newA+newB
            });
            cipherSoFar += newA+newB;
        } else if(posA[1]===posB[1]){
            // Same column
            const newA = matrix[(posA[0]+1)%5][posA[1]];
            const newB = matrix[(posB[0]+1)%5][posB[1]];
            steps.push({
                type:'column',
                message:`"${a}${b}" are in the same column → shift down: ${newA}${newB}`,
                highlight:[[(posA[0]+1)%5,posA[1],],[(posB[0]+1)%5,posB[1]]],
                cipher:cipherSoFar+newA+newB
            });
            cipherSoFar += newA+newB;
        } else {
            // Rectangle
            const newA = matrix[posA[0]][posB[1]];
            const newB = matrix[posB[0]][posA[1]];
            steps.push({
                type:'rectangle',
                message:`"${a}${b}" form a rectangle → swap columns: ${newA}${newB}`,
                highlight:[ [posA[0],posB[1]], [posB[0],posA[1]] ],
                cipher:cipherSoFar+newA+newB
            });
            cipherSoFar += newA+newB;
        }
    });

    document.getElementById('nextStep').disabled = false;
    document.getElementById('prevStep').disabled = true;
}

// --- Show a specific step ---
function showStep(n){
    if(n<0 || n>=steps.length) return;
    currentStep = n;
    const step = steps[n];

    // Clear highlights
    Array.from(matrixDiv.children).forEach(cell => cell.classList.remove('highlight'));
    // Highlight matrix if applicable
    if(step.highlight){
        step.highlight.forEach(pos => {
            matrixDiv.children[pos[0]*5 + pos[1]].classList.add('highlight');
        });
    }

    // Show explanation
    stepsDiv.innerHTML = step.message;

    // Show output so far
    outputDiv.innerHTML = '';
    for(let i=0;i<step.cipher.length;i++){
        const span = document.createElement('span');
        span.classList.add('cell','output-cell');
        span.textContent = step.cipher[i];
        outputDiv.appendChild(span);
    }

    document.getElementById('prevStep').disabled = currentStep===0;
    document.getElementById('nextStep').disabled = currentStep===steps.length-1;
}
