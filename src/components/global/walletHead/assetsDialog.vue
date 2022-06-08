<template>
  <van-dialog v-model:show="show" title="" :showConfirmButton="false" :closeOnClickOverlay="true" @close="closeFa">
    <section class="assetsDialog">
      <div class="top">
        <h4>{{ $t('money.allAsset') }}</h4>
        <div class="money flex_c">
          <img class="mr5" src="/images/common/sUsdt.png" alt="" />
          <vue-count-to :startVal="0" :endVal="(platBalanceCount - 0).dealUsdt() - 0" :duration="1000" suffix=" USDT"></vue-count-to>
        </div>
        <div class="chain mt10" @click="toBsc">{{ lian }}Scan {{ $t('market.look') }}</div>
      </div>
      <div @click="copyAddress" class="cent mt10 flex_ac flex_jb">
        <span>{{ contractAddress.substr(0, 10) + '****' + contractAddress.substr(-10) }}</span>
        <img src="/images/common/copy.png" alt="" />
      </div>
      <div class="bom mt10">
        <div class="bom_top">
          <ul>
            <li class="flex_jb">
              <span>{{ $t('home.todayIn') }}</span>
              <span class="price">
                <vue-count-to :startVal="0" :endVal="fundstodayData.recharge.dealTradeUsdt() - 0" :duration="1000" suffix=" USDT"></vue-count-to>
              </span>
            </li>
            <li class="flex_jb">
              <span>{{ $t('home.todayOut') }}</span>
              <span class="price">
                <vue-count-to :startVal="0" :endVal="fundstodayData.withdraw.dealTradeUsdt() - 0" :duration="1000" suffix=" USDT"></vue-count-to>
              </span>
            </li>
          </ul>
        </div>
        <div class="bom_bom">
          <ul>
            <li class="tabTr flex_jb">
              <span>{{ $t('home.direction') }}</span>
              <span>{{ $t('home.time') }}(UTC)</span>
              <span>{{ $t('home.number') }}(USDT)</span>
            </li>
            <li class="flex_jb flex_ac" v-for="(item, index) in fundsLatesData" :key="index">
              <span>{{ item.type == 'RECHARGE' ? $t('home.In') : $t('home.Out') }}</span>
              <span>{{ dealTime(item.createdTime) }}</span>
              <span>{{ (item.amount - 0).dealTradeUsdt() }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </van-dialog>
</template>

<script setup lang="ts">
import countTo from 'vue-count-to'
import useClipboard from 'vue-clipboard3'
import { Toast } from 'vant'
import moment from 'moment'
import wallet from '@/utils/wallet'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { getFundstoday, getFundsLatest } from '@/api/statistics'
const contractAddress = import.meta.env.VITE_CHAIN_ZHIYA
const lian = import.meta.env.VITE_CHAIN_NAME
const { toClipboard } = useClipboard()
const props = defineProps({ show: Boolean })
const emits = defineEmits(['close'])
let show = ref(false)
let fundstodayData = ref({ recharge: 0, withdraw: 0 })
let fundsLatesData = ref([])
watch(
  () => props.show,
  val => {
    show.value = val
    if (val) {
      platBalanceCount.value = platBalance.value
      fundstodayData.value = { recharge: 0, withdraw: 0 }
      getFundstodayFn()
      getFundsLatestFn()
    }
  }
)
const closeFa = () => {
  platBalanceCount.value = 0
  emits('close')
}
const copyAddress = async () => {
  try {
    await toClipboard(contractAddress)
    Toast($t('common.copySu'))
  } catch (e) {
    Toast($t('common.copyFa'))
    console.error(e)
  }
}
const getFundstodayFn = async () => {
  let res = await getFundstoday()
  fundstodayData.value = res
}
const getFundsLatestFn = async () => {
  let res = await getFundsLatest()
  fundsLatesData.value = res.slice(0, 3)
}
const dealTime = time => {
  return moment.utc(time).format('YYYY-MM-DD HH:mm:ss')
}
const toBsc = () => {
  let url = import.meta.env.VITE_CHAIN_SCAN
  window.open(`${url}/address/${contractAddress}`)
}
// 平台
let platBalance = ref(0)
let platBalanceCount = ref(0)
const getPlatBalanceFn = async () => {
  let res = await wallet.getPlatBalance()
  platBalance.value = res
}
getPlatBalanceFn()
</script>

<style lang="less" scoped>
.assetsDialog {
  padding: 15px;
  .top {
    border: 1px solid #dfe8f4;
    border-radius: 8px;
    text-align: center;
    h4 {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #000000;
      text-align: center;
      font-weight: 500;
      margin: 15px 0;
    }
    .money {
      font-family: Poppins-SemiBold;
      font-size: 24px;
      color: #000000;
      letter-spacing: 0;
      text-align: center;
      font-weight: 600;
      img {
        width: 18px;
        height: 18px;
      }
    }
    .chain {
      background: var(--global-color);
      border-radius: 0 0 8px 8px;
      font-family: Poppins-Medium;
      font-size: 16px;
      color: #ffffff;
      font-weight: 500;
      text-align: center;
      height: 50px;
      line-height: 50px;
    }
  }
  .cent {
    padding: 0 15px;
    background: #f4f6f9;
    border-radius: 8px;
    height: 40px;
    font-family: Poppins-Medium;
    font-size: 14px;
    color: #000000;
    font-weight: 500;
    img {
      width: 16px;
      height: 16px;
    }
  }
  .bom {
    background: #ffffff;
    border: 1px solid #dfe8f4;
    border-radius: 8px;
    .bom_top {
      padding: 5px 15px 15px;
      ul li {
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #71797e;
        font-weight: 500;
        margin-top: 10px;
        .price {
          font-family: Poppins-Medium;
          font-size: 14px;
          color: #000000;
          text-align: right;
          font-weight: 500;
        }
      }
    }
    .bom_bom {
      padding: 10px 0 15px;
      background: #f4f6f9;
      border-top: 1px solid #dfe8f4;
      border-radius: 0 0 8px 8px;
      text-align: center;
      ul li {
        font-family: Poppins-Medium;
        font-size: 12px;
        color: #000000;
        font-weight: 500;
        margin-top: 10px;
        span {
          display: inline-block;
          width: 33.3%;
        }
        span:first-child {
          width: 15%;
        }
      }
      .tabTr {
        margin-top: 0px;
        font-family: Poppins-Medium;
        font-size: 12px;
        color: #a8b1b7;
        font-weight: 500;
      }
    }
  }
}
</style>
