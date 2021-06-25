export interface Validator {
    (rule?: any, value?: any, callback?: any): any
}
export interface Rule {
    required?: boolean,
    message?: string,
    trigger?: string,
    validator?: Validator,
    max?: number,
    min?: number,
    pattern?: RegExp,
}
export interface Options {
    fieldLabel?: string
    min?: number
    max?: number
}
export interface Rules {
    requiredBlur?(options?: Options): Rule[],
    requiredChange?(options?: Options): Rule[],
    requiredEmail?: Rule[],
    requiredCode?(options?: Options): Rule[],
    requiredPhone?: Rule[],
}