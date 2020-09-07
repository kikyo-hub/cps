<template>
  <div>
    <reportContentPart101/>
    <reportContentPart201/>
    <reportContentPart301/>
    <reportContentPart401/>
  </div>
</template>

<script>

import reportContentPart101 from './content/reportContentPart101'
import reportContentPart201 from './content/reportContentPart201'
import reportContentPart301 from './content/reportContentPart301'
import reportContentPart401 from './content/reportContentPart401'

    export default {
        name: 'ReportContent',
      components: {
        reportContentPart101,
        reportContentPart201,
        reportContentPart301,
        reportContentPart401
      }
    }
</script>

<style scoped>

</style>
