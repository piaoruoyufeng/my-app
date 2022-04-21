const tokenAdmin = 'adminToken';

export function setToken(value) {
    sessionStorage.setItem(tokenAdmin, value)
}

export function getToken() {
    return sessionStorage.getItem(tokenAdmin)
}

export function removeToken(type) {
    if (type === '直接退出') {
        sessionStorage.clear()
    }
    if (type === '超时失效') {
        setTimeout(() => {
            sessionStorage.clear()
        }, 7200000)
    }
}