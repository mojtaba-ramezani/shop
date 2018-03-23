import express = require("express");
import SubCategoryBusiness = require("./../repository-pattern/business/subCategory.business");
import IBaseController = require("./base.controller");
import ISubCategoryModel = require("../models/interfaces/subCategory.interface");

import ProductBusiness = require("./../repository-pattern/business/product.business");


class SubCategoryController implements IBaseController <SubCategoryBusiness> {

    create(req: express.Request, res: express.Response): void {
        try {

            var subCategory: ISubCategoryModel = <ISubCategoryModel>req.body;
            var subCategoryBusiness = new SubCategoryBusiness();
            subCategoryBusiness.create(subCategory, (error, result) => {
                if(error) res.send({"error": "error"});
                else res.send({"success": "success"});
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }
    update(req: express.Request, res: express.Response): void {
        try {            
            var subCategory: ISubCategoryModel = <ISubCategoryModel>req.body;
            var _id: string = req.params._id;
            var subCategoryBusiness = new SubCategoryBusiness();
            subCategoryBusiness.update(_id, subCategory, (error, result) => {
                if(error) res.send({"error": "error"});
                else res.send({"success": "success"});
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }
    delete(req: express.Request, res: express.Response): void {
        try {

            var _id: string = req.params._id;
            var subCategoryBusiness = new SubCategoryBusiness();
            subCategoryBusiness.delete(_id, (error, result) => {
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

            var subCategoryBusiness = new SubCategoryBusiness();
            subCategoryBusiness.retrieve((error, result) => {
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
            var subCategoryBusiness = new SubCategoryBusiness();
            subCategoryBusiness.findById(_id, (error, result) => {
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
export = SubCategoryController;