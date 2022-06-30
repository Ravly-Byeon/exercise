import {Module} from "vuex";
import axios from "axios";

interface Login {
    userId: string,
    isLogin: boolean,
    userEmail: string,
    token: string,
}

interface LoginResponse{
    result: boolean,
    token: string,
    _doc: {
        _id: string,
        email: string,
        nickname: string,
    }
}

const login ={
    namespaced: true,
    state: {
        isLogin: false,
        userEmail: '',
        userNickname: '',
        userId: '',
        token: '',
    },
    getters: {
        isLogin: (state: any) => state.isLogin,
        userEmail: (state: any) => state.userEmail,
        userId: (state: any) => state.userId,
        userNickname: (state: any) => state.userNickname,
        token: (state: any) => state.token,
    },
    mutations: {
        login(state:any, payload:any){
            const { email, access_token, _doc } = payload;
            console.log(_doc._id,'jj');
            state.isLogin = true;
            state.userId = _doc._id;
            state.userNickname = _doc.nickname;
            state.userEmail = email;
            state.token = access_token;
        },
        logout(state: any){
            state.isLogin = false;
            state.userEmail = '';
            state.token = '';
            state.userId = '';
            state.userNickname = '';
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
