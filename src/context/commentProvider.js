import React, { createContext, useReducer, useContext } from "react";

// create the initial state for comments and replies
const initialState = {
    comments: [],
    replies: [],
};

// create the context for the state and the dispatch
export const ApiContext = createContext(initialState);

// create the reducer to update the state based on the action type
const apiReducer = (state, action) => {
    switch (action.type) {
        case "ADD_COMMENT":
            return {
                ...state,
                comments: [...state.comments, action.payload],
            };
        case "FETCH_COMMENTS":
            return {
                ...state,
                comments: action.payload,
            };
        case "DELETE_COMMENT":
            return {
                ...state,
                comments: state.comments.filter(
                    (comment) => comment._id !== action.payload
                ),
            };
        case "EDIT_COMMENT":
            return {
                ...state,
                comments: state.comments.map((comment) =>
                    comment._id === action.payload._id ? action.payload : comment
                ),
            };
        case "ADD_REPLY":
            return {
                ...state,
                replies: [...state.replies, action.payload],
            };
        case "FETCH_REPLIES":
            return {
                ...state,
                replies: [...state.replies, ...action.payload],
            };
        case "DELETE_REPLY": 
           
            return {
                ...state,
                replies: state.replies.filter((reply) => reply._id !== action.payload),
            

               
            };
            
        case "EDIT_REPLY":
            console.log(action.payload);
            return {
                ...state,
                replies: state.replies.map((reply) =>
                    reply._id === action.payload._id ? action.payload : reply
                ),
            };
        default:
            return state;
    }
};

// create the provider component that will hold the state and dispatch
export const CommentApiProvider = ({ children }) => {
    const [state, dispatch] = useReducer(apiReducer, initialState);
    return (
        <ApiContext.Provider value={{ state, dispatch }}>
            {children}
        </ApiContext.Provider>
    );
};

// create a custom hook to access the state and dispatch
export const useCommentApi = () => useContext(ApiContext);
