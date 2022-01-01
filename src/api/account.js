import service from "../utils/request";

export function Login(data) {
    return service.request({
        url: "/api",
        method: "get",
        data,
    })
}

export function Register(data) {
    return service.request({
        url: "/api",
        method: "get",
        data,
    })
}

export function GetVerificationCode(data) {
    return service.request({
        url: "/api",
        method: "get",
        data,
    })
}
