import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useTokenStore } from './token'
import axios from 'axios'
import GoGinApiUrl from '@/utils/GoGinApiUrl'


export const useQuantityStore = defineStore('usequantity', () => {
    const usetoken = useTokenStore()
    const quantity = ref(null);


    const getQuantity = async () => {
        const userid = usetoken.getInfo().uid

        try {
            const response = await axios.post(`${GoGinApiUrl}/quantity/find`,
                {
                    user_id: userid,
                }
            )
            console.log("?!?!!!!!!", response)
            console.log("?!?!!!!!!", response)
            console.log("?!?!!!!!!", response)
            console.log("?!?!!!!!!", response)
            console.log("?!?!!!!!!", response)
            console.log("?!?!!!!!!", response)
            return response.data.quantity
        } catch (error) {
            console.log(error)
        }
    }

    const updateQuantity = async (newQuantity) => {
        const userid = usetoken.getInfo().uid
        try {

            const response = await axios.post(`${GoGinApiUrl}/quantity/update`, {
                user_id: userid,
                quantity: newQuantity
            })

            console.log(response.data)

        } catch (error) {

            console.log(error)

        }
    }

    return { quantity, getQuantity, updateQuantity }
}, {
    persist: true,
})