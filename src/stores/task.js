import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useTokenStore } from './token'

export const useTaskStore = defineStore('usertask', () => {



    const setSingleBook = async (itemid, title, price, img, desc, quantity) => {

        const jwt = useTokenStore().getToken();
        console.log(jwt)
        const uid = useTokenStore().getInfo().uid;
        console.log(uid)
        try {
            const res = await axios.post('http://127.0.0.1:8083/good/create', {
                uid: uid,
                itemid: itemid,
                title: title,
                price: price,
                img: img,
                desc: desc,
                quantity: quantity
            }, {
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            })

            console.log(res)

        }
        catch (e) {
            console.log(e)
        }
    }

    const getTaskByUid = async () => {
        const uid = useTokenStore().getInfo().uid;
        try {
            const res = await axios.get(`http://127.0.0.1:8083/good/getbyuid/${uid}`, {
                headers: {
                    "Authorization": `Bearer ${useTokenStore().getToken()}`
                }
            }
            )

            console.log(res)
            return res
        } catch (e) {
            console.log(e)
            return null
        }
    }

    const upLoad = async (row) => {

        try {
            const res = await axios.post('http://127.0.0.1:8083/task/send',
                row,
                {
                    headers: {
                        "Authorization": `Bearer ${useTokenStore().getToken()}`
                    }
                }
            )

            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return { setSingleBook, getTaskByUid, upLoad }

}
)
