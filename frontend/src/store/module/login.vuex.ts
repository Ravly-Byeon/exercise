import {Module} from "vuex";
import axios from "axios";

interface Login {
    isLogin: boolean,
    userEmail: string,
    token: string,
}

interface LoginResponse{
    result: boolean,
    token: string,
    _doc: {
        userEmail: string,
        nickname: string,
    }
}

const login ={
    namespaced: true,
    state: {
        isLogin: false,
        userEmail: '',
        token: '',
    },
    getters: {
        isLogin: (state: any) => state.isLogin,
        userEmail: (state: any) => state.userEmail,
        token: (state: any) => state.token,
    },
    mutations: {
        login(state:any, payload:any){
            const { email, access_token } = payload;
            console.log(email,access_token);
            state.isLogin = true;
            state.userEmail = email;
            state.token = access_token;
        },
        logout(state: any){
            state.isLogin = false;
            state.userEmail = '';
            state.token = '';
        }
    },
    actions:{
        login(context: any , payload: any){
            context.commit('login',payload);
        },

        logout(context:any){
            context.commit('logout');
        }
        /*async login(context:any, { token }:any){
            try{
                const { data } = await axios.post<LoginResponse>(`/user/auth/${token}`);
                const { result, _doc, token: newToken } = data;
                if(result){
                    const{
                        userEmail,
                        nickname,
                    } = _doc;

                    context.commit('login', {
                        userEmail,
                            nickname,
                            token: newToken,
                    });
                }
                return true;
            } catch (e) {
                console.log(e);
                return false;
            }
        }*/
    }
}

export default login;
