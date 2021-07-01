import { Store } from 'vuex'

declare module 'vuex' {
    // 声明自己的 store state
    interface State {
        userInfo: {
            id: number;
            username: string;
            email: string;
            phone: number;
            avatar: string;
            remark: string;
            status: number;
            role_id: number;
            create_time: string;
            update_time: string;
            role: string;
        } | null
    }

    // 为 `this.$store` 提供类型声明
    interface ComponentCustomProperties {
        $store: Store<State>
    }
}