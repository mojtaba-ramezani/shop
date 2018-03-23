import mongoose = require("mongoose");

interface ProductModel extends mongoose.Document {
    _id: number;
    code: string;
    amountPeopleSaved: number;
    name: string;
    quantity: number;
    subCategoryId: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'SubCategories', 
        required: true
    }];
    
}

export = ProductModel;