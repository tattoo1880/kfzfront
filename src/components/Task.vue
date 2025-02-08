<template>


    <el-row class='row-bg' justify='start'>
        <el-text>
            <h2 style="color: #409eff">我的任务</h2>
        </el-text>
    </el-row>

    <el-row class='row-bg' justify='center'>
        <el-col :span='24'>
            <el-table :data='tabledata' style='width: 100%; height: 70vh' align='center'>
                <el-table-column prop='id' label='ID' width='100' align='center'>
                    <template v-slot='{ row }'>
                        <el-tag type='success'>{{ row.uid }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop='title' label='书名' width='150' align='center'>
                    <template v-slot='{ row }'>
                        <el-tag type='success'>{{ row.goodName }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop='imgBigUrl' label='图片' width='100' align='center'>
                    <template v-slot='{ row }'>
                        <el-image style='width: 100px; height: 100px' :src='row.img'></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop='authorname' label='价格' width='120' align='center'>
                    <template v-slot='{ row }'>
                        <el-tag type='success'>{{ row.price }}</el-tag>
                    </template>
                </el-table-column>
                <!-- 库存 -->
                <el-table-column prop='stock' label='库存' width='100' align='center'>
                    <template v-slot='{ row }'>
                        <el-tag type='success'>{{ row.quantity }}</el-tag>
                    </template>
                </el-table-column>
                <!-- 是否已经上传 -->
                <el-table-column prop='isUpload' label='是否已经上传' width='200' align='center'>
                    <template v-slot='{ row }'>
                        <el-tag v-if="!row.isOnSale" type='danger'>未上传</el-tag>
                        <el-tag v-else type='success'>已上传</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop='description' label='描述' width='400' align='center'>
                    <template v-slot='{ row }'>
                        <el-tag type='success'>{{ row.description }}</el-tag>
                    </template>
                </el-table-column>
                <!-- 操作 上传 -->
                <el-table-column label='操作' width='200' align='center'>
                    <template v-slot='{ row }'>
                        <el-button v-if="!row.isOnSale" type='primary' @click='handleUpload(row)'>上传</el-button>
                        <el-button v-else type='danger' @click='handleDelete(row)'>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>

</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import { useTaskStore } from '@/stores/task';
const tabledata = ref([])


onMounted(async () => {

    const res = await useTaskStore().getTaskByUid()
    tabledata.value = res.data
    console.log(res.data)
})


const handleUpload = async (row) => {
    console.log(row)

    const res = await useTaskStore().upLoad(row)

}

const handleDelete = async (row) => {
    console.log(row)
}




</script>

<style lang='less' scoped></style>