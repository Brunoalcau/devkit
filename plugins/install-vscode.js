const shell = require('shelljs');
const os = require('os');

module.exports = {
   command: 'install-vscode',
   description: 'Instala o Visual Studio Code no sistema',
   execute: async () => {
      console.log("Iniciando instalação do Visual Studio Code...");

      const platform = os.platform();

      if (platform === 'darwin') {
         if (shell.which('brew')) {
            console.log("Instalando VSCode no macOS usando Homebrew...");
            shell.exec('brew install --cask visual-studio-code');
         } else {
            console.log("Homebrew não está instalado. Por favor, instale o Homebrew e tente novamente.");
            console.log("Link para instalação do Homebrew: https://brew.sh/");
         }
      } else if (platform === 'linux') {
         if (shell.which('snap')) {
            console.log("Instalando VSCode no Linux usando Snap...");
            shell.exec('sudo snap install code --classic');
         } else if (shell.which('apt')) {
            console.log("Instalando VSCode no Linux usando apt...");
            shell.exec('sudo apt update && sudo apt install -y code');
         } else {
            console.log("Nenhum gerenciador de pacotes suportado encontrado. Instale o VSCode manualmente em https://code.visualstudio.com/download.");
         }
      } else if (platform === 'win32') {
         if (shell.which('winget')) {
            console.log("Instalando VSCode no Windows usando Winget...");
            shell.exec('winget install --id Microsoft.VisualStudioCode -e --source winget');
         } else {
            console.log("Winget não está disponível. Baixe e instale o VSCode manualmente em https://code.visualstudio.com/download.");
         }
      } else {
         console.log("Sistema operacional não reconhecido. Por favor, instale o VSCode manualmente em https://code.visualstudio.com/download.");
      }

      console.log("Instalação do Visual Studio Code concluída (ou verifique as instruções acima).");
   }
};
