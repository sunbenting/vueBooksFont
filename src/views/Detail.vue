<template>
  <div class="detail">
    <header-nav :background="true">
      <el-badge class="shop-car">
        <img src="../assets/images/shopping.png" alt width="80%" @click="jumpToOrder" />
        <span class="carnum" v-if="unddsl!=0">{{unddsl}}</span>
      </el-badge>
      <i class="detail-i"></i>
    </header-nav>
    <main>
      <div class="main-title">
        <!-- <div class="book-img"> -->
        <!-- <img :src="rowimg" alt=""> -->
        <el-image
          class="book-img"
          :src="`data:image/jpg;base64,${rowContent.FILE_STREAM}`"
          fit="cover"
        ></el-image>
        <!-- </div> -->
        <div class="book-introduce">
          <div class="title">
            {{rowContent.SJMC}}
            <span>{{rowContent.LBMC}}</span>
          </div>
          <div class="author">
            <span>{{rowContent.SJZZ}}</span>
            <span>著</span>
            <i></i>
            <span>{{rowContent.SJCBS}}出版社</span>
          </div>
          <div class="number">
            预定数量
            <el-input-number v-model="orderNum" :min="1" :max="10" label="描述文字"></el-input-number>
          </div>
          <div class="orderadd">
            <el-button style="width:100px;" @click="addToOrder">加入书架</el-button>
            <el-button style="width:100px;" @click="addcomment">评价</el-button>
          </div>
        </div>
      </div>
      <el-dialog title="评论" :visible.sync="commentdilog" width="40%" :closeOnClickModal="false">
        <el-input type="textarea" v-model="textareaipt" placeholder="请填写评论"></el-input>
        <span slot="footer">
          <el-button type="primary" @click="commentDilogSure">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title :visible.sync="toVisible" width="30%" @close="toVisible=false">
        <div class="toBtnClass">
          <div class="tocontent">
            <p>已加入书架</p>
          </div>
          <div class="tobtn">
            <el-button type="success" @click="toHome">继续选书</el-button>
            <el-button type="primary" @click="jumpToOrder">结束选书</el-button>
          </div>
        </div>

        <span slot="footer"></span>
      </el-dialog>

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane class="book-detail" label="书籍简介" name="first">
          <h3>作者简介</h3>
          <div>
            <p>{{rowContent.ZZJJ=="null"?"暂无数据":rowContent.ZZJJ}}</p>
          </div>
          <h3>书籍简介</h3>
          <div>
            <p>{{rowContent.NRJJ=="null"?"暂无数据":rowContent.NRJJ}}</p>
          </div>
        </el-tab-pane>
        <el-tab-pane class="book-comment" :label="paneLabel" name="second">
          <!-- <el-input type="textarea" autosize placeholder="请输入内容" v-model="textarea1"></el-input>
          <div class="publish">
            <el-button>发表评论</el-button>
          </div>-->
          <div class="user-selection">
            <h2>精选评论</h2>
            <div v-if="commentChoiceList.length!=0">
              <comment-list :commentDataList="commentChoiceList" @likes-change="likesHandle" />
            </div>
            <div v-else class="nodatalist">
              <h3>暂无数据</h3>
            </div>
          </div>
          <div class="user-selection">
            <h2>最新评论</h2>
            <div v-if="commentPlainList.length!=0">
              <comment-list :commentDataList="commentPlainList" @likes-change="likesHandle" />
            </div>
            <div v-else class="nodatalist">
              <h3>暂无数据</h3>
            </div>
          </div>
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 15, 20, 40]"
            :page-size="5"
            layout="total, slot, sizes, ->, prev, pager, next"
            :total="totalNum"
          >
            <span>评论</span>
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </main>
    <footer-tip />
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import CommentList from '../components/CommentList'
import {
  getBookInfo,
  getComReviewList,
  getFineReviewList,
  addOrderInfo,
  aadReviewSupport,
  getPlCount
} from '@/api/home'
import { subReviewInfo, getDdCount } from '@/api/order'
import { initRes, invalidProperty, getInfo } from '@/utils/jsfunc'
export default {
  name: 'detail',
  components: {
    'header-nav': Header,
    'footer-tip': Footer,
    'comment-list': CommentList
  },
  data() {
    return {
      commentdilog: false,
      textareaipt: '',
      toVisible: false,
      paneLabel: '',
      totalNum: 0,
      orderNum: 1,
      currentPage: 1,
      activeName: 'first',
      textarea1: '',
      commentPlainList: [],
      commentChoiceList: [],
      rowContent: [], //详情
      commentParams: {
        sjmc: '',
        limit: 5,
        start: 0
      },
      PCID: '',
      SJID: '',
      rowimg: '',
      unddsl: '',
      userId: ''
    }
  },
  mounted() {
    const { SJID, PCID, userId } = this.$route.query
    this.SJID = SJID
    this.PCID = PCID
    this.userId = userId
    this.rowInfo({ SJID, PCID })
    this.orderCountun()
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
      const str = res.slice(res.indexOf('DDCOUNT'), -2)
      const str1 = str.slice(str.indexOf(':') + 1)
      this.unddsl = Number(str1)
    },
    //获取书籍评论数量
    async initCommentCount() {
      const res = await getPlCount({ SJMC: this.rowContent.SJMC })
      this.paneLabel = `评论互动(${res.records[0].PLCOUNT})`
    },
    toHome() {
      if (this.$router.currentRoute.name === 'home') return false
      this.$router.push({ path: '/' })
    },

    jumpToOrder() {
      if (this.$router.currentRoute.name === 'order') return false
      this.$router.push({ path: 'order' })
    },
    //点击评价
    addcomment() {
      this.commentdilog = true
    },
    //添加评论
    commentDilogSure() {
      if (this.textareaipt) {
        let obj = {
          PLNR: this.textareaipt,
          SJMC: this.rowContent.SJMC
        }
        this.addreview(obj)
      } else {
        this.$message.info('未填写评论内容！')
      }
    },
    async addreview(obj) {
      const res = await subReviewInfo(obj)
      this.$message.success('评论成功！')
      this.getPlainList()
      this.initCommentCount()
      this.commentdilog = false
      this.textareaipt = ''
    },
    //page事件
    handleSizeChange(val) {
      this.commentParams.limit = val
      this.getPlainList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.commentParams.start = (val - 1) * this.commentParams.limit
      this.getPlainList()
    },

    async rowInfo(id) {
      const res = await getBookInfo(id)

      this.rowContent = res.records[0]
      this.commentParams.sjmc = this.rowContent.SJMC

      this.initCommentCount()
    },
    handleClick() {
      if (this.activeName == 'second') {
        this.getPlainList()
        this.getChoiceList()
      }
    },
    //普通评论
    async getPlainList() {
      const res = await getComReviewList(this.commentParams)

      const { list, total } = initRes(res)
      let arr = list.map(item => {
        let obj = {
          id: item.PLID,
          avatar:
            'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          name: item.CJR_NAME,
          creatTime: item.CJSJ,
          fabulous: item.DZCOUNT,
          content: item.PLNR
        }
        return obj
      })
      this.commentPlainList = arr
      this.totalNum = Number(total)
    },
    //精选评论
    async getChoiceList() {
      const res = await getFineReviewList(this.commentParams)

      let arr = res.records.map(item => {
        let obj = {
          id: item.PLID,
          avatar:
            'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          name: item.CJR_NAME,
          creatTime: item.CJSJ,
          fabulous: item.DZCOUNT,
          content: item.PLNR
        }
        return obj
      })
      arr = arr.slice(0, 3)
      this.commentChoiceList = arr
    },
    //点赞
    likesHandle(params) {
      this.addfab({ PLID: params.id })
    },
    async addfab(pa) {
      const res = await aadReviewSupport(pa)
      if (res) {
        this.getChoiceList() //精选
        this.getPlainList() //普通
      }
    },
    addToOrder() {
      let obj = {
        PCID: this.PCID,
        SJID: this.SJID,
        DDSL: this.orderNum
      }
      this.add(obj)
    },
    async add(obj) {
      const res = await addOrderInfo(obj)

      this.toVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.el-textarea__inner {
  min-height: 180px !important;
}
.orderadd {
  display: flex;
}
/deep/.el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*height:600px;*/
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
}
/deep/.el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
}
.toBtnClass {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  p {
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: 600;
  }
}
.detail-i {
  width: 1px;
  height: 10px;
  margin: 0 26px;
  background-color: #55b398;
  list-style: none;
}
.shop-car {
  cursor: pointer;
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
main {
  position: relative;
  padding-top: 140px;

  .el-button {
    background: #0e946d;
    border: none;
    color: #fff;
    letter-spacing: 2px;
    border-radius: 0;
  }
}

.main-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 220px;
  padding: 30px 50px 6px;
  background-color: #fff;
  transform: translateY(-42%);

  .book-img {
    width: 200px;
    height: 100%;
  }
  .book-introduce {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 0 0 10px;
    margin-left: 40px;
    box-sizing: border-box;

    .title {
      display: flex;
      align-items: center;
      font-size: 26px;
      font-weight: 700;

      span {
        position: relative;
        margin-left: 20px;
        color: #ccc;
        font-size: 12px;
        font-weight: normal;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 4px 10px;
        &:after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: auto;
          height: 24px;
        }
      }
    }
    .number {
      .el-input-number {
        width: 90px;
        margin-left: 10px;
        line-height: 30px;
      }
      /deep/ .el-input-number__decrease,
      /deep/ .el-input-number__increase {
        width: 20px;
      }
      /deep/ .el-input-number .el-input__inner {
        padding-left: 30px;
        padding-right: 30px;
        height: 32px;
        line-height: 32px;
      }
    }
  }
}
.el-tabs {
  margin-top: 20px;
}
.book-detail {
  h3 {
    position: relative;
    margin-left: 25px;
    color: #666;
    font-size: 16px;
    font-weight: 700;
    &:after {
      content: '';
      position: absolute;
      left: -20px;
      top: 50%;
      transform: translateY(-50%);
      width: 10px;
      height: 10px;
      background-color: #009688;
    }
  }
  div {
    margin-top: 10px;
    color: #797979;
    font-size: 12px;
    line-height: 30px;
  }
}
.book-comment {
  .publish {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
  h2 {
    position: relative;
    margin-bottom: 10px;
    padding: 0 30px;
    color: #e64545;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 110%;
      height: 100%;
      background: url('../assets/images/line.png') no-repeat;
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
  .user-selection {
    .nodatalist {
      width: 100%;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
