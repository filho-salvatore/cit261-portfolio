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
   consumer_key:         'yDLiuoaJuqxFF0DMkoH9CSyKH',
   consumer_secret:      'LwXgxR98wAToAbWw6hRjXGFgvEzjssscFtcJmAm35c4rpKb9Ys',
   access_token:         '994282545746456578-5heHP6UxfS7Y1SEqdrQJeYjHCzc0YnQ',
   access_token_secret:  'u9NUwbXwJiocg7P1uBCbjxUOCbRMbAOetm4NgU8S0YZb5'
 };

 

var T = new Twit(config); //this is the object of twit which will help us to call functions inside it



export const TwitterRoute =  function(app) {   //to access the twitter API

  app.get('/twitter',(req,res)=>{
     let QueryText = req.query.querytext || '';
     let params = {

      q: QueryText,
      
      count: 10
      
      }
  T.get('search/tweets', params,(err, data, response)=>{
    if(err){

      console.log("Something went wrong!");
      
      }

    //console.log(JSON.stringify(data));
    let teste = data.statuses;
    let metadata = data.search_metadata;
    let parsed = JSON.stringify(data);
    
    res.status(200).json(data);
  }); // get is the function to search the tweet which three paramaters 'search/tweets' ,params and a callback function.



});
};