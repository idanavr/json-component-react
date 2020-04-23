// import React, { useState, useEffect } from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import { fieldsSetup, convertValueType, convertFieldsValueType, isEmpty, sortFieldsByIndex } from './utils';
// import ComponentFactory from './componentFactory/componentFactory';
// import ReactTooltip from 'react-tooltip'

// export default function FormGenerator({ config }: params) {
//     const { controllers } = config;
//     const [fields, setFields] = useState(config.fields);
//     let fieldsEditable = fields; // look up for a better solution

//     useEffect(() => {
//         fieldsEditable = fieldsSetup(fields);
//         Object.keys(fieldsEditable).forEach((key) => {
//             updateField(key, fieldsEditable[key]);
//         });
//         setFields(fieldsEditable);
//     }, []);

//     const FormFields = getFormFields();
//     const FormControllers = getFormControllers();

//     return (
//         <div id="dynamic-form">
//             <ReactTooltip className="toolTip" place="left" type="dark" effect="solid" offset={{ left: 40 }} />
//             <div className="dynamic-form-fields">
//                 {FormFields}
//             </div>
//             <div className="dynamic-form-controllers">
//                 {FormControllers}
//             </div>
//         </div>);

//     function getFormFields() {
//         if (!fields || (typeof (fields) !== 'object'))
//             console.error('Fields are not setup correctly - should be an object');
//         return Object.keys(fields).map((key) => {
//             return (
//                 <React.Fragment key={key || uuidv4()}>
//                     <ComponentFactory
//                         config={fields[key]}
//                         onInputChange={onInputChange}
//                         onBtnClick={onBtnClick}
//                     />
//                 </React.Fragment>);
//         });
//     }

//     function getFormControllers() {
//         if (!controllers || (typeof (controllers) !== 'object'))
//             console.error('Controllers are not setup correctly - should be an object');
//         const sortedControllerKeys = Object.keys(controllers).sort((a, b) => sortFieldsByIndex(controllers[a], controllers[b]))
//         return sortedControllerKeys.map((key) => {
//             return (
//                 <React.Fragment key={key || uuidv4()}>
//                     <ComponentFactory
//                         config={controllers[key]}
//                         onBtnClick={onBtnClick}
//                     />
//                 </React.Fragment>
//             );
//         });
//     }

//     //#region onInput process
//     function onInputChange(e, config) {
//         const { onChange: configOnChange } = config.props;
//         const name = e.target.name;
//         const value = e.target.value;

//         updateFieldValue(name, value)
//         if (configOnChange) {
//             const convertedFields = convertFieldsValueType(fields);
//             configOnChange(e, convertedFields, updateField);
//         }
//         setFields(fieldsEditable);
//     }

//     /**
//      * This function DOES NOT change the state.
//      * 
//      * Update field's settings by key in the changeable instance of fields.
//      * If receive null or undefined as new field, the field will be deleted.
//      * @param {string} key 
//      * @param {*} newFields
//      */
//     function updateField(key, newField) {
//         if (newField === null || newField === undefined) {
//             delete fieldsEditable[key];
//         } else {
//             newField = newField || {};
//             if (newField.value === undefined) {
//                 const defaultValue = newField.defaultValue !== undefined ?
//                     ((newField.defaultValue || typeof (newField.defaultValue) === 'boolean') && newField.defaultValue.toString()) :
//                     ((newField.options && newField.options[0] && newField.options[0].value && newField.options[0].value.toString()) || '');
//                 newField.value = defaultValue;
//             }
//             newField.isValid = checkFieldValidation(newField, newField.value);
//             newField.props = newField.props || { name: key };
//             fieldsEditable = {
//                 ...fieldsEditable,
//                 [key]: { ...fieldsEditable[key], ...newField }
//             };
//         }
//     }

//     /**
//      * This function DOES NOT change the state.
//      * 
//      * Update field's value by key the changeable instance of fields
//      * @param {string} name 
//      * @param {*} value 
//      * @returns {object} fields with field's new value
//      */
//     function updateFieldValue(name, value) {
//         if (!fieldsEditable[name])
//             console.error('Field not found');
//         const isValid = checkFieldValidation(fieldsEditable[name], value)
//         fieldsEditable = {
//             ...fieldsEditable,
//             [name]: { ...fieldsEditable[name], value, isValid }
//         };
//     }

//     function checkFieldValidation(fieldConfig, value) {
//         const { required, validation, valueType } = fieldConfig;
//         if (required && isEmpty(value))
//             return false;
//         return validation ? validation(convertValueType(value, valueType)) : true;
//     }
//     //#endregion

//     function onBtnClick(e, props) {
//         const { onClick: configOnClick } = props;
//         const convertedFields = convertFieldsValueType(fields);
//         configOnClick(convertedFields);
//     }
// }

// interface config {
//     fields: {
//         index?: number, // (optional) - in order to define the order of the components
//         tag?: string, // (default: input) (input/(ddl/select)/(btn/button)/btn-controller
//         title?: string, // (optional)
//         validation?: Function, // (optional)
//         defaultMsg?: string, // (optional)
//         required?: boolean, // (optional)
//         valueType?: string, // (default: string) - if value need type convertion (string/boolean/number)
//         defaultValue?: any, // (optional)
//         props?: { // any react props that the tag may accept are optional
//             name: string, // Mandetory and have to be unique or else set to an index!
//             type: string, // (optional - if tag is input, default is "text")
//             onChange: Function, // (optional)
//             onClick: Function, // (optional for buttons)
//         },
//         options?: [ // (for "ddl" tag)
//             {
//                 value: any, // if it's not string, fill valueType
//                 text: string,
//                 disabled: boolean
//             }
//         ]
//     },
//     controllers: {
//         index: number, // (optional) - in order to define the order of the components
//         tag: string, // (default: input) (input/(ddl/select)/(btn/button)/btn-controller
//         title: string, // (optional)
//         validation: Function, // (optional)
//         defaultMsg: string, // (optional)
//         required: boolean, // (optional)
//         valueType: string, // (default: string) - if value need type convertion (string/boolean/number)
//         defaultValue: any, // (optional)
//         props: { // any react props that the tag may accept are optional
//             name: string, // Mandetory and have to be unique or else set to an index!
//             type: string, // (optional - if tag is input, default is "text")
//             onChange: Function, // (optional)
//             onClick: Function, // (optional for buttons)
//         },
//         options: [ // (for "ddl" tag)
//             {
//                 value: any, // if it's not string, fill valueType
//                 text: string,
//                 disabled: boolean
//             }
//         ]
//     }
// }

// interface params {
//     config: config
// }