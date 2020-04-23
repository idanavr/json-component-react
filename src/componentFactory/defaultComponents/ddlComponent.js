import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { FormGroup, Label, Input } from 'reactstrap';

export default function DDLComponent({ config, onChange }) {
    const { title, value, props, isValid, dataTip, options } = config;
    return (
        <FormGroup className="dynamic-field-component">
            <Label for={props.name} data-tip={dataTip}>{title}</Label>
            <Input
                {...props}
                value={value}
                invalid={isValid === false}
                valid={isValid}
                onChange={onChange}
            >
                {options.map((option) =>
                    <option key={uuidv4()} value={option.value} disabled={option.disabled}> {option.text} </option>)}
            </Input>
        </FormGroup>);
}

DDLComponent.propTypes = {
    config: PropTypes.shape({
        title: PropTypes.string,
        value: PropTypes.string,
        isValid: PropTypes.bool,
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
    onChange: PropTypes.func,
};