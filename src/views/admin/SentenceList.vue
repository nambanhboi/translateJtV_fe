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
                colspan: 1,
            },
            {
                title: 'Tiếng nhật',
                name: 'sentenceJV',
                colspan: 4,
            },
            {
                title: 'Tiếng việt',
                name: 'sentenceVN',
                colspan: 4,
            },
            {
                title: 'Phong cách',
                name: 'style',
                colspan: 4,
            },
            {
                title: 'Chủ đề',
                name: 'topic',
                colspan: 4,
            },
            {
                title: 'Ảnh',
                name: 'image',
                colspan: 4,
                type: 'file',
            },
            {
                title: 'Đoạn',
                name: 'paragraph',
                colspan: 4,
            },
        ];
        const api = 'api/v1/admin/sentence_list';
        

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
  