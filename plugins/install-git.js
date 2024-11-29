const shell = require('shelljs');
const os = require('os');

module.exports = {
    command: 'install-git',
   description: 'Instala o Git e realiza as configurações iniciais',
   prompt: {
        type: 'confirm',
        message: 'Deseja instalar o GIT?'
    },
   execute: async () => {
      console.log("Verificando instalação do Git...");

      if (shell.which('git')) {
         const gitVersion = shell.exec('git --version', { silent: true }).stdout;
         console.log(`Git já está instalado: ${gitVersion.trim()}`);
      } else {
         console.log("Git não encontrado. Iniciando instalação...");

         if (os.platform() === 'linux') {
            console.log("Instalando Git em um sistema Linux...");
            if (shell.exec('sudo apt-get update && sudo apt-get install -y git').code !== 0) {
               console.error("Erro: Não foi possível instalar o Git automaticamente.");
               return;
            }
         } else if (os.platform() === 'darwin') {
            if (shell.which('brew')) {
               console.log("Instalando Git no macOS usando Homebrew...");
               shell.exec('brew install git');
            } else {
               console.log("Homebrew não encontrado. Para instalar o Git no macOS, instale o Homebrew primeiro:");
               console.log("/bin/bash -c \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\"");
               return;
            }
         } else if (os.platform() === 'win32') {
            console.log("Para instalar o Git no Windows, faça o download do instalador:");
            console.log("https://git-scm.com/download/win");
            return;
         } else {
            console.log("Sistema operacional não reconhecido para instalação automática. Instale o Git manualmente.");
            return;
         }

         console.log("Git instalado com sucesso.");
      }

      console.log("Configurando Git...");

      const username = shell.exec('git config user.name', { silent: true }).stdout.trim();
      const email = shell.exec('git config user.email', { silent: true }).stdout.trim();

      if (!username || !email) {
         const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
         });

         readline.question('Digite o nome de usuário para o Git: ', (user) => {
            shell.exec(`git config --global user.name "${user}"`);
            readline.question('Digite o email para o Git: ', (email) => {
               shell.exec(`git config --global user.email "${email}"`);
               console.log("Configuração do Git concluída.");
               readline.close();
            });
         });
      } else {
         console.log(`Configuração do Git já definida:\nNome de usuário: ${username}\nEmail: ${email}`);
      }
   }
};
