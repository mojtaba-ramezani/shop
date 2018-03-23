import DataAccess = require('../dataAccess');
import ISubCategoryModel = require("../../../models/interfaces/subCategory.interface");

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

import NameValidator = require("../../../validators/name.validator");
let nameValidator = new NameValidator();

class SubCategorySchema {

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
        });

        return schema;
    }
}
var schema = mongooseConnection.model<ISubCategoryModel>("SubCategories", SubCategorySchema.schema);
export = schema;""