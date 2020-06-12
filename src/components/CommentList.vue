<template>
<div>
    <ul>
    <li v-for="item in commentDataList" :key="item.id">
      <div class="title">
        <div class="info">
          <el-avatar size="small" :src="item.avatar"></el-avatar>
          <div class="name">{{item.name}}</div>
          <div class="creat-time">{{item.creatTime}}</div>
        </div>
        <div class="fabulous" @click="likesHandle(item.id, item.name)">({{item.fabulous}})</div>
      </div>
      <div class="content" style=" -webkit-box-orient: vertical;" @click="openModal(item.content)">{{item.content}}</div>
    </li>
    
  </ul>
  <el-dialog
  title="评论详情"
  :visible.sync="dialogVisible"
  width="40%"
 >
  <p>{{currentContent}}</p>
  <span slot="footer" class="dialog-footer">
   
  </span>
</el-dialog>
</div> 
</template>

<script>
export default {
  props: {
    commentDataList: {
      require: true,
      type: Array
    }
  },
  data(){return{
    dialogVisible:false,
    currentContent:''
  }},
  methods: {
    // 点击点赞按钮，发射事件，传递当前数据的相应参数
    likesHandle(id, name) {
      this.$emit('likes-change', { id, name })
    },
    openModal(content){
        this.dialogVisible=true;
        this.currentContent=content;
    }
  }
}
</script>

<style lang="less" scoped>
ul {
  li {
    margin-bottom: 24px;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 14px 0;

      .name {
        padding: 0 16px 0 10px;
        color: #5c5c5c;
        font-size: 18px;
        font-weight: 700;
      }
      .creat-time {
        height: 100%;
        padding-top: 6px;
        color: #bebebe;
        font-size: 12px;
      }
    }
    .fabulous {
      position: relative;
      padding-left: 16px;
      color: #9f9f9f;
      font-size: 14px;
      cursor: pointer;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        width: 12px;
        height: 12px;
        background: url('../assets/images/point.png') no-repeat;
        transform: translateY(-50%);
      }
    }

    .content {
      padding: 10px 16px;
      background-color: #fafafa;
      color: #818181;
      font-size: 14px;
      height: 59px;
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      cursor: pointer;
    }
  }
}
</style>
