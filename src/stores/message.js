import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useTokenStore } from './token'
import ApiUrl from '@/utils/ApiUrl'
import GoGinApiUrl from '@/utils/GoGinApiUrl'
import { ElLoading, ElMessage } from 'element-plus'
export const useMessageStore = defineStore('usemessage', () => {

    const messageList = ref([])

    const fillMessageList = (data) => {
        messageList.value = data
    }

    const gettheMessageList = () => {
        return messageList.value
    }



    const getallmessagebyuserid = async () => {

        const jwt = useTokenStore().getToken()
        console.log(jwt)

        const uid = useTokenStore().getInfo().uid ?? null
        console.log("获取消息列表，用户ID:", uid)
        if (!uid) {
            console.log("⚠️ 无法获取消息列表，用户ID不存在");
            ElMessage.error("无法获取消息列表，用户ID不存在");
            return;
        }

        try {
            const res = await axios.post(`${GoGinApiUrl}/message/getbyuserid`, {
                userid: uid
            })

            console.log("获取消息列表成功:", res.data);
            console.log("获取消息列表成功:", res.data);
            console.log("获取消息列表成功:", res.data);
            console.log("获取消息列表成功:", res.data);
            console.log("获取消息列表成功:", res.data);
            console.log("获取消息列表成功:", res.data);
            console.log("获取消息列表成功:", res.data);
            console.log("获取消息列表成功:", res.data);


            if (res.data.messages && res.data.messages.length > 0) {
                ElMessage.success("消息列表获取成功")
                fillMessageList(res.data.messages)
                //! 刷新页面
                window.location.reload()
            } else {
                ElMessage.info("暂无消息")
            }


        } catch (error) {

            console.log("获取消息列表失败:", error);

        }

    }

    const deleteMessage = async (id) => {
        console.log("🗑️ 删除消息，ID:", id);
        // 这里可以添加实际的删除逻辑，例如调用API删除消息


        try {
            const res = await axios.post(`${GoGinApiUrl}/message/delete`, {
                messageid: id
            })
            console.log("消息删除成功:", res.data);

            console.log("消息删除成功:", res);
            console.log("消息删除成功:", res);

            if (res.data.message === "消息已删除") {
                ElMessage.success("消息删除成功");

                await getallmessagebyuserid()
                window.location.reload()
            }
        } catch (error) {
            console.log("消息删除失败:", error);
        }



    }

    const markAsRead = async (id) => {
        console.log("✅ 标记消息已读，ID:", id);
        // 这里可以添加实际的标记已读逻辑，例如调用API更新消息状态

        try {
            const res = await axios.post(`${GoGinApiUrl}/message/markasread`, {
                messageid: id
            })
            console.log("消息标记为已读成功:", res.data);
            if (res.data.message === "消息已标记为已读") {
                ElMessage.success("消息已标记为已读");

                await getallmessagebyuserid()
            }
        }

        catch (error) {
            console.log(error)

        }

    }

    const clearMessages = async (data) => {

        const uid = useTokenStore().getInfo().uid ?? null
        console.log("清空消息列表，用户ID:", uid)
        if (!uid) {
            console.log("⚠️ 无法清空消息列表，用户ID不存在");
            ElMessage.error("无法清空消息列表，用户ID不存在");
            return;
        }

        try {
            const res = await axios.post(`${GoGinApiUrl}/message/clearbyuserid`, {
                userid: uid
            })
            console.log("消息列表清空成功:", res.data);
            if (res.data.message === "用户的消息已清空") {
                ElMessage.success("用户的消息已清空");

                await getallmessagebyuserid()
                window.location.reload()
            }
        } catch (error) {
            console.log("消息列表清空失败:", error);
        }

    }



    return { messageList, fillMessageList, gettheMessageList, getallmessagebyuserid, deleteMessage, markAsRead, clearMessages }
}, {
    persist: true,
}
)
