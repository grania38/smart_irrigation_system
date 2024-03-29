mongoose = require ('mongoose')
//const urlMain = process.env.DB_URL || require('./env.config').main_db_url;
module.exports = () => {
    //create a connection pool to the main database, you can add connection to other databases
    mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
     {useNewUrlParser: true, useUnifiedTopology: true},
     ()=>{});
    const mainPool = mongoose.connection;

    mainPool.on('connected',()=>{
        console.log("Mongoose main connection pool is open to the main database");
    });

    mainPool.on('error', function(err){
        console.log("Mongoose main connection pool has occured "+err+" error");
    });

    mainPool.on('disconnected', function(){
        console.log("Mongoose main connection pool is disconnected");
    });

    process.on('SIGINT', function(){
        mainPool.close(function(){
            console.log("Mongoose main connection pool is disconnected due to application termination");
            process.exit(0)
        });
    });
}