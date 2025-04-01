<template>
    <!-- <el-row class="row-bg" justify="end" style="margin-right: 20px">
        <el-affix position="top" :offset="120">
            <el-button
                type="primary"
                plain
                :disabled="items.length === 0"
                @click="savaselect"
                >添加至我的上传任务</el-button
            >
        </el-affix>
    </el-row> -->

    <el-row class="bg-row" justify="center">
        <el-text>
            <h2 style="color: #409eff">寻找货源</h2>
        </el-text>
    </el-row>

    <!-- <el-row class="row-bg" justify="space-evenly" style="width: 100vw">
        <div class="mt-4">
            <el-input
                v-model="kw"
                style="max-width: 1600px; width: 800px"
                placeholder="请输入单独查询item 的书店名"
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
</el-row> -->
    <el-row class="row-bg" justify="space-evenly" style="width: 100vw">
        <div class="mt-4">
            <el-input v-model="kw2" style="max-width: 1600px; width: 800px" placeholder="请输入整体上传的店铺名，多店铺名以-分隔"
                class="input-with-select">
                <template #append>
                    <el-button @click="handlesearch2">
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
            <el-table :data="tabledata" ref="multipleTableRef" style="width: 100%; height: 70vh" align="center"
                @selection-change="handleSelectionChange">
                <!-- 单选 -->
                <el-table-column type="selection" :selectable="selectable" width="55" align="center"></el-table-column>
                <el-table-column type="index" label="序号" width="100" align="center">
                    <template v-slot="scope">
                        <el-tag type="success">{{ scope.$index + 1 }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="ID" width="100" align="center">
                    <template v-slot="{ row }">
                        <el-tag type="success">{{ row.uid }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="书名" width="550" align="center">
                    <template v-slot="{ row }">
                        <el-tag type="success">{{ row.goodName }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="imgBig" label="图片" width="100" align="center">
                    <template v-slot="{ row }">
                        <el-image style="width: 100px; height: 100px" :src="row.img"></el-image>
                    </template>
                </el-table-column>

                <el-table-column prop="authorname" label="描述" width="520" align="center">
                    <template v-slot="{ row }">
                        <el-tag type="success">{{ row.description }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="price" label="价格" width="100" align="center">
                    <template v-slot="{ row }">
                        <el-tag type="success">{{ row.price }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="quality" label="品相" width="100" align="center">
                    <template v-slot="{ row }">
                        <el-tag type="success">{{ row.quantity }}</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
    <!-- <el-row class="row-bg" justify="center">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="totalnum"
        />
    </el-row> -->
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { myfectch } from "@/utils/Myfetch";
import { useTokenStore } from "@/stores/token";
import { useTaskStore } from "@/stores/task";
import { ElLoading, ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter();

const { getToken } = useTokenStore();

const jwt = getToken();
console.log("=========");
console.log(jwt);
console.log("=========");
const mytaskstatus = ref(false);
// 分页

const handleSizeChange = (val) => {
    console.log(`每页 ${val} 条`);
};

const handleCurrentChange = async (val) => {
    console.log(`当前页: ${val}`);

    tabledata.value = alldata.value.slice((val - 1) * 10, val * 10);
};

const kw = ref("");

const totalnum = ref(0);

const tabledata = ref([]);

const handlesearch = async () => {
    console.log(kw.value);
    try {
        console.log(myfectch.defaults.headers);

        const res = await myfectch.post(
            "/api/newgetallinfo",
            {
                shopid: kw.value,
            },
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );
        console.log(res.data);
        tabledata.value = res.data.slice(0, 30);
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

const items = ref([]);

//todo select
const selectable = (row, index) => {
    // console.log(row, index);
    return row.index != 0;
};
const handleSelectionChange = (val) => {
    items.value = [...val];
    console.log(items.value);
    console.log(items.value.length);
};

const savaselect = () => {
    console.log(items.value);
    items.value.forEach((item) => {
        const itemid = item.itemId;
        const title = item.itemName + " -- " + "作者：" + item.author;
        const price = item.price;
        const img = item.imgBig;
        const desc =
            "作者：" +
            item.author +
            " " +
            "出版社日期：" +
            item.pubDate +
            " " +
            "isbn:" +
            item.isbn +
            " " +
            "Id: " +
            item.pcUrl.split(".com")[1];
        const quantity = item.quality;
        useTaskStore().setSingleBook(itemid, title, price, img, desc, quantity);
    });
};

const kw2 = ref("");

const getonepage = async (shopid, page) => {
    const result = [];
    try {
        const res = await myfectch.post(
            "/api/getallinfo",
            {
                shopid: shopid,
                page: page,
            },
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
                timeout: 10000000,
            }
        );
        console.log(res.data);
        result.push(...res.data);
    } catch (error) {
        console.error(error);
    }
    //!等待2秒
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return result;
};
const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
};
const getallpage = async (shopid) => {
    // let resultlist = [];
    const res = await getonepage(shopid, 1);
    const totalnum = res[0].totalPageNum;
    //! 将totalnum 除以2 取整
    const totalnum2 = Math.floor(totalnum / 2);
    // console.log(totalnum2);
    // resultlist.push(...res);

    for (let item of res) {
        const itemid = item.itemid;
        const title = item.title;
        const price = item.price;
        const img = item.img;
        const desc =
            item.author +
            " " +
            item.publisher +
            " " +
            item.isbn +
            " " +
            item.pinxiang;
        const quantity = 0;
        useTaskStore().setSingleBook(itemid, title, price, img, desc, quantity);
    }

    if (totalnum2 > 1) {
        const pages = Array.from({ length: totalnum2 - 1 }, (_, i) => i + 2); // 生成页码数组
        console.log(pages);
        const chunkedPages = chunkArray(pages, 5); // 将页码数组切分成每组15个

        for (const chunk of chunkedPages) {
            const promises = chunk.map((page) => getonepage(shopid, page)); // 创建请求 Promise 数组
            const results = await Promise.all(promises); // 并发执行请求
            for (const pageResults of results) {
                // 遍历每个页面的结果
                // resultlist.push(...pageResults); // 展开单个页面的结果
                // ! 遍历每个页面的结果存入数据库
                for (const item of pageResults) {
                    const itemid = item.itemid;
                    const title = item.title;
                    const price = item.price;
                    const img = item.img;
                    const desc =
                        item.author +
                        " " +
                        item.publisher +
                        " " +
                        item.isbn +
                        " " +
                        item.pinxiang;
                    const quantity = 0;
                    useTaskStore().setSingleBook(
                        itemid,
                        title,
                        price,
                        img,
                        desc,
                        quantity
                    );
                }
            }
        }
    }

    // return resultlist;
};

const handlesearch2 = async () => {
    let list1 = [];
    const eloading = ElLoading.service({
        lock: true,
        text: "正在获取数据",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
    });

    if (kw2.value === "") {
        return;
    } else if (kw2.value.includes("-")) {
        list1 = kw2.value.split("-");
    } else {
        list1.push(kw2.value);
    }

    try {
        for (let item of list1) {
            //const res = await getallpage(item);
            const res = await newgetallinfo(item);
            totalnum.value = res.length / 10;
            alldata.value = res;
            tabledata.value = alldata.value.slice(0, 30);
            eloading.close();
        }
        router.push({ name: "Task" });
    } catch (error) {
        ElMessage.error("获取数据失败");
        eloading.close();
    } finally {
        eloading.close();
    }
};
const alldata = ref([]);

const newgetallinfo = async (kw) => {
    try {
        const res = await myfectch.post(
            "/api/newgetallinfo",
            {
                shopid: kw,
                uid: useTokenStore().getInfo().uid,
            },
            {
                timeout: 1000000,
            }
        );
        console.log(res);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
</script>

<style lang="less" scoped></style>
