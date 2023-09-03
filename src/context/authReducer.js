import {LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT,LOAD_USER_FAIL,LOAD_USER_SUCCESS,REGISTER_SUCCESS,REGISTER_FAIL,VERIFY_FAIL,VERIFY_SUCCESS} from "./constants"

const authReducer = (state,action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
               ...state,
               token:action.payload,
               isAuthenticated:true,
            }
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            }
        case REGISTER_SUCCESS:
            return {
            ...state,
            isRegistered:true,
            }
        case REGISTER_FAIL:
            return {
                ...state,
                isRegistered:false,
                error:action.payload
            }
        case VERIFY_SUCCESS:
            return{
                ...state,
                isverified:true
            }
        case VERIFY_FAIL:
            return{
                ...state,
                isverified:false,

            } 
            case LOGIN_FAIL:
            case LOGOUT:
           case LOAD_USER_FAIL:
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                return{
                    ...state,
                    token:null,
                    isAuthenticated: false,
                    user:null,
                    error:action.payload
                }
        default:
            return  state;
    }

}

export default authReducer;