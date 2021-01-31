const emailValidation = (value) => (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/).test(value);

export const config = {
    fields: {
        email: {
            validation: emailValidation,
            title: 'Email'
        },
        fullName: {
            index: 1,
            title: 'Full Name',
            required: true,
        },
        habits: {
            tag: 'myInput',
            title: 'Habits',
            props: {
                placeholder: 'Habits placeholder',
                className: 'my-input',
            }
        },
    },
    controllers: {
        clear: {
            tag: 'myBtn',
            content: 'Clear',
            props: {
                className: 'my-btn',
                onClick(fields, updateField) {
                    Object.keys(fields).forEach((key) => {
                        updateField(key, { value: '' });
                    })
                }
            }
        },
        submit: {
            index: 1,
            content: 'Submit',
            props: {
                onClick(fields) {
                    console.log(fields)
                }
            }
        },
    }
};

export const configWithArrays = {
    fields: config.fields && Object.keys(config.fields).map((key) => config.fields[key]),
    controllers: config.controllers && Object.keys(config.controllers).map((key) => config.controllers[key]),
}

export default config;