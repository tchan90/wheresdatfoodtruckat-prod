//Favourite Sequelize Model
module.exports = (sequelize, Datatypes) => {
    const Favourite = sequelize.define('Favourite', {
        UserId: {type:Datatypes.STRING},
        FoodTruckId:  {type:Datatypes.STRING},
        FoodTruckName:{type:Datatypes.STRING},
        FoodTruckBannerImg:{type:Datatypes.STRING}
    })
   // this model is associated with User and Directory
    Favourite.associate = function(models){
        Favourite.belongsTo(models.Users)
        Favourite.belongsTo(models.FoodTruckInfos)
    }
    return Favourite
}