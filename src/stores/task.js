import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useTokenStore } from './token'
import ApiUrl from '@/utils/ApiUrl'
export const useTaskStore = defineStore('usertask', () => {


    const shopinfo = ref(null)




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




    const setSingleBook = async (itemid, title, price, img, desc, quantity) => {


        console.log("====")
        console.log(itemid, title, price, img, desc, quantity)
        console.log("====")
        const jwt = useTokenStore().getToken();
        console.log(jwt)
        console.log(useTokenStore().getInfo())
        const uid = useTokenStore().getInfo().uid;
        console.log(uid)
        try {
            const res = await axios.post(`${ApiUrl}/good/create`, {
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
            const res = await axios.get(`${ApiUrl}/good/getbyuid/${uid}`, {
                headers: {
                    "Authorization": `Bearer ${useTokenStore().getToken()}`
                }
            }
            )

            // console.log(res)
            shopinfo.value = res.data[0]["shop"]

            return res
        } catch (e) {
            console.log(e)
            return null
        }
    }

    const upLoad = async (row) => {
        console.log(row)

        try {
            const res = await axios.post(`${ApiUrl}/task/send`,
                row,
                {
                    headers: {
                        "Authorization": `Bearer ${useTokenStore().getToken()}`
                    }
                }
            )
            return res
        } catch (error) {
            console.log(error)
            return null
        }
    }


    const moreupLoad = async (list) => {

        console.log("=====")

        try {

            const res = await axios.post(`${ApiUrl}/task/sendall`,
                {
                    data: list,
                    uid: useTokenStore().getInfo().uid
                },
                {
                    headers: {
                        "Authorization": `Bearer ${useTokenStore().getToken()}`
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

    const taskstatus = async () => {
        const jwt = useTokenStore().getToken();
        const uid = useTokenStore().getInfo().uid;

        try {
            const res = await axios.get(`${ApiUrl}/task/getmytasklock/${uid}`, {
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



    const newsendall = async () => {
        console.log("=====", shopinfo.value)
        const jwt = useTokenStore().getToken();
        console.log(jwt)
        console.log(useTokenStore().getInfo())
        const uid = useTokenStore().getInfo().uid;
        console.log(uid)

        try {
            const res = await axios.post(`${ApiUrl}/task/newsendall`,
                {
                    session: uid,
                    usernick: shopinfo.value.shopName,
                    yfrule: shopinfo.value.yfRule,
                },
                {
                    headers: {
                        "Authorization": `Bearer ${jwt}`
                    }
                })
            console.log(res)
            return res
        } catch (error) {
            console.log(error)
            return null

        }


    }


    const downallgoods = async () => {


        console.log("=====", shopinfo.value)
        const jwt = useTokenStore().getToken();
        console.log(jwt)
        console.log(useTokenStore().getInfo())
        const uid = useTokenStore().getInfo().uid;
        console.log(uid)

        try {
            const res = await axios.post(`${ApiUrl}/sdk/downallgood`,
                {
                    session: uid,
                    usernick: shopinfo.value.shopName,
                },
                {
                    headers: {
                        "Authorization": `Bearer ${jwt}`
                    }
                })
            console.log(res)
            return res
        } catch (error) {
            console.log(error)
            return null
        }

    }


    const delteallweigui = async()=>{

        console.log("=====", shopinfo.value)
        const jwt = useTokenStore().getToken();
        console.log(jwt)
        console.log(useTokenStore().getInfo())
        const uid = useTokenStore().getInfo().uid;
        console.log(uid)

        try {
            const res = await axios.post(`${ApiUrl}/sdk/getallweigui`,
                {
                    session: uid,
                    usernick: shopinfo.value.shopName,
                },
                {
                    headers: {
                        "Authorization": `Bearer ${jwt}`
                    }
                })
            console.log(res)
            return res
        } catch (error) {
            console.log(error)
            return null
            
        }

    }

    const deleteallinstock = async() => {


        console.log("=====", shopinfo.value)
        const jwt = useTokenStore().getToken();
        console.log(jwt)
        console.log(useTokenStore().getInfo())
        const uid = useTokenStore().getInfo().uid;
        console.log(uid)

        try {
            const res = await axios.post(`${ApiUrl}/sdk/getallinstock`,
                {
                    session: uid,
                    usernick: shopinfo.value.shopName,
                },
                {
                    headers: {
                        "Authorization": `Bearer ${jwt}`
                    },
                    timeout: 1000*60*60
                })
            console.log(res)
            return res
        } catch (error) {
            console.log(error)
            return null
            
        }

    }


    const getonepageimageanddelete = async()=>{
        console.log("=====", shopinfo.value)
        const jwt = useTokenStore().getToken();
        console.log(jwt)
        console.log(useTokenStore().getInfo())
        const uid = useTokenStore().getInfo().uid;
        console.log(uid)

        try {
            const res = await axios.post(`${ApiUrl}/sdk/getonepageimageanddelete`,
                {
                    session: uid,
                    usernick: shopinfo.value.shopName,
                },
                {
                    headers: {
                        "Authorization": `Bearer ${jwt}`
                    }
                })
            console.log(res)
            return res
        } catch (error) {
            console.log(error)
            return null
            
        }
    }



    return { setSingleBook, getTaskByUid, upLoad, getmyallinfo, moreupLoad, taskstatus, newsendall, downallgoods,delteallweigui, deleteallinstock,getonepageimageanddelete}

}
)
