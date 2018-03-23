import BaseBusiness = require("./../base.business");
import ISubCategoryModel = require("../../../models/interfaces/subCategory.interface");

interface SubCategoryBusiness extends BaseBusiness<ISubCategoryModel> {

}
export = SubCategoryBusiness;