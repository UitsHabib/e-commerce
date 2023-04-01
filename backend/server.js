(function (){
    const path = require('path');
    const config = require(path.join(process.cwd(), './src/config/index'));

    config.initEnvVariables();
    
    const app = require(path.join(process.cwd(), './src/config/lib/app'));

    app.start();
})()