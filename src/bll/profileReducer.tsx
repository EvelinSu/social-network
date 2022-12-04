import {TAppDispatch} from "./store/store";
import {defaultProfile, demoProfile} from "./demo/profileDemo";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../dal/api/authApi";
import {setAppMessage, setIsFetching} from "./appReducer";
import {TActiveProfile, TProfileImageResponse} from "../dal/api/types";
import {profileAPI} from "../dal/api/profileApi";

export type TProfilePage = {
    isFetching: boolean,
    activeProfile: TActiveProfile,
    status: string,
}

export const initialState: TProfilePage = ({
    isFetching: true,
    activeProfile: defaultProfile,
    status: "Mew",
})

const slice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setActiveProfile(state, action: PayloadAction<TActiveProfile>) {
            state.activeProfile = action.payload
        },
        profileToggleLoader(state, action: PayloadAction<boolean>) {
            state.isFetching = action.payload
        },
        setMyStatus(state, action: PayloadAction<string>) {
            state.status = action.payload
        },
        setMyAvatar(state, action: PayloadAction<TProfileImageResponse>) {
            state.activeProfile.photos.large = action.payload.photos.large
            state.activeProfile.photos.small = action.payload.photos.small
        },
        setProfile(state, action: PayloadAction<Omit<TActiveProfile, "photos">>) {
            state.activeProfile = {...state.activeProfile, ...action.payload, photos: state.activeProfile.photos}
        }
    }
})

export const getProfile = (userId: number) => async (dispatch: TAppDispatch) => {
    dispatch(profileToggleLoader(true))
    const myId = await authAPI.getMyData().then((res) => res.data.id) || 0
    if (userId || myId) {
        const userStatus = await profileAPI.getProfileStatus(userId || myId)
        profileAPI
            .getProfile(userId || myId)
            .then(profile => dispatch(setActiveProfile(profile)))
            .then(() => dispatch(setMyStatus(userStatus)))
            .catch(() => {})
            .finally(() => dispatch(profileToggleLoader(false)))
    } else {
        dispatch(setActiveProfile(demoProfile))
        dispatch(profileToggleLoader(false))
    }
}

export const changeProfile = (values: TActiveProfile) => async (dispatch: TAppDispatch) => {
    dispatch(profileToggleLoader(true))
    try {
        const newProfile = await profileAPI.putProfile(values)
        if (newProfile.resultCode === 0) {
            dispatch(setProfile(newProfile.data))
            dispatch(setAppMessage({severity: "success", text: "Profile changed!"}))
        } else {
            throw new Error(newProfile.messages[0])
        }
    } catch (e) {
        dispatch(setAppMessage({severity: "error", text: `${e}`}))
    } finally {
        dispatch(profileToggleLoader(false))
    }
}

export const putStatus = (newStatus: string) => (dispatch: TAppDispatch) => {
    dispatch(setIsFetching(true))
    profileAPI
        .putProfileStatus(newStatus)
        .then(() => dispatch(setAppMessage({severity: "success", text: "Successfully!"})))
        .catch(() => dispatch(setAppMessage({severity: "error", text: "Some error"})))
        .finally(() => dispatch(setIsFetching(false)))
}

export const putAvatar = (newImage: FormData | string) => (dispatch: TAppDispatch) => {
    dispatch(setIsFetching(true))
    profileAPI
        .putProfileImage(newImage)
        .then((res) => {
            dispatch(setMyAvatar(res.data))
            dispatch(setAppMessage({severity: "success", text: "Successfully!"}))
            return res
        })
        .catch(() => {
            dispatch(setAppMessage({severity: "error", text: "Some error"}))
        })
        .finally(() => dispatch(setIsFetching(false)))
}

const profileReducer = slice.reducer

export const {setActiveProfile, profileToggleLoader, setMyStatus, setMyAvatar, setProfile} = slice.actions

export default profileReducer