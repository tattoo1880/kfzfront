import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useTokenStore } from './token'
import { useTbSdkstore } from './tbsdk'
import axios from 'axios'
import ApiUrl from '@/utils/ApiUrl'
import GoGinApiUrl from '@/utils/GoGinApiUrl'
import { ElMessage } from 'element-plus'

export const useCartsStore = defineStore('usecarts', () => {





    const carts = ref([])


    const getCartsByUid = async () => {

        const usetbsdk = useTbSdkstore()
        await usetbsdk.getshopbyuid()

        const topsession = usetbsdk.myshopinfo.session

        console.log('topsession in carts store', usetbsdk.myshopinfo)
        console.log('useCartsStore')

        console.log('topsession', topsession)

        // const uid = useTokenStore().getInfo().uid
        // const uid = "6200828332b0a973924d61b07610f440adb8ZZ263ZZ9eb34042112053"
        const jwt = useTokenStore().getToken()
        const uid = topsession
        console.log('useCartsStore')

        console.log('uid', uid)
        console.log('jwt', jwt)
        const res = await useTbSdkstore().getshopbyuid()
        console.log('res', res)
        const shopname = res.data.shopName
        try {
            const response = await axios.post(`${ApiUrl}/carts/getcarts`,
                {
                    uid: uid,
                    shopname: shopname
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


    const deleteCartById = async (cartId) => {
        const jwt = useTokenStore().getToken()
        const uid = useTokenStore().getInfo().uid
        const res = await useTbSdkstore().getshopbyuid()
        console.log('res', res)
        const shopname = res.data.shopName

        try {
            const response = await axios.post(`${ApiUrl}/sdk/deleteoldgoodsbycid`, {
                session: uid,
                usernick: shopname,
                cid: cartId
            }, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log('deleteCartById response', response)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }


    const newdeleteCartById = async (cartIds) => {
        const jwt = useTokenStore().getToken()
        const uid = useTokenStore().getInfo().uid
        const res = await useTbSdkstore().getshopbyuid()
        console.log('res', res)
        const shopname = res.data.shopName

        try {
            const response = await axios.post(`${GoGinApiUrl}/newcarts/deletebycids`, {
                session: uid,
                usernick: shopname,
                cids: cartIds
            }, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log('newdeleteCartById response', response)

            if (response.data.message == "DeleteByIds called") {
                ElMessage.success("删除成功")
            }
            return response.data

        } catch (error) {
            console.log(error)
        }
    }


    return { carts, getCartsByUid, deleteCartById, newdeleteCartById }





})
