import { ref, computed, reactive } from 'vue'
import { useAdminTokenStore } from './admintoken'
import { defineStore } from 'pinia'
import axios from 'axios'
import ApiUrl from '@/utils/ApiUrl'

export const useCheckStore = defineStore('usecheck', () => {

    const getallcheck = async () => {

        const jwt = useAdminTokenStore().getInfo().token
        console.log(jwt)

        try {

            const res = await axios.get(`${ApiUrl}/check/getall`,
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



    const updatecheck = async (form) => {
        const jwt = useAdminTokenStore().getInfo().token
        console.log(jwt)

        console.log(form.cid)
        console.log(form.status)

        try {
            const res = await axios.post(`${ApiUrl}/check/updatecheck`, form,
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




    return { getallcheck, updatecheck }
})
