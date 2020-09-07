<template>
  <div>
    <a-card :bordered="true">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item label="设备地址：">
                <a-input v-model="queryParam.commAddress" type="text" placeholder="请输入"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="设备名称：">
                <a-input v-model="queryParam.equipName" type="text" placeholder="请输入"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="上级设备：">
                <a-select
                  :labelInValue="true"
                  placeholder="请选择"
                  v-model="queryParamO.upEquipId"
                  :default-value="upEquipOption[0].key"
                  @change="handleUpEquip">
                  <a-select-option v-for="item in upEquipOption" :key="item.key" :value="item.value">
                    {{ item.display }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="!advanced && 6 || 6" :sm="24">
              <span class="table-page-search-submitButtons" :style="advanced && { overflow: 'hidden' } || {} ">
                <a-button type="primary" @click="$refs.table.refresh(true)" icon="search">查询</a-button>
                <a-button style="margin-left: 8px" type="primary" icon="reload" @click="reset">重置</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advanced ? '收起' : '展开' }}
                  <a-icon :type="advanced ? 'up' : 'down'"/>
                </a>
              </span>
            </a-col>
          </a-row>
          <template v-if="advanced">
            <a-row :gutter="48">
              <a-col :md="6" :sm="24">
                <a-form-item label="设备类型：">
                  <a-select
                    :labelInValue="true"
                    placeholder="请选择"
                    v-model="queryParamO.equipType"
                    :default-value="equipTypeOptions[0].key"
                    @change="handleEquipTypeChange">
                    <a-select-option v-for="item in equipTypeOptions" :key="item.key" :value="item.value">
                      {{ item.display }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="6" :sm="24">
                <a-form-item label="通信方式：">
                  <a-select
                    :labelInValue="true"
                    placeholder="请选择"
                    v-model="queryParamO.commMode"
                    :default-value="commModeOptions[0].key"
                    @change="handleCommModeChange">
                    <a-select-option v-for="item in commModeOptions" :key="item.key" :value="item.value">
                      {{ item.display }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="6" :sm="24">
                <a-form-item label="规约类型：">
                  <a-select
                    :labelInValue="true"
                    placeholder="请选择"
                    v-model="queryParamO.protocolType"
                    :default-value="protocolTypeOptions[0].key"
                    @change="handleProtocolTypeChange">
                    <a-select-option v-for="item in protocolTypeOptions" :key="item.key" :value="item.value">
                      {{ item.display }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </template>
        </a-form>
      </div>
    </a-card>
    <div>
      <a-upload
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        :multiple="false"
        :beforeUpload="this.readFromExcel"
        :showUploadList="false"
        preview="">
        <a-button type="danger" style="margin-left:10px; height:30px" icon="upload">Excel导入</a-button>
      </a-upload>
      <a type="primary" style="margin-left:20px;height:30px" href="/equip.xls"><a-icon type="download" />Excel模板</a>
      <a-divider type="vertical" style="margin-left:50px; height:30px"/>
      <a-button type="primary" style="height:30px" @click="$refs.monitorequip.add()" icon="plus">新增</a-button>
    </div>
    <a-card>
    </a-card>
    <a-card>
      <s-table
        ref="table"
        row-key="equipId"
        size="default"
        :columns="columns"
        :data="loadData"
      >
        <span slot="commAddressTitle"><a-icon type="code" theme="twoTone" two-tone-color="#52c41a" /> 地址</span>
        <span slot="equipTypeDescTitle"><a-icon type="sliders" theme="twoTone" two-tone-color="#52c41a" /> 类型</span>
        <span slot="equipNameTitle"><a-icon type="smile" theme="twoTone" two-tone-color="#52c41a" /> 名称</span>
        <span slot="commModeDescTitle"><a-icon type="api" theme="twoTone" two-tone-color="#52c41a" /> 通讯方式</span>
        <span slot="protocolTypeDescTitle"><a-icon type="build" theme="twoTone" two-tone-color="#52c41a" /> 规约类型</span>
        <span slot="upEquipTitle"><a-icon type="up-circle" theme="twoTone" two-tone-color="#52c41a" /> 上级关联设备</span>
        <span slot="actionTitle"><a-icon type="tool" theme="twoTone" two-tone-color="#52c41a" /> 操作</span>
        <span slot="upEquip" slot-scope="text, record">
          <a-select v-if="record.equipType === '200' || record.equipType === '201'" :disabled="true" style="width:200px" default-value="jack" >
            <a-select-option value="jack">无上级设备可选择</a-select-option>
          </a-select>
          <a-select v-else :defaultValue="record.upEquipId" style="width:200px" @change="upEquiphandleChange">
            <a-select-option v-for="item in upEquipOption" :key="item.key" :value="item.value" @click="upEquipClick(record)">
              {{ item.display }}
            </a-select-option>
          </a-select>
          <!-- <a-select>
            <a-select-option @change="Change(record)" v-for="item in upEquipOption" :key="item.key" :value="item.value">
              {{ item.display }}
            </a-select-option>
          </a-select> -->
          <!-- <router-link :to="{ name: 'diagnostic_rules' }">
            <span>{{ record.upEquipDesc }}</span>
          </router-link> -->
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="$refs.monitorequip.update(record)">编辑</a>
            <a-divider type="vertical" />
            <a-dropdown>
              <a class="ant-dropdown-link">
                更多 <a-icon type="down"/>
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;">详情</a>
                </a-menu-item>
                <a-menu-item>
                  <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.equipId)">
                    <a>删除</a>
                  </a-popconfirm>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </span>
      </s-table>
    </a-card>
    <MonitorEquipForm
      :equipTypeOptions="equipTypeOptions"
      :commModeOptions="commModeOptions"
      :protocolTypeOptions="protocolTypeOptions"
      :upEquipOption="upEquipOption"
      ref="monitorequip"
      @ok="handleOk"/>
  </div>
</template>

<script>
import { STable } from '@/components'
import MonitorEquipForm from './modules/MonitorEquipForm'
import { GetEquipPage, delEquip, GetEquipTypeO, insEquipExcel, GetEquipCommModeO, GetEquipProtocolO, GetUpEquipOption, UpdateUpEquip } from '@/api/archives/MonitorEquip'
import XLSX from 'xlsx'
export default {
  components: {
    STable,
    MonitorEquipForm
  },
  data () {
    return {
      loading: true,
      equipName: '',
      address: '',
      equipType: '',
      // 查询参数
      queryParam: {
        commAddress: '',
        equipType: '',
        equipMode: '',
        equipName: '',
        commMode: '',
        protocolType: '',
        upEquipId: ''
      },
      queryParamO: {},
      // 表头
      columns: [
        {
          // title: '通信地址',
          slots: { title: 'commAddressTitle' },
          dataIndex: 'commAddress',
          key: 'commAddress',
          align: 'center',
          sorter: true
        },
        {
          // title: '设备类型',
          slots: { title: 'equipTypeDescTitle' },
          dataIndex: 'equipTypeDesc',
          key: 'equipType',
          align: 'center',
          sorter: true
        },
        {
          // title: '设备名称',
          slots: { title: 'equipNameTitle' },
          dataIndex: 'equipName',
          key: 'equipName',
          align: 'center',
          sorter: true
        },
        {
          // title: '通信方式',
          slots: { title: 'commModeDescTitle' },
          dataIndex: 'commModeDesc',
          key: 'commMode',
          align: 'center',
          sorter: true
        },
        {
          // title: '规约类型',
          slots: { title: 'protocolTypeDescTitle' },
          dataIndex: 'protocolTypeDesc',
          key: 'protocolType',
          align: 'center',
          sorter: true
        },
        {
          title: '配置序号',
          dataIndex: 'configNo',
          key: 'configNo',
          align: 'center',
          sorter: true
        },
        // {
        //   title: '设备型号',
        //   dataIndex: 'equipModeDesc',
        //   key: 'equipMode',
        //   align: 'center',
        //   sorter: true
        // },
        {
          // title: '上级设备',
          slots: { title: 'upEquipTitle' },
          dataIndex: 'upEquip',
          scopedSlots: { customRender: 'upEquip' },
          // key: 'upEquipId',
          align: 'center',
          sorter: true
        },
        {
          // title: '操作',
          slots: { title: 'actionTitle' },
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          fixed: 'right',
          align: 'center',
          width: 150
        }
      ],
      loadData: parameter => {
        console.log('查询参数', JSON.stringify(this.queryParam, null, 2))
        return GetEquipPage(Object.assign(parameter, this.queryParam)).then(response => {
          console.log(JSON.stringify(response.result, null, 2))
          return response.result
        })
      },
      selectedRowKeys: [],
      selectedRows: [],
      equipTypeOptions: [{ key: '', val: '', display: '' }],
      commModeOptions: [{ key: '', val: '', display: '' }],
      protocolTypeOptions: [{ key: '', val: '', display: '' }],
      upEquipOption: [{ key: '', val: '', display: '' }],
      advanced: false,
      recordTemp: []
    }
  },
  mounted: function () {
    this.getdata()
  },
  created () {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  },
  beforeCreate () {
  },
  methods: {
    upEquiphandleChange (value) {
      UpdateUpEquip({ 'equipId': this.recordTemp.equipId, 'upEquipId': value }).then(response => {
        if (response.code === 100) {
          this.$message.warning('上级设备更新失败了')
        } else {
          this.$message.success('上级设备已更新')
        }
      })
    },
    upEquipClick (record) {
      this.recordTemp = record
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    getdata () {
      GetEquipTypeO().then(response => {
        this.equipTypeOptions = response.result.selectable
      })
      GetEquipCommModeO().then(response => {
        this.commModeOptions = response.result.selectable
      })
      GetEquipProtocolO().then(response => {
        this.protocolTypeOptions = response.result.selectable
      })
      GetUpEquipOption().then(res => {
        this.upEquipOption = res.result
      })
    },
    reset () {
      this.queryParam.equipType = ''
      this.queryParam.equipMode = ''
      this.queryParam.commAddress = ''
      this.queryParam.equipName = ''
      this.queryParamO = {}
      this.queryParam.commMode = ''
      this.queryParam.protocolType = ''
      this.queryParam.upEquipId = ''
    },
    handleDelete (res) {
      delEquip(res).then(response => {
        if (response.code === 100) {
          this.$message.warning('删除失败了')
        } else {
          this.$message.success('删除成功')
           this.$refs.table.refresh(true)
        }
      })
    },
     handleOk () {
      this.$refs.table.refresh(true)
    },
    readFromExcel (file) {
        let data = []// 存储获取到的数据
        const sheet2JSONOpts = {
          /** Default value for null/undefined values */
          defval: '' // 给defval赋值为空的字符串
        }
       // 通过FileReader对象读取文件
        const fileReader = new FileReader()
        fileReader.readAsBinaryString(file) // 二进制
        fileReader.onload = event => {
        try {
            const { result } = event.target
            // 以二进制流方式读取得到整份excel表格对象
            const workbook = XLSX.read(result, { type: 'binary' })
            // 遍历每张工作表进行读取（这里默认只读取第一张表）
            //  data = XLSX.utils.sheet_to_json(workbook.Sheets[0], sheet2JSONOpts)
            for (const sheet in workbook.Sheets) {
              if (workbook.Sheets.hasOwnProperty(sheet)) {
                // 利用 sheet_to_json 方法将 excel 转成 json 数据
                data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet], sheet2JSONOpts))
                break
            }
          }
          // { data: data }
          for (let i = 0; i < data.length; i++) {
            var param = {}
            param.commAddress = data[i].address
            param.equipType = data[i].type
            param.protocolType = data[i].protocol
            param.commMode = data[i].comm_mode
            param.equipName = data[i].equip_name
            param.upEquipId = data[i].superior_equip_address
            param.configNo = data[i].config_no
            param.pt = data[i].pt
            param.ct = data[i].ct
            insEquipExcel(param).then(response => {
            })
          }
      } catch (e) {
          // 这里可以抛出文件类型错误不正确的相关提示
           this.$message.warning('文件类型不正确 或者文件解析错误')
        }
      }
    },
    handleEquipTypeChange (value) {
      this.queryParam.equipType = this.queryParamO.equipType.key
    },
    // handleEquipModeChange (value) {
    //   this.queryParam.equipMode = this.queryParamO.equipMode.key
    // }
    handleCommModeChange (value) {
      this.queryParam.commMode = this.queryParamO.commMode.key
    },
    handleProtocolTypeChange (value) {
      this.queryParam.protocolType = this.queryParamO.protocolType.key
    },
    handleUpEquip (value) {
      this.queryParam.upEquipId = this.queryParamO.upEquipId.key
    }
  }
}
</script>

<style lang="less" scoped>
  .title {
    color: rgba(0,0,0,.85);
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 16px;
  }
</style>
