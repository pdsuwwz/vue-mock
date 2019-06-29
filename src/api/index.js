import auth from './modules/auth';

export default {
    install(Vue) {
        Vue.prototype.$api = Vue.Api = {
            auth,
        };
    }
}