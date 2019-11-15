//FoodTruckInfo Model
module.exports = (sequelize, DataTypes) => {
    const FoodTruckInfo = sequelize.define('FoodTruckInfo', 
    {
        name: {type: DataTypes.STRING},
        cuisine: {type: DataTypes.STRING},
        cardImg: {type: DataTypes.STRING},
        bannerImg: {type: DataTypes.STRING},
        about: {type: DataTypes.STRING},
        website: {type: DataTypes.STRING},
        address:{type: DataTypes.STRING},
        menu:{type: DataTypes.STRING},
        MondayOpen:{type: DataTypes.STRING},
        MondayClose:{type: DataTypes.STRING},
        TuesdayOpen:{type: DataTypes.STRING},
        TuesdayClose:{type: DataTypes.STRING},
        WednesdayOpen:{type: DataTypes.STRING},
        WednesdayClose:{type: DataTypes.STRING},
        ThursdayOpen: {type: DataTypes.STRING},
        ThursdayClose: {type: DataTypes.STRING},
        FridayOpen: {type: DataTypes.STRING},
        FridayClose: {type: DataTypes.STRING},
        SaturdayOpen: {type: DataTypes.STRING},
        SaturdayClose: {type: DataTypes.STRING},
        SundayOpen: {type: DataTypes.STRING},
        SundayClose: {type: DataTypes.STRING},

    })
    return FoodTruckInfo
}