import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useTokenStore } from './token'
import axios from 'axios'
import ApiUrl from '@/utils/ApiUrl'

export const useProfileStore = defineStore('useprofile', () => {

    const getmyallinfo = async () => {
        const jwt = useTokenStore().getToken()
        console.log(jwt)

        const uid = useTokenStore().getInfo().uid
        console.log(uid)

        try {

            const res = await axios.get(`${ApiUrl}/api/getuserbyuid/${uid}`,
                {
                    headers: {
                        "Authorization": `Bearer ${jwt}`
                    }
                }
            )
            console.log(res)
            return res
        } catch (error) {
            console.log(error)
            return null

        }


    }

    const changemypassword = async (form) => {
        const jwt = useTokenStore().getToken()
        console.log(jwt)

        console.log(form.uid)
        console.log(form.password)

        try {
            const res = await axios.post(`${ApiUrl}/api/updatepassword`, form,
                {
                    headers: {
                        "Authorization": `Bearer ${jwt}`
                    }
                }

            )

            console.log(res)
            return res
        } catch (error) {
            console.log(error)
            return null
        }
    }


    const addred = async (red) => {
        const useruid = useTokenStore().getInfo().uid
        const jwt = useTokenStore().getToken()
        console.log(jwt)
        console.log(useruid)
        console.log(red)

        try {
            const res = await axios.post(`${ApiUrl}/check/add`, {
                useruid: useruid,
                uid: red,
            },
                {
                    headers: {
                        "Authorization": `Bearer ${jwt}`
                    }
                }
            )
            return res
        } catch (error) {

            return null


        }

    }


    const getmyyallredpackage = async () => {
        const jwt = useTokenStore().getToken()
        const useruid = useTokenStore().getInfo().uid
        console.log(jwt)
        console.log(useruid)
        try {
            const res = await axios.post(`${ApiUrl}/check/get`, {
                userUid: useruid
            },
                {
                    headers: {
                        "Authorization": `Bearer ${jwt}`
                    }

                })
            console.log(res)
            return res
        } catch (error) {
            return null
        }
    }

    return { getmyallinfo, changemypassword, addred, getmyyallredpackage }

})
