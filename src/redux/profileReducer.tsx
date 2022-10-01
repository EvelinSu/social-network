import {v1} from "uuid";
import {getStringDate} from "../common/utils";
import {TActions} from "./types";
import {TPost} from "../pages/Profile/Posts/types";
import {Dispatch} from "redux";
import {authAPI, usersAPI} from "../api/api";

export type TActiveProfile = {
    aboutMe: string,
    contacts: {
        facebook: string,
        website: string,
        vk: string,
        twitter: string,
        instagram: string,
        youtube: string,
        github: string,
        mainLink: string
    },
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    userId: number | string,
    photos: {
        small: string,
        large: string
    }
}

export type TProfilePage = {
    isFetching: boolean,
    activeProfile: TActiveProfile,
    newPostText: string,
    posts: Array<TPost>
}

const initialState: TProfilePage = ({
    isFetching: true,
    activeProfile: {
        aboutMe: 'Mew mew mew mew',
        contacts: {
            facebook: '',
            website: '',
            vk: "",
            twitter: "",
            youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=0s&ab_channel=RickAstley",
            github: "https://www.youtube.com/watch?v=_S7WEVLbQ-Y&ab_channel=FicLord",
            instagram: "https://i.imgur.com/2eVNhUN.png",
            mainLink: ""
        },
        lookingForAJob: false,
        lookingForAJobDescription: 'The salty swabbie begrudgingly tastes the breeze.',
        fullName: "Meow",
        userId: 1000000,
        photos: {
            small: "https://i.imgur.com/WfSK9QM.png",
            large: "https://i.imgur.com/WfSK9QM.png"
        }
    },
    newPostText: '',
    posts: [
        {
            id: v1(),
            text: "Rinse three oz of blueberries in one container of gravy. ",
            likes: 4,
            isLiked: false,
            date: '1 hour ago',
        },
        {
            id: v1(),
            text: "Arg! Pieces o' beauty are forever golden. Scurvy, jolly skiffs awkwardly pull a small, lively lagoon. The lad drinks with fortune, mark the seychelles until it waves. ",
            likes: 2,
            isLiked: true,
            date: '1 hour ago'
        }
    ],
})

const profileReducer = (state: TProfilePage = initialState, action: TActions): TProfilePage => {
    switch (action.type) {
        case "ADD-POST":
            const newPost: TPost = {
                id: v1(),
                text: action.postText,
                likes: 0,
                isLiked: false,
                date: getStringDate(new Date())
            }
            return {
                ...state,
                posts: [newPost, ...state.posts]
            }
        case "CHANGE-NEW-POST-TEXT":
            return {
                ...state,
                newPostText: action.newPostText
            }
        case "SET-ACTIVE-PROFILE":
            return {...state, activeProfile: action.activeProfile}
        case "TOGGLE-LOADER":
            return {...state, isFetching: action.isFetching}
        default:
            return state
    }
}

export const addPostAC = (text: string) => ({
    type: "ADD-POST",
    postText: text
} as const)

export const changeNewPostTextAC = (text: string) => ({
    type: "CHANGE-NEW-POST-TEXT",
    newPostText: text
} as const)

export const setActiveProfile = (activeProfile: TActiveProfile) => ({
    type: "SET-ACTIVE-PROFILE",
    activeProfile
} as const)
export const profileToggleLoader = (isFetching: boolean) => ({
    type: "TOGGLE-LOADER",
    isFetching
} as const)


export const getProfile = (id: string) => (dispatch: Dispatch) => {
    dispatch(profileToggleLoader(true))
    authAPI.getMyData().then(me => {
        return me.id
    }).then((myId) => {
        usersAPI.getUser(id || myId).then(user => {
                dispatch(setActiveProfile(user))
                setTimeout(() => {
                    dispatch(profileToggleLoader(false))
                }, 500)
            }
        )
    })
}

export default profileReducer