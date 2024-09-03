import { createSlice } from '@reduxjs/toolkit'

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState: {
        name: '',
        email: '',
        id: '',
        role: '',
        phone: '',
        state: '',
        city: '',
        address: '',
        pincode: '',
    },
    reducers: {
        setUserProfile: (state, action) => {
            state.name = action.payload.name
            state.email = action.payload.email
            state.id = action.payload.id
            state.role = action.payload.role
            state.phone = action.payload.phone
            state.state = action.payload.state
            state.city = action.payload.city
            state.address = action.payload.address
            state.pincode = action.payload.pincode
            
        },
    },
})

export const { setUserProfile } = userProfileSlice.actions
export default userProfileSlice.reducer