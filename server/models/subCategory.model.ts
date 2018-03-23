import ISubCategoryModel = require('./interfaces/subCategory.interface');

class SubCategoryModel {

    private _subCategoryModel: ISubCategoryModel;

    constructor(subCategoryModel: ISubCategoryModel) {
        this._subCategoryModel = subCategoryModel;
    }
    get name (): string {
        return this._subCategoryModel.name;
    }

    get code (): string {
        return this._subCategoryModel.code;
    } 
    
}
Object.seal(SubCategoryModel);
export =  SubCategoryModel;