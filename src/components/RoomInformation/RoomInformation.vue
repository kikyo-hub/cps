<template>
  <a-card :bordered="false" :title="title">
    <a slot="extra" @click="showEdit()" v-if="editable">{{ (show)?'编辑':'完成' }}</a>
    <div v-show="show">
      <a-row :gutter="[10,16]" v-for="(item,index) in floorRoomData" :key="index">
        <div style="float:left;margin-top:10px">
          <a-tag :color="floorColor[index].color" @click="floorClick(item.monitors, index)"><a>{{ item.floorName }}</a></a-tag>
        </div>
        <div style="float:left;margin-top:10px">
          <a-tag :color="floorColor[index].roomcolor[cindex].color" v-for="(citem,cindex) in item.rooms" :key="cindex" @click="roomClick(citem.monitors, index ,cindex)"><a>{{ citem.roomName }}</a></a-tag>
        </div>
      </a-row>
    </div>
    <div>
    </div>
    <div v-show="!show">
      <a-row :gutter="[10,16]" v-for="(item,index) in floorRoomData" :key="index">
        <div style="float:left;margin-top:10px">
          <a-tag color="#2F54EB"><a @click="$refs.buildingformfloor.update(item)">{{ item.floorName }}</a><a-icon @click="deleteFloor1(item)" type="close"/></a-tag>
        </div>
        <div style="float:left;margin-top:10px">
          <a-tag color="#2db7f5" v-for="(citem,cindex) in item.rooms" :key="cindex"><a @click="$refs.buildingformroom.update(citem)">{{ citem.roomName }}</a><a-icon @click="deleteRoom(citem)" type="close"/></a-tag>
        </div>
        <div style="float:left;margin-top:10px">
          <a-tag style="background: #fff; borderStyle: dashed;" @click="$refs.buildingformroom.add(item.floorNo)"><a-icon type="plus"/>新增房间</a-tag>
        </div>
      </a-row>
      <a-row>
        <div style="margin-top:10px">
          <a-tag style="background: #fff; borderStyle: dashed;"><a href="#" @click="$refs.buildingformfloor.add(buildingNo)"><a-icon type="plus"/>添加楼层</a></a-tag>
        </div>
      </a-row>
    </div>
    <BuildingFormFloor ref="buildingformfloor" @refresh="refreshData"/>
    <BuildingFormRoom ref="buildingformroom" @refresh="refreshData" />
  </a-card>
</template>
<script>
import BuildingFormFloor from '@/views/archives/modules/BuildingFormFloor'
import BuildingFormRoom from '@/views/archives/modules/BuildingFormRoom'
import { deleteFloor, deleteRoom } from '@/api/archives/building'
export default {
components: {
    BuildingFormFloor,
    BuildingFormRoom
  },
props: {
    floorRoomData: {
      type: Array,
      default: null
    },
    floorColor: {
      type: Array,
      default: null
    },
    editable: {
        type: Boolean,
        default: true
    },
    showtitle: {
        type: Boolean,
        default: true
    }
},
data () {
    return {
        show: true,
        title: this.showtitle ? '房间信息' : ''
    }
},
methods: {
    floorClick (monitors, index) {
      this.floorColor.forEach(element => {
        if (element.index === index) {
          element.color = 'red'
          element.roomcolor.forEach(element2 => {
            element2.color = '#2db7f5'
          })
        } else {
          element.color = '#2F54EB'
          element.roomcolor.forEach(element2 => {
            element2.color = '#2db7f5'
          })
        }
      })
      this.$emit('floorClick', monitors)
    },
    roomClick (monitors, index, cindex) {
      this.floorColor.forEach(element => {
        if (element.index === index) {
          element.color = '#2F54EB'
          element.roomcolor.forEach(element2 => {
            if (element2.index === cindex) {
              element2.color = 'red'
            } else {
              element2.color = '#2db7f5'
            }
          })
        } else {
          element.color = '#2F54EB'
          element.roomcolor.forEach(element2 => {
            element2.color = '#2db7f5'
          })
        }
      })
      this.$emit('roomClick', monitors)
    },
    deleteFloor1 (floor) {
      if (floor.monitors.length !== 0 || floor.rooms.length !== 0) {
        this.$message.warning('该楼层存在房间或者监测点，不能删除！')
      } else {
          deleteFloor(floor.floorNo).then(res => {
          if (res.result) {
              this.$emit('getdata1')
              this.$message.warning('删除成功！')
            }
        })
      }
    },
    deleteRoom (room) {
      if (room.monitors.length !== 0) {
        this.$message.warning('该房间存在监测点，不能删除！')
      } else {
        deleteRoom(room.roomNo).then(res => {
          if (res.result) {
              this.$emit('getdata1')
        this.$message.warning('删除成功！')
            }
        })
      }
    },
    showEdit () {
      this.show = !this.show
    },
    refreshData () {
        this.$emit('getdata1')
    }
}
}
</script>
