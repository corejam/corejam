# Corejam 

### Usage

Corejam is a scaffolding for building progressive GraphQL powered jamstack applications.

```bash
npm i -g @corejam/cli
```

To get started with a new project, run the following command:

```bash
corejam createApp <NAME>    # create new project
cd <NAME>                   # change into project directory
corejam dev                 # start the corejam dev playground

# GraphQL playground will be available on localhost:3000
# StencilJS playground will be available on localhost:3001
```

### Documentation

```bash
  Usage
    $ corejam <command> [options]

  Available Commands
    build             Build the whole plugin source
    dev               Plugin dev process
    api:serve         Start graphql Server
    api:dev           Start graphql server and set up hot reloading
    createApp         Bootstraps new corejam app
    generateSchema    
    test              
    test:wc           
    static            build static html from app
    static:serve      Serve static folder

  For more info, run any command with the `--help` flag
    $ corejam build --help
    $ corejam dev --help

  Options
    -v, --version    Displays current version
    -h, --help       Displays this message
   
```

