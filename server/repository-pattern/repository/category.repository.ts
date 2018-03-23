import CategoryModel = require("../../models/category.model");
import ICategoryModel = require("../../models/interfaces/category.interface");
import CategorySchema = require("./../dataAccess/schemas/category.schema");
import BaseRepository = require("./base.repository");

class CategoryRepository  extends BaseRepository<ICategoryModel> {
    constructor () {
        super(CategorySchema);
    }
}

Object.seal(CategoryRepository);
export = CategoryRepository;