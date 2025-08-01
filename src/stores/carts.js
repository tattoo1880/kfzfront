import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useTokenStore } from './token'
import { useTbSdkstore } from './tbsdk'
import axios from 'axios'
import ApiUrl from '@/utils/ApiUrl'

export const useCartsStore = defineStore('usecarts', () => {

    const uid = useTokenStore().getInfo().uid
    const jwt = useTokenStore().getToken()

    const carts = ref([])


    const getCartsByUid = async () => {
        const res = await useTbSdkstore().getshopbyuid()
        const shopname = res.data.shopname
        try {
            const response = await axios.post(`${ApiUrl}/carts/getcarts`,
                {
                    session: uid,
                    nickname: shopname
                },
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            )
            carts.value = response.data
            return response.data

        } catch (error) {
            console.log(error)

        }
    }



    return { carts, getCartsByUid }





})
