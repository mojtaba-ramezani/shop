import mongoose = require("mongoose");

interface SubCategoryModel extends mongoose.Document {
    _id: number;
    code: string;   
    name: string;
}

export = SubCategoryModel;