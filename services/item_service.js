const { Item } = require("../models/item");


const getItems = async (req, res) => {
    try{
    const item = await Item.findAll();
    res.status(200).json(item);
    }catch(error){
        return handleError(error);
    };
    
} 

const getItemById = async(req, res)=>{
    const id = req.params.id;

    try{
        const item = await Item.findByPk(id);

        if(item == null) return res.status(404).send("Item not found.");

        return res.status(200).json(review);
    }catch(error){
        return handleError(error);
    }
};

const createItem = async (req, res) =>{
    const { title, description, date, image, type} = req.body;
    try {
        const newItem = await review.create({
            title: title,
            description: description,
            date: date,
            image: image,
            type: type,
        });
        res.status(201).json(newItem);
    } catch (error){
        return handleError (error);
    }
};

const updateItem = async (req, res) =>{
    const id = req.params.id;
    const { title, description, date, image, type} = req.body;

    try{
        const [_, [result]] = await Item.update(
            {
                title: title,
                description: description,
                date: date,
                image: image,
                type: type,
            },
            { where: {id: id}, returning: true}
        );
        return res.status(200).json(result);
    } catch (error){
        return handleError(error);
    }
};

const handleError = (error) => {
    console.log(error);
    return res.status(500).json({ error: error.message });
  };
module.exports = {
    getItems,
    getItemById,
    createItem,
    updateItem,
};