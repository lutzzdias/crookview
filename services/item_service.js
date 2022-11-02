const { Item } = require("../models/item");

//getItem and return a JSON response
//tenho que verificar se vai ser assim mesmo
const getAllItems = async (req, res) => {
    const item = await Item.findAll().then(() => {
        res.json(item);
    }).catch((err) => {
        console.log("Error listing posts" + err);
    });
    
} 

module.exports = {
    getAllItems,
};