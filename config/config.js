//Sqlite Database
module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'foodtruckfinder',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || 'root',
        options: {
         //type of database
         dialect: process.env.DIALECT || 'sqlite',
         host: process.env.HOST || 'localhost',
         storage: './foodtruckfinder.sqlite'   
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}