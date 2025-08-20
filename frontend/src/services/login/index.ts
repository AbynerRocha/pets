import type { AxiosError } from "axios"
import { api } from "../axios"

type LoginData = {
    user: string
    password: string
}

type SuccessResponse = {
    success: boolean
    accessToken?: string
}

type ErrorResponse = {
    success: boolean
    error?: string
    message?: string
}

const fallBackMessage = "Não foi possível realizar o login neste momento. Por favor, tente novamente mais tarde"

export function loginUser({ user, password }: LoginData) {
    return new Promise<{ accessToken: string }>((resolve, reject) => {
        api.post<SuccessResponse>('/user/auth/login', { user, password })
        .then((res) => {
            if(!res.data.accessToken || res.data.accessToken === undefined) {
                return reject({
                    error: 'The access token is necessary.',
                    message: fallBackMessage
                })
            }

            const { accessToken } = res.data

            resolve({ accessToken })
        })
        .catch((err: AxiosError<ErrorResponse>) => {
            if(err.response && err.response.data) {
                const message = err.response.data.message

                const target = (
                    message?.toLowerCase().includes("usuário") ? "user"
                    : message?.toLowerCase().includes("senha") ? "password"
                    : "general"
                )

                reject({ 
                    error: err.response.data.error, 
                    message: message || fallBackMessage,
                    target
                })
            } else {
                reject({ error: err, message: fallBackMessage, target: 'general' })
            }
        })
    })
}
