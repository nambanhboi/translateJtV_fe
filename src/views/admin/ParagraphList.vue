<template>
    <div class="container">
        <Table- 
            :columns="columns"
            :api="api"
            />
    </div>
</template>
<script>
import { defineComponent } from 'vue';


export default defineComponent({
    data() {
        
    },
    setup() {
        const columns = [
            {
                title: 'id',
                name: 'id',
                colspan: 1
            },
            {
                title: 'Tên đoạn',
                name: 'name',
                colspan: 4
            },
        ];
        const api = 'api/v1/admin/paragraph_list';
        

        return {
            columns,
            api,
            
        }

    },
    mounted() {
        
    }
});
</script>
<style>
.container {
    
}
</style>
  