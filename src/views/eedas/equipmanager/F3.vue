<template>
  <div>
    <a-input-group compact style="display：online-block">
      <a-button type="primary" style="margin-left:1%;" @click="showModal">
        下发
      </a-button>
      <a-button type="primary" style="margin-left:1%;" @click="showModal" icon="ci">
        召测
      </a-button>
      <a-button type="primary" @click="CallClick()" style="margin-left:1%;">
        按默认值下发
      </a-button>
      <a-button type="primary" style="margin-left:1%;" @click="showModal">
        保存召测结果
      </a-button>
      <a-modal v-model="visible" title="召测结果" @ok="handleOk">
        <a-textarea
          placeholder="召测结果/设置结果"
          :autoSize="{ minRows: 23, maxRows: 23 }"
          v-model="value"
          style="margin-top:1%;overflowY:scroll;">
        </a-textarea>
      </a-modal>
    </a-input-group>
    <a-card title="F3主站IP地址和端口" style="margin-top:2%">
      <a-table :columns="columns" :data-source="data" bordered>
        <template
          v-for="col in ['name', 'address', 'electricno']"
          :slot="col"
          slot-scope="text, record"
        >
          <div :key="col">
            <a-input
              v-if="record.editable"
              style="margin: -5px 0"
              :value="text"
              @change="e => handleChange(e.target.value, record.key, col)"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <span v-if="record.editable">
              <a @click="() => save(record.key)">保存  </a>
              <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
                <a>取消</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a :disabled="editingKey !== ''" @click="() => edit(record.key)">Edit</a>
            </span>
          </div>
        </template>
      </a-table>
    </a-card>
  </div>
</template>
<script>
import moment from 'moment'
const columns = [
  {
    title: '参数项',
    dataIndex: 'name',
    width: '25%'
  },
  {
    title: '主站值',
    dataIndex: 'address',
    width: '25%',
    scopedSlots: { customRender: 'address' }
  },
  {
    title: '终端值',
    dataIndex: 'electricno',
    width: '25%'
  },
  {
    title: '编辑',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]
const data = []
for (let i = 0; i < 7; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    electricno: 32,
    address: ''
  })
}
export default {
  data () {
    this.cacheData = data.map(item => ({ ...item }))
    return {
        columns,
        data,
        editingKey: '',
        visible: false,
        value: '',
        saved: false, // false表示编辑状态
        dateFormat: 'YYYY/MM/DD'
    }
  },
  created () {
  },
  mounted () {

  },
  methods: {
        moment,
    getCurrentData () {
    console.log(new Date().toLocaleDateString())
      return new Date().toLocaleDateString()
    },
    CallClick () {
      console.log('6666666')
    },
    onChange (date, dateString) {
      console.log(date, dateString)
    },
    showModal () {
      this.visible = true
    },
    handleOk (e) {
      console.log(e)
      this.visible = false
    },
      handleChange (value, key, column) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    edit (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      this.editingKey = key
      if (target) {
        target.editable = true
        this.data = newData
      }
    },
    save (key) {
      const newData = [...this.data]
      const newCacheData = [...this.cacheData]
      const target = newData.filter(item => key === item.key)[0]
      const targetCache = newCacheData.filter(item => key === item.key)[0]
      if (target && targetCache) {
        delete target.editable
        this.data = newData
        Object.assign(targetCache, target)
        this.cacheData = newCacheData
      }
      this.editingKey = ''
    },
    cancel (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      this.editingKey = ''
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
        delete target.editable
        this.data = newData
      }
    }
  }
}
</script>

<style>
</style>
