
const initialState = {
    loaded: false,
    result: [],
    saving: false,
    deleting: false,
}

const ProductsReducer = (state = initialState, { type, payload }) => {

    const st = { ...state }

    if (type === 'PRODUCTS_SET_RESULT') {

        st.result = payload
        st.loaded = true
    } else if (type === 'PRODUCTS_UNSET_RESULT') {

        st.result = []
        st.loaded = false
    } else if (type === 'PRODUCTS_SET_SAVING') {

        st.saving = payload
    } else if (type === 'PRODUCTS_SET_DELETING') {

        st.deleting = payload
    }

    return st
}

export default ProductsReducer
