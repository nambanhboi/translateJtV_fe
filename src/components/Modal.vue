<template>
    <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Chi tiết</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                    ref="closeModal"
                ></button>
            </div>
            <form action="" enctype="multipart/form-data">
                <div class="modal-body">
                    <div class="input-group"
                        v-for="(key, index) in Object.keys(formStates)"
                        :key="key"
                    >
                        <span class="input-group-text">{{ newColumns[index]["title"] }}</span>
                        <template v-if="newColumns[index]?.['type'] === 'file'">
                            <input type="file" 
                                @change="handleInputfileChange($event)"
                                ref="fileInput" 
                                name="image"   
                            >
                        </template>
                        <template v-else>
                            <input type="'text" aria-label="First name" class="form-control"
                                v-model="formStates[key]"
                            >
                        </template>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary"
                        @click="handleSave"
                    >Save changes</button>
                </div>
            </form>
            </div>
        </div>
</template>
<script>
import { toRef, ref } from 'vue';
import axios from 'axios';

export default {
    name:"Modal-",
    props: ["resGetDataById", "columns", 'formState', 'api', 'action'],
    setup(props, { emit }) {
        const newColumns = ref([]);
        const columnsRef = toRef(props, "columns");
        const formStates = toRef(props, "formState");
        const closeModal = ref(null);

        const [id, ...result] = columnsRef.value;
        newColumns.value = result;
        console.log(id, result);
        console.log("1.new column: ",newColumns.value);
        console.log("2.formStae: ",formStates.value);

        const handleInputfileChange = (event) => {
            const file = event.target.files[0];
            console.log("")
            formStates.value['image'] = file;
            console.log(formStates.value['image'])
        }
        const setDefaultFileValue = () => {
        // Đặt giá trị mặc định cho trường file
            const defaultFileValue = formStates.value['image'];
            console.log(defaultFileValue)
            //this.$refs.fileInput.value = defaultFileValue;
        }

        
        const handleSave = async () => {
            //const data = formStates.value

            //test
            const formData = new FormData();
            for (const key in formStates.value) {
                if (formStates.value[key] instanceof File) {
                    formData.append("image", formStates.value['image']);
                }
                else {
                    formData.append(key, formStates.value[key]);
                }
            }
            
            console.log("form dât: ", formData)
            const urls = props.action === 'PUT' ? `${props.api}/${props.resGetDataById["id"]}/` : `${props.api}/`
            await axios({
                method: props.action,
                url: urls,
                //data
                //test
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                console.log(res)
                emit('save')
                closeModal.value.click();
            })
            .catch(err => {
                console.log(err)
            })
        }

        return {
            columnsRef,
            newColumns,
            formStates,
            handleSave,
            closeModal,
            handleInputfileChange,
            setDefaultFileValue
        }
    },
    mounted() {
        console.log(this.columns)
        this.setDefaultFileValue();
    }
}
</script>