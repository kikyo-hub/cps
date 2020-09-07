<template>
  <!-- <a-card> -->
  <a-row>
    <a-col :span="12">
      <a-card :body-style="{padding: '24px 24px'}" :bordered="true" style="height:140px" :hoverable="true">
        <a-row :gutter="[0,0]">
          <a-card-meta>
            <div slot="title">人均能耗</div>
            <a-avatar class="card-avatar" slot="avatar" :src="avatar1" size="large"/>
          </a-card-meta>
        </a-row>
        <a-row :gutter="[0,0]">
          <a-col :xl="6" :lg="12" :md="8" :sm="8" :xs="8">
            <a-statistic
              title="本日人均"
              :value="Math.random()"
              :precision="2"
              :suffix="energyType.unit + '/人'"
              :value-style="{ color: 'red' }"
            >
              <template #prefix>
                <a-icon type="arrow-down" />
              </template>
            </a-statistic>
          </a-col>
          <a-col :xl="6" :lg="12" :md="8" :sm="8" :xs="8">
            <a-statistic
              title="日人均标准"
              :value="1.12"
              :precision="2"
              :suffix="energyType.unit + '/人'"
              :value-style="{ color: '#1296db'}"
            >
            </a-statistic>
          </a-col>
          <a-col :xl="6" :lg="8" :md="8" :sm="8" :xs="8">
            <a-statistic
              title="本月人均"
              :value="Math.random() * 30"
              :precision="2"
              :suffix="energyType.unit + '/人'"
              :value-style="{ color: 'red' }"
            >
              <template #prefix>
                <a-icon type="arrow-down" />
              </template>
            </a-statistic>
          </a-col>
          <a-col :xl="6" :lg="12" :md="8" :sm="8" :xs="8">
            <a-statistic
              title="月人均标准"
              :value="30.32"
              :precision="2"
              :suffix="energyType.unit + '/人'"
              :value-style="{ color: '#1296db' }"
            >
            </a-statistic>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
    <a-col :span="12">
      <a-card :body-style="{padding: '24px 24px'}" :bordered="true" style="height:140px" :hoverable="true">
        <a-row :gutter="[0,0]">
          <a-card-meta>
            <div slot="title">面积能耗</div>
            <a-avatar class="card-avatar" slot="avatar" :src="avatar2" size="large"/>
          </a-card-meta>
        </a-row>
        <a-row :gutter="[0,0]">
          <a-col :xl="6" :lg="12" :md="8" :sm="8" :xs="8">
            <a-statistic
              title="本日面积"
              :value="Math.random()"
              :precision="2"
              :suffix="energyType.unit + '/m³'"
              :value-style="{ color: 'green' }"
            >
              <template #prefix>
                <a-icon type="arrow-up" />
              </template>
            </a-statistic>
          </a-col>
          <a-col :xl="6" :lg="12" :md="8" :sm="8" :xs="8">
            <a-statistic
              title="日面积标准"
              :value="0.12"
              :precision="2"
              :suffix="energyType.unit + '/m³'"
              :value-style="{ color: '#1296db' }"
            >
            </a-statistic>
          </a-col>
          <a-col :xl="6" :lg="8" :md="8" :sm="8" :xs="8">
            <a-statistic
              title="本月面积"
              :value="Math.random() * 30"
              :precision="2"
              :suffix="energyType.unit + '/m³'"
              :value-style="{ color: 'green' }"
            >
              <template #prefix>
                <a-icon type="arrow-up" />
              </template>
            </a-statistic>
          </a-col>
          <a-col :xl="6" :lg="8" :md="8" :sm="8" :xs="8">
            <a-statistic
              title="月面积标准"
              :value="Math.random() * 30"
              :precision="2"
              :suffix="energyType.unit + '/m³'"
              :value-style="{ color: '#1296db' }"
            >
            </a-statistic>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
  </a-row>
  <!-- </a-card> -->
</template>

<script>
import { Statistic } from 'ant-design-vue'

export default {
    props: {
    energyType: {
      type: Object,
      default: null
    }
  },
  components: {
    AStatistic: Statistic
  },
  data () {
    return {
      loading: false,
      avatar1: require('@/assets/people.svg'),
      avatar2: require('@/assets/area.svg'),
      avatar3: require('@/assets/other.svg'),
      avatar4: require('@/assets/bed.svg')
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
