import {createSlice} from '@reduxjs/toolkit'
import{ createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'

    //get blogs  by user id
export const getblogs = createAsyncThunk(
    "/blog/getblogs", async (_, {rejectWithValue}) => {
        try {
            const res = await axios.get("/blog/getblogs", {
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

//getAllBlogs:
export const getallblogs = createAsyncThunk(
    "/blog/getallblogs", async (page, {rejectWithValue}) => {
        try {
            const res = await axios.get(`/blog/getallblogs?page=${page}`,page, {
            })
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data.msg)
        }
    }
)
//getSingleBlog:
export const getSingleBlog = createAsyncThunk(
    "/blog/getSingleBlog", async (_id, {rejectWithValue}) => {
        try {
            const res = await axios.get(`/blog/${_id}`, {
            })
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data.msg)
        }
    }
)


    //add blog
export const addblog = createAsyncThunk(
    "/blog/addblog", async (info, {rejectWithValue,dispatch}) => {
        try {
            const res = await axios.post("/blog/addblog",info, {
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            dispatch(getblogs())
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data.msg)
        }
    }
)
    //delete blog
export const deleteblog = createAsyncThunk(
    "/blog/deleteblog", async (personid, {rejectWithValue,dispatch}) => {
        try {
            const res = await axios.delete(`/blog/deleteblog/${personid._id}`, {
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            dispatch(getblogs())
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data.msg)
        }
    }
)
        //update blog
export const updateblog = createAsyncThunk(
    "/blog/updateblog", async (blogData, {rejectWithValue,dispatch}) => {
        try {
            const res = await axios.put(`/blog/updateblog/${blogData._id}`,blogData, {
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            dispatch(getblogs())
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data.msg)
        }
    }
)


export const searchBlog = createAsyncThunk(
    "/blog/search", async (searchQuery, {rejectWithValue})=>{
        try {
            const res = await axios.get(`/blog/search?searchQuery=${searchQuery}`)
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data.msg)
        }
    }
)


const blogSlice = createSlice({
    name : "blog",
    initialState: {
        blog:[],
        isLoading: false,
        blogList: [{title:"",
                    owner:"",
                    Author:"",
                    img:"",
                    _id:"",
                    likes:"",
                    desc:""}],
        errors: null,
        currentPage:1,
        numberOfPages: null
    },

    reducers:{
        setCurrentPage:(state,action)=>{              //pagination
            state.currentPage = action.payload
        }
    },
    
    extraReducers: {
              //GEt  Blog
        [getblogs.pending]: (state) => {state.isLoading= true },
        [getblogs.fulfilled]: (state, action) => {
            state.isLoading= false 
            state.errors = null
            state.blogList = action.payload.blogs

        },
        [getblogs.rejected]: (state, action) => {
            state.isLoading= false 
            state.blogList = []
            state.token = null
            state.errors = action.error
        },

            //delete Blog
        [deleteblog.pending]: (state) => {state.isLoading= true },
        [deleteblog.fulfilled]: (state, action) => {
            state.isLoading= false 
            state.errors = null
            state.blogList = action.payload
        },
        [deleteblog.rejected]: (state, action) => {
            state.isLoading= false 
            state.isAuth = false
            state.token = null
            state.errors = action.error
        },
        

                //get allblogs
        [getallblogs.pending]: (state) => {state.isLoading= true },
        [getallblogs.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errors = null;
            state.numberOfPages = action.payload.numberOfPages;
            state.currentPage = action.payload.currentPage;
            state.blogList = action.payload.data || [];},
        [getallblogs.rejected]: (state, action) => {
            state.isLoading= false 
            state.blogList = []
            state.token = null
            state.errors = action.error
        },
                //get singleblog
                [getSingleBlog.pending]: (state) => {
                    state.isLoading= true;
                    state.blog = null;}
                ,
                [getSingleBlog.fulfilled]: (state, action) => {
                    state.isLoading = false;
                    state.errors = null;
                    state.blog = action.payload.SingleBlog || [];}
                ,
                [getSingleBlog.rejected]: (state, action) => {
                    state.isLoading= false ;
                    state.blog = null;
                    state.token = null;
                    state.errors = action.payload;
                },
                        //get blog by search
                [searchBlog.pending]: (state) => {state.isLoading= true },

                [searchBlog.fulfilled]: (state, action) => {
                    state.isLoading= false 
                    state.errors = null
                    state.blogList = action.payload.blogs
                },

                [searchBlog.rejected]: (state, action) => {
                    state.isLoading= false 
                    state.blogList = []
                    state.token = null
                    state.errors = action.error
                },
    }
})

export const {setCurrentPage} = blogSlice.actions;
export default blogSlice.reducer
