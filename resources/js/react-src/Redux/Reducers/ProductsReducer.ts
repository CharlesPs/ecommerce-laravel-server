
const initialState = {
    loaded: false,
    result: [],
    saving: false,
    deleting: false,

    page: 1,

    paginator: {
        per_page: 0,
        path: '',
        current_page: 0,
        last_page: 0,
        from: 0,
        to: 0,
        prev_page_url: '',
        first_page_url: '',
        next_page: '',
        last_page_url: '',
        links: [],
        total: 0
    }
}

const ProductsReducer = (state = initialState, { type, payload }) => {

    const st = { ...state }

    if (type === 'PRODUCTS_SET_RESULT') {

        st.page = payload.page

        st.result = payload.result
        st.loaded = true

        st.paginator = payload.paginator
    } else if (type === 'PRODUCTS_UNSET_RESULT') {

        st.page = 1

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
