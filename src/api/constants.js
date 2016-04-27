const ACTION_PREFIX = '@@firebase'

export const ACTION_GET_USER_DATA = `${ACTION_PREFIX}/get-user-data`
export const ACTION_LOGIN = `${ACTION_PREFIX}/login`
export const ACTION_LOGOUT = `${ACTION_PREFIX}/logout`

export const STATUS_INIT = 'firebase/status/init'
export const STATUS_REQUEST = 'firebase/status/request'
export const STATUS_SUCCESS = 'firebase/status/success'
export const STATUS_FAILURE = 'firebase/status/failure'
