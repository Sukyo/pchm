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
export interface RuleType {
    (fieldLabel: string): Array<Rule>
}
export interface Rules {
    requiredBlur?: RuleType,
    requiredChange?: RuleType,
    email?: Array<Rule>,
    code?: Array<Rule>,
    phone?: Array<Rule>,
}