(function(){
const path = require('path')
const app = require('./src/config/lib/app')
const config = require(path.join(process.cwd(),('/src/config/config')))

config.initEnvironmentVariables()

app.bootStrap()

})()
