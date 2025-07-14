import { ref, computed, reactive } from 'vue'
import { useAdminTokenStore } from './admintoken'
import { defineStore } from 'pinia'
import axios from 'axios'
import ApiUrl from '@/utils/ApiUrl'

export const useWeijinStore = defineStore('useweijin', () => {


    const clearweijin = async () => {
        const jwt = useAdminTokenStore().getInfo().token
        console.log(jwt)

        try {
            const res = await axios.get(`${ApiUrl}/weijin/clearweijin`,
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

    return { clearweijin }
})
