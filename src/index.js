import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { fieldsSetup, convertValueType, convertFieldsValueType, isEmpty, sortFieldsByIndex } from './utils';
import ComponentFactory from './componentFactory/componentFactory';
import ReactTooltip from 'react-tooltip';
import './formGenerator.scss';

export default function FormGenerator({ config, components }) {
    if (!config || typeof (config) !== 'object') {
        console.warn(`Json Component - config should be an object.\n Received - ${config}`);
        return <></>;
    }
    const { controllers } = config;
    const [fields, setFields] = useState(config.fields);
    let fieldsEditable = fields; // look up for a better solution

    useEffect(() => {
        fieldsEditable = fieldsSetup(fields);
        Object.keys(fieldsEditable).forEach((key) => {
            updateField(key, fieldsEditable[key]);
        });
        setFields(fieldsEditable);
    }, []);

    const FormFields = getFormFields();
    const FormControllers = getFormControllers();

    return (
        <div id="dynamic-form">
            <div className="dynamic-form-fields">
                {FormFields}
            </div>
            <div className="dynamic-form-controllers">
                {FormControllers}
            </div>
            <ReactTooltip className="toolTip" place="left" type="dark" effect="solid" offset={{ left: 40 }} />
        </div>);

    function getFormFields() {
        if (!fields || (typeof (fields) !== 'object')) {
            console.error('Fields are not setup correctly - should be an object');
            return <></>;
        }
        return Object.keys(fields).map((key) => (
            <React.Fragment key={key || uuidv4()}>
                <ComponentFactory
                    config={fields[key]}
                    onInputChange={onInputChange}
                    onBtnClick={onBtnClick}
                    components={components}
                />
            </React.Fragment>));
    }

    function getFormControllers() {
        if (!controllers || (typeof (controllers) !== 'object')) {
            console.error('Controllers are not setup correctly - should be an object');
            return <></>;
        }
        const sortedControllerKeys = Object.keys(controllers).sort((a, b) => sortFieldsByIndex(controllers[a], controllers[b]));
        return sortedControllerKeys.map((key) => {
            controllers[key].tag = controllers[key].tag || 'btn-controller';
            return (
                <React.Fragment key={key || uuidv4()}>
                    <ComponentFactory
                        config={controllers[key]}
                        onInputChange={onInputChange}
                        onBtnClick={onBtnClick}
                        components={components}
                    />
                </React.Fragment>);
        });
    }

    // #region onInput process
    function onInputChange(e, fieldConfig) {
        const { onChange: configOnChange } = fieldConfig.props;
        const { name, value } = e.target;

        updateFieldValue(name, value);
        if (configOnChange) {
            const convertedFields = convertFieldsValueType(fields);
            configOnChange(e, convertedFields, updateField);
        }
        setFields(fieldsEditable);
    }

    /**
     * This function DOES NOT change the state.
     * 
     * Update field's settings by key in the changeable instance of fields.
     * If receive null or undefined as new field, the field will be deleted.
     * @param {string} key The field key
     * @param {*} newField The field config to add, change or delete
     * @returns {void}
     */
    function updateField(key, newField) {
        if (newField === null || typeof (newField) === 'undefined') {
            delete fieldsEditable[key];
            fieldsEditable = { ...fieldsEditable };
        } else {
            newField = fieldsEditable[key] ? { ...fieldsEditable[key], ...newField } : newField;
            if (typeof (newField.value) === 'undefined') {
                const defaultValue = (typeof (newField.defaultValue) !== 'undefined')
                    ? ((newField.defaultValue || typeof (newField.defaultValue) === 'boolean') && newField.defaultValue.toString())
                    : ((newField.options && newField.options[0] && newField.options[0].value && newField.options[0].value.toString()) || '');
                newField.value = defaultValue;
            }
            newField.isValid = checkFieldValidation(newField, newField.value);
            newField.props = newField.props ? { ...newField.props, name: key } : { name: key };

            fieldsEditable = {
                ...fieldsEditable,
                [key]: { ...fieldsEditable[key], ...newField }
            };
        }
    }

    /**
     * This function DOES NOT change the state.
     * 
     * Update field's value by key in the changeable instance of fields
     * @param {string} key The field key
     * @param {*} value The field new value
     * @returns {object} fields with field's new value
     */
    function updateFieldValue(key, value) {
        if (!fieldsEditable[key])
            console.error('Field not found');
        const isValid = checkFieldValidation(fieldsEditable[key], value);
        fieldsEditable = {
            ...fieldsEditable,
            [key]: { ...fieldsEditable[key], value, isValid }
        };
    }

    function checkFieldValidation(fieldConfig, value) {
        const { required, validation, valueType } = fieldConfig;
        if (required && isEmpty(value))
            return false;
        return validation ? validation(convertValueType(value, valueType)) : true;
    }
    // #endregion

    function onBtnClick(props) {
        const { onClick: configOnClick } = props;
        if (configOnClick) {
            const convertedFields = convertFieldsValueType(fields);
            configOnClick(convertedFields, updateField);
            setFields(fieldsEditable);
        }
    }
}

const fieldPropType = PropTypes.shape({
    tag: PropTypes.string,
    props: PropTypes.shape({
        onChange: PropTypes.func,
        onClick: PropTypes.func,
    })
});
const controllerPropType = PropTypes.shape({
    tag: PropTypes.string,
    props: PropTypes.shape({
        onChange: PropTypes.func,
        onClick: PropTypes.func,
    })
});

FormGenerator.propTypes = {
    config: PropTypes.shape({
        fields: PropTypes.oneOfType([
            fieldPropType,
            PropTypes.arrayOf(fieldPropType),
        ]),
        controllers: PropTypes.oneOfType([
            controllerPropType,
            PropTypes.arrayOf(controllerPropType),
        ]),
    }).isRequired,
    components: PropTypes.objectOf(PropTypes.elementType),
};