import { ElButton } from 'element-plus';
export default {
    install: (Vue: any) => {
        // 按需注册element组件,减少打包体积
        Vue.component(ElButton.name, ElButton);
    }
}