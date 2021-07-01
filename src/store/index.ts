import { createStore, State } from "vuex";
import persistedState from 'vuex-persistedstate'
const store = createStore({
    state() {
        return {
            userInfo: null
        }
    },
    mutations: {
        SET_USER_INFO(state: State, value: any) {
            state.userInfo = value;
        }
    },
    // vuex持久化到本地存储
    plugins: [persistedState()]
})
export default store;