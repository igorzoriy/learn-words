export const OPEN_SIDEBAR = '@@layout/open-sidebar'
export const CLOSE_SIDEBAR = '@@layout/close-sidebar'

export function openSidebar () {
    return {
        type: OPEN_SIDEBAR,
    }
}

export function closeSidebar () {
    return {
        type: CLOSE_SIDEBAR,
    }
}
