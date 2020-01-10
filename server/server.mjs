import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';

export class Server {
  constructor() {
    this.express = express();
    this.express.disable('x-powered-by');

    this.express.use(cookieParser());
   
    //let viewsFolder = path.resolve()+'/views';   
    //let publicFolder = path.resolve()+'/public';   
    
    //the public_html folder
    this.express.use(express.static('public'));
    // set the view engine to ejs
    this.express.set('views', 'vies'); //folder to look for the ejs templetes
    this.express.set('view engine', 'ejs');
    

// route for user's dashboard
this.express.get('/dashboard', (req, res) => {
 
      res.render('dashboard');
 
});
    this.express.get('/:name?', (req, res) => {
      const name = req.params.name;

      res.render('index', {
        'currentLocale': res.locale,
        'name': name || 'Theo',
        'messageCount': 5,
        
      });
    });
  }

  start() {
    return new Promise((resolve) => {
      const http = this.express.listen(8000, () => {
        const { port } = http.address();
        console.info(`[p ${process.pid}] Listening at port ${port}`);
        resolve();
      });
    });
  }
}
