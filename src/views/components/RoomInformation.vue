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
          <a-tag color="#2F54EB"><a @click="updateFloor(item)">{{ item.floorName }}</a><a-icon @click="deleteFloor1(item)" type="close"/></a-tag>
        </div>
        <div style="float:left;margin-top:10px">
          <a-tag color="#2db7f5" v-for="(citem,cindex) in item.rooms" :key="cindex"><a @click="updateRoom(citem)">{{ citem.roomName }}</a><a-icon @click="deleteRoom(citem)" type="close"/></a-tag>
        </div>
        <div style="float:left;margin-top:10px">
          <a-tag style="background: #fff; borderStyle: dashed;" @click="addRoom(item.floorNo)"><a-icon type="plus"/>新增房间</a-tag>
        </div>
      </a-row>
      <a-row>
        <div style="margin-top:10px">
          <a-tag style="background: #fff; borderStyle: dashed;"><a href="#" @click="addFloor()"><a-icon type="plus"/>添加楼层</a></a-tag>
        </div>
      </a-row>
    </div>
  </a-card>
</template>
<script>
export default {
components: {
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
    color: {
        type: String,
        default: 'red'
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
  updateFloor (floor) {
    this.$emit('updateFloor', floor)
  },
  updateRoom (room) {
    this.$emit('updateRoom', room)
  },
  addFloor () {
    this.$emit('addFloor')
  },
  addRoom (floorNo) {
    this.$emit('addRoom', floorNo)
  },
    floorClick (monitors, index) {
      this.floorColor.forEach(element => {
        if (element.index === index) {
            element.color = this.color
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
                element2.color = this.color
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
      this.$emit('deleteFloor', floor)
    },
    deleteRoom (room) {
      this.$emit('deleteRoom', room)
    },
    showEdit () {
      this.show = !this.show
    }
}
}
</script>
