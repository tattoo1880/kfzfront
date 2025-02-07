<template>
    <el-row class="bg-row" justify="center">
        <el-text>
            <h2 style="color: #409eff">寻找货源</h2>
        </el-text>
    </el-row>

    <el-row class="row-bg" justify="space-evenly" style="width: 100vw">
        <div class="mt-4">
            <el-input
                v-model="kw"
                style="max-width: 1600px; width: 800px"
                placeholder="Please input"
                class="input-with-select"
            >
                <template #append>
                    <el-button @click="handlesearch">
                        <el-icon>
                            <Search />
                        </el-icon>
                    </el-button>
                </template>
            </el-input>
        </div>
    </el-row>

    <el-row class="row-bg" justify="center">
        <el-col :span="24">
            <el-table
                :data="tabledata"
                style="width: 100%; height: 70vh"
                align="center"
            >
                <el-table-column
                    prop="id"
                    label="ID"
                    width="100"
                    align="center"
                >
                    <template v-slot="{ row }">
                        <el-tag type="success">{{ row.itemid }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="title"
                    label="书名"
                    width="150"
                    align="center"
                >
                    <template v-slot="{ row }">
                        <el-tag type="success">{{ row.title }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="imgBigUrl"
                    label="图片"
                    width="100"
                    align="center"
                >
                    <template v-slot="{ row }">
                        <el-image
                            style="width: 100px; height: 100px"
                            :src="row.img"
                        ></el-image>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="authorname"
                    label="作者"
                    width="120"
                    align="center"
                >
                    <template v-slot="{ row }">
                        <el-tag type="success">{{ row.author }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="price"
                    label="价格"
                    width="100"
                    align="center"
                >
                    <template v-slot="{ row }">
                        <el-tag type="success">{{ row.price }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="quality"
                    label="品相"
                    width="60"
                    align="center"
                >
                    <template v-slot="{ row }">
                        <el-tag type="success">{{ row.pinxiang }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="press"
                    label="出版社"
                    width="200"
                    align="center"
                >
                    <template v-slot="{ row }">
                        <el-tag type="success">{{ row.publisher }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="pubDateText"
                    label="isbn"
                    width="100"
                    align="center"
                >
                    <template v-slot="{ row }">
                        <el-tag type="success">{{ row.isbn }}</el-tag>
                    </template>
                </el-table-column>

                <!-- <el-table-column prop="shopAreaText" label="店铺地区" width="100" align="center">
                    <template v-slot="{ row }">
                        <el-tag type="success">{{ row.shopAreaText }}</el-tag>
                    </template>
                </el-table-column> -->

                <el-table-column
                    prop="link"
                    label="链接"
                    width="400"
                    align="center"
                >
                    <template v-slot="{ row }">
                        <el-link :href="row.link" target="_blank">{{
                            row.link
                        }}</el-link>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
    <el-row class="row-bg" justify="center">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="totalnum"
        />
    </el-row>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { myfectch } from "@/utils/Myfetch";
import { useTokenStore } from "@/stores/token";
const { getToken } = useTokenStore();

const jwt = getToken();
console.log("=========");
console.log(jwt);
console.log("=========");

// 分页

const handleSizeChange = (val) => {
    console.log(`每页 ${val} 条`);
};

const handleCurrentChange = async (val) => {
    console.log(`当前页: ${val}`);

    try {
        const res = await myfectch.post(
            "/api/getallinfo",
            {
                shopid: kw.value,
                page: val,
            },
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );
        console.log(res.data);
        tabledata.value = res.data;
    } catch (error) {
        console.error(error);
    }
};

const kw = ref("");

const totalnum = ref(0);

const tabledata = ref([]);

const handlesearch = async () => {
    console.log(kw.value);
    try {
        console.log(myfectch.defaults.headers);

        const res = await myfectch.post(
            "/api/getallinfo",
            {
                shopid: kw.value,
                page: 1,
            },
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );
        console.log(res.data);
        tabledata.value = res.data;
        totalnum.value = res.data[0].totalPageNum;
        // let myobj = JSON.parse(res.data);
        // console.log(myobj);
        // const mylist = myobj.data.itemResponse.list
        // console.log(mylist);
        // tabledata.value = mylist.map((item) => {
        //     return {
        //         id: item.itemId,
        //         authorname: item.author,
        //         price: item.priceText,
        //         quality: item.quality,
        //         press: item.press,
        //         pubDateText: item.pubDateText,
        //         shopAreaText: item.shopAreaText,
        //         imgBigUrl: item.imgBigUrl,
        //         link: item.link.pc,
        //         title: item.title
        //     };
        // });
        // console.log(tabledata.value);
    } catch (error) {
        console.error(error);
    }
};
</script>

<style lang="less" scoped></style>
