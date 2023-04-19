import pegaArquivo from "./index.js";

const caminho = process.argv; // argv -> valores de argumentos 
// console.log(caminho); // esse comando retorna o caminho dos comandos digitados no terminal

pegaArquivo(caminho[2]);