span<template>
  <div class="order">
    <header-nav ref="headpt" />
    <main class="order-main">
      <div class="main-tabs">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="unddsl" name="first">
            <!-- <div class="checkall">
              <div class="confirm">
                <el-checkbox
                  :indeterminate="isIndeterminate"
                  v-model="checkAll"
                  @change="handleCheckAllChange"
                ></el-checkbox>
              </div>
              <p>全选</p>
            </div>-->

            <div style="margin: 15px 0;"></div>
            <div class="order-card" v-for="item in list" :key="item.id">
              <div class="confirm">
                <el-checkbox-group v-model="checkedItems" @change="handleCheckedCitiesChange">
                  <el-checkbox :label="item.ID"></el-checkbox>
                </el-checkbox-group>
              </div>
              <div class="theme">
                <span>主题活动名称</span>
                <h2>{{item.PCMC}}</h2>
                <!-- <h2>dddddd对对对顶顶顶顶哒哒哒哒哒哒多多多</h2> -->
              </div>
              <div class="book" @click="jumpToDetail(item)">
                <div class="book-img">
                  <!-- <img :src="item.img" alt width="140px" /> -->
                  <img :src="`data:image/jpg;base64,${item.FILE_STREAM}`" alt width="100%" />
                </div>
                <div class="book-brief">
                  <div class="title">{{item.SJMC}}</div>
                  <div class="author">{{item.SJZZ}} &nbsp;&nbsp;&nbsp;著</div>
                  <div class="press">{{item.SJCBS}}</div>
                  <!-- <div class="title" :title="item.name">{{item.name}}</div>
                  <div class="author">gggggg &nbsp;&nbsp;&nbsp;著</div>
                  <div class="press">bbbbbbb</div> -->
                </div>
              </div>
              <div class="quantity">
                <div class="subscribe">{{item.CJSJ}} 订阅</div>
                <div class="number">
                  <span>预定数量</span>
                  <el-input-number
                    style="margin-left:15px;"
                    v-model="item.DDSL"
                    :min="1"
                    :max="10"
                    label="描述文字"
                    size="small"
                    @change="changeNum(item)"
                  ></el-input-number>
                </div>
              </div>
              <div class="evaluate">
                <el-tag
                  :type="item.DDZT==2?'danger':'success'"
                  effect="plain"
                >{{ item.DDZT==2?'驳回':'待提交' }}</el-tag>
              </div>
            </div>
            <div class="submitorder">
              <el-button @click="deleteOrders" style="margin-right:15-x">删除订单</el-button>
              <el-button @click="sureSubmitOrders">确认提交</el-button>
            </div>
            <el-pagination
              background
              @size-change="unhandleSizeChange"
              @current-change="unhandleCurrentChange"
              :current-page="uncurrentPage"
              :page-sizes="[ 10, 20, 40]"
              :page-size="10"
              layout="total, slot, sizes, ->, prev, pager, next"
              :total="ddTotal"
              style="margin-top:15px;padding-right:0px;margin-right: -5px;"
            >
              <span>待提交订单</span>
            </el-pagination>
          </el-tab-pane>
          <el-tab-pane :label="hasSubmit" name="second">
            <div style="margin: 15px 0;"></div>
            <div class="order-card" v-for="item in subList" :key="item.id">
              <div class="theme">
                <span>主题活动名称</span>
                <h2>{{item.PCMC}}</h2>
              </div>
              <div class="book" @click="jumpToDetail(item)">
                <div class="book-img">
                  <img :src="`data:image/jpg;base64,${item.FILE_STREAM}`" alt width="100%" />
                </div>
                <div class="book-brief">
                  <div class="title">{{item.SJMC}}</div>
                  <div class="author">{{item.SJZZ}} &nbsp;&nbsp;&nbsp;著</div>
                  <div class="press">{{item.SJCBS}}</div>
                </div>
              </div>
              <div class="quantity">
                <div class="subscribe">2019-09-29 订阅</div>
                <div class="number">
                  预定数量：
                  <span>{{item.DDSL}}</span> 册
                </div>
              </div>
              <div class="evaluate">
                <el-button type="primary" @click="addcomment(item)">评价</el-button>
              </div>
            </div>

            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[ 10, 20, 40]"
              :page-size="10"
              layout="total, slot, sizes, ->, prev, pager, next"
              :total="subTotal"
              style="margin-top:15px;padding-right:0px;margin-right: -5px;"
            >
              <span>已提交订单</span>
            </el-pagination>
          </el-tab-pane>
        </el-tabs>
      </div>
    </main>

    <el-dialog title="评论" :visible.sync="commentdilog" width="40%" :closeOnClickModal="false">
      <el-input type="textarea" v-model="textareaipt" placeholder="请填写评论"></el-input>
      <span slot="footer">
        <el-button type="primary" @click="commentDilogSure">确 定</el-button>
      </span>
    </el-dialog>
    <footer-tip />
  </div>
</template>

<script>
import {
  getUnSubOrderListById,
  getSubOrderListById,
  getDdCount,
  subOrders,
  subReviewInfo,
  updDdsl,
  delOrderInfos
} from '@/api/order'
import { UserInfo } from '@/api/home'
import bus from '@/utils/bus'
import { initRes, invalidProperty, getInfo } from '@/utils/jsfunc'
import Header from '../components/Header'
import Footer from '../components/Footer'
import a from '../assets/images/a.jpg'
import b from '../assets/images/b.jpg'
import c from '../assets/images/c.jpg'
import d from '../assets/images/d.jpg'
export default {
  name: 'order',
  components: {
    'header-nav': Header,
    'footer-tip': Footer
  },
  data() {
    return {
      subTotal: 0,
      pcid: '',
      userId: '',
      textareaipt: '',
      commentdilog: false,
      uncurrentPage: 1,
      currentPage: 1,
      ddTotal: 0,
      isIndeterminate: true,
      checkedItems: [], //勾选项
      checked: true,
      checkAll: false,
      avatar:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      activeName: 'first',
      number: 1,
      hasSubmit: '',
      tableData: [],
      list: [
        { ID: 1, label: 'ee', img: a, name: 'eeeeeeeeeeeeeeee' },
        {
          ID: 2,
          label: 'ee',
          img: b,
          name: 'ddddddddddddddddddddddddddddddddd'
        },
        { ID: 3, label: 'ee', img: c, name: 'dddd' },
        { ID: 3, label: 'ee', img: d, name: 'ccccccccccc' }
      ],
      subList: [],
      unparams: {
        start: 0,
        limit: 10,
        CJR: '',
        PCID: ''
      },
      subparams: {
        start: 0,
        limit: 10,
        CJR: '',
        PCID: ''
      },
      unddsl: '', //待提交订单数量
      subddsl: '', //已提交订单数量
      orderOptions: [],
      commentItem: {} //评论书对象
    }
  },
  created() {},
  mounted() {
    this.getUser();
  },
  methods: {
    jumpToDetail(item) {
      this.$router.push({
        path: '/detail',
        query: { SJID: item.SJID, PCID: this.pcid, userId: this.userId }
      })
    },
    changeNum(item) {
      let obj = {
        id: item.ID,
        ddsl: item.DDSL
      }
      this.addDDsl(obj)
    },
    async getUser() {
      try {
        const res = await UserInfo()
        const objee = getInfo(res)
        this.pcid = objee.ID
        this.userId = objee.userId
        this.subparams.PCID = objee.ID
        this.unparams.PCID = objee.ID
        console.log('object :>> ', objee)
        this.initorder()
        this.orderCountun()
        this.orderCountsub()
        this.subOrdr()
      } catch (err) {
        console.log('err :>> ', err)
      }
    },
    async addDDsl(obj) {
      const res = await updDdsl(obj)
      console.log('res :>> ', res)
      this.initorder()
    },
    //点击评价
    addcomment(item) {
      this.commentItem = item
      this.commentdilog = true
    },
    //添加评论
    commentDilogSure() {
      if (this.textareaipt) {
        let obj = {
          PLNR: this.textareaipt,
          SJMC: this.commentItem.SJMC
        }
        this.addreview(obj)
      } else {
        this.$message.info('未填写评论内容！')
      }
    },
    async addreview(obj) {
      const res = await subReviewInfo(obj)
      this.$message.success('评论成功！')
      this.commentdilog = false
      this.textareaipt = ''
    },
    async initorder() {
      this.unparams.CJR = this.userId
      const res = await getUnSubOrderListById(this.unparams)
      const { list, total } = initRes(res)
      let arr = list.map(item => {
        return item.ID
      })
      this.orderOptions = arr
      this.list = list
      this.ddTotal = Number(total)
      console.log('total :>> ', total)
    },
    deleteOrders() {
      if (this.checkedItems.length > 0) {
        let obj = {
          objIds: this.checkedItems
        }
        this.deletes(obj)
      } else {
        this.$message.error('请先勾选订单再删除')
      }
    },
    async deletes(obj) {
      const res = await delOrderInfos(obj)
      console.log('res :>> ', res)
      if (res) {
        this.$message.success('删除成功！')
        this.initorder()
      }
    },
    sureSubmitOrders() {
      if (this.checkedItems.length > 0) {
        let obj = {
          ids: this.checkedItems,
          ddzt: 1,
          pcid: this.pcid
        }
        console.log('obj :>> ', obj)
        this.sureOrder(obj)
      } else {
        this.$message.error('请先勾选订单再提交')
      }
    },
    async sureOrder(obj) {
      const res = await subOrders(obj)
      if (!res.success) {
        const str = res.substring(res.indexOf('(') + 2, res.indexOf(')') - 1) //从某个开始 截取到 某个下标的字符串
        if (str) {
          this.$message.error(str)
        }
      } else {
        this.checkedItems = []
        this.$message.success('提交成功！')
        this.orderCountun()
        this.initorder()
        this.orderCountsub()
        this.subOrdr()
      }
    },

    async orderCountun() {
      let obj = {
        CJR: this.userId,
        PCID: this.pcid,
        FLAG: 0
      }
      const res = await getDdCount(obj)
      const str = res.slice(res.indexOf('DDCOUNT'), -2)
      const str1 = str.slice(str.indexOf(':') + 1)
      this.unddsl = `待提交订单(${str1})`
    },
    //已提交订单
    async orderCountsub() {
      let obj = {
        CJR: this.userId,
        PCID: this.pcid,
        FLAG: 1
      }
      const res = await getDdCount(obj)
      const str = res.slice(res.indexOf('DDCOUNT'), -2)
      const str1 = str.slice(str.indexOf(':') + 1)

      this.hasSubmit = `已提交订单(${str1})`
    },
    async subOrdr() {
      this.subparams.CJR = this.userId
      const res = await getSubOrderListById(this.subparams)
      const { list, total } = initRes(res)
      this.subList = list
      this.subTotal = Number(total)
    },
    handleClick(e) {
      if (this.activeName == 'second') {
        this.subOrdr()
      } else {
        this.initorder()
      }
    },
    handleCheckAllChange(val) {
      this.checkedItems = val ? this.orderOptions : []
      this.isIndeterminate = false
      console.log('all :>> ', this.checkedItems)
    },

    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.list.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.list.length
      console.log(' this.checkedItems:>> ', this.checkedItems)
    },
    //page事件
    unhandleSizeChange(val) {
      this.unparams.limit = val
      this.initorder()
    },
    unhandleCurrentChange(val) {
      this.uncurrentPage = val
      this.unparams.start = (val - 1) * this.unparams.limit
      this.initorder()
      this.orderCountun()
    },
    handleSizeChange(val) {
      this.subparams.limit = val
      this.subOrdr()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.subparams.start = (val - 1) * this.subparams.limit
      this.subOrdr()
      this.orderCountsub()
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.el-textarea__inner {
  min-height: 180px !important;
}
.evaluate {
  /deep/ .el-tag--plain.el-tag--success {
    color: #67c23a !important;
  }
}

/deep/ .el-checkbox__label {
  display: none;
}
// /deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
// /deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner {
//   background-color: #ff7f00;
//   border-color: #ff7f00;
// }
// /deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
// .el-checkbox__input.is-indeterminate .el-checkbox__inner {
//   background-color: #ff7f00;
//   border-color: #ff7f00;
// }
/deep/ .el-checkbox__inner {
  width: 40px;
  height: 40px;
  border: 2px solid #ccc;
  // background-color: transparent;
  // border-radius: 0 0 12px 0;
}
/deep/.el-checkbox__inner:hover {
  border-color: #409eff;
  // border-radius: 0 0 12px 0;
}
/deep/ .el-checkbox__inner::after {
  width: 6px;
  top: 6px;
  height: 19px;
  left: 15px;
  border: 3px solid #fff;
  border-left: 0;
  border-top: 0;
}

/deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
  content: '';
  position: absolute;
  display: block;
  background-color: #fff;
  height: 6px;
  transform: scale(0.5);
  left: 0;
  right: 0;
  top: 16px;
}
.main-title {
  position: relative;

  .avatar {
    position: absolute;
    left: 50%;
    top: -90px;
    width: 150px;
    height: 150px;
    background-color: #fff;
    text-align: center;
    line-height: 150px;
    transform: translateX(-50%);
    border-radius: 50%;
    .el-image {
      width: 100%;
      height: 100%;
    }
  }
  .introduce {
    padding-top: 72px;
    // background-color: yellow;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      width: 2px;
      height: 16px;
      background-color: #009688;
      list-style: none;
    }

    .name,
    .department,
    .position {
      padding: 0 28px;
      color: #009688;
      font-weight: 700;
    }
    // .department::before {
    //   content: '';
    //   width: 10px;
    //   height: 100px;
    //   background-color: #000;
    // }
  }
}
.submitorder {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}
.main-tabs {
  padding-top: 20px;
  min-height: 400px;
  padding-top: 20px;
  overflow: auto;

  /deep/ .el-tabs__item {
    font-size: 18px;
    color: #999999;
  }
  /deep/ .el-tabs__item:hover {
    color: #0e946d;
  }
  // 选中项的样式
  /deep/ .el-tabs__item.is-active {
    color: #0e946d;
  }
  /deep/ .el-tabs__active-bar {
    background-color: #0e946d;
  }

  .el-button {
    border: 1px solid #87cfcf;
    background-color: #f0f9f9;
    color: #24a59e;
  }
  .checkall {
    display: flex;
    align-items: center;

    .confirm {
      // width: 40px;
      // height: 40px;
      // background-color: #ff7f00;
      // border-radius: 0 0 12px 0;
    }
    p {
      margin-left: 15px;
    }
  }

  .order-card {
    position: relative;
    display: flex;
    align-items: center;
    height: 150px;
    width: 100%;
    margin-top: 16px;
    background-color: #fcfcfc;
    text-align: center;
    box-sizing: border-box;

    .confirm,
    .count {
      position: absolute;
      left: 0;
      top: 0;
      width: 40px;
      height: 40px;
      // border: 2px solid #ccc;
      // background-color: #ff7f00;
    }

    .count {
      // padding: 4px 0 0 4px;
      color: #fff;
      font-weight: 700;
      font-size: 22px;
      // text-align: center;
      line-height: 35px;
      border-radius: 0 0 40px;
      box-sizing: border-box;

      span {
        margin-left: -6px;
      }
    }

    .theme {
      flex: 3;
      // padding-left: 60px;
      color: #b9b9b9;
      span {
        font-size: 12px;
      }
      h2 {
        margin-top: 20px;
        color: #0e946d;
      }
    }
    .book {
      cursor: pointer;
      flex: 4;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      max-width: 400px;
      margin-left: 10px;
      .book-img {
        width: 140px;
      }
      .book-brief {
        display: flex;
        align-items: center;
        flex-direction: column;
        .title {
          width: 220px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }

      .title {
        font-weight: 700;
        font-size: 16px;
      }
      .author {
        padding: 16px 0;
        color: #2d71b6;
      }
      .press {
        color: #b6b6b6;
      }
    }
    .quantity {
      flex: 3;

      .subscribe {
        padding-bottom: 18px;
      }
    }
    .evaluate {
      padding-right: 28px;
      span {
        color: red;
      }
    }
  }
}
</style>
