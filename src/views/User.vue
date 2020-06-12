<template>
  <div class="user">
    <header-nav />
    <main>
      <div class="main-title">
        <div class="avatar">
          <el-image :src="avatar">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
        <div class="introduce">
          <div class="name">李四</div>
          <i></i>
          <div class="department">市场营销部</div>
          <i></i>
          <div class="position">销售专员</div>
        </div>
      </div>
      <div class="main-tabs">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="notSubmit" name="first">
            <el-button>确认提交</el-button>
            <div class="order-card">
              <div class="confirm"></div>
              <div class="theme">
                <span>主题活动名称</span>
                <h2>2018夏季选书节</h2>
              </div>
              <div class="book">
                <div class="book-img">
                  <img src="../assets/images/book.jpg" alt width="100%" />
                </div>
                <div class="book-brief">
                  <div class="title">《从你的全世界路过》</div>
                  <div class="author">张嘉佳 &nbsp;&nbsp;&nbsp;著</div>
                  <div class="press">中国工业出版社</div>
                </div>
              </div>
              <div class="quantity">
                <div class="subscribe">2019-09-29 订阅</div>
                <div class="number">
                  预定数量
                  <el-input-number v-model="number" :min="1" :max="10" label="描述文字" size="small"></el-input-number>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="hasSubmit" name="second">
            <div class="order-card">
              <div class="count">
                <span>1</span>
              </div>
              <div class="theme">
                <span>主题活动名称</span>
                <h2>2018夏季选书节</h2>
              </div>
              <div class="book">
                <div class="book-img">
                  <img src="../assets/images/book.jpg" alt width="100%" />
                </div>
                <div class="book-brief">
                  <div class="title">《从你的全世界路过》</div>
                  <div class="author">张嘉佳 &nbsp;&nbsp;&nbsp;著</div>
                  <div class="press">中国工业出版社</div>
                </div>
              </div>
              <div class="quantity">
                <div class="subscribe">2019-09-29 订阅</div>
                <div class="number">
                  预定数量：
                  <span>4</span> 册
                </div>
              </div>
              <div class="evaluate">
                <el-button type="primary">评价</el-button>
                <!-- <span>审核中</span> -->
              </div>
            </div>
          </el-tab-pane>
          <!-- label同上 -->
          <el-tab-pane label="心愿单" name="three">
            <el-table :data="tableData" stripe style="width: 100%">
              <el-table-column prop="date" align="center" label="心愿单号"></el-table-column>
              <el-table-column prop="name" align="center" label="心愿图书"></el-table-column>
              <el-table-column prop="address" align="center" label="图书作者"></el-table-column>
              <el-table-column prop="address" align="center" label="图书出版社"></el-table-column>
              <el-table-column prop="address" align="center" label="图书理由"></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </main>
    <footer-tip />
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
export default {
  name: 'User',
  components: {
    'header-nav': Header,
    'footer-tip': Footer
  },
  data() {
    return {
      avatar:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      activeName: 'first',
      number: 1,
      hasSubmit: '已提交订单(110)',
      tableData: []
    }
  },
  computed: {
    notSubmit() {
      const num = 101
      return `待提交订单(${num})`
    }
  },
  methods: {
    handleClick() {}
  }
}
</script>

<style lang="less" scoped>
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
.main-tabs {
  padding-top: 40px;

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
      background-color: #ff7f00;
    }
    .confirm {
      border-radius: 0 0 12px 0;
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
      flex: 4;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      .book-img {
        width: 140px;
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
      /deep/ .el-input-number--small {
        width: 90px;
      }
      /deep/ .el-input-number--small .el-input-number__decrease {
        width: 20px;
      }
      /deep/ .el-input-number--small .el-input-number__increase {
        width: 20px;
      }

      span {
        font-size: 24px;
        font-weight: 700;
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
