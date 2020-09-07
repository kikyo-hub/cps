<template>
  <div>
    <a-card title="企业信息" :bordered="false">
      <a slot="extra" @click="$refs.EnterpriseEdit.show()">编辑</a>
      <detail-list>
        <template v-if="enterprisedata !== null">
          <!-- <detail-list-item term="企业编号">{{ enterprisedata.id }}</detail-list-item> -->
          <detail-list-item term="企业名称">{{ enterprisedata.name }}</detail-list-item>
          <detail-list-item term="企业地址">{{ enterprisedata.address }}</detail-list-item>
          <detail-list-item term="企业类型">{{ enterprisedata.enterprise_typename }}</detail-list-item>
          <detail-list-item term="企业面积">{{ enterprisedata.area + ' 平方米' }}</detail-list-item>
          <detail-list-item term="员工人数">{{ enterprisedata.employees + ' 人' }}</detail-list-item>
          <detail-list-item term="企业简介">{{ enterprisedata.profile }}</detail-list-item>
        </template>
      </detail-list>
    </a-card>
    <a-divider style="margin-bottom: -2px"/>
    <a-button class="new-btn" type="primary" @click="$refs.BuildingInsert.add(enterprisedata.id)">
      <a-icon type="plus"/>   新增楼栋
    </a-button>
    <template v-if="buildings !== null">
      <a-list
        rowKey="buildingNo"
        :grid="{gutter: 24, lg: 1, md: 3, sm: 2, xs: 1}"
        :dataSource="buildings"
        :loading="loading"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card>
            <!-- <router-link :to="{ name: 'building'}"> -->
            <a-descriptions bordered>
              <template v-slot:title>
                <router-link :to="{ name: 'buildingview', params:{building: item.buildingName}}">
                  {{ item.buildingName }}
                </router-link>
                <a-divider type="vertical"/>
                <a-button @click="$refs.BuildingInsert.edit(item)" style="">修改</a-button>
                <a-popconfirm
                  title="确定删除?"
                  ok-text="Yes"
                  cancel-text="No"
                  @confirm="confirm(item.buildingNo)"
                >
                  <a-button style="margin-left:10px;color:#52c41a">删除</a-button>
                </a-popconfirm>
              </template>
              <!-- </router-link> -->
              <a-descriptions-item label="楼栋编号">
                {{ item.buildingNo }}
              </a-descriptions-item>
              <!-- <a-descriptions-item label="楼栋名称">
                {{ item.buildingName }}
              </a-descriptions-item> -->
              <a-descriptions-item label="楼栋面积(㎡)">
                {{ item.buildingArea }}
              </a-descriptions-item>
              <a-descriptions-item label="楼栋层数">
                {{ item.floorCnt }}
              </a-descriptions-item>
              <!-- <a-descriptions-item label="楼栋地址" :span="2">
                {{ item.buildingAddress }}
              </a-descriptions-item> -->
              <a-descriptions-item label="员工人数">
                {{ item.employees }}
              </a-descriptions-item>
              <a-descriptions-item label="楼栋类型">
                {{ item.building_category }}
              </a-descriptions-item>
              <a-descriptions-item label="建造时间" :span="1">
                {{ item.buildingTime.substring(0,10) }}
              </a-descriptions-item>
            </a-descriptions>
            <!-- <template class="ant-card-actions" slot="actions">
              <a @click="$refs.BuildingInsert.edit(item)" style="color:#52c41a">修改</a>
              <a-popconfirm
                title="确定删除?"
                ok-text="Yes"
                cancel-text="No"
                @confirm="confirm(item.buildingNo)"
              >
                <a style="color:#52c41a">删除</a>
              </a-popconfirm>
            </template> -->
          </a-card>
        </a-list-item>
      </a-list>
    </template>
    <enterprise-edit :enterprise="enterprisedata" ref="EnterpriseEdit" @refresh="getData"></enterprise-edit>
    <building-insert ref="BuildingInsert" @refresh="getData"></building-insert>
  </div>
</template>
<script>
import DetailList from '@/components/tools/DetailList'
import EnterpriseEdit from '@/views/archives/modules/EnterpriseEdit'
import BuildingInsert from '@/views/archives/modules/BuildingInsert'
import { GetEnterpriseData, DeleteBuildingNo } from '@/api/archives/enterprise'
import { descriptions } from 'ant-design-vue'
const DetailListItem = DetailList.Item
const ADescriptionsItem = descriptions.Item
export default {
  components: {
    DetailList,
    DetailListItem,
    EnterpriseEdit,
    BuildingInsert,
    ADescriptions: descriptions,
    ADescriptionsItem
  },
    data () {
        return {
          enterprisedata: null,
          buildings: [],
          loading: true
        }
    },
    created () {
    //   setTimeout(() => {
    //   this.loading = !this.loading
    // }, 1000)
      this.getData()
    },
    mounted () {
      // this.getData()
    },
    methods: {
      getData () {
        this.loading = true
        GetEnterpriseData().then(response => {
          this.enterprisedata = response.result
          this.buildings = response.result.Buildings
          setTimeout(() => {
          this.loading = !this.loading
          }, 500)
        })
      },
      confirm (buildingNo) {
      this.deleteco(buildingNo)
    },
    deleteco (buildingNo) {
      DeleteBuildingNo(buildingNo).then(res => {
        if (res.result) {
              this.getData()
              this.$notification['success']({
        message: '通知',
        description:
          '删除成功！',
          duration: 1.5
      })
            }
      })
    }
    }
}
</script>
