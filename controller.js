const schema= require('./schema');
const bcrypt = require('bcrypt');
var saltRounds=10;
var jwt = require("jsonwebtoken");
var secret= 'secret';
var yahooFinance = require('yahoo-finance');

function Token() {
    let expirationDate = Math.floor(Date.now() / 1000) + 15 * 3000
    var token = jwt.sign({
        userID: schema.email,
        exp: expirationDate
    }, secret);
    console.log(token);
    return token;
}

module.exports={
    signup : (req,res)=>{
        if(!req.body.firstName || !req.body.lastName || !req.body.email ||
             !req.body.country || !req.body.userName || !req.body.password){
                return res.send({message:"Please fill all fields",status:400})
             }
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
              if(err)
                return res.send({
                  message:"Something went wrong",
                  statusCode:400,
                  error:err
                })
                else {
                    console.log(hash);
                    var obj={
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email.toLowerCase(),
                        country: req.body.country,
                        password: hash,
                        userName: req.body.userName
                    }
                    schema.create(obj)
                    .then((success)=> res.send({message:"Signup Successfully", status: 200, result:success}))
                    .catch((unsuccess)=> res.send({message:"Error", status:400, error:unsuccess}))
                }
    })
})
    },

    signIn:(req,res)=>{
        if(!req.body.userName || !req.body.password){
            return res.send({message:"Please fill required fields",status:400})
        }
        schema.findOne({userName:req.body.userName})
        .then(success=>{
            bcrypt.compare(req.body.password, success.password, function(err, resp) {
              if(err)
               return res.send({message:"Something went wrong",status:400,error:err})
               else {
                    if(resp=='true' || resp==true){
                    const token=  Token();
                      return res.send({message:"Successfully SignIn",status:200,result:success,token:token})
                    }else{
                      return res.send({message:"Password is incorrect",status:400})
                    }
               }
         });
          })
          .catch(unsuccess=>{
            return res.send({message:"You are not Registered",status:404,error:unsuccess})
          })
    },

    finance:(req,res)=>{
        yahooFinance.historical({
            symbol: 'AAPL',
            from: '2012-01-01',
            to: '2018-12-31',
          }, function (err, quotes) {
              if(err){
                  return res.send({message:"Error ",status:400});
              }else{
                  console.log(quotes);
                  return res.send({message:"fetch",status:200,result:quotes});
              }
          });
          
    }

}