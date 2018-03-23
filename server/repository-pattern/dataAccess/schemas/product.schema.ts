import DataAccess = require('../dataAccess');
import IProductModel = require("../../../models/interfaces/product.interface");

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

import NameValidator = require("../../../validators/name.validator");
let nameValidator = new NameValidator();

class ProductSchema {

    static get schema () {
        var schema =  mongoose.Schema({
            name : {
                type: String,
                required: true,
                validate: nameValidator.valid,                           
            },
            code: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            amountPeopleSaved: {
                type: Number,
                required: true
            },
            subCategoryId: {
                type: mongoose.Schema.Types.ObjectId, ref: 'SubCategories', 
                required: true
            },
            created: { type: Date, default: Date.now },            
        });

        return schema;
    }
}
var schema = mongooseConnection.model<IProductModel>("Products", ProductSchema.schema);
export = schema;""