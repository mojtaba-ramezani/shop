import BaseBusiness = require("./../base.business");
import ICategoryModel = require("../../../models/interfaces/category.interface");

interface CategoryBusiness extends BaseBusiness<ICategoryModel> {

}
export = CategoryBusiness;