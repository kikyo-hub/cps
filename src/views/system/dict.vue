<template>
  <div style="height: 100%;">
    <a-row type="flex" style="height: 100%;">
      <a-col :span="8" :order="1" >
        <a-card title="栏目" style="width: 100%;height:100%;">
          <a-alert message=" 右 击 可 清 除 选 中 状 态 ，并 可 创 建 字 典 类 " banner closable />
          <a slot="extra" href="#">
            <a-icon
              class="btn-icon"
              type="file-add"
              theme="filled"
              @click="()=> append()"
              title=" 添 加 字 典 项"
              v-show="showAdd"/>
            <a-icon
              class="btn-icon"
              type="delete"
              theme="filled"
              @click="()=> deleteDicts()"
              title=" 删 除 "
              style="color: red;"/>
          </a>
          <Tree
            v-model="tree.checkedKeys"
            showLine
            :expanded-keys="tree.expandedKeys"
            :auto-expand-parent="tree.autoExpandParent"
            :selected-keys="tree.selectedKeys"
            :tree-data="tree.treeData"
            @select="onSelect"
            @expand="onExpand"
            @rightClick="rightClick">
            <template slot="custom" slot-scope="item" style="display: flex; flexDirection: row; justifyContent: spaceBetween; alignItems: center; width: 100%;">
              <span>{{ item.title }}</span>
              <span>
                <!--<a-icon type="file-add" theme="filled" @click="()=> append(item)" style="cursor: pointer;margin: 0 8px;color: green;font-size: 17px;" title="添加"/>-->
                <!--<a-icon type="edit" theme="filled" @click="()=> edit(item)" style="cursor: pointer; margin: 0 8px;" title="修改"/>-->
                <!-- <a-icon type="delete" theme="filled" @click="(e)=> remove(item)" style="cursor: pointer; margin: 0 8px;color: red;font-size: 17px;" title="删除"/>-->
              </span>
            </template>
          </Tree>
        </a-card>
      </a-col>
      <a-col :span="16" :order="3" >
        <a-card style="width: 100%;height:100%;" :bodyStyle="bodyStyle">
          <a slot="title" href="#">
            <span style="color: #000000D9;font-size: 16px;" > 详 情 </span>
            <a-dropdown >
              <a-button> 创 建 字 典 </a-button>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="#" @click="dictSort"> 字 典 类 </a>
                </a-menu-item>
                <a-menu-item>
                  <a href="#" @click="dictCode"> 字 典 项 </a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </a>
          <dictEditSort v-show="tree.selected.level==0" :dictItem="tree.selected" @selectDicts="selectDicts"/>
          <dictEditCode v-show="tree.selected.level==1" :dictItem="tree.selected" :treeData="tree.treeData" @selectDicts="selectDicts"/>

        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { Tree } from 'ant-design-vue'
import dictEditSort from '@/views/system/modules/dict_edit_sort'
import dictEditCode from '@/views/system/modules/dict_edit_code'
import { SelectDicts, DeleteDicts } from '@/api/system/dict'
import moment from 'moment'
export default {
  name: 'TreeList',
  components: {
    Tree,
    dictEditSort,
    dictEditCode
  },
  data () {
    return {
      bodyStyle: { display: 'flex', flexDirection: 'column', justifyContent: 'spaceBetween', alignItems: 'center', height: '100%' },
      tree: {
        expandedKeys: [ ],
        autoExpandParent: true,
        selectedKeys: [],
        selected: { level: 0 },
        treeData: []
      },
      showAdd: true
    }
  },
  created () {
    this.selectDicts()
  },
  mounted () {

  },
  methods: {
    moment,
    onExpand (expandedKeys) {
       this.tree.expandedKeys = expandedKeys
       this.tree.autoExpandParent = false
    },
    onSelect (selectedKeys, info) { // 点击树节点出发
        const selected = info.node.dataRef
        this.tree.selectedKeys = selectedKeys
        // this.tree.selectedKeys = info.node.eventKey
        this.showAdd = true
        this.tree.selected = selected
        if (parseInt(selected.level) === 1) {
            this.showAdd = false
        }
    },
    rightClick () {
        this.tree.selectedKeys = []
        this.showAdd = true
        this.tree.selected = {
            // key: '', sort_id: '', p_code: '', code_type: this.tree.selected.code_type, org_no: '', value: '', title: '', disp_sn: '', content1: '', level: 1
            key: '', title: '', type_code: '', org_no: '', vn: '', code_type: '', valid_flag: '', effect_date: '', level: 0
        }
    },
    selectDicts () {
        SelectDicts().then(resp => {
            resp.forEach(value => {
                value.scopedSlots = { title: 'custom' }
                value.effect_date = moment(value.effect_date, 'YYYY-MM-DD HH:mm:ss')
                value.valid_flag = parseInt(value.valid_flag)
                // value.level = parseInt(value.level)
                // value.title = value.title + ' : ' + value.code_type
                if (value.children != null) {
                    value.children.forEach(v => {
                        v.scopedSlots = { title: 'custom' }
                        // v.level = parseInt(v.level)
                        // v.title = v.title + ' : ' + v.code_type + ' : ' + v.value
                    })
                }
            })
            this.tree.treeData = resp
        })
    },
    append () {
        if (this.tree.selected != null && parseInt(this.tree.selected.level) === 0) {
            // console.log('---------', this.tree.selected.code_type)
            this.tree.selected = {
                key: '', sort_id: this.tree.selected.key, p_code: '', code_type: this.tree.selected.code_type, org_no: '', value: '', title: '', disp_sn: '', content1: '', level: 1
                // key: '', title: '', type_code: '', org_no: '', vn: '', code_type: this.tree.selected.code_type, valid_flag: '', effect_date: '', level: 0
            }
        }
    },
    deleteDicts () {
        const selected = this.tree.selected
        if (selected === null) return
        let sort = {}
        let code = []
        if (parseInt(selected.level) === 0) {
            sort = selected
            if (selected.children != null) {
                code = selected.children
                sort.children = null
            }
        } else {
             code.push(selected)
        }
        // console.log('-----------', sort, code)
        DeleteDicts({ sort: sort, code: code }).then(resp => {
            if (resp.result === 'success') {
                this.selectDicts()
                this.$message.success(' 删 除 成 功 ！')
            } else {
                this.$message.error(' 删 除 失 败 ！')
            }
        })
    },
    dictSort () {
        this.tree.selected = {
            // key: '', sort_id: '', p_code: '', code_type: this.tree.selected.code_type + '', org_no: '', value: '', title: '', disp_sn: '', content1: '', level: 1
            key: '', title: '', type_code: '', org_no: '', vn: '', code_type: '', valid_flag: 1, effect_date: '', level: 0
        }
    },
    dictCode () {
        let type = ''
        let sortId = ''
        if (this.tree.selected != null) {
            type = this.tree.selected.code_type
            sortId = parseInt(this.tree.selected.level) === 0 ? this.tree.selected.key : this.tree.selected.sort_id
        }
        this.tree.selected = {
            key: '', sort_id: sortId, p_code: '', code_type: type, org_no: '', value: '', title: '', disp_sn: '', content1: '', level: 1
            // key: '', title: '', type_code: '', org_no: '', vn: '', code_type: type, valid_flag: '', effect_date: '', level: 0
        }
    }
  },
  watch: {
    // 'tree.selected': function (newQuestion, oldQuestion) {
    //   // console.log('监听属性tree.selectedKeys')
    // }
  }
}
</script>

<style lang="less">
  .fcbc{
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content:space-between;
    align-items:center
  }
  .btn-icon {
    cursor: pointer;
    margin: 0 8px;
    color: green;
    font-size: 17px;
  }

</style>
