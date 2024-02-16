import {createSlice} from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const signup = createAsyncThunk(
    "user/signup", async(info,{rejecteWithValue})=>{
        try{
            const res = await axios.post("/register",info)
            return res.data
        }catch(error){
            return rejecteWithValue(error.response.data.msg)
        }
    })


export const signin = createAsyncThunk(
    "user/signin", async(info,{rejecteWithValue})=>{
        try{
            const res = await axios.post("/login",info)
            return res.data
        }catch(error){
            return rejecteWithValue(error.response.data.msg)
        }
    })

     //delete user account 
    export const deleteUser = createAsyncThunk(
        "/deleteuser", async (userId, {rejectWithValue}) => {
            try {
                const res = await axios.delete(`/deleteuser/${userId}`, {
                    headers:{
                        token:localStorage.getItem("token")
                    }
                })
                return res.data
            } catch (error) {
                return rejectWithValue(error.response.data.msg)
            }
        }
    )

            //update user account
        export const updateUser = createAsyncThunk(
            "/updateuser", async (userId, {rejectWithValue}) => {
                try {
                    const res = await axios.put(`/updateuser/${userId._id}`,userId, {
                        headers:{
                            token:localStorage.getItem("token")
                        }
                    })
                    return res.data
                } catch (error) {
                    return rejectWithValue(error.response.data.msg)
                }
            }
        )

const userSlice = createSlice({
    name: "user",
    initialState:{
        isloading:false,
        token:localStorage.getItem("token") || null,
        isAuth: Boolean(localStorage.getItem("isAuth")) || null,
        userList:[],
        errors:null,
        user:JSON.parse(localStorage.getItem('user'))  || null,
        profilePicture:"https://img.freepik.com/vecteurs-premium/profil-avatar-femme-icone-ronde_24640-14042.jpg"
    },
    reducers:{
        logout: (state) =>{
            state.isAuth = false
            state.token = null
            state.user = null
            localStorage.removeItem("isAuth")
            localStorage.removeItem("token")
            localStorage.removeItem("user")
        }
    },
    extraReducers:{
        [signup.pending]:(state)=>{state.isloading=true},
        [signup.fulfilled]:(state,action)=>{
            state.isloading = false
            state.isAuth = true
            state.token = action.payload.token
            state.errors = null
            state.userList = action.payload.user
            state.user = action.payload.user
            localStorage.setItem('user',JSON.stringify(action.payload.user))
            localStorage.setItem("isAuth", state.isAuth)
            localStorage.setItem("token", state.token)
        },
        [signup.rejected]:(state,action)=>{
            state.isloading = false
            state.isAuth = false
            state.token = null
            state.errors = action.error
        },
        [signin.pending]:(state)=>{state.isloading=true},
        [signin.fulfilled]:(state,action)=>{
            state.isloading = false
            state.isAuth = true
            state.token = action.payload.token
            state.errors = null
            state.userList = action.payload.user
            state.user = action.payload.user
            localStorage.setItem("isAuth", state.isAuth)
            localStorage.setItem("token", state.token)
            localStorage.setItem('user',JSON.stringify(action.payload.user))
        },
        [signin.rejected]:(state,action)=>{
            state.isloading = false
            state.isAuth = false
            state.token = null
            state.errors = action.error
        },
         //delete user account
        [deleteUser.pending]: (state) => {state.isLoading= true },
        [deleteUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errors = null;
            state.user = null; 
            state.isAuth = false; 
            state.token = null; 
            localStorage.removeItem("isAuth");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
        [deleteUser.rejected]: (state, action) => {
            state.isLoading= false 
            state.isAuth = false
            state.token = null
            state.errors = action.payload.message || 'An error occurred while updating user';
        },
        //update user account
        [updateUser.pending]: (state) => {state.isLoading= true },
        [updateUser.fulfilled]: (state, action) => {
            state.isLoading= false 
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        [updateUser.rejected]: (state, action) => {
            state.isLoading= false 
            state.errors = action.payload.message || 'An error occurred while updating user';
        }
    }
})

export default userSlice.reducer
export const {logout}= userSlice.actions