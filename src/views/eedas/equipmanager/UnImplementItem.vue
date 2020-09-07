<template>
  <div style="width: 100%;height:100%;min-height:702px;">
    <h3 style="margin: '16px 0'">
      该功能尚未实现,请联系系统管理员! <a @click="toAdmin">@系统管理员</a>
    </h3>
    <a-card :hidden="hidden" style="max-height:480px">
      <a-comment>
        <div slot="content">
          <a-form-item>
            <a-textarea :rows="4" :value="value" @change="handleChange" style="max-height:380px;min-height:50px"/>
          </a-form-item>
          <a-form-item>
            <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
              提交
            </a-button>
          </a-form-item>
        </div>
      </a-comment>
    </a-card>
  </div>
</template>

<script>

export default {
  props: {
  },
  data () {
    return {
      submitting: false,
      value: '',
      hidden: true
    }
  },
  created () {
    this.hidden = true
  },
  mounted () {
  },
  methods: {
    handleSubmit () {
      if (!this.value) {
        return
      }
      this.submitting = true
      setTimeout(() => {
        this.submitting = false
        this.value = ''
      }, 1000)
    },
    handleChange (e) {
      this.value = e.target.value
    },
    toAdmin () {
      this.hidden = !this.hidden
    }
  }
}
</script>
