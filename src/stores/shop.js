import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAdminTokenStore } from './admintoken'
import axios from 'axios'
import { ElMessage } from 'element-plus'

export const useShopStore = defineStore('useshop', () => {

    const useadmintoken = useAdminTokenStore()
    const { admininfo } = useadmintoken;
    console.log(admininfo)

    const getAllUsers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8083/api/getalluser',
                {
                    headers: {
                        "Authorization": `Bearer ${admininfo.token}`
                    }
                }
            )
            console.log(response.data)
            try {
                response.data.forEach((item) => {
                    //! 如果有subStartTime 的value 包括了T 和 Z 说明是一个时间格式,只保留年月日
                    if (item.subStartTime) {
                        item.subStartTime = item.subStartTime.split('T')[0]
                        item.subEndTime = item.subEndTime.split('T')[0]
                        //! 添加一个新的属性,显示剩余天数
                        const now = new Date()
                        const end = new Date(item.subEndTime)
                        const left = end - now
                        item.leftDays = Math.floor(left / (1000 * 60 * 60 * 24)) + 1

                    }
                }
                )
            } catch (e) {
                console.log("no T or Z")
            }

            return response
        } catch (e) {
            console.log(e)
            return null
        }



    }

    const createShop = async (uid, shopname, shopip, userid) => {

        console.log(uid)
        console.log(shopname)
        console.log(shopip)
        console.log(userid)

        const senddata = {
            Uid: uid,
            ShopName: shopname,
            ShopIp: shopip,
            UserUid: userid
        }

        console.log(senddata)
        console.log(senddata)
        console.log(senddata)

        const json_data = JSON.stringify(senddata)


        try {
            const res = await axios.post('http://127.0.0.1:8083/shop/create',
                senddata,
                {
                    headers: {
                        "Authorization": `Bearer ${admininfo.token}`,
                        'Content-Type': 'application/json',


                    }
                }
            )

            console.log(res)
            return res
        } catch (error) {
            return null
        }




    }

    const getShopList = async () => {

        try {
            const response = await axios.get('http://127.0.0.1:8083/shop/getAllShops',
                {
                    headers: {
                        "Authorization": `Bearer ${admininfo.token}`
                    }
                }
            )
            console.log(response.data)
            return response
        } catch (e) {
            console.log(e)
            return null
        }
    }


    const deleteByuseruid = async (useruid) => {
        try {
            const res = await axios.post('http://127.0.0.1:8083/shop/deleteShopByUserUid',
                {
                    UserUid: useruid
                },
                {
                    headers: {
                        "Authorization": `Bearer ${admininfo.token}`
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

    const updateByuseruid = async (obj) => {
        try {
            const res = await axios.post('http://127.0.0.1:8083/shop/updateShop',
                obj,
                {
                    headers: {
                        "Authorization": `Bearer ${admininfo.token}`
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

    return { getAllUsers, createShop, getShopList, deleteByuseruid, updateByuseruid }





})
