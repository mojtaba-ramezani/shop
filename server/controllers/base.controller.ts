import IReadInterface = require('./interfaces/read.interface');
import IWriteInterface = require('./interfaces/write.interface');
import IBaseBusiness = require('../repository-pattern/business/base.business');
interface BaseController<T extends IBaseBusiness<Object>> extends IReadInterface, IWriteInterface {


} 
export = BaseController;
