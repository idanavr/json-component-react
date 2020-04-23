import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

export default function ButtonComponent({ config, className, onClick }) {
    const { props, content } = config;
    return (
        <Button {...props}
            className={`${className} ${props.className}`}
            onClick={(e) => onClick && onClick(e, props)}>
            {content}
        </Button>);
}

ButtonComponent.propTypes = {
    config: PropTypes.shape({
        content: PropTypes.string,
        props: PropTypes.shape({
            name: PropTypes.string,
        }),
    }),
    className: PropTypes.string,
    onClick: PropTypes.func,
};