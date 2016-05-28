const ACTION_PREFIX = '@@firebase'

export const ACTION_UPDATE_USER_DATA = `${ACTION_PREFIX}/update-user-data`
export const ACTION_LOGIN = `${ACTION_PREFIX}/login`
export const ACTION_LOGOUT = `${ACTION_PREFIX}/logout`
export const ACTION_GET_VOCABULARY_LIST = `${ACTION_PREFIX}/get-vocabulary-list`

export const STATUS_INIT = 'firebase/status/init'
export const STATUS_REQUEST = 'firebase/status/request'
export const STATUS_SUCCESS = 'firebase/status/success'
export const STATUS_FAILURE = 'firebase/status/failure'
