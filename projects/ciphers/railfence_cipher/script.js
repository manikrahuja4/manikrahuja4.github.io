document.getElementById('encryptBtn').addEventListener('click', async () => {
    const text = document.getElementById('plaintext').value.replace(/ /g, '').toUpperCase();
    let numRails = parseInt(document.getElementById('rails').value);
    if (isNaN(numRails) || numRails < 2) numRails = 2;
    if (numRails > 10) numRails = 10;

    const railMatrixDiv = document.getElementById('railMatrix');
    const stepsDiv = document.getElementById('steps');
    const outputDiv = document.getElementById('output');

    railMatrixDiv.innerHTML = '';
    stepsDiv.innerHTML = '';
    outputDiv.innerHTML = '';

    // Create matrix
    const matrix = Array.from({ length: numRails }, () => Array(text.length).fill(''));

    // Build matrix and animate
    let rail = 0, direction = 1;
    for (let i = 0; i < text.length; i++) {
        matrix[rail][i] = text[i];

        // Display current matrix
        railMatrixDiv.innerHTML = '';
        matrix.forEach(row => {
            const rowDiv = document.createElement('div');
            row.forEach(cell => {
                const span = document.createElement('span');
                span.classList.add('cell');
                if (cell !== '') {
                    span.textContent = cell;
                    span.classList.add('filled');
                } else {
                    span.textContent = '-';
                    span.classList.add('empty');
                }
                rowDiv.appendChild(span);
            });
            railMatrixDiv.appendChild(rowDiv);
        });

        // Step explanation
        const step = document.createElement('div');
        step.textContent = `Place "${text[i]}" in rail ${rail + 1} (moving ${direction === 1 ? 'down' : 'up'})`;
        stepsDiv.appendChild(step);
        stepsDiv.scrollTop = stepsDiv.scrollHeight;

        await new Promise(res => setTimeout(res, 500));

        rail += direction;
        if (rail === 0 || rail === numRails - 1) direction *= -1;
    }

    // Read row by row to get ciphertext
    let cipher = '';
    for (let r = 0; r < numRails; r++) {
        for (let c = 0; c < text.length; c++) {
            if (matrix[r][c] !== '') {
                cipher += matrix[r][c];

                // Animate output
                const span = document.createElement('span');
                span.textContent = matrix[r][c];
                span.classList.add('cell', 'filled');
                outputDiv.appendChild(span);
            }
        }
    }
});
