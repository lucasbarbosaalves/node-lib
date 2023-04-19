// CLI - Interface de Linha de Comando
import pegaArquivo from "./index.js";
import fs from "fs";
import chalk from "chalk"; // colorir mensagem no console
import listaValidada from "./http-validacao.js";

const caminho = process.argv; // argv -> valores de argumentos
// console.log(caminho); // esse comando retorna o caminho dos comandos digitados no terminal
async function imprimeLista(valida, resultado, identificador = "") {
  if (valida) {
    console.log(
      chalk.yellow("lista validada"),
      chalk.black.bgGreen(identificador),
      await listaValidada(resultado)
    );
  } else {
    console.log(
      chalk.yellow("lista de"),
      chalk.black.bgGreen(identificador),
      resultado
    );
  }
}

async function processaTexto(argumentos) {
  const caminho = argumentos[2];
  const valida = argumentos[3] === '--valida';

  try {
    fs.lstatSync(caminho); // O método fs.lstatSync é usado para obter informações sobre um arquivo ou diretório, se trabalha com links simbólicos.
  } catch (erro) {
    if (erro.code === "ENOENT") {
      // código do erro dado no terminal, acesando pela propriedade '.code'
      console.log("arquivo ou diretório não existe");
    }
  }

  if (fs.lstatSync(caminho).isFile()) {
    const resultado = await pegaArquivo(argumentos[2]); // pegando o 3 argumento visto que é digitado o arquiv/dirr depois de "node src/cli.js"
    imprimeLista(valida, resultado);
  } else if (fs.lstatSync(caminho).isDirectory()) {
    const arquivos = await fs.promises.readdir(caminho); // caso seja digitado um diretorio, faz a leitura do diretorio
    arquivos.forEach(async (nomeDeArquivo) => {
      const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`);
      imprimeLista(valida, lista, nomeDeArquivo);
    });
  }
}
processaTexto(caminho);
