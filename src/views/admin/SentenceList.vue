<template>
    <div class="container">
        <Table- 
            :columns="columns"
            :api="api"
            :idPara="idPara"
            />
    </div>
</template>
<script>
import { defineComponent, toRef } from 'vue';


export default defineComponent({
    props: ['id'],
    setup(props) {
        console.log("id:  ",props.id)
        const idPara = toRef(props, 'id')
        console.log(idPara)
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
        const api = `api/v1/admin/paragraph_list/${props.id}/sentence_list`;
        

        return {
            columns,
            api,
            idPara
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
  

   <!-- Trong Vue component -->
<!-- <template>
    <div>
      <span @click="speakText">🔊</span>
      <p>{{ textToSpeak }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        textToSpeak: "nam dẹp trai vai ò",
      };
    },
    methods: {
      speakText() {
        const msg = new SpeechSynthesisUtterance();
        msg.text = this.textToSpeak;
        msg.lang = 'vi'
  
        // Kích hoạt tổng hợp giọng nói
        window.speechSynthesis.speak(msg);
      },
    },
  };
  </script> -->
  