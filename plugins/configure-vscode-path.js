const shell = require('shelljs');
const os = require('os');
const path = require('path');

module.exports = {
  command: 'configure-vscode-path',
  description: 'Configura o comando `code` do Visual Studio Code no PATH',
  execute: async () => {
    console.log("Configurando o comando `code` no PATH...");

    const platform = os.platform();

    if (platform === 'darwin') {
      const codePath = "/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code";
      if (shell.test('-f', codePath)) {
        shell.exec(`sudo ln -sf "${codePath}" /usr/local/bin/code`);
        console.log("Comando `code` configurado no PATH no macOS.");
      } else {
        console.log("Erro: Visual Studio Code não encontrado. Verifique a instalação.");
      }

    } else if (platform === 'linux') {
      const bashrcPath = path.join(os.homedir(), '.bashrc');
      if (shell.which('snap')) {
        shell.exec(`echo 'export PATH="$PATH:/snap/bin"' >> ${bashrcPath}`);
        shell.exec(`source ${bashrcPath}`);
        console.log("Comando `code` configurado no PATH no Linux.");
      } else {
        console.log("Erro: VSCode não encontrado via Snap. Verifique a instalação.");
      }

    } else if (platform === 'win32') {
      const vscodePath = path.join(
        process.env.USERPROFILE,
        'AppData',
        'Local',
        'Programs',
        'Microsoft VS Code',
        'bin'
      );

      const setxCommand = `setx PATH "%PATH%;${vscodePath}"`;
      if (shell.test('-d', vscodePath)) {
        shell.exec(setxCommand);
        console.log("Comando `code` configurado no PATH no Windows.");
      } else {
        console.log("Erro: Caminho do VSCode não encontrado. Verifique a instalação.");
      }

    } else {
      console.log("Sistema operacional não reconhecido. Configure o VSCode manualmente.");
    }

    if (shell.which('code')) {
      const version = shell.exec('code --version', { silent: true }).stdout;
      console.log(`Comando 'code' está disponível! Versão do VSCode instalada: ${version}`);
    } else {
      console.log("Erro: O comando `code` não está disponível. Reinicie o terminal ou verifique o PATH.");
    }
  }
};
