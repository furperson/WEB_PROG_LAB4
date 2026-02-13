import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.authdata) {
        config.headers.Authorization = 'Basic ' + user.authdata;
    }
    return config;
});


export const loginUser = createAsyncThunk('auth/login', async ({ username, password }, { rejectWithValue }) => {
    try {
        const authdata = window.btoa(username + ':' + password);
        await axios.get('/api/auth/user', {
            headers: { Authorization: 'Basic ' + authdata }
        });
        const userObj = { username, authdata };
        localStorage.setItem('user', JSON.stringify(userObj));
        return userObj;
    } catch (error) {
        return rejectWithValue("Неверный логин или пароль");
    }
});

export const fetchPoints = createAsyncThunk('points/fetchAll', async (page = 0) => {
    const response = await api.get(`/points?page=${page}&size=5&sort=id,desc`);
    return response.data;
});

export const addPoint = createAsyncThunk('points/add', async (pointData, { rejectWithValue }) => {
    try {
        const response = await api.post('/points', pointData);
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response?.data || "Ошибка валидации");
    }
});

export const clearPoints = createAsyncThunk('points/clear', async () => {
    await api.delete('/points');
    return;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        error: null,
        loading: false
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

const pointsSlice = createSlice({
    name: 'points',
    initialState: {
        points: [],
        currentPage: 0,
        totalPages: 0,
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPoints.fulfilled, (state, action) => {
                state.points = action.payload.content;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.number;
            })
            .addCase(addPoint.fulfilled, (state, action) => {
                state.points.unshift(action.payload);
                if (state.points.length > 5) state.points.pop();
            })
            .addCase(clearPoints.fulfilled, (state) => {
                state.points = [];
                state.totalPages = 0;
            });
    }
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const pointsReducer = pointsSlice.reducer;