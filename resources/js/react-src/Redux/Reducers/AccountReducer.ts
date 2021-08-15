
const initialState = {
    data: {
        name: '',
        email: '',
    }
}

const AccountReducer = (state = initialState, { type, payload }) => {

    const st = { ...state }

    if (type === 'ACCOUNT_SET_DATA') {

        st.data = {
            name: payload.name,
            email: payload.email,
        }
    } else if (type === 'ACCOUNT_UNSET_DATA') {

        st.data = {
            name: '',
            email: ''
        }
    }

    return st
}

export default AccountReducer
