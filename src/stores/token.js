import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import react from 'react'

export const useTokenStore = defineStore('usetoken', () => {
    const mytoken = ref('')
    const userinfo = reactive({
        username: '',
        uid: '',

    })

    const setInfo = (username, uid) => {
        userinfo.username = username
        userinfo.uid = uid
    }

    const getInfo = () => {
        return userinfo
    }

    const removeInfo = () => {
        userinfo.username = ''
        userinfo.uid = ''
    }
    const setToken = (token) => {
        mytoken.value = token
    }
    const getToken = () => {
        return mytoken.value
    }
    const removeToken = () => {
        mytoken.value = ''
    }
    return { mytoken, userinfo, setToken, getToken, removeToken, setInfo, getInfo, removeInfo }

}, {
    persist: true,
})
