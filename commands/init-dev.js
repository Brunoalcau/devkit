// commands/init-dev.js
const pluginsConfig = require('../plugins.json').commands['init-dev'];

module.exports = {
   command: 'init-dev',
   description: 'Configura o ambiente de desenvolvimento',
   execute: async () => {
      console.log("Iniciando configuração do ambiente de desenvolvimento...");

      for (const pluginEntry of pluginsConfig) {
         let plugin;
         let versions = [];

         if (typeof pluginEntry === 'string') {
            plugin = require(`../plugins/${pluginEntry}`);
         } else if (typeof pluginEntry === 'object') {
            plugin = require(`../plugins/${pluginEntry.name}`);
            if (pluginEntry.name === 'install-node') {
               versions = pluginEntry.versions;
            }
         }

         console.log(`Executando: ${plugin.description}`);
         if (pluginEntry.name === 'install-node' && versions.length > 0) {
            await plugin.execute(versions);
         } else {
            await plugin.execute();
         }
      }

      console.log("Configuração do ambiente de desenvolvimento concluída com sucesso!");
   }
};
