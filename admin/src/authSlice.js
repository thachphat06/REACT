import { createSlice } from '@reduxjs/toolkit';
export const authSlice = createSlice({
    name: 'Auth', 
    initialState: {daDangNhap: false, user:null, token:null, expiresIn:0},
    reducers: {
      thoat: (state) => {
        // state = {daDangNhap: false, user:null, token:null, expiresIn:0 };
        state.daDangNhap = false;
        state.user = null;
        state.expiresIn = 0;
        state.token = null;
        console.log("Đã thoát")

      },
      dalogin: (state, param) => {    
        state.token = param.payload.token ;
        state.expiresIn = param.payload.expiresIn ;
        state.user = param.payload.userInfo ;
        state.daDangNhap = true;
        console.log("Đã ghi nhận state đăng nhập", state.user) 
      },
    }, 
})
export const { dalogin, thoat } = authSlice.actions;
export default authSlice.reducer;
