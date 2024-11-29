

# **Documentação do Projeto CLI de Configuração de Ambiente de Desenvolvimento**


## **1. Introdução**

### O que é este CLI?

Este CLI foi desenvolvido para automatizar a configuração inicial do ambiente de desenvolvimento para novos desenvolvedores front-end. Ele simplifica o processo de instalação de ferramentas essenciais, como o NVM (Node Version Manager) e versões específicas do Node.js, agilizando o onboarding e evitando erros de configuração manual.

### Objetivo

O objetivo principal do CLI é facilitar e padronizar a configuração do ambiente para desenvolvedores. Ele garante que todos tenham as mesmas versões de ferramentas e dependências, o que reduz problemas de compatibilidade entre ambientes.

----------

## **2. Funcionalidades Principais**

### Comandos Disponíveis

-   **`init-dev`**: Executa uma série de etapas para configurar o ambiente inicial de desenvolvimento, como instalação do NVM e das versões do Node.js especificadas.
    
-   **`install-nvm`**: Instala o NVM (Node Version Manager) no sistema, se ele não estiver instalado.
    
-   **`install-node`**: Instala uma ou mais versões específicas do Node.js usando o NVM, garantindo que os desenvolvedores tenham as versões corretas do Node.js para o projeto.
    

----------

## **3. Estrutura do Projeto**

### Estrutura de Diretórios

```
dev-setup/
├── cli.js                    # Arquivo principal do CLI
├── commands/                 # Diretório de comandos
│   ├── init-dev.js           # Comando que executa os plugins para configuração inicial
├── plugins/                  # Diretório de plugins de tarefas
│   ├── install-nvm.js        # Plugin para instalar o NVM
│   ├── install-node.js       # Plugin para instalar Node.js
├── plugins.json              # Configuração dos plugins e comandos
└── package.json              # Configuração do projeto Node.js
``` 

### Explicação dos Arquivos

-   **`cli.js`**: Arquivo principal que gerencia os comandos e plugins.
-   **`commands/`**: Pasta contendo cada comando principal como arquivos individuais (`init-dev.js`).
-   **`plugins/`**: Pasta onde cada tarefa individual, como instalar o NVM ou uma versão do Node.js, é modularizada em plugins.
-   **`plugins.json`**: Arquivo de configuração que especifica quais plugins devem ser executados por cada comando, como `init-dev`.
-   **`package.json`**: Configura o projeto como um pacote Node.js e permite a instalação global do CLI.

----------

## **4. Configuração e Instalação**

### Pré-requisitos

-   **Node.js** e **NPM** devem estar instalados.

### Passo a Passo de Instalação

1.  **Clone o Repositório**:
    
    
    `git clone <URL-do-repositório>`
	`cd nome-do-projeto`
    
2.  **Instale o CLI Globalmente**:
    
    `npm install -g .` 
    
3.  **Verifique a Instalação**:
    `dev-setup --help` 
----------

## **5. Uso do CLI**

### 5.1. Comando Principal: `init-dev`

Executa todas as etapas necessárias para configurar o ambiente de desenvolvimento:

`dev-setup init-dev` 

Este comando:

-   Instala o NVM, caso não esteja instalado.
-   Instala as versões do Node.js configuradas no `plugins.json`.

### 5.2. Comando Auxiliar: `install-nvm`

Instala o NVM (Node Version Manager) separadamente, caso ainda não esteja instalado:

`dev-setup install-nvm` 

### 5.3. Comando Auxiliar: `install-node`

Instala uma ou mais versões específicas do Node.js:

`dev-setup install-node 14.17.0 16.13.0` 

----------

## **6. Arquivo de Configuração: `plugins.json`**

O `plugins.json` define quais plugins devem ser executados para cada comando. Exemplo:

    {
       "commands": {
          "init-dev": [
             "install-nvm",
             {
                "name": "install-node",
                "versions": ["14.17.0", "16.13.0", "18.0.0"]
             }
          ]
       }
    }

-   **`init-dev`**: Configura o ambiente para desenvolvimento, incluindo a instalação do 


----------


NVM e as versões do Node.js listadas.

----------

## **7. Como o CLI Funciona Internamente**

1.  **Carregamento de Comandos**:
    
    -   O `cli.js` carrega automaticamente todos os comandos definidos na pasta `commands/`.
2.  **Execução de Plugins**:
    
    -   Cada comando lê o `plugins.json` e carrega os plugins relevantes.
    -   Por exemplo, `init-dev` carrega e executa `install-nvm` e `install-node` com as versões especificadas.
3.  **Modularidade**:
    
    -   Cada tarefa é modularizada em um plugin, tornando o CLI extensível e fácil de manter.

----------

## **8. Exemplos de Uso e Teste**

-   **Configuração Completa do Ambiente**:
    
    
    `dev-setup init-dev` 
    
-   **Instalar Apenas o NVM**:
    
    
    `dev-setup install-nvm` 
    
-   **Instalar Múltiplas Versões do Node.js**:
    
    `dev-setup install-node 14.17.0 16.13.0` 
    

----------

## **9. Considerações Finais**

### Benefícios

-   **Automatização**: Reduz o tempo e os erros na configuração de ambiente.
-   **Consistência**: Garante que todos os desenvolvedores tenham o ambiente configurado de maneira uniforme.
-   **Modularidade**: Fácil de expandir e personalizar com novos plugins.

### Possíveis Expansões

-   Suporte para outras ferramentas ou configurações de ambiente.
-   Adição de novos comandos para outras fases de desenvolvimento ou integração contínua.

