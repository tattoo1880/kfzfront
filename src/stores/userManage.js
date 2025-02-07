import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAdminTokenStore } from './admintoken'
import axios from 'axios'

export const useUserManageStore = defineStore('useusermanage', () => {

    const useadmintoken = useAdminTokenStore()
    const { admininfo, setInfo, getInfo, removeInfo } = useadmintoken;
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
            return response
        } catch (e) {
            console.log(e)
            return null
        }



    }


    const addUser = async (uid, username, password, email, phone) => {
        try {
            const response = await axios.post('http://127.0.0.1:8083/api/createuser', {
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
            const res = await axios.post('http://127.0.0.1:8083/api/updateuser', form, {
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

    return { getAllUsers, addUser, updateUser }





})
