import React from 'react';
import PropTypes from 'prop-types';
import InputComponent from './defaultComponents/inputComponent';
import DDLComponent from './defaultComponents/ddlComponent';
import ButtonComponent from './defaultComponents/buttonComponent';
import DynamicComponent from './defaultComponents/dynamicComponent';

export default function ComponentFactory({ config, components, onInputChange, onBtnClick }) {
    if (!config) {
        console.warn(`config is ${config}`);
    }
    const { tag: TagName = 'input', props } = config || {};

    if (components && typeof (components) === 'object' && Object.keys(components).includes(TagName)) {
        const NewComponent = components[TagName];
        if (typeof (NewComponent) === 'function')
            return (<NewComponent
                config={config}
                onChange={(e) => onInputChange(e, config)}
            />);
        console.warn(`${NewComponent} is not a react component.`);
    }

    switch (TagName) {
        case 'input':
            return <InputComponent
                config={config}
                onChange={(e) => onInputChange(e, config)}
            />;

        case 'ddl':
        case 'select':
            return <DDLComponent
                config={config}
                onChange={(e) => onInputChange(e, config)}
            />;

        case 'button':
        case 'btn':
            return <ButtonComponent
                config={config}
                onClick={(e) => onBtnClick && onBtnClick(e, props)}
                className="dynamic-field-component"
            />;

        case 'btn-controller':
            return <ButtonComponent
                config={config}
                onClick={(e) => onBtnClick && onBtnClick(e, props)}
                className="dynamic-controller-component"
            />;

        default:
            return <DynamicComponent
                config={config}
            />;
    }
}

ComponentFactory.propTypes = {
    config: PropTypes.shape({
        tag: PropTypes.string,
        title: PropTypes.string,
        value: PropTypes.string,
        isValid: PropTypes.bool,
        defaultErrMsg: PropTypes.string,
        dataTip: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.any.isRequired,
            text: PropTypes.string.isRequired,
            disabled: PropTypes.bool,
        })),
        props: PropTypes.shape({
            name: PropTypes.string,
            onClick: PropTypes.func,
        }),
    }),
    components: PropTypes.objectOf(PropTypes.elementType),
    onInputChange: PropTypes.func,
    onBtnClick: PropTypes.func,
};