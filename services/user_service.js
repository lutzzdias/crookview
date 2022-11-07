const { User } = require("../models/user");

const createUser = async (req, res) =>{
    const { username, password, email, image } = req.body;

    try{
        const emailExists = checkEmailExistence(email);
        if(emailExists == true) return res.status(400).send("Email is already register.");
        
        const newUser = await User.create({
            username: username,
            password: password,
            email: email,
            image: image,
        });
        res.status(200).send("user created with sucess");
    }catch (error){
        handleError(error);
    }
};



const checkEmailExistence = async (email) =>{
    const user = await User.findOne(email);
    if(user == null){
        return false;
    }else{
        return true;
    }
}

const handleError = (error) => {
    console.log(error);
    return res.status(500).json({ error: error.message });
  };


module.exports = {
    createUser,

};
