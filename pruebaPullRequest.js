'use strict';

//prueba para practicar pull requests!!

function cuentaHastaNum(num) {
  let cuentaFinal = Number();
  for (let i = 0; i < num; i++) {
    cuentaFinal++;
  }
  return cuentaFinal;
}

const resultado = cuentaHastaNum(20);

console.log(resultado);
