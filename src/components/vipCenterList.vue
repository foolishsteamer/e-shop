<template>
  <div class="right-auto">
    <div class="bg-wrap" style="min-height: 765px;">
      <div class="sub-tit">
        <ul>
          <li class="selected">
            <a href="/user/order-list.html">交易订单</a>
          </li>
        </ul>
      </div>
      <div class="table-wrap">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="ftable">
          <tbody>
            <tr>
              <th width="16%" align="left">订单号</th>
              <th width="10%">姓名</th>
              <th width="12%">订单金额</th>
              <th width="11%">下单时间</th>
              <th width="10%">状态</th>
              <th width="12%">操作</th>
            </tr>
            <!-- <tr>
              <td>BD20171025213815752</td>
              <td align="left">ivanyb1212</td>
              <td align="left">
                <strong style="color: red;">￥7220</strong>
                <br>在线支付
              </td>
              <td align="left">2017-10-25 21:38:15</td>
              <td align="left">待付款</td>
              <td align="left">
                <a href="#/site/member/orderinfo/12" class>查看订单</a>
                <br>
                <a href="#/site/goods/payment/12" class>|去付款</a>
                <br>
                <a href="javascript:void(0)">|取消</a>
                <br>
              </td>
            </tr>-->
            <tr v-for="(item, index) in orderList" :key="item.id">
              <td>{{item.order_no}}</td>
              <td align="left">{{item.accept_name}}</td>
              <td align="left">
                <strong style="color: red;">￥{{item.order_amount}}</strong>
                <br>
                {{item.paymentTitle}}
              </td>
              <td align="left">{{item.add_time | shortTime | addSmile('o(*￣︶￣*)o')}}</td>
              <td align="left">{{item.statusName}}</td>
              <td align="left">
                  <router-link :to="'/vipCenter/vipCenterDetail/'+item.id">查看订单</router-link>
                <!-- <a href="#/site/member/orderinfo/12" class></a> -->
                <a href="#/site/goods/payment/12" v-if="item.status==1" class>|去付款</a>
                <a href="javascript:void(0)">|取消</a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="page-foot">
            <el-pagination
              @size-change="pageSizeChange"
              @current-change="pageIndexChange"
              :current-page="pageIndex"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalcount"
              background
            ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "vipCenterList",
  data: function() {
    return {
      pageIndex: 1,
      pageSize: 5,
      orderList: {},
      totalcount: 0
    };
  },
  methods: {
    getOrderLIst() {
      this.$axios
        .get(
          `site/validate/order/userorderlist?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(result => {
          this.orderList = result.data.message;
          this.totalcount = result.data.totalcount;
        });
    },
    pageSizeChange(pageSize){
        this.pageSize = pageSize;
        this.pageIndex = 1;
        this.getOrderLIst();
    },
    pageIndexChange(pageIndex){
        this.pageIndex = pageIndex;
        this.getOrderLIst();
    }
  },
  created() {
    this.getOrderLIst();
  }
};
</script>
<style>
tr td:nth-child(2) {
  line-height: 78px;
}
td a {
  display: block;
}
</style>
