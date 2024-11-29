const shell = require('shelljs');
const path = require('path');
const os = require('os');

module.exports = {
   command: 'install-node <versions...>',
   description: 'Instala uma ou mais versões específicas do Node.js usando NVM',
   prompt: {
      type: 'input',
      message: 'Digite as versões do Node.js para instalar, separadas por vírgulas (ex: 14.17.0, 16.13.0):',
      processInput: (input) => input.split(',').map(version => version.trim())
   },
   execute: async (versions) => {
      const nvmPath = path.join(os.homedir(), '.nvm', 'nvm.sh');

      if (!shell.test('-f', nvmPath)) {
         console.log("Erro: NVM não está instalado. Por favor, instale o NVM primeiro.");
         return;
      }

      console.log("Iniciando a instalação das versões do Node.js...");

      for (const version of versions) {
         console.log(`Instalando o Node.js versão ${version}...`);
         shell.exec(`bash -c "source ${nvmPath} && nvm install ${version}"`);
         console.log(`Node.js versão ${version} instalado com sucesso!`);
      }

      console.log("Todas as versões especificadas foram instaladas.");
   }
};
