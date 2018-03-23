import Read = require("./common/read.common");
import Write = require("./common/write.common");
interface BaseBusiness<T> extends Read<T>, Write<T>
{
}
export = BaseBusiness;