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
            title: 'Habits',
            props: {
                placeholder: 'Habits placeholder'
            }
        },
        fileTest: {
            tag: 'file',
            title: 'New Component Test',
            props: {
                placeholder: 'New component placeholder'
            }
        },
    },
    controllers: {
        clear: {
            content: 'Clear',
            props: {
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
    fields: Object.keys(config.fields).map((key) => config.fields[key]),
    controllers: Object.keys(config.controllers).map((key) => config.controllers[key]),
}

export default config;