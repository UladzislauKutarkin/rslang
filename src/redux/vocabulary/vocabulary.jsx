import axios from "axios";

export const FETCH_VOCABULARY_REQUEST = "FETCH_VOCABULARY_REQUEST";
export const FETCH_VOCABULARY_SUCSESS = "FETCH_VOCABULARY_SUCSESS";
export const FETCH_VOCABULARY_FAILURE = "FETCH_VOCABULARY_FAILURE";

let initialState = {
        vocabulary: []
        ,
        pageSize : 20,
        currentPage:1,
        isLoading: false,
        dataFetched: false
};

const VocabularyReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_VOCABULARY_REQUEST:
            return { ...state,
                isLoading: true,
                vocabulary: {},
                error: '' };
        case FETCH_VOCABULARY_SUCSESS:
            return { ...state,
                isLoading: false,
                vocabulary: action.payload,
                error: '',
            };
        case FETCH_VOCABULARY_FAILURE:
            return {
                ...state,
                isLoading: false,
                vocabulary: {},
                error: action.payload
            };
        default:
            return state;
    }
};

export const getVocabulary = (page, group) => {
    return dispatch => {
        axios
            .get(`https://rs-lang-back.herokuapp.com/words?page=${page}&group=${group}`)
            .then(({ data }) => dispatch(fetchVocabularySucsess(data)))
            .catch((error) => dispatch(fetchVocabularyFailure(error)));
    };

};


export const fetchVocabularyRequest = () => ({ type: FETCH_VOCABULARY_REQUEST });
export const fetchVocabularySucsess = (data) => ({ type: FETCH_VOCABULARY_SUCSESS, payload: data });
export const fetchVocabularyFailure = (error) => ({
    type: FETCH_VOCABULARY_FAILURE,
    payload: error.message,
});
export default  VocabularyReducer;