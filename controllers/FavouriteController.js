//Favourite endpoint methods
const {Favourite} = require('../models') 

module.exports = {
    //get Favourites
    async getFavourites (req, res){
        console.log(req.query);
        try {
            const {foodTruckId, userId, foodTruckName, foodTruckBannerImg} = req.query // holds search query from url
            const favourite = await Favourite.findOne({
                where:{
                    UserId: userId,
                    FoodTruckId: foodTruckId,
                    FoodTruckName: foodTruckName,
                    FoodTruckBannerImg: foodTruckBannerImg
                }
            })
            res.send(favourite)
        } catch (err) {
            console.log(err);
            res.status(500).send({
                error: 'An error occured trying to get Favourites'
            })
        }
    },
    //post to Favourites
    async postFavourites (req, res){
        try {
            const {foodTruckId, userId, foodTruckName, foodTruckBannerImg} = req.body 
            const favourite = await Favourite.findOne({
                where:{
                    FoodTruckId: foodTruckId,
                    UserId: userId,
                    FoodTruckName: foodTruckName,
                    FoodTruckBannerImg: foodTruckBannerImg
                }
            })
            if(favourite){
                return res.status(400).send({error: 'you already have this Favourite'})
            }
            console.log(req.body)
            const newFavourite = await Favourite.create({
                UserId:Number(userId),
                FoodTruckId: Number(foodTruckId),
                FoodTruckName: String(foodTruckName),
                FoodTruckBannerImg: String(foodTruckBannerImg)
            })
            res.send(newFavourite)
        } catch ( err) {
            console.log(err);
            res.status(500).send({
                error: 'An error has occured trying to create the Favourite'
            })
        }
    },
    //delete Favourites
    async deleteFavourite(req,res){
        try {
            const {favouriteId} = req.params
            const favourite = await Favourite.findOne({
                where:{
                    id: favouriteId
                }
            })
            await favourite.destroy()
            res.send(favourite)
        } catch (error) {
            console.log(err);
            res.status(500).send({
                error: 'An error has occured trying to delete the Favourite'
            })
        }
    },

     //Display favourites
     async displayFavourites(req,res){
        try {
            const favourites = await Favourite.findAll({
                limit:10
            })
            res.send(favourites)
            console.log(favourites)
        } catch (error) {
            res.status(500).send({
                error: 'An error has occurred trying to get all the Favourites'
            })
        }
    },


}

    