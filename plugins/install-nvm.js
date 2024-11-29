const shell = require('shelljs');
const os = require('os');

module.exports = {
   command: 'install-nvm',
   description: 'Instala o NVM (Node Version Manager)',
   prompt: {
      type: 'confirm',
      message: 'Deseja instalar o NVM (Node Version Manager)?'
   },
   execute: async () => {
      if (shell.which('nvm')) {
         console.log("NVM já está instalado.");
         return;
      }

      console.log("NVM não encontrado. Iniciando a instalação...");

      const platform = os.platform();

      if (platform === 'win32') {
         console.log("Instalando NVM no Windows...");
         shell.exec('curl -o- https://raw.githubusercontent.com/coreybutler/nvm-windows/master/nvm-setup.exe | bash');
      } else {
         console.log("Instalando NVM no macOS/Linux...");
         shell.exec('curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash');
      }

      console.log("NVM instalado com sucesso.");
   }
};
