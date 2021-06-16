const mongoose = require('mongoose')
require('dotenv').config({ path: '.env' })


const connectionDatabase = () => {
    try {
        mongoose.connect(`${process.env.DB_MONGO}`)
        console.log('Conexión realizada exitosamente');
        
    } catch (error) {
        console.log(error);
        process.exit(1); //Detiene la App
        
    }
}

module.exports = connectionDatabase;