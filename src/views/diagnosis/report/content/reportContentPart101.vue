<template>
  <div class="part1" id="pdfCentent">
    <p align="center" style="margin-top:350px;font-size:35px;font-weight:bolder">编制说明</p>
    <p style="font-size:25px">本报告是诊断人员对客户现场的设备测试结果、客户提供的相关资料进行汇总及分析，在此基础上编制的综合节能分析报告。</P>
    <p style="font-size:25px">报告中提出的节能措施及建议均为方向性建议。</p>
    <p align="center" style="margin-top:20px;font-size:35px;font-weight:bolder">摘要</p>
    <p style="font-size:25px">为推进全社会节能减排， xx 有限公司为 xx 有限公司提供节能咨询、诊断服务，通过现场调查、资料核查和必要的测试，综合分析能源利用现状及 能源管理体系，排查用能方面存在的问题，
      挖掘节能潜力、提出节能措施和建议，为降低能源消耗和生产成本、提高客户经济效益提供指引，实现生产和环境可持续发展。现编制节能诊断报告，主要内容如下：</p>
    <p align="left" style="font-size:30px">第一章 诊断事项说明</p>
    <p align="left" style="font-size:28px">第一节 诊断目的</p>
    <!-- <p style="font-size:25px">（1）全面掌握被诊断企业能源消费结构、主要工艺流程、主要供能设备（特别是淘汰类通用机电设备）情况。</p>
    <p style="font-size:25px">（2）全面了解被诊断企业能源管理体系的建设情况，特别是要对计量器具的配备率、完好率、受检率以及上一年度节能技改项目的计划和完成情况进行客观地评估。</p>
    <p style="font-size:25px">（3）全面检测被诊断企业的合理用电、合理用热、资源综合利用、电能替代其它能源、产品用电单耗评价及重点节能技术与设备适用性评价六个方面的情况。</p>
    <p style="font-size:25px">（4）重点对具有明显行业特色的节能推广技术进行工艺节能诊断，为被诊断企业实施节能改造或合同能源管理项目作好前期调查工作。</p>
    <p style="font-size:25px">（5）电气与电能质量检测，不仅要了解电网注入点电压、电流、功率因子、谐波、电压闪变、三相不平衡等参数情况，还要掌握各馈线回路和主要设备的主要电气参数情况。</p> -->
    <p style="font-size:25px">通过对{{ xx }}有限公司生产现场调查、资料核查和必要的测试，掌握企业能源利用现状及能源管理体系建设情况，检测电能质量和无功补偿情况，分析存在的问题和挖掘潜在的节能空间，
      指导企业提高用能用电的管理水平，促进企业节能减排、降低能源消耗和生产成本、提高企业经济效益，实现“十二五”节能目标，实现生产和环境可持续发展。</p>
    <p align="left" style="font-size:28px">第二节 依据标准</p>
    <p style="font-size:25px">本报告编制依据包括国家、地方现行有关标准、规范、规程、规定，中国南方电网有限责任公司节能诊断相关规范和xx有限公司现有基础资料及数据等。</p>
    <p style="font-size:25px">诊断主要数据来源于客户统计报表、下发的收资表和能源平衡表，现场调查和技术分析，对诊断期内发现问题，在与客户进行充分交流基础上得到客户确认。</p>
    <p style="font-size:25px">《中华人民共和国节约能源法》</p>
    <p style="font-size:25px">《企业能源审计报告和节能规划审核指南》</p>
    <p style="font-size:25px">《关于印发 〈电力需求侧管理办法〉 的通知》（发改运行 [2010]2643 号） </p>
    <p style="font-size:25px">《千家企业节能行动实施方案》</p>
    <p style="font-size:25px">《企业能源审计技术通则》 （GB/T17166－1997）</p>
    <p style="font-size:25px">《节能监测技术通则》 （GB/T15316）</p>
    <p style="font-size:25px">《企业能耗计量与测试导则》 （GB/T6422－1986）</p>
    <p style="font-size:25px">《综合能耗计算通则》 （GB/T2589－1990）</p>
    <p style="font-size:25px">《设备热效率计算通则》 （GB/T2588－1981）</p>
    <p style="font-size:25px">《企业节能量计算方法》 （GB/T13234－1991）</p>
    <p style="font-size:25px">《工业企业能源管理导则》 （GB/T15587－1995）</p>
    <p style="font-size:25px">《用能单位能源计量器具配备与管理通则》 （GB/T17167－2006）</p>
    <p style="font-size:25px">《评价企业合理用热技术导则》 （GB/T3486－1993）</p>
    <p style="font-size:25px">《评价企业合理用电技术导则》 （GB/T3485－1993）</p>
    <p style="font-size:25px">《评价企业合理用水技术导则》 （GB/T7119－1993）</p>
    <p align="left" style="font-size:28px">第三节 诊断方法</p>
    <p style="font-size:25px">(1) 整理收集资料</p>
    <p style="font-size:25px">(2) 现场监测与调查</p>
    <p style="font-size:25px">(3) 召开节能诊断总结会</p>
    <p style="font-size:25px">(4) 数据综合分析</p>
    <p style="font-size:25px">(5) 编制和提交诊断报告</p>
  </div>
</template>

<script>
    export default {
        name: 'ReportContentPart101',
        data () {
          return {
            xx: 'xx'
          }
        }
    }
</script>

<style lang="less" scoped>
.part1{text-indent: 50px;}
</style>
