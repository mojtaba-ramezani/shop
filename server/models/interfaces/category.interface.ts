import mongoose = require("mongoose");

interface CategoryModel extends mongoose.Document {
    _id: number;
    code: string;   
    name: string;
}

export = CategoryModel;