<template>
    <button class="btn primary"
        data-bs-toggle="modal" 
        data-bs-target="#exampleModal"
        @click="handleAdd"
    >Thêm mới</button>
    <table class="table">
        <thead>
            <tr>
                <th>STT</th>
                <th scope="col" 
                    v-for="(col, index) in columns"
                    :key="index"
                    :colspan="col.colspan"
                >
                    {{ col.title }}
                </th>
                <th>Tác vụ</th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(row, indexRow) in resGetDataAll"
                :key="indexRow"
            >
                <th scope="row">{{ indexRow }}</th>
                <td
                    v-for="(col, indexCol) in columns"
                    :key="indexCol"
                    :colspan="col.colspan"
                >
                    <template v-if="col?.type==='file'">
                        <img :src="row[col.name]" />
                    </template>
                    <template v-else-if="col.name=='name'">
                        <router-link :to="{name:'sentence_list', params: { id: row['id']}}">
                            {{ row[col.name] }}
                        </router-link>
                    </template>
                    <template v-else>
                        {{ row[col.name] }}
                    </template>
                </td>
                <td>
                    <i class="fa-regular fa-pen-to-square"
                        data-bs-toggle="modal" 
                        data-bs-target="#exampleModal"
                        @click="handleEdit(row.id)"
                    ></i>
                    <i class="fa-regular fa-trash-can"
                        @click="handleDelete(row.id)"
                    ></i>
                </td>
            </tr>
        </tbody>
    </table>

    <!-- Modal -->
    <div class="modal fixed fade modal-dialog modal-dialog-centered" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <Modal-
            :resGetDataById="resGetDataById"
            :columns="columns"
            :formState="formState"
            :api="api"
            :action="action"
            @save="handleSave"
        />
    </div>

</template>
<script>
import { defineComponent, reactive, ref } from 'vue';
import axios from 'axios';
export default defineComponent({
    name: 'Table-',
    props: ['columns', 'api', 'idPara'],
    setup(props) {
        const resGetDataAll = ref([]);
        const resGetDataById = ref({});
        const formState = reactive({});
        const action = ref('PUT')

        console.log(props.columns)
        const getData = async () => {
            await axios.get(props.api)
            .then(res => {          
                resGetDataAll.value = res.data;
                console.log('1',resGetDataAll.value)
            })
            .catch(err => {
                console.log(err)
            })
        }
        const handleEdit = (i) => {
            getDataById(i);
            action.value = 'PUT'
        }

        const handleAdd = () => {
            const col = props.columns.map(x => x.name)
            console.log("coll: ", col)
            const [id, ...result] = col;
            console.log(id)
            console.log("result: ", result)
            for(let i in result) {
                formState[result[i]] = ""
            }
            if(props.idPara !== undefined) {
                formState['paragraph'] = props.idPara
            }
            action.value = 'POST'
            console.log("newformState: ", formState);
        }

        const handleDelete = async (id) => {
            if(confirm("ban co muon xoa khong?")) {               
                await axios.delete(`${props.api}/${id}/`)
                .then(res => {
                    console.log(res.data)
                    getData();
                })
                .catch(err => {
                    console.log(err)
                })
            }
        }

        const getDataById = async (id) => {
            await axios.get(`${props.api}/${id}/`)
            .then(res => {
                console.log(res.data)
                
                const {id, ...result} = res.data;
                //sao lưu ra biến form state để phân biệt edit và add
                for(let i in result) {
                    console.log(result[i])
                    formState[i] = result[i]


                }
                console.log(id);
                resGetDataById.value = res.data;
            })
            .catch(err => {
                console.log(err)
            })
        }

        const handleSave = async () => {
            console.log('run..');
            getData();
        }

        return {
            getData,
            resGetDataAll,
            handleEdit,
            getDataById,
            resGetDataById,
            formState,
            handleSave,
            handleAdd,
            action,
            handleDelete,
            
        }
    },
    mounted() {
        this.getData();
    }
    
})
</script>
<style scoped>
    i {
        margin-right: 4px;
        padding: 0 4px;
    }
    i:hover {
        cursor: pointer;
        opacity: 0.7;
    }
    img {
        height: 20px;
        width: 40px;
    }
</style>