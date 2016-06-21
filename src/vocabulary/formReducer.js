/* eslint complexity: [2, 22] */
import merge from 'lodash/merge'
import {
    STATUS_INIT,
    STATUS_REQUEST,
    STATUS_SUCCESS,
    STATUS_FAILURE,
} from '../api/constants'
import {
    ACTION_CLEAR_VOCABULARITY_FORM,
    ACTION_UPDATE_VOCABULARY_FORM,
    ACTION_FILL_VOCABULARY_FORM,
    ACTION_ADD_VOCABULARY_ITEM,
    ACTION_EDIT_VOCABULARY_ITEM,
} from './actions'

const initialState = {
    status: STATUS_INIT,
    phrase: '',
    translation: '',
    errorMessage: '',
    successMessage: '',
}

export default (state = initialState, action) => {
    const { type, status, params, data } = action
    let nextState = {}
    switch (type) {
        case ACTION_CLEAR_VOCABULARITY_FORM:
            return merge({}, state, initialState)

        case ACTION_UPDATE_VOCABULARY_FORM:
            return merge({}, state, {
                phrase: params.phrase,
                translation: params.translation,
            })

        case ACTION_ADD_VOCABULARY_ITEM:
            switch (status) {
                case STATUS_INIT:
                    nextState = initialState
                    break
                case STATUS_REQUEST:
                    nextState = params
                    nextState.errorMessage = ''
                    nextState.successMessage = ''
                    break
                case STATUS_FAILURE:
                    nextState.errorMessage = data && data.message || 'Item not saved.'
                    nextState.successMessage = ''

                    break
                case STATUS_SUCCESS:
                    nextState.phrase = ''
                    nextState.translation = ''
                    nextState.errorMessage = ''
                    nextState.successMessage = data && data.message || 'Item has beed saved successfully.'
                    break
            }
            nextState.status = status
            return merge({}, state, nextState)

        case ACTION_EDIT_VOCABULARY_ITEM:
            switch (status) {
                case STATUS_REQUEST:
                    nextState = params
                    nextState.errorMessage = ''
                    nextState.successMessage = ''
                    break
                case STATUS_FAILURE:
                    nextState.errorMessage = data && data.message || 'Item not saved.'
                    nextState.successMessage = ''
                    break
                case STATUS_SUCCESS:
                    nextState.errorMessage = ''
                    nextState.successMessage = data && data.message || 'Item has beed updated successfully.'
                    break
            }
            nextState.status = status
            return merge({}, state, nextState)

        case ACTION_FILL_VOCABULARY_FORM:
            switch (status) {
                case STATUS_REQUEST:
                    nextState.phrase = ''
                    nextState.translation = ''
                    nextState.errorMessage = ''
                    nextState.successMessage = ''
                    break
                case STATUS_FAILURE:
                    nextState.errorMessage = data && data.message || 'Item not fetched.'
                    nextState.successMessage = ''
                    break
                case STATUS_SUCCESS:
                    nextState.phrase = data.phrase
                    nextState.translation = data.translation
                    nextState.errorMessage = ''
                    nextState.successMessage = ''
            }

            nextState.status = status
            return merge({}, state, nextState)

        default:
            return state
    }
}
