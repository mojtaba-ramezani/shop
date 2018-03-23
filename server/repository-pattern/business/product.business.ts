import ProductRepository = require("./../repository/product.repository");
import IProductBusiness = require("./interfaces/product.interface");
import IProductModel = require("../../models/interfaces/product.interface");
import ProductModel = require("../../models/product.model");


class ProductBusiness implements IProductBusiness {
    private _productRepository: ProductRepository;

    constructor () {
        this._productRepository = new ProductRepository();
    }

    create (item: IProductModel, callback: (error: any, result: any) => void) {        
        this._productRepository.create(item, callback);
    }

    retrieve (callback: (error: any, result: any) => void) {
        this._productRepository.retrieve(callback);
    }

    update (_id: string, item: IProductModel, callback: (error: any, result: any) => void) {
        this._productRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);

            else
                this._productRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._productRepository.delete(_id , callback);
    }

    findById (_id: string, callback: (error: any, result: IProductModel) => void) {
        this._productRepository.findById(_id, callback);
    }
      
}


Object.seal(ProductBusiness);
export = ProductBusiness;