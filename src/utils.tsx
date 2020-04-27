import * as IFormGenerator from './IFormGenerator';

/**
 * Change array to object, sort it and insert props.name to each field.
 * @param {IFormGenerator.IFields | Array<IFormGenerator.IField>} fields (object or array)
 * @returns {IFormGenerator.IFields} object of sorted fields with inserted props.name 
 */
export function fieldsSetup(fields: IFormGenerator.IFields | Array<IFormGenerator.IField>): IFormGenerator.IFields {
    const newObject: IFormGenerator.IFields = {};
    if (Array.isArray(fields)) {
        let index = 0;
        fields.sort(sortFieldsByIndex).forEach((field) => {
            const name = (field.props && field.props.name) || index.toString();
            newObject[name] = field;
            if (!field.props.name)
                index++;
        });
        return newObject;
    } else if (typeof (fields) === 'object') {
        const sortedFieldKeys = Object.keys(fields).sort((a, b) => sortFieldsByIndex(fields[a], fields[b]));
        sortedFieldKeys.forEach((key) => {
            newObject[key] = fields[key];
        });
        return newObject;
    }
    throw Error('"fields" is not set neither as an object nor array');
}

export function isEmpty(value: string | number) {
    return (typeof (value) === 'string' && !value) || (typeof (value) === 'number' && isNaN(value));
}

/**
 * Convert string to type.
 * @param {string} value the value to convert
 * @param {string} type the type to convert the value
 * @returns {any} the value after convertion to given type
 */
export function convertValueType(value: string, type: string = 'string') {
    switch (type) {
        case 'number': {
            const newValue = parseInt(value);
            if (isNaN(newValue) || typeof (newValue) !== 'number')
                console.error(`Convertion of ${value} to integer failed, new value is: ${newValue}`);
            return newValue;
        }

        case 'boolean': {
            const valueAsString = value.toString();
            if (valueAsString === 'true')
                return true;
            else if (valueAsString === 'false')
                return false;
            return null;
        }

        default:
            return value;
    }
}

export function convertFieldsValueType(fields: IFormGenerator.IFields) {
    const convertedFields = fields;
    Object.keys(fields)
        .filter((key) => fields[key].valueType)
        .forEach((key) => {
            const field = fields[key];
            convertedFields[key].value = convertValueType(field.value, field.valueType);
        });
    return convertedFields;
}

export function sortFieldsByIndex(a: IFormGenerator.IField, b: IFormGenerator.IField) {
    if (!a.index && !b.index)
        return 0;
    else if (!b.index)
        return -1;
    else if (a.index > b.index)
        return 1;
    return 0;
}