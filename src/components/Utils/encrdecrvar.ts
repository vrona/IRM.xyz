// encrypt smart contract variable
function encryptVariableName(variableName: string): string {
    let encryptedName = "";
    for (let i = 0; i < variableName.length; i++) {
        // Shift each character by a fixed value (for example, 1)
        const charCode = variableName.charCodeAt(i) + 1;
        encryptedName += String.fromCharCode(charCode);
    }
    return encryptedName;
}

// Test with the variable name "flower"
const encryptedVariableName = encryptVariableName("flower");
console.log("Encrypted variable name:", encryptedVariableName); // Output: Encrypted variable name: gmpxfs

function decryptVariableName(encryptedName: string): string {
    let decryptedName = "";
    for (let i = 0; i < encryptedName.length; i++) {
        // Reverse the shift done during encryption
        const charCode = encryptedName.charCodeAt(i) - 1;
        decryptedName += String.fromCharCode(charCode);
    }
    return decryptedName;
}

// decrypt smart contract variable
const decryptedVariableName = decryptVariableName("gmpxfs");
console.log("Decrypted variable name:", decryptedVariableName); // Output: Decrypted variable name: flower
