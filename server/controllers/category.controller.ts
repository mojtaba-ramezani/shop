import express = require('express');
import CategoryBusiness = require('./../repository-pattern/business/category.business');
import IBaseController = require('./base.controller');
import ICategoryModel = require('../models/interfaces/category.interface');

class CategoryController implements IBaseController <CategoryBusiness> {

    public create(req: express.Request, res: express.Response): void {
        try {

            var category: ICategoryModel = <ICategoryModel>req.body;
            var categoryBusiness = new CategoryBusiness();
            categoryBusiness.create(category, (error, result) => {
                if (error) {
                  res.send({'error': 'error'});
                } else {
                  res.send({'success': 'success'});
                }
            });
        } catch (e) {
            console.log(e);
            res.send({'error': 'error in your request'});

        }
    }
    public update(req: express.Request, res: express.Response): void {
        try {
            var category: ICategoryModel = <ICategoryModel>req.body;
            var _id: string = req.params._id;
            var categoryBusiness = new CategoryBusiness();
            categoryBusiness.update(_id, category, (error, result) => {
                if (error) {
                  res.send({'error': 'error'});
                } else {
                  res.send({'success': 'success'});
                }
            });
        } catch (e)  {
            console.log(e);
            res.send({'error': 'error in your request'});

        }
    }
    public delete(req: express.Request, res: express.Response): void {
        try {
            var _id: string = req.params._id;
            var categoryBusiness = new CategoryBusiness();
            categoryBusiness.delete(_id, (error, result) => {
                if(error) res.send({"error": "error"});
                else res.send({"success": "success"});
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }
    retrieve(req: express.Request, res: express.Response): void {
        try {

            var categoryBusiness = new CategoryBusiness();
            categoryBusiness.retrieve((error, result) => {
                if(error) res.send({"error": "error"});
                else res.send(result);
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }
    findById(req: express.Request, res: express.Response): void {
        try {
            var _id : string = req.params._id;
            var categoryBusiness = new CategoryBusiness();
            categoryBusiness.findById(_id, (error, result) => {
                if(error) res.send({"error": "error"});
                else res.send(result);
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }
}
export = CategoryController;
