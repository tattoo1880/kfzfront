import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore('usetoken', () => {
    const mytoken = ref('')
    const userinfo = reactive({
        username: '',
        uid: '',
        isActived: false,

    })

    const setInfo = (username, uid,isActived) => {
        userinfo.username = username
        userinfo.uid = uid
        userinfo.isActived = isActived
    }

    const getInfo = () => {
        return userinfo
    }

    const removeInfo = () => {
        userinfo.username = ''
        userinfo.uid = ''
        userinfo.isActived = false
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
