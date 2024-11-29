const fs = require('fs');
const path = require('path');
const os = require('os');
const { exec } = require('child_process');

const pluginsDir = path.join(os.homedir(), '.dev-kit/plugins');

if (!fs.existsSync(pluginsDir)) {
  fs.mkdirSync(pluginsDir, { recursive: true });
  console.log('Diretório criado:', pluginsDir);
} else {
  console.log('O diretório existe:', pluginsDir);
}

function installPlugin(pluginName) {
   const pluginPath = path.join(pluginsDir, 'node_modules', pluginName.trim());
   
   if (fs.existsSync(pluginPath)) {
      console.log(`Plugin ${pluginName} já está instalado em ${pluginsDir}`);
      return;
   }

   console.log(`Instalando o plugin ${pluginName} em ${pluginsDir}...`);
   exec(`npm install ${pluginName} --prefix ${pluginsDir}`, (error, stdout, stderr) => {
      if (error) {
         console.error(`Erro ao instalar o plugin ${pluginName}: ${error.message}`);
         return;
      }
      console.log(`Plugin ${pluginName} instalado com sucesso em ${pluginsDir}`);
   });
}

async function installPlugins(pluginNames) {
   for (const pluginName of pluginNames) {
      await installPlugin(pluginName);
   }
}

module.exports = {
   command: 'install-plugin',
   description: 'Instala um ou mais plugins adicionais',
   prompt: {
      type: 'input',
      message: 'Digite os nomes dos plugins que deseja instalar, separados por vírgulas:',
      processInput: (input) => input.split(',').map(name => name.trim())
   },
   execute: async (plugins) => {
      await installPlugins(plugins);
   }
};
