import DataAccess = require('../dataAccess');
import ICategoryModel = require("../../../models/interfaces/category.interface");

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

import NameValidator = require("../../../validators/name.validator");
let nameValidator = new NameValidator();

class CategorySchema {

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
var schema = mongooseConnection.model<ICategoryModel>("Categories", CategorySchema.schema);
export = schema;""