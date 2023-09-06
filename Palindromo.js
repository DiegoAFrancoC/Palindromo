const readline = require("readline-sync");

function lowerValuePalindrome(s, n, k) {
    s = s.split(""); // Convertir la cadena en un arreglo para poder modificarla fácilmente
    let changes = 0; // Inicializar el contador de cambios realizados a 0
    // Primero, encontramos los lugares donde los caracteres difieren de sus reflejos correspondientes
    const diffIndices = [];
    for (let i = 0; i < Math.floor(n / 2); i++) {
      if (s[i] !== s[n - 1 - i]) {
        diffIndices.push(i);
      }
    }
    // Si el número de cambios necesarios supera el número máximo permitido (k), no es posible hacer un palíndromo
    if (diffIndices.length > k) {
      return "-1";
    }
    let i = 0;
    while (i < diffIndices.length && k > 0) {
      const maxDigit = Math.max(s[i], s[n - 1 - i]);
      if (s[i] !== maxDigit) {
        s[i] = maxDigit;
        s[n - 1 - i] = maxDigit;
        k -= 1;
      }
      i += 1;
    }
    // Después de hacer los cambios necesarios en los lugares diferentes, podemos seguir haciendo cambios para maximizar el número
    i = 0;
    while (k > 0 && i <= Math.floor(n / 2)) {
      if (s[i] !== '9') {
        if (k >= 2 && diffIndices.includes(i)) {
          s[i] = '9';
          s[n - 1 - i] = '9';
          k -= 2;
        } else if (k >= 1) {
          if (i === Math.floor(n / 2)) {
            s[i] = '9';
          } else {
            if (diffIndices.includes(i)) {
              k += 1;
            }
            s[i] = '9';
            s[n - 1 - i] = '9';
          }
          k -= 1;
        }
      }
      i += 1;
    }
    return s.join(""); // Convertir el arreglo nuevamente en una cadena y devolverla como resultado
  }
  // Leer la entrada
  const input = require("readline-sync");
  const nk = input.question("Ingrese la longitud n y el número máximo de cambios k (separados por espacio): ");
  const [n, k] = nk.split(" ").map(Number);
  const s = input.question("Ingrese la cadena de números de n dígitos: ");
  // Llamar a la función e imprimir el resultado
  const result = lowerValuePalindrome(s, n, k);
  console.log(result);