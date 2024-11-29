#!/usr/bin/env node
const { Command } = require('commander');
const inquirer = require('inquirer').default;
const fs = require('fs');
const path = require('path');
const os = require('os');
const { exec } = require('child_process');
const { loadPluginsAndCommands } = require('./utils/plugin-loader');
const program = new Command();

const pluginsDir = path.join(os.homedir(), '.li-fe-cli/plugins');
async function loadCommands() {
   const commandsDir = path.join(__dirname, 'commands');
   const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js'));

   const pluginsConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'plugins.json'), 'utf8'));

   commandFiles.forEach(file => {
      const command = require(`./commands/${file}`);
      const pluginConfig = pluginsConfig.commands[command.command];

      if (pluginConfig) {
         program
            .command(command.command)
            .description(command.description)
            .action(async (...args) => {
               const versions = args.slice(0, -1).length > 0 ? args.slice(0, -1) : pluginConfig.versions || [];
               await command.execute(versions);
            });
      }
   });

   return Object.keys(pluginsConfig.commands);
}


async function selectCommandInteractively() {
   const plugins = loadPluginsAndCommands();
   
   const choices = plugins
      .filter(plugin => plugin.command && plugin.description)
      .map(plugin => ({
         name: `[${plugin.type}]: ${plugin.command} - ${plugin.description}`,
         value: plugin
      }));

   if (choices.length === 0) {
      console.log("Nenhum plugin válido encontrado.");
      return;
   }

   const { selectedPlugin } = await inquirer.prompt([
      {
         type: 'list',
         name: 'selectedPlugin',
         message: 'Selecione um plugin para executar:',
         choices
      }
   ]);

   if (selectedPlugin.prompt) {
      const { userInput } = await inquirer.prompt([
         {
            type: selectedPlugin.prompt.type,
            name: 'userInput',
            message: selectedPlugin.prompt.message,
            default: selectedPlugin.prompt.default || null
         }
      ]);

      const processedInput = selectedPlugin.prompt.processInput
         ? selectedPlugin.prompt.processInput(userInput)
         : [userInput];

      console.log(`Executando plugin: ${selectedPlugin.name} com args: ${processedInput}`);
      await selectedPlugin.execute(processedInput);
   } else {
      console.log(`Executando plugin: ${selectedPlugin.name}`);
      await selectedPlugin.execute();
   }
}

// Função inicial do CLI
async function initCLI() {
   console.log(`
         ░▒▓███████▓▒░░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓████████▓▒░ 
         ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░  ░▒▓█▓▒░     
         ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░       ░▒▓█▓▒▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░  ░▒▓█▓▒░     
         ░▒▓█▓▒░░▒▓█▓▒░▒▓██████▓▒░  ░▒▓█▓▒▒▓█▓▒░░▒▓███████▓▒░░▒▓█▓▒░  ░▒▓█▓▒░     
         ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░        ░▒▓█▓▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░  ░▒▓█▓▒░     
         ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░        ░▒▓█▓▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░  ░▒▓█▓▒░     
         ░▒▓███████▓▒░░▒▓████████▓▒░  ░▒▓██▓▒░  ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░  ░▒▓█▓▒░     
   `);
   
   const commands = await loadCommands();
   if (process.argv.length <= 2) {
      await selectCommandInteractively(commands);
   } else {
      program.parse(process.argv);
   }
}

initCLI();
