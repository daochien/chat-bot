import { getLocalUser } from './helpers/auth';
const user = getLocalUser();

export default {
    state: {
        welcomeMessage: 'Welcome to my vue app',
        currentUser: user,
        isLoggedIn: !!user,
        loading: false,
        auth_error: null,
        customers: []
    },
    /**
     * getters chua cac function tra ve cac gia tri trong state, de component co the gọi trực tiếp thông 
     * qua cac funtion này
     */
    getters: {
        welcome(state){
            return state.welcomeMessage;
        },
        isLoading(state) {
            return state.loading;
        },
        isLoggedIn(state) {
            return state.isLoggedIn;
        },
        currentUser(state) {
            return state.currentUser;
        },
        authError(state) {
            return state.auth_error;
        },
        customers(state) {
            return state.customers;
        },
    },
    /**
     * thay doi trang thai cac gia tri trong state
     */
    mutations: {
        login(state) {
            state.loading = true;
            state.auth_error = null;
        }, 
        loginSuccess(state, payload) {
            state.auth_error = null;
            state.isLoggedIn = true;
            state.loading = false;
            state.currentUser = Object.assign({}, payload.user, {token: payload.access_token});

            localStorage.setItem("user", JSON.stringify(state.currentUser));
        },
        loginFailed(state, payload) {
            state.loading = false;
            state.auth_error = payload.error;
        },
        logout(state) {
            localStorage.removeItem("user");
            state.isLoggedIn = false;
            state.currentUser = null;
        }
    },
    /**
     * Actions goi toi cac function trong mutations
     */
    actions: {
        login(context) {
            context.commit('login'); 
        },
        // loginSuccess(context, data) {
        //     console.log(data);
        //     context.commit('loginSuccess', data);
        // }
    }
}
