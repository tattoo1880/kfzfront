import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAdminTokenStore } from './admintoken'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import ApiUrl from '@/utils/ApiUrl'
export const useUserManageStore = defineStore('useusermanage', () => {

    const useadmintoken = useAdminTokenStore()
    const { admininfo, setInfo, getInfo, removeInfo } = useadmintoken;
    console.log(admininfo)

    const getAllUsers = async () => {
        try {
            const response = await axios.get(`${ApiUrl}/api/getalluser`,
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


    const addUser = async (uid, username, password, email, phone) => {
        try {
            const response = await axios.post(`${ApiUrl}/api/createuser`, {
                uid,
                username,
                password,
                email,
                phone
            }, {
                headers: {
                    "Authorization": `Bearer ${admininfo.token}`
                }

            }
            )
            return response
        } catch (e) {
            console.log(e)
            return null
        }
    }

    const updateUser = async (form) => {
        console.log(form)
        try {
            const res = await axios.post(`${ApiUrl}/api/updateuser`, form, {
                headers: {
                    "Authorization": `Bearer ${admininfo.token}`
                }
            })
            console.log(res)
            return res
        } catch (e) {
            console.log(e)
            return null
        }
    }


    const deleteUser = async (uid) => {
        console.log("????")
        console.log(uid)
        console.log("????")
        try {
            const res = await axios.post(`${ApiUrl}/api/deleteuser`, {
                uid: uid
            }, {
                headers: {
                    "Authorization": `Bearer ${admininfo.token}`
                }
            }
            )
            // console.log(res)
            ElMessage.success('删除成功')
            return res
        } catch (error) {
            // console.error(error);
            ElMessage.error('删除失败')

        }
    }

    return { getAllUsers, addUser, updateUser, deleteUser }





})
