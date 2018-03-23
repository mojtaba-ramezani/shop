import SubCategoryModel = require("../../models/subCategory.model");
import ISubCategoryModel = require("../../models/interfaces/subCategory.interface");
import SubCategorySchema = require("./../dataAccess/schemas/subCategory.schema");
import BaseRepository = require("./base.repository");

class SubCategoryRepository  extends BaseRepository<ISubCategoryModel> {
    constructor () {
        super(SubCategorySchema);
    }
}

Object.seal(SubCategoryRepository);
export = SubCategoryRepository;