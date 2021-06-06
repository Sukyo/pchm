import { ElForm, ElFormItem, ElInput, ElRow, ElCol, ElImage, ElCheckbox, ElLink, ElButton } from 'element-plus';
export default {
    install: (app: any) => {
        // 按需注册element组件,减少打包体积
        app.component(ElForm.name, ElForm);
        app.component(ElFormItem.name, ElFormItem);
        app.component(ElInput.name, ElInput);
        app.component(ElRow.name, ElRow);
        app.component(ElCol.name, ElCol);
        app.component(ElImage.name, ElImage);
        app.component(ElCheckbox.name, ElCheckbox);
        app.component(ElLink.name, ElLink);
        app.component(ElButton.name, ElButton);
        interface Validator {
            (rule?: any, value?: any, callback?: any): any
        }
        interface Rule {
            required?: boolean,
            message?: string,
            trigger?: string,
            validator?: Validator,
            max?: number,
            min?: number,
            pattern?: RegExp,
        }
        interface RuleType {
            (fieldLabel: string): Rule
        }
        interface Rules {
            requiredBlur?: RuleType,
            requiredChange?: RuleType,
            email?: Array<Rule>,
            code?: Array<Rule>,
            phone?: Array<Rule>,
        }
        const $rules: Rules = {
            requiredBlur(fieldLabel: string): Rule {
                return {
                    required: true,
                    message: `${fieldLabel}不能为空`,
                    trigger: 'blur'
                }
            },
            requiredChange(fieldLabel: string): Rule {
                return {
                    required: true,
                    message: `${fieldLabel}不能为空`,
                    trigger: 'change'
                }
            },
            // 邮箱验证
            email: [
                {
                    required: true,
                    message: '邮箱不能为空',
                    trigger: 'blur'
                },
                {
                    pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                    message: '邮箱格式有误',
                    trigger: 'blur'
                }
            ],
            // 验证码验证
            code: [
                {
                    required: true,
                    message: '验证码不能为空',
                    trigger: 'blur'
                },
                {
                    min: 4,
                    max: 4,
                    message: '验证码必须为4位数',
                    trigger: 'blur'
                }
            ],
            // 手机号验证
            phone: [
                {
                    required: true,
                    message: '手机号不能为空',
                    trigger: 'blur'
                },
                {
                    pattern: /^1[3-9]\d{9}$/,
                    message: '手机号格式有误',
                    trigger: 'blur'
                }
            ]
        }
        // 挂在到全局对象上
        app.config.globalProperties.$rules = $rules;
    }
}