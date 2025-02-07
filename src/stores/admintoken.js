import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useAdminTokenStore = defineStore('useadmintoken', () => {
    const admininfo = reactive({
        staffname: '',
        uid: '',
        token: ''
    })

    const setInfo = (staffname, uid,token) => {
        admininfo.staffname = staffname
        admininfo.uid = uid
        admininfo.token = token
    }

    const getInfo = () => {
        return admininfo
    }

    const removeInfo = () => {
        admininfo.staffname = ''
        admininfo.uid = ''
        admininfo.token = ''
    }
    return { admininfo, setInfo, getInfo, removeInfo }

}, {
    persist: true,
})
