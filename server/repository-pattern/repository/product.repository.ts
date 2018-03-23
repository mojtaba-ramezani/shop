import ProductModel = require("../../models/product.model");
import IProductModel = require("../../models/interfaces/product.interface");
import ProductSchema = require("./../dataAccess/schemas/product.schema");
import BaseRepository = require("./base.repository");

class ProductRepository  extends BaseRepository<IProductModel> {
    constructor () {
        super(ProductSchema);
    }
}

Object.seal(ProductRepository);
export = ProductRepository;