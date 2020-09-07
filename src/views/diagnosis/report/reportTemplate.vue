<template>
  <div >
    <card>
      <reportHead/>
      <reportContent/>
      <reportTail/>
    </card>
  </div>
</template>

<script>
  import reportHead from './reportHead'
  import reportContent from './reportContent'
  import reportTail from './reportTail'

  export default {
      name: 'ReportTemplate',
      components: {
        reportHead,
        reportContent,
        reportTail
      },
        props: {
          reportData: {
            type: Object,
            default: null
          }
        },
      data () {
        return {

        }
      },
      created () {

      },
      methods: {

      },
      watch: {

      },
      computed: {

      }
    }
</script>

<style scoped>

</style>
