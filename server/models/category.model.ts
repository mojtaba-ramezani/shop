import ICategoryModel = require('./interfaces/category.interface');

class CategoryModel {

    private _categoryModel: ICategoryModel;

    constructor(categoryModel: ICategoryModel) {
        this._categoryModel = categoryModel;
    }
    get name (): string {
        return this._categoryModel.name;
    }

    get code (): string {
        return this._categoryModel.code;
    } 
    
}
Object.seal(CategoryModel);
export =  CategoryModel;