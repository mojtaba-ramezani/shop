import SubCategoryRepository = require("./../repository/subCategory.repository");
import ISubCategoryBusiness = require("./interfaces/subCategory.interface");
import ISubCategoryModel = require("../../models/interfaces/subCategory.interface");
import SubCategoryModel = require("../../models/subCategory.model");


class SubCategoryBusiness implements ISubCategoryBusiness {
    private _subCategoryRepository: SubCategoryRepository;

    constructor () {
        this._subCategoryRepository = new SubCategoryRepository();
    }

    create (item: ISubCategoryModel, callback: (error: any, result: any) => void) {        
        this._subCategoryRepository.create(item, callback);
    }

    retrieve (callback: (error: any, result: any) => void) {
        this._subCategoryRepository.retrieve(callback);
    }

    update (_id: string, item: ISubCategoryModel, callback: (error: any, result: any) => void) {
        this._subCategoryRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);

            else
                this._subCategoryRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._subCategoryRepository.delete(_id , callback);
    }

    findById (_id: string, callback: (error: any, result: ISubCategoryModel) => void) {
        this._subCategoryRepository.findById(_id, callback);
    }

}


Object.seal(SubCategoryBusiness);
export = SubCategoryBusiness;