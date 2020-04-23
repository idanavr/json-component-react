/**
 * Change array to object, sort it and insert props.name to each field.
 * @param {*} fields (object or array)
 * @returns {object} object of sorted fields with inserted props.name 
 */
export function fieldsSetup(fields) {
    const newObject = {};
    if (Array.isArray(fields)) {
        let index = 0;
        fields.sort(sortFieldsByIndex).forEach((field) => {
            const name = (field.props && field.props.name) || index.toString();
            newObject[name] = field;
            if (!field.props.name) {
                field.props.name = name;
                index++;
            }
        });
        return newObject;
    } else if (typeof (fields) === 'object') {
        const sortedFieldKeys = Object.keys(fields).sort((a, b) => sortFieldsByIndex(fields[a], fields[b]));
        sortedFieldKeys.forEach((key) => {
            const field = fields[key];
            if (!field.props)
                field.props = {};
            field.props.name = key;
            newObject[key] = field;
        });
        return newObject;
    }
    throw Error('"fields" is not set neither as an object nor array');
}

export function isEmpty(value) {
    return (typeof (value) === 'string' && !value) || (typeof (value) === 'number' && isNaN(value));
}

/**
 * Convert string to type.
 * @param {string} value the value to convert
 * @param {string} type the type to convert the value
 * @returns {any} the value after convertion to given type
 */
export function convertValueType(value, type = 'string') {
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

export function convertFieldsValueType(fields) {
    const convertedFields = fields;
    Object.keys(fields)
        .filter((key) => fields[key].valueType)
        .forEach((key) => {
            const field = fields[key];
            convertedFields[key].value = convertValueType(field.value, field.valueType);
        });
    return convertedFields;
}

export function sortFieldsByIndex(a, b) {
    if (!a.index && !b.index)
        return 0;
    else if (!b.index)
        return -1;
    else if (a.index > b.index)
        return 1;
    return 0;
}