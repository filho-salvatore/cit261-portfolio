import Twit  from 'twit'; // this is how we import the twit package
import dotenvSafe from 'dotenv-safe';
dotenvSafe.config();
const  consumerKey = process.env.CONSUMERKEY;
//const query = process.env.QUERY;
const accessTokenKey = process.env.ACCESSTOKENKEY;
const accessTokenSecret = process.env.ACCESSTOKENSECRET;
const consumerSecret = process.env.COSUMERSECRET;
//const rapidAPIkey = process.env.RAPIDAPIID;

const config = {
   consumer_key:         consumerKey,
   consumer_secret:      consumerSecret,
   access_token:         accessTokenKey,
   access_token_secret:  accessTokenSecret
 };

 var params = {

  q: 'brazil',
  
  count: 100
  
  }; // this is the param variable which will have key and value 

var T = new Twit(config); //this is the object of twit which will help us to call functions inside it



export const TwitterRoute =  function(app) {   //to access the twitter API

  app.get('/twitter',(req,res)=>{
  
  T.get('search/tweets', params,(err, data, response)=>{
    if(err){

      console.log("Something went wrong!");
      
      }

    console.log(JSON.stringify(data));
    res.status(200).json(data);
  }); // get is the function to search the tweet which three paramaters 'search/tweets' ,params and a callback function.



});
};