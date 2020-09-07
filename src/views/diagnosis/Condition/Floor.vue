<template>
  <a-form :form="inline">
    <a-form-item
      label="楼层"
      :labelCol="{lg: {span: 7}, sm: {span: 7}}"
      :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
      <a-select
        name="floorNo"
        v-decorator="[
          'floorNo',
          { rules: [{ required: true, message: '请选择楼层' }] },
        ]"
      >
        <a-select-option v-for="(item,index) in diagnosisType" :key="item.no" :value="index">
          {{ item.title }}
        </a-select-option>
      </a-select>
    </a-form-item>
  </a-form>
</template>
