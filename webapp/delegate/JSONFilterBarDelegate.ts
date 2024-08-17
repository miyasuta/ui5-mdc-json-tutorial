import FilterBarDelegate from "sap/ui/mdc/FilterBarDelegate";
import JSONPropertyInfo from "../model/metadata/JSONPropertyInfo";
import {default as FilterBar, PropertyInfo as FilterBarPropertyInfo} from "sap/ui/mdc/FilterBar";
import FilterField from "sap/ui/mdc/FilterField";
import Element from "sap/ui/core/Element";

var JSONFilterBarDelegate = Object.assign({}, FilterBarDelegate)
JSONFilterBarDelegate.fetchProperties = async () => JSONPropertyInfo

const _createFilterField = (id:string, property:FilterBarPropertyInfo, filterBar:FilterBar) => {
    const propertyKey = property.key
    const filterField = new FilterField(id, {
        dataType: property.dataType,
        conditions: `{$filters>/conditions/${propertyKey}}`,
        propertyKey: propertyKey,
        required: property.required,
        label: property.label,
        maxConditions: property.maxConditions,
        delegate: {name: "sap/ui/mdc/field/FieldBaseDelegate", paylod: {}}
    })
    return filterField
}

JSONFilterBarDelegate.addItem = async (filterBar:FilterBar, propertyKey:string) => {
    const property = JSONPropertyInfo.find((p) => p.key === propertyKey) as FilterBarPropertyInfo
    const id = `${filterBar.getId()}--filter${propertyKey}`
    const filterField = Element.getElementById(id) as FilterField
    return filterField ?? _createFilterField(id, property, filterBar)
}

export default JSONFilterBarDelegate