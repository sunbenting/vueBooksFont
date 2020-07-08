<template>
  <div class="home">
    <header-nav :background="false">
      <div class="search">
        <el-input
          placeholder="输入书籍名称搜索"
          v-model.trim="serachIpt"
          @change="searchBooks"
          style="color:#fff;"
        >
          <i
            slot="suffix"
            class="el-input__icon el-icon-search"
            style="cursor:pointer"
            @click="searchBooks"
          ></i>
        </el-input>
      </div>
      <i></i>
      <el-badge class="shop-car">
        <img src="../assets/images/shopping.png" alt width="80%" @click="jumpToOrder" />
        <span class="carnum" v-if="unddsl!=0">{{unddsl}}</span>
      </el-badge>
      <i></i>
    </header-nav>
    <main>
      <div class="carousel">
        <el-carousel trigger="click" height="300px">
          <el-carousel-item v-for="item in circleImgList" :key="item.id">
            <!-- <h3 class="small">{{ item }}</h3> -->
            <el-image :src="item.src" fit="fill" style="width:100%;height:100%;">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="side-nav">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane
            :label="item.classify"
            :name="item.id"
            v-for="item in classifyList"
            :key="item.id"
          >
            <el-row v-if="booksList.length!=0">
              <el-row :gutter="10" class="main-img" v-for="(op,index) in booksList" :key="index">
                <el-col :span="6" v-for="item in op" :key="item.SJID">
                  <el-card :body-style="{ padding: '0px' }" @click.native="jumpToDetail(item)">
                    <div
                      style="display: flex;
    align-items: center;
    justify-content: center;"
                    >
                      <el-image
                        :lazy="true"
                        style="cursor:pointer;width:150px;height:150px"
                        :src="item.FILE_STREAM"
                        fit="fill"
                      >
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                    </div>

                    <div style="padding: 12px;" class="book-title">
                      <h2>{{item.bookName}}</h2>
                      <div class="author">
                        <span>{{item.author}}</span>
                        <span>著</span>
                      </div>
                      <span>{{item.press}}出版社</span>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-row>
            <el-row v-else type="flex" justify="center">
              <el-col :span="12" class="emptyImg">
                <img src="../assets/images/empty.jpg" alt />
                <h2>没有该类别书籍，请切换书籍类别</h2>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>

      <!-- <div class="main-pagination"> -->
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="32"
        layout="total,->, prev, pager, next"
        :total="homeTotal"
      ></el-pagination>
      <!-- </div> -->
    </main>
    <footer-tip />
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import pic from '../assets/images/pic.png'
import piv from '../assets/images/piv.png'
import { getSjlb, getBookList, UserInfo } from '@/api/home'
import { getDdCount } from '@/api/order'
import { initRes, invalidProperty, getInfo } from '@/utils/jsfunc'
export default {
  name: 'Home',
  data() {
    return {
      serachIpt: '', //首页查询书名
      PCID: '',
      currentPage: 1,
      homeTotal: 0,
      activeName: '999',
      circleImgList: [
        { id: 1, src: pic },
        { id: 2, src: pic },
        { id: 3, src: pic },
        { id: 4, src: pic }
      ],
      classifyList: [],
      requestParams: {
        limit: 32,
        start: 0,
        LBID: null,
        ID: ''
      },
      booksList: [],
      unddsl:'',
      userId:''
    }
  },
  components: {
    'header-nav': Header,
    'footer-tip': Footer
  },
  created() {},
  mounted() {
    this.getpcidAsync()
  },
  methods: {
    //待提交订单数量
        async orderCountun() {
      let obj = {
        CJR: this.userId,
        PCID: this.PCID,
        FLAG: 0
      }
     
      const res = await getDdCount(obj)
       console.log('res :>> ', res);
      const str = res.slice(res.indexOf('DDCOUNT'), -2)
      const str1 = str.slice(str.indexOf(':') + 1)
      this.unddsl = Number(str1)
    },
    init() {
      this.getbooksCate()
    },
    async getpcidAsync() {
      const res = await UserInfo()
      const obj = getInfo(res)
      this.PCID = obj.ID;
      this.userId = obj.userId;
      this.requestParams.ID = obj.ID
      console.log('object :>> ', obj)
      this.init();
      this.orderCountun();
    },
    //查询事件
    searchBooks() {
      this.requestParams.SJMC = this.serachIpt
      delete this.requestParams.LBID
      this.activeName = '999'
      this.getBooksList()
    },
    async getbooksCate() {
      const res = await getSjlb()
      const { list, total } = initRes(res)
      let arr = list.map(item => {
        let obj = { id: item.LBID, classify: item.LBMC }
        return obj
      })
      arr.unshift({ id: '999', classify: '全部' })
      this.classifyList = arr
      console.log(' this.classifyList :>> ', this.classifyList)
      // this.requestParams.LBID = list[0].LBID;
      this.getBooksList()
    },

    chunk(array, size) {
      //获取数组的长度，如果你传入的不是数组，那么获取到的就是undefined
      const length = array.length
      //判断不是数组，或者size没有设置，size小于1，就返回空数组
      if (!length || !size || size < 1) {
        return []
      }
      //核心部分
      let index = 0 //用来表示切割元素的范围start
      let resIndex = 0 //用来递增表示输出数组的下标

      //根据length和size算出输出数组的长度，并且创建它。
      let result = new Array(Math.ceil(length / size))
      //进行循环
      while (index < length) {
        //循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
        result[resIndex++] = array.slice(index, (index += size))
      }
      //输出新数组
      return result
    },
    async getBooksList() {
      const paramsobj = invalidProperty(this.requestParams)
      let res = await getBookList(paramsobj)
      const { list, total } = initRes(res)
      let arr = list.map(item => {
        let obj = {
          SJID: item.SJID,
          bookName: item.SJMC,
          press: item.SJCBS,
          author: item.SJZZ,
          FILE_STREAM: `data:image/jpg;base64,${item.FILE_STREAM}`
        }
        return obj
      })
      let result = this.chunk(arr, 4)
      this.booksList = result
      this.homeTotal = Number(total)
    },
    handleClick(data) {
      if (data.name == '999') {
        this.booksList = []
        delete this.requestParams.LBID
        console.log('this.requestParams :>> ', this.requestParams)
      } else {
        this.requestParams.LBID = data.name
      }
      this.getBooksList()
      // console.log('data.name :>> ', data.name);
    },
    jumpToDetail(item) {
      console.log(item.SJID)
      this.$router.push({
        path: '/detail',
        query: { SJID: item.SJID, PCID: this.PCID ,userId:this.userId }
      })
    },
    jumpToOrder() {
      if (this.$router.currentRoute.name === 'order') return false
      this.$router.push({ path: 'order' })
    },
    //page事件
    handleSizeChange(val) {
      this.requestParams.limit = val
      this.getBooksList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.requestParams.start = (val - 1) * this.requestParams.limit
      this.getBooksList()
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .el-tabs__nav-scroll {
  display: flex;
  // justify-content: space-around;
}
.home {
  header {
    /deep/ .el-input__inner {
      height: 34px;
      background-color: transparent;
      border-radius: 20px;
      color: #fff;
    }
    /deep/ .el-input__icon {
      line-height: 34px;
    }
    /deep/ .el-badge__content {
      border: none;
    }
    /deep/ .el-badge__content.is-fixed {
      top: 3px;
      right: 16px;
    }

    .el-badge {
      cursor: pointer;
    }
    .shop-car {
      .carnum {
        width: 25px;
        height: 25px;
        // background: red;
        display: inline-block;
        position: absolute;
        border-radius: 50%;
        top: -10px;
        left: 12px;
        text-align: center;
      }
    }
    i {
      width: 1px;
      height: 10px;
      margin: 0 26px;
      background-color: #55b398;
      list-style: none;
    }
  }
}
main {
  .carousel {
    margin-top: 15px;

    /deep/ .el-carousel__button {
      width: 16px;
      height: 6px;
      opacity: 1;
    }
    /deep/ .el-carousel__indicator.is-active button {
      background-color: #d05151;
    }
  }

  .side-nav {
    margin-top: 20px;

    /deep/ .el-tabs__nav {
      padding: 0 8px;
    }
    /deep/ .el-tabs__item {
      padding: 0 44px;
      font-weight: 700;
    }
    /deep/ .el-tabs__item:hover {
      color: #0e946d;
    }
    // 选中项的样式
    /deep/ .el-tabs__item.is-active {
      color: #0e946d;
      font-size: 20px;
    }
    /deep/ .el-tabs__nav-wrap::after {
      background-color: #fff;
    }
    /deep/ .el-tabs__active-bar {
      width: 24px !important;
      left: 15px;
      background-color: #0e946d;
    }
    // 下面三个是导航条左右的箭头
    /deep/ .el-tabs__nav-next,
    /deep/ .el-tabs__nav-prev {
      color: #0e946d;
      font-size: 18px;
    }
    /deep/ .el-icon-arrow-left::before {
      content: '\e792';
    }
    /deep/ .el-icon-arrow-right::before {
      content: '\e791';
    }

    .main-img {
      margin-bottom: 10px;
      .el-card {
        border: none;
        background-color: #fafafa;
        box-shadow: none;
      }
      .book-title {
        text-align: center;

        :nth-child(3) {
          color: #999;
          font-size: 14px;
        }
      }
      h2 {
        height: 48px;
        overflow: hidden;
        font-size: 18px;
      }
      .author {
        display: flex;
        justify-content: center;
        padding: 6px 0 8px;
        color: #2a6fb5;

        span:first-child {
          min-width: 55px;
          max-width: 160px;
          overflow: hidden;
          text-overflow: ellipsis; //超出部分以省略号显示
          white-space: nowrap;
        }
        span:last-child {
          min-width: 26px;
        }
      }
    }
    .emptyImg {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }
  }

  .el-pagination {
    margin-top: 60px;
    /deep/ .el-pagination__total {
      margin-right: 2px;
    }
    span {
      color: #606266;
      font-size: 13px;
      font-weight: 400;
      letter-spacing: 2px;
    }
  }
}
</style>
