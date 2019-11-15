//FoodTruck endpoint methods
const {FoodTruckInfo} = require('../models')
const {Op} = require('../models')

module.exports = {
    //Get all Food Trucks
    async getAllFoodTrucks(req,res){
        try {
            const foodTruckInfo = await FoodTruckInfo.findAll({
                limit:10
            })
            res.send(foodTruckInfo)
        } catch (error) {
            res.status(500).send({
                error: 'An error has occurred trying to get all the food trucks =('
            })
        }
    },
    //Post Food Truck
    async postFoodTruck(req,res){
        try {
            const foodTruckInfo = await FoodTruckInfo.create(req.body)
            res.send(foodTruckInfo);
        } catch (error) {
            console.log(error);
            res.status(500).send({
                error: 'An error has occured to posting a food truck'
            })
        }
    },
    //Get Food Truck by ID
    async getFoodTruckById(req,res){
        try {
            const foodTruck = await FoodTruckInfo.findOne({
                where : {id: req.params.foodTruckId}
            })
            res.send(foodTruck);
        } catch (error) {
            res.status(500).send({
                error: 'An error occured trying to get the trucker information'
            })
        }
    },
    //Update Food Truck by ID
    async putFoodTruckById(req,res){
        try {
            const foodTruck = await FoodTruckInfo.update(req.body,{
                where:{id: req.params.foodTruckId}
            })
            res.send(foodTruck)
        } catch (error) {
            console.log(error);
            res.status(500).send({
                error:"An error occured trying to edit the food truck"
            })
        }
    },
    //get Foodtruck via Search
    async getFoodTrucks (req,res){
        try{
            let foodTrucks = null
            const search = req.query.search 

         if(search){
             foodTrucks = await FoodTruckInfo.findAll({
                 where:{[Op.or]: [{'name':{[Op.like]: `%${search}%`}},
                 {'cuisine':{[Op.like]: `%${search}%`}}
                ]}
             })
         }
         else{
             foodTrucks = await FoodTruckInfo.findAll({limit:10})
         }
         res.send(foodTrucks);
        } catch(err){
            console.log(err);
            res.status(500).send({
                error:'An error occured trying to get all Food Trucks'
            })
        }
    },
   //Delete Food Truck by ID
   async deleteFoodTruck(req,res){
    try {
        const foodTruck = await FoodTruckInfo.destroy({
            where : {id: req.params.foodTruckId}
        })
        res.send("ok");
    } catch (error) {
        res.status(500).send({
            error: 'An error occured trying to delete the FoodTruck'
        })
    }
},
} 