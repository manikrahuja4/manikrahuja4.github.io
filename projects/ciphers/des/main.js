    // ============================================
// DES PERMUTATION TABLES
// ============================================
// IP (Initial Permutation) - Rearranges the 64-bit input block
// This is the first step in DES: it shuffles the bits of the plaintext
// according to this table before encryption begins
const IP = [
    58,50,42,34,26,18,10,2,
    60,52,44,36,28,20,12,4,
    62,54,46,38,30,22,14,6,
    64,56,48,40,32,24,16,8,
    57,49,41,33,25,17,9,1,
    59,51,43,35,27,19,11,3,
    61,53,45,37,29,21,13,5,
    63,55,47,39,31,23,15,7
    ];


    // FP (Final Permutation) - Reverse of the IP
    // This is applied as the last step after all 16 rounds
    // It undoes the initial permutation to produce the final ciphertext
    const FP = [
    40,8,48,16,56,24,64,32,
    39,7,47,15,55,23,63,31,
    38,6,46,14,54,22,62,30,
    37,5,45,13,53,21,61,29,
    36,4,44,12,52,20,60,28,
    35,3,43,11,51,19,59,27,
    34,2,42,10,50,18,58,26,
    33,1,41,9,49,17,57,25
    ];


    // E (Expansion Permutation) - Expands 32 bits to 48 bits
    // Each round needs 48 bits from the right half (which is 32 bits)
    // This table duplicates some bits and rearranges them to create 48 bits
    const E = [
    32,1,2,3,4,5,
    4,5,6,7,8,9,
    8,9,10,11,12,13,
    12,13,14,15,16,17,
    16,17,18,19,20,21,
    20,21,22,23,24,25,
    24,25,26,27,28,29,
    28,29,30,31,32,1
    ];


    // P (P-box Permutation) - Permutes the 32-bit output from S-boxes
    // After S-box substitution, this table rearranges the 32 bits
    // for the final step of the Feistel function
    const P = [
    16,7,20,21,
    29,12,28,17,
    1,15,23,26,
    5,18,31,10,
    2,8,24,14,
    32,27,3,9,
    19,13,30,6,
    22,11,4,25
    ];


    // SBOX (Substitution Boxes) - 8 boxes with lookup tables
    // These are the core of DES security!
    // After XORing with the key, 48 bits are split into 8 groups of 6 bits
    // Each 6-bit group is substituted using the corresponding S-box
    // to produce 4 bits. This non-linear transformation is crucial for security
    const SBOX = [

    [
    [14,4,13,1,2,15,11,8,3,10,6,12,5,9,0,7],
    [0,15,7,4,14,2,13,1,10,6,12,11,9,5,3,8],
    [4,1,14,8,13,6,2,11,15,12,9,7,3,10,5,0],
    [15,12,8,2,4,9,1,7,5,11,3,14,10,0,6,13]
    ],

    [
    [15,1,8,14,6,11,3,4,9,7,2,13,12,0,5,10],
    [3,13,4,7,15,2,8,14,12,0,1,10,6,9,11,5],
    [0,14,7,11,10,4,13,1,5,8,12,6,9,3,2,15],
    [13,8,10,1,3,15,4,2,11,6,7,12,0,5,14,9]
    ],

    [
    [10,0,9,14,6,3,15,5,1,13,12,7,11,4,2,8],
    [13,7,0,9,3,4,6,10,2,8,5,14,12,11,15,1],
    [13,6,4,9,8,15,3,0,11,1,2,12,5,10,14,7],
    [1,10,13,0,6,9,8,7,4,15,14,3,11,5,2,12]
    ],

    [
    [7,13,14,3,0,6,9,10,1,2,8,5,11,12,4,15],
    [13,8,11,5,6,15,0,3,4,7,2,12,1,10,14,9],
    [10,6,9,0,12,11,7,13,15,1,3,14,5,2,8,4],
    [3,15,0,6,10,1,13,8,9,4,5,11,12,7,2,14]
    ],

    [
    [2,12,4,1,7,10,11,6,8,5,3,15,13,0,14,9],
    [14,11,2,12,4,7,13,1,5,0,15,10,3,9,8,6],
    [4,2,1,11,10,13,7,8,15,9,12,5,6,3,0,14],
    [11,8,12,7,1,14,2,13,6,15,0,9,10,4,5,3]
    ],

    [
    [12,1,10,15,9,2,6,8,0,13,3,4,14,7,5,11],
    [10,15,4,2,7,12,9,5,6,1,13,14,0,11,3,8],
    [9,14,15,5,2,8,12,3,7,0,4,10,1,13,11,6],
    [4,3,2,12,9,5,15,10,11,14,1,7,6,0,8,13]
    ],

    [
    [4,11,2,14,15,0,8,13,3,12,9,7,5,10,6,1],
    [13,0,11,7,4,9,1,10,14,3,5,12,2,15,8,6],
    [1,4,11,13,12,3,7,14,10,15,6,8,0,5,9,2],
    [6,11,13,8,1,4,10,7,9,5,0,15,14,2,3,12]
    ],

    [
    [13,2,8,4,6,15,11,1,10,9,3,14,5,0,12,7],
    [1,15,13,8,10,3,7,4,12,5,6,11,0,14,9,2],
    [7,11,4,1,9,12,14,2,0,6,10,13,15,3,5,8],
    [2,1,14,7,4,10,8,13,15,12,9,0,3,5,6,11]
    ]

    ];


    // PC1 (Permuted Choice 1) - Used in key generation
    // Removes parity bits from the 64-bit key and rearranges to get 56 bits
    // These 56 bits are split into two 28-bit halves for subkey generation
    const PC1 = [
    57,49,41,33,25,17,9,
    1,58,50,42,34,26,18,
    10,2,59,51,43,35,27,
    19,11,3,60,52,44,36,
    63,55,47,39,31,23,15,
    7,62,54,46,38,30,22,
    14,6,61,53,45,37,29,
    21,13,5,28,20,12,4
    ];


    // PC2 (Permuted Choice 2) - Final key permutation
    // Selects 48 bits from the 56-bit key material
    // These 48 bits become the round subkey used in the Feistel function
    const PC2 = [
    14,17,11,24,1,5,
    3,28,15,6,21,10,
    23,19,12,4,26,8,
    16,7,27,20,13,2,
    41,52,31,37,47,55,
    30,40,51,45,33,48,
    44,49,39,56,34,53,
    46,42,50,36,29,32
    ];


    // SHIFTS - Number of left shifts for each of the 16 rounds
    // The key halves are rotated left by the specified amount each round
    // This ensures each subkey is different
    const SHIFTS = [
    1, 1, 2, 2,
    2, 2, 2, 2,
    1, 2, 2, 2,
    2, 2, 2, 1
    ];

    // ============================================
    // HELPER FUNCTIONS
    // ============================================

    // Permute - Rearranges bits according to a permutation table
    // Used throughout DES for IP, FP, E, P, PC1, PC2
    // Takes a binary string and rearranges it based on the table indices
    function permute(input, table) {
        return table.map(i => input[i - 1]).join('');
    }


    // XOR (Exclusive OR) - Compares two binary strings bit by bit
    // Returns '1' if bits differ, '0' if they're the same
    // This is a fundamental operation in DES encryption
    function xor(a, b) {
        let result = '';
        for (let i = 0; i < a.length; i++) {
            result += a[i] === b[i] ? '0' : '1';
        }
        return result;
    }

    // Left Shift - Rotates bits to the left
    // Used in key schedule to generate different subkeys for each round
    // Example: "110" shifted left by 1 becomes "101"
    function leftShift(bits, shifts) {
        return bits.slice(shifts) + bits.slice(0, shifts);
    }

    // ============================================
    // MAIN DES FUNCTIONS - THE CORE ALGORITHM
    // ============================================

    // S-box Substitution - Non-linear transformation (confuses the key-plaintext relationship)
    // Takes 48 bits, splits into 8 groups of 6 bits
    // Each 6-bit group uses its first and last bit to select a row, middle 4 bits select column
    // Looks up value in S-box table and converts to 4-bit output
    // Result: 48 bits become 32 bits
    function sboxSubstitution(bits48) {

        let output = '';

        for (let i = 0; i < 8; i++) {

            let block = bits48.slice(i * 6, i * 6 + 6);

            let row = parseInt(block[0] + block[5], 2);
            let col = parseInt(block.slice(1, 5), 2);

            let value = SBOX[i][row][col];

            output += value.toString(2).padStart(4, '0');
        }

        return output; // 32 bits
    }



    // Feistel Function - Core of each DES round
    // Takes 32-bit right half and 48-bit round key
    // Returns 32 bits that will be XORed with the left half
    // The "F" function provides the confusion and diffusion
    function feistelFunction(right, key) {

        let expanded = permute(right, E);      // Expand: 32 → 48 bits

        let xored = xor(expanded, key);        // XOR with round key

        let sboxOutput = sboxSubstitution(xored); // S-box substitution: 48 → 32 bits

        let permuted = permute(sboxOutput, P); // Final P-box permutation: 32 bits

        return permuted;
    }

    // Key Schedule - Generates 16 subkeys from the original 64-bit key
    // Each round uses a different 48-bit subkey derived from the original key
    // This ensures security through key diversity
    function generateKeys(key64) {

        let key56 = permute(key64, PC1);  // Remove parity bits: 64 → 56 bits

        let left = key56.slice(0, 28);    // Split into two 28-bit halves
        let right = key56.slice(28, 56);

        let keys = [];

        // Generate 16 different subkeys, one for each round
        for (let i = 0; i < 16; i++) {

            left = leftShift(left, SHIFTS[i]);  // Rotate left by 1 or 2 positions
            right = leftShift(right, SHIFTS[i]);

            let combined = left + right;        // Combine the two halves

            keys.push(permute(combined, PC2));  // Select 48 bits for this round's subkey
        }

        return keys;
    }

    // DES Encryption - The main encryption algorithm
    // Takes 64-bit plaintext and 64-bit key, returns 64-bit ciphertext
    function desEncrypt(plaintext, key) {

        // Initial Permutation - Rearrange input bits
        let permuted = permute(plaintext, IP);

        let left = permuted.slice(0, 32);    // Split into 32-bit halves
        let right = permuted.slice(32, 64);

        let keys = generateKeys(key);          // Generate 16 round keys

        // Perform 16 rounds of Feistel cipher
        // Each round: pass right half through Feistel function,
        // XOR result with left half, then swap halves
        for (let i = 0; i < 16; i++) {
            let newLeft = right;                // New left becomes old right
            let f = feistelFunction(right, keys[i]);  // Apply Feistel function
            let newRight = xor(left, f);        // XOR Feistel output with old left

            left = newLeft;
            right = newRight;
        }

        let combined = right + left; // After all 16 rounds, do final swap

        return permute(combined, FP); // Final Permutation
    }

    // DES Decryption - Reverses encryption
    // Same algorithm as encryption but with round keys in REVERSE order
    // This is the power of the Feistel cipher - decryption uses same structure
    function desDecrypt(ciphertext, key) {

        let permuted = permute(ciphertext, IP);  // Initial Permutation

        let left = permuted.slice(0, 32);
        let right = permuted.slice(32, 64);

        let keys = generateKeys(key).reverse();

        for (let i = 0; i < 16; i++) {
            let newLeft = right;
            let f = feistelFunction(right, keys[i]);
            let newRight = xor(left, f);

            left = newLeft;
            right = newRight;
        }

        let combined = right + left;

        return permute(combined, FP);
    }

    // ============================================
    // CONVERSION FUNCTIONS - HEX ↔ BINARY
    // ============================================

    // Convert hex string to binary string
    // Each hex digit becomes 4 binary digits
    // Example: "A" (hex) → "1010" (binary)
    function hexToBinary(hex) {
        return hex.split('').map(h =>
            parseInt(h, 16).toString(2).padStart(4, '0')
        ).join('');
    }

    // Convert binary string to hex string
    // Each group of 4 binary digits becomes 1 hex digit
    // Example: "1010" (binary) → "A" (hex)
    function binaryToHex(bin) {
        let hex = '';
        for (let i = 0; i < bin.length; i += 4) {
            hex += parseInt(bin.slice(i, i + 4), 2)
                    .toString(16)
                    .toUpperCase();
        }
        return hex;
    }

    // ============================================
    // UI AND EVENT HANDLING
    // ============================================

    // Get references to HTML input and output elements
    const plaintextInput = document.getElementById("plaintextInput");   // User input: plaintext in hex
    const keyInput = document.getElementById("keyInput");               // User input: encryption key in hex
    const startBtn = document.getElementById("startBtn");               // Button to trigger encryption/decryption
    const ciphertextOutput = document.getElementById("ciphertextOutput"); // Display encrypted result
    const decryptedOutput = document.getElementById("decryptedOutput");   // Display decrypted result

    // ============================================
    // EVENT LISTENER - Handles the button click
    // ============================================
    startBtn.addEventListener("click", () => {
        // Get and trim whitespace from user inputs
        let plaintextHex = plaintextInput.value.trim();
        let keyHex = keyInput.value.trim();

        // Validate that both inputs are provided
        if (!plaintextHex || !keyHex) {
            alert("Please enter both plaintext and key in HEX format.");
            return;
        }

        // Validate exact length (DES requires exactly 64 bits = 16 hex characters)
        if (plaintextHex.length !== 16) {
            alert("Plaintext must be exactly 16 HEX characters (64 bits).");
            return;
        }
        if (keyHex.length !== 16) {
            alert("Key must be exactly 16 HEX characters (64 bits).");
            return;
        }

        // Convert user inputs from hex to binary (DES works with bits)
        const plaintext = hexToBinary(plaintextHex);
        const key = hexToBinary(keyHex);

        // Perform encryption
        const cipherBinary = desEncrypt(plaintext, key);
        const cipherHex = binaryToHex(cipherBinary);    // Convert back to hex for display

        // Verify by performing decryption
        const decryptedBinary = desDecrypt(cipherBinary, key);
        const decryptedHex = binaryToHex(decryptedBinary);  // Convert back to hex for display

        // Update the page with results
        ciphertextOutput.textContent = cipherHex;
        decryptedOutput.textContent = decryptedHex;
    });


