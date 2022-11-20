const bcrypt = require("bcryptjs");
const localstrategy = require("passport-local");
const { User } = require("../models");



module.exports = (passport) => {

    passport.use(new localstrategy({
        //aqui deveria ser a parte que estou pegando do front, deixei do mesmo jeito do tutorial. 
        //Preciso achar um jeito correto depois.
        emailField: 'email',
        passwordField: 'password'
    }, async (email, password, done) =>{
        try{
            const user = await User.findOne({where: {email: email}});
            
            //user not find
            if(!user){
                return done(null, false, res.status(403).send("Email Incorrect"));
            }

            const valid = bcrypt.compareSync(password, user.password);
            if(!valid){
                return done(null, false, res.status(403).send("Incorrect password"));
            }else{
                return done(null, user);
            }
        }catch(error){
            done(error, false);
        }
    }
    
    ))

    //Serialize id in user cookie
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });


    //We use the id to go to the db and return with the entire user
    passport.deserializeUser( async (id, done) =>{
        try{
            const user = await User.findByPk(id);
            done(null, user);
        } catch(error){
            done(err, null, res)
        }
    })
}