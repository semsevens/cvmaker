import express from 'express';
import bodyParser from 'body-parser';
import {generateComponentAsPDF} from '../middlewares/generate-pdf';
import * as Designs from '../../web/designs';

const AppRoutes = (app) => {

  const router = express.Router();

  router.post('/download', bodyParser.json() , function(req, res){
    let Comp = Designs[`Design${req.body.designId}`];
    let name = (req.user && req.user && req.user['displayName']) || '';
    const filename = `${name}-简历-${new Date().getTime()}`;
    generateComponentAsPDF({html: app.locals.getComponentAsHTML(Comp, req.body.cvdata, req.body.designColor), filename}).then((response) => {
      res.send(response);
    }).catch((error) => res.status(500).send(error));
  });

  router.get('/design/:id', bodyParser.json() , function(req, res){
    try{
      const json = require('../mock/snehajain.json');
      let Comp = Designs[`Design${req.params.id}`];
      const html = app.locals.getComponentAsHTML(Comp, json);
      res.send(html);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.get('*', (req, res) => {
    if (req.user) req.user.isLoggedIn = true;
    app.locals.renderIndex(res, {user: req.user});
  });

  return router;
};

export default AppRoutes;
