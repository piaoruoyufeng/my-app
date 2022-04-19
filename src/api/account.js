import service from "../utils/request";

export function Login(data) {
    return service.request({
        url: "/api1",
        method: "get",
        data,
    })
}

export function Register(data) {
    return service.request({
        url: "/api2",
        method: "get",
        data,
    })
}

export function GetVerificationCode(data) {
    return service.request({
        url: "/api3",
        method: "get",
        data,
    })
}
