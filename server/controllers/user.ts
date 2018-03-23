import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

import User from '../models/user';

abstract class BaseCtrl {
  
    abstract model: any;
  
    getAll = (req, res) => {
      this.model.find({}, (err, docs) => {
        if (err) { return console.error(err); }
        res.json(docs);
      });
    }
  
    count = (req, res) => {
      this.model.count((err, count) => {
        if (err) { return console.error(err); }
        res.json(count);
      });
    }
  
    insert = (req, res) => {
      const obj = new this.model(req.body);
      obj.save((err, item) => {      
        if (err && err.code === 11000) {
          res.sendStatus(400);
        }
        if (err) {
          return console.error(err);
        }
        res.status(200).json(item);
      });
    }  
    
    get = (req, res) => {
      this.model.findOne({ _id: req.params.id }, (err, obj) => {
        if (err) { return console.error(err); }
        res.json(obj);
      });
    }
  
    update = (req, res) => {
      this.model.findOneAndUpdate({ _id: req.params.id }, req.body, (err) => {
        if (err) { return console.error(err); }
        res.sendStatus(200);
      });
    }
  
    delete = (req, res) => {
      this.model.findOneAndRemove({ _id: req.params.id }, (err) => {
        if (err) { return console.error(err); }
        res.sendStatus(200);
      });
    }
  }

  export default class UserCtrl extends BaseCtrl {
    model = User;
  
    login = (req, res) => {
      this.model.findOne({ email: req.body.email }, (err, user) => {
        if (!user) { return res.sendStatus(403); }
        user.comparePassword(req.body.password, (error, isMatch) => {
          if (!isMatch) { return res.sendStatus(403); }
          const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
          res.status(200).json({ token: token });
        });
      });
    }
  
  }
  