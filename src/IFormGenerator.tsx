export interface IProps { // any react props that the tag may accept are optional
    name?: string, // Mandetory if 'fields' is an array and have to be unique or else set to an index!
    type?: string, // (optional - if tag is input, default is "text")
    onChange?: Function, // (optional)
    onClick?: Function, // (optional for buttons)
};

export interface IField {
    index?: number, // (optional) - in order to define the order of the components
    tag?: string, // (default: input) (input/(ddl/select)/(btn/button)/btn-controller
    title?: string, // (optional)
    dataTip?: string, // (optional) - show tip on hover
    validation?: Function, // (optional)
    defaultMsg?: string, // (optional)
    required?: boolean, // (optional)
    isValid?: boolean
    value: any,
    valueType?: string, // (default: string) - if value need type convertion (string/boolean/number)
    defaultValue?: any, // (optional)
    props?: IProps,
    options?: [ // (for "ddl" tag)
        {
            value: any, // if it's not string, fill valueType
            text: string,
            disabled?: boolean
        }
    ]
};

export interface IFields {
    [key: string]: IField
};

export interface IController {
    index?: number, // (optional) - in order to define the order of the components
    tag?: string, // (default: btn-controller) (input/(ddl/select)/(btn/button)/btn-controller)
    title?: string, // (optional)
    props?: IProps,
};

export interface IControllers {
    [key: string]: IController
};

export interface IConfig {
    fields: IFields,
    controllers: IControllers
};

export interface IParams {
    config: IConfig
};