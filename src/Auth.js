import axios from "axios"
import { useState, useEffect } from "react"

export default function Auth(code){
    const [accessToken, setAccessToken] = useState("")
    const [refreshToken, setRefreshToken] = useState("")
    const [expiresIn, setExpiresIn] = useState("")


    useEffect(() => {
        axios.post("http://localhost:3001/login", {
            code,
        }).then(res => {
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.exxpiresIn)
            window.history.pushState({}, null, "/")
        }).catch(() => {
            window.location("/")
        })
    }, [code])

    useEffect(() => {

        if (!refreshToken || !expiresIn) return

        const interval = setInterval(() => {

        axios.post("http://localhost:3001/refresh",  {refreshToken})
        .then(res => {
            setAccessToken(res.data.accessToken)
            setExpiresIn(res.data.exxpiresIn)
        })
        .catch(() => {
            window.location("/")
        })
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
        
    }, [refreshToken, expiresIn])

    return accessToken
}