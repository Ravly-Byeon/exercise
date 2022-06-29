<template>
  <v-container>
    <v-row>
      <v-col
        cols="3"

      >
        <h5>카테고리</h5>
      </v-col>
      <v-col
        cols="9"
      >
        <v-select
            v-model="category"
            :items="categories"
            label="Category"
            required
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="3"

      >
        <h5>제목</h5>
      </v-col>
      <v-col
        cols="9"
      >
        <v-text-field
            v-model="title"
            label="Title"
            required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="3"
      >
        <h5>가격</h5>
      </v-col>
      <v-col
        cols="9"
      >
        <v-text-field
            v-model="price"
            type="number"
            label="Price"
            required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"

      >
        <v-textarea
            v-model="content"
            outlined
            name="input-7-4"
            label="Contents"
            no-resize
            height="400px"
            required
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
      >
        <v-file-input
            v-model="files"
            chips
            truncate-length="15"
            multiple
            @change="fileSelect"
        ></v-file-input>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="6"
        align="right"
      >
        <v-btn
            depressed
            color="primary"
            @click="submit"
        >
          SUBMIT
        </v-btn>
      </v-col>
      <v-col
        cols="6"
        align="left"
      >
        <v-btn
            depressed
            color="error"
        >
          CANCLE
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        >
        <div>
          <img
            :url="images"/>
        </div>
        <hr/>
        <div :style="`background-image: url(${images})`">

        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component({})
export default class BoardWrite extends Vue{
  categories: any[] = [];
  category='';
  title='';
  price=0;
  content='';
  files:File[] = [];
  uploadFiles: any[] = [];
  images='';
  imageBackgr='';

  created(){
    this.categorySet();
  }

  async categorySet(){
    this.categories = [];
    console.log('cate')
    const {data} = await this.axios.get('/category');
    console.log(data, data.length);
    data.forEach((e: any,i: number) =>{
      this.categories.push(e.name);
    });
    console.log(this.categories);
  }

  async submit(){
    console.log('submit');
    await this.uploadFile();

    console.log(this.uploadFiles);

    const { data } = await this.axios.post('/boards', {
      _id_user: this.$store.state.login.userId,
      category: this.category,
      title: this.title,
      price: Number(this.price),
      content: this.content,
      fileList: this.uploadFiles,
    });
    console.log(data);
  }

  async uploadFile(){
    const userId = this.$store.state.login.userId;
    const type = 'boards'

    let formData: FormData = new FormData();
    this.files.forEach((file)=>{
      formData.append('fileList',file);
    });
    const { data } = await this.axios.post(`/upload/${type}/${userId}`, formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    console.log(data,'filee');
    this.uploadFiles = [];
    data.forEach((item: any)=>{
      this.uploadFiles.push(item);
    })
    this.images = `${data[0].savedPath.replace('/', '\\')}`;
    this.files = [];
  }





  fileSelect(){
    console.log(this.files);
  }
}
</script>