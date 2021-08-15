
const initialState = {
    isAuthenticated: false,
    token: '',
}

const SessionReducer = (state = initialState, { type, payload }) => {

    const st = { ...state }

    if (type === 'SESSION_START') {

        st.isAuthenticated = true
        st.token = payload.token
    } else if (type === 'SESSION_END') {

        st.isAuthenticated = false
        st.token = ''
    }

    return st
}

export default SessionReducer
