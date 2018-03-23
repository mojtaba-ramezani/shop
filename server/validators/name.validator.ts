class NameValidator {

    public nameLengthChecker = (productName) => {
    if (!productName) {
        return false; 
    } else {
        if (productName.length < 3 || productName.length > 15) {
        return false; 
        } else {
        return true; 
        }
    }
    };
    
    public nameRegularChecker = (productName) => {
    if (!productName) {
        return false; 
    } else {
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        return regExp.test(productName);
    }
    };
        
    public valid = [
        {
        validator: this.nameLengthChecker,
        message: 'productName must be at least 3 characters but no more than 15'
        },
        {
        validator: this.nameRegularChecker,
        message: 'productName must not have any special characters'
        }
    ];

    
}
Object.seal(NameValidator);
export = NameValidator;
