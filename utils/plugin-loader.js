const fs = require('fs');
const path = require('path');

function loadModulesFromDirectory(directoryPath, type) {
   const modules = [];
   
   fs.readdirSync(directoryPath).forEach(folder => {
      const modulePath = path.join(directoryPath, folder);
      if (fs.existsSync(modulePath)) {
         const module = require(modulePath);
         
         if (module.command && module.description && module.execute) {
            module.type = type;  // Define o tipo do módulo (plugin ou comando)
            modules.push(module);
         } else {
            console.warn(`O módulo em ${modulePath} está incompleto ou incorreto.`);
         }
      }
   });

   return modules;
}

function loadPluginsAndCommands() {
   const pluginsDir = path.join(__dirname, '../plugins');
   const commandsDir = path.join(__dirname, '../commands');

   const plugins = loadModulesFromDirectory(pluginsDir, 'plugin');
   const commands = loadModulesFromDirectory(commandsDir, 'command');

   return [...commands, ...plugins];
}

module.exports = { loadPluginsAndCommands };
