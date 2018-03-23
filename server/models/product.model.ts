import IProductModel = require('./interfaces/product.interface');

class ProductModel {

    private _productModel: IProductModel;

    constructor(productModel: IProductModel) {
        this._productModel = productModel;
    }
    get name (): string {
        return this._productModel.name;
    }

    get code (): string {
        return this._productModel.code;
    }

    get quantity (): number {
        return this._productModel.quantity;
    }

    get amountPeopleSaved (): number {
        return this._productModel.amountPeopleSaved;
    }
    
    get subCategoryId (): object {
        return this._productModel.subCategoryId;
    }
}
Object.seal(ProductModel);
export =  ProductModel;