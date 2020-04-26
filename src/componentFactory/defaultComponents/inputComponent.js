import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

export default function InputComponent({ config, onChange }) {
    const { title, value, props, isValid, defaultErrMsg: errMsg, dataTip } = config;
    
    return (
        <FormGroup className="dynamic-field-component">
            <Label for={props && props.name} data-tip={dataTip}>{title}</Label>
            <Input
                {...props}
                placeholder={title}
                value={value || ''}
                invalid={isValid === false}
                valid={(value ? isValid : false)}
                onChange={onChange}
            />
            {(value && !isValid && errMsg) ? <FormFeedback className="dynamic-field-errMsg">{errMsg}</FormFeedback> : ''}
        </FormGroup>);
}

InputComponent.propTypes = {
    config: PropTypes.shape({
        title: PropTypes.string,
        value: PropTypes.string,
        isValid: PropTypes.bool,
        defaultErrMsg: PropTypes.string,
        dataTip: PropTypes.string,
        props: PropTypes.shape({
            name: PropTypes.string,
            onClick: PropTypes.func,
        }),
    }),
    onChange: PropTypes.func,
};