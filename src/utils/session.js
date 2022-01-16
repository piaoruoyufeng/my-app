const tokenSdmin = 'adminToken';

export function setToken(value) {
    sessionStorage.setItem(tokenSdmin, value)
}

export function getToken() {
    return sessionStorage.getItem(tokenSdmin)
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