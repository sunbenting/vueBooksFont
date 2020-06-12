<template>
  <header>
    <div class="title">
      <div class="logo">
        <img class="logo-img" src="../assets/images/logo.png" alt height="50%" />
        <span  @click="jumpToHome" style="cursor:pointer;">{{pcInfo.PCMC}}</span>
       
      </div>
      <div class="tools">
        <div class="cover">
          <slot />
        </div>
        <div class="user">
          <img src="../assets/images/user.png" alt height="45%" />
          <span>{{pcInfo.userName}}</span>
        </div>
      </div>
    </div>
    <div class="background" v-if="background"><img :src="banner" alt=""></div>
  </header>
</template>

<script>
import bus from '@/utils/bus'
import banner from "@/assets/images/banner2.jpg";
import {UserInfo} from '@/api/home'
import { getInfo } from '@/utils/jsfunc'
export default {
  props: {
    background: {
      type: Boolean,
      default: true
    }
  },
    data(){
    return{
      banner,
      ID:'',
       pcInfo:{}
    }
  },
  mounted(){
    this.$store.dispatch('getpcidAsync');
    this.getUser();
  },
  beforeDestroy () {
  bus.$off("pcid");
},
  methods: {
      async getUser(){
      const res=await UserInfo();
      const obj=getInfo(res);
      this.pcInfo = obj;
      this.ID=obj.ID;
       bus.$emit('pcid', obj.ID);
    },
    jumpToHome() {
      if (this.$router.currentRoute.name === 'home') return false
      this.$router.push({ path: '/' })
    }
    
  }
}
</script>

<style lang="less" scoped>
header {
  width: 100%;
  background-color: #0e946d;
}
.title {
  display: flex;
  align-items: center;
  width:100%;
  height: 50px;
  margin: 0 auto;
  color: #fff;

  .logo {
    flex: 1;
    display: flex;
    align-items: center;
    height: 100%;
    .logo-img {
      margin: 0 10px 0 30px;
    }
  }

  .tools {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    .cover {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .user {
      display: flex;
      align-items: center;
      height: 100%;
      font-size: 14px;
      cursor: pointer;

      span {
        padding: 0 30px 0 10px;
      }
    }
  }

  // .logo,
  // .logo-title {
  //   position: absolute;
  //   top: 50%;
  //   transform: translateY(-50%);
  //   // height: 100%;
  // }
  // .logo {
  //   left: 30px;
  // }
  // .logo-title {
  //   left: 60px;
  // }
}
.background {
    width: 100%;
    height: 130px;
    overflow: hidden;
    display: flex;
    align-items: center;
    img{
      width: 100%;
      height: auto;
    }
}
</style>
