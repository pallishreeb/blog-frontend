import React, { createContext, useReducer, useContext } from "react";

// create the initial state for comments and replies
const initialState = {
    posts: [],
    savedPosts: [],
    featuredPosts: [],
    duplicatesPosts: [],
    notifications: [],
    metadata: {},
    isSearching: false,
    isSaved: false
};

// create the context for the state and the dispatch
export const PostContext = createContext(initialState);

// create the reducer to update the state based on the action type
const apiReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_METADATA":
            return {
                ...state,
                metadata: action.payload,
            };
        case "FETCH_POSTS":
            return {
                ...state,
                posts: action.payload,
                duplicatesPosts: action.payload
            };
        case "ADD_TO_SAVE_POST":
            return {
                ...state,
                savedPosts: [...state.savedPosts, action.payload],
            };
        case "REMOVE_FROM_SAVE_POST":
            return {
                ...state,
                savedPosts: state.savedPosts.filter(
                    (post) => post._id !== action.payload
                ),
            };


        case "FETCH_FEATURED_POSTS":
            return {
                ...state,
                featuredPosts: action.payload,
            };

        case "FILTER_SEARCHED_POSTS":
            return {
                ...state,
                isSearching: true,
                posts: state.posts.filter(
                    (post) => post.title.toLowerCase().includes(action.payload.toLowerCase())
                ),
            };
        case "CLEAR_FILTERS":
            return {
                ...state,
                isSearching: false,
                posts: state.duplicatesPosts,
            };
        case "CLEAR_FILTERS_PARTLY":
            return {
                ...state,
                isSearching: true,
                posts: state.duplicatesPosts,
            };
        case "FILTER_POSTS_BY_CATEGORY":
            return {
                ...state,
                isSearching: true,
                posts: state.posts.filter(
                    (post) => post.category._id === action.payload)
                ,
            };
        case "FILTER_POSTS_BY_SUBCATEGORY":
            return {
                ...state,
                isSearching: true,
                posts: state.posts.filter(
                    (post) => post?.subcategory && post?.subcategory?._id === action.payload)
                ,
            };
        case "FETCH_NOTIFICATIONS":
            return {
                ...state,
                notifications: action.payload,
            };
        case "REMOVE_NOTIFICATIONS":
            return {
                ...state,
                notifications: state.notifications.filter((n) => n._id !== action.payload),
            };
        default:
            return state;
    }
};

// create the provider component that will hold the state and dispatch
export const PostApiProvider = ({ children }) => {
    const [state, dispatch] = useReducer(apiReducer, initialState);
    return (
        <PostContext.Provider value={{ state, dispatch }}>
            {children}
        </PostContext.Provider>
    );
};

// create a custom hook to access the state and dispatch
export const usePostApi = () => useContext(PostContext);
