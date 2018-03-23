import BaseBusiness = require("./../base.business");
import IProductModel = require("../../../models/interfaces/product.interface");

interface ProductBusiness extends BaseBusiness<IProductModel> {

}
export = ProductBusiness;