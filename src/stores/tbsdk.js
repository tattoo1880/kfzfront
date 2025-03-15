import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useTokenStore } from './token'
import ApiUrl from '@/utils/ApiUrl'
export const useTbSdkstore = defineStore('usetbsdk', () => {


    const myshopinfo = reactive({
        uid: '',
        authurl: '',
        session: ''
    })




    const getAuth = async () => {
        const jwt = useTokenStore().getToken()
        console.log(jwt)

        const uid = useTokenStore().getInfo().uid
        console.log(uid)

        try {

            const res = await axios.post(`${ApiUrl}/sdk/getuseranurl`,
                {
                    session: uid
                },

                {
                    headers: {
                        "Authorization": `Bearer ${jwt}`
                    }
                }
            )
            console.log(res)
            myshopinfo.uid = uid
            myshopinfo.authurl = res.data
            return res
        } catch (error) {
            console.log(error)
            return null

        }


    }

    const getshopbyuid = async () => {
        const jwt = useTokenStore().getToken()
        console.log(jwt)

        const uid = useTokenStore().getInfo().uid
        console.log(uid)

        try {

            const res = await axios.get(`${ApiUrl}/sdk/getshopbyuid/${uid}`,
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


    const getyftemplate = async (shopName) => {
        const jwt = useTokenStore().getToken()
        console.log(jwt)

        const uid = useTokenStore().getInfo().uid
        console.log(uid)

        try {

            const res = await axios.post(`${ApiUrl}/sdk/getallyftemplate`,
                {
                    session: uid,
                    usernick: shopName

                },
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

    const updateyf = async (templateid) => {
        const jwt = useTokenStore().getToken()
        console.log(jwt)

        const uid = useTokenStore().getInfo().uid
        console.log(uid)

        try {

            const res = await axios.post(`${ApiUrl}/sdk/updateyftemplate`,
                {
                    session: uid,
                    templateid: templateid

                },
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



    const addRule = async (rule) => {

        rule.uid = useTokenStore().getInfo().uid
        console.log(rule)

        try {
            const jwt = useTokenStore().getToken()
            const res = await axios.post(`${ApiUrl}/pricerule/create`,
                rule,
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


    const getruleByuid = async () => {
        const jwt = useTokenStore().getToken()
        console.log(jwt)

        const uid = useTokenStore().getInfo().uid
        console.log(uid)

        try {

            const res = await axios.post(`${ApiUrl}/pricerule/getbyuid`,
                {
                    uid: uid

                },
                {
                    headers: {
                        "Authorization": `Bearer ${jwt}`
                    }
                }

            )

            console.log(res)
            return res
        }
        catch (error) {
            console.log(error)
            return null
        }
    }

    const deleteRule = async (ruleid) => {
        
        try {
            const jwt = useTokenStore().getToken()
            const res = await axios.post(`${ApiUrl}/pricerule/delete`,
                {
                    id: ruleid

                },
                {
                    headers: {
                        "Authorization": `Bearer ${jwt}`
                    }
                }

            )

            console.log(res)
            return res
        }
        catch (error) {
            console.log(error)
            return null
        }
    }



    return { getAuth, getshopbyuid, getyftemplate, updateyf, addRule, getruleByuid, deleteRule }

}
)
