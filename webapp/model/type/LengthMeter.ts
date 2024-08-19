import NumberFormat from "sap/ui/core/format/NumberFormat";
import Integer from "sap/ui/model/type/Integer";

export default class LengthMeter extends Integer{
    formatValue(height: number) {
        const unitFormat = NumberFormat.getUnitInstance()
        return unitFormat.format(height, "length-meter")    
    }
}