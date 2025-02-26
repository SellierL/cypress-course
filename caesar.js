function caesarCipher(text, shift) {
    return text.split('').map(char => {
        if (char.match(/[a-zA-Z]/)) {
            let code = char.charCodeAt(0);
            let offset = (code >= 65 && code <= 90) ? 65 : 97;
            return String.fromCharCode(((code - offset + shift) % 26 + 26) % 26 + offset);
        }
        return char;
    }).join('');
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#encryptBtn").addEventListener("click", function() {
        const text = document.querySelector("#text").value.trim();  // Suppression des espaces inutiles
        const shift = parseInt(document.querySelector("#shift").value, 10);

        console.log("Texte saisi:", text);  // Vérification console
        console.log("Décalage:", shift);

        if (!text) {
            document.querySelector("#result").innerText = "Veuillez entrer un texte.";
            return;
        }

        const encryptedText = caesarCipher(text, shift);
        console.log("Texte chiffré:", encryptedText);  // Vérification console

        document.querySelector("#result").innerText = encryptedText;
    });
});
