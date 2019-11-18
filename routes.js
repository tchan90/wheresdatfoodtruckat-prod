const AuthenticationRoutes = require('./controllers/Authentication');
const AuthenticationPolicy = require('./policies/AuthenticationPolicy');
const DirectoryController = require('./controllers/DirectoryController');
const FavouritesController = require('./controllers/FavouriteController');
//const auth = require('./policies/middleware/auth')

module.exports = (app) => {
    //Register and Login
    app.post('/register', AuthenticationPolicy.register, AuthenticationRoutes.register)
    app.post('/login', AuthenticationRoutes.login)
    
    //Directory
    //app.get('/directory', DirectoryController.getAllFoodTrucks)
    //AddTruck
    app.post('/addTruck', DirectoryController.postFoodTruck)
    //Get FoodTruck by ID
    app.get('/foodTruck/:foodTruckId', DirectoryController.getFoodTruckById)
    //Update Foodtruck by ID
    app.put('/foodTruck/:foodTruckId', DirectoryController.putFoodTruckById)
    //Get FoodTrucks and via search
    app.get('/directory', DirectoryController.getFoodTrucks)
    //Delete FoodTruck
    app.delete('/deleteFoodTruck/:foodTruckId', DirectoryController.deleteFoodTruck)

    //Favourites
    //get Favourites from param
    app.get('/favourites', FavouritesController.getFavourites)
    //post Favourites
    app.post('/favourites', FavouritesController.postFavourites)
    //delete Favourites
    app.delete('/favourites/:favouriteId', FavouritesController.deleteFavourite)
    //get Favourites from db
    app.get('/getAllfavourites', FavouritesController.displayFavourites)
}