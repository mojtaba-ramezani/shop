import CategoryRepository = require("./../repository/category.repository");
import ICategoryBusiness = require("./interfaces/category.interface");
import ICategoryModel = require("../../models/interfaces/category.interface");
import CategoryModel = require("../../models/category.model");


class CategoryBusiness implements ICategoryBusiness {
    private _categoryRepository: CategoryRepository;

    constructor () {
        this._categoryRepository = new CategoryRepository();
    }

    create (item: ICategoryModel, callback: (error: any, result: any) => void) {        
        this._categoryRepository.create(item, callback);
    }

    retrieve (callback: (error: any, result: any) => void) {
        this._categoryRepository.retrieve(callback);
    }

    update (_id: string, item: ICategoryModel, callback: (error: any, result: any) => void) {
        this._categoryRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);

            else
                this._categoryRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._categoryRepository.delete(_id , callback);
    }

    findById (_id: string, callback: (error: any, result: ICategoryModel) => void) {
        this._categoryRepository.findById(_id, callback);
    }

}


Object.seal(CategoryBusiness);
export = CategoryBusiness;