import { Options, Rule, Rules } from '@/types/elementuiPlus';
import {
    ElForm,
    ElFormItem,
    ElInput,
    ElRow,
    ElCol,
    ElImage,
    ElCheckbox,
    ElLink,
    ElButton,
    ElDialog,
    ElUpload,
    ElProgress,
    ElHeader,
    ElAside,
    ElContainer,
    ElMain,
    ElMessageBox,
    ElAvatar,
    ElMenu,
    ElMenuItem,
    ElSubmenu
} from 'element-plus';
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
        app.component(ElDialog.name, ElDialog);
        app.component(ElUpload.name, ElUpload);
        app.component(ElProgress.name, ElProgress);
        app.component(ElHeader.name, ElHeader);
        app.component(ElAside.name, ElAside);
        app.component(ElContainer.name, ElContainer);
        app.component(ElMain.name, ElMain);
        app.component(ElMessageBox.name, ElMessageBox);
        app.component(ElAvatar.name, ElAvatar);
        app.component(ElMenu.name, ElMenu);
        app.component(ElMenuItem.name, ElMenuItem);
        app.component(ElSubmenu.name, ElSubmenu);
        const $rules: Rules = {
            requiredBlur(options: Options = {}): Rule[] {
                const { fieldLabel } = options;
                return [{
                    required: true,
                    message: `${fieldLabel}不能为空`,
                    trigger: 'blur'
                }]
            },
            requiredChange(options: Options = {}): Rule[] {
                const { fieldLabel } = options;
                return [{
                    required: true,
                    message: `${fieldLabel}不能为空`,
                    trigger: 'change'
                }]
            },
            // 邮箱验证
            requiredEmail: [
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
            requiredCode: (options: Options = {}): Rule[] => {
                const { fieldLabel = '验证码', min = 4, max = 4 } = options;
                return [
                    {
                        required: true,
                        message: `${fieldLabel}不能为空`,
                        trigger: 'blur'
                    },
                    {
                        min,
                        max,
                        message: `${fieldLabel}必须为${min}位数`,
                        trigger: 'blur'
                    }
                ]
            },
            // 手机号验证
            requiredPhone: [
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