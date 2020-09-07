// // 导出页面为PDF格式
// import html2canvas from 'html2canvas'
// import JSPDF from 'jspdf'
// export default {
//   install (Vue, options) {
//     Vue.prototype.ExportSavePdf = function (htmlTitle, currentTime) {
//        // 导出之前先将滚动条置顶,不然会出现数据不全的现象
//        window.pageYOffset = 0
//        document.documentElement.scrollTop = 0
//        document.body.scrollTop = 0
//        var element = document.getElementById('pdfCentent')
//        element.style.background = '#FFFFFF'
//        html2canvas(element, {
//         logging: false,
//         dpi: window.devicePixelRatio * 4, // 将分辨率提高到特定的DPI 提高四倍
//         scale: 4, // 按比例增加分辨率
//         element: element,
//         backgroundColor: '#ffffff',
//         allowTaint: true,
//         useCORS: true
//       }).then(function (canvas) {
//         var pdf = new JSPDF('p', 'mm', 'a4') // A4纸，纵向
//         pdf.setFontSize(30) // 字体大小
//         // pdf.text(20, 30, pdf)
//         var ctx = canvas.getContext('2d')
//         var a4w = 170; var a4h = 257 // A4大小，210mm x 297mm，四边各保留20mm的边距，显示区域170x257
//         var imgHeight = Math.floor(a4h * canvas.width / a4w) // 按A4显示比例换算一页图像的像素高度
//         var renderedHeight = 0
//         var options = { pagesplit: true }

//         while (renderedHeight < canvas.height) {
//           var page = document.createElement('canvas')
//           page.width = canvas.width
//           page.height = Math.min(imgHeight, canvas.height - renderedHeight)// 可能内容不足一页

//           // 用getImageData剪裁指定区域，并画到前面创建的canvas对象中
//           page.getContext('2d').putImageData(ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0)
//           pdf.addImage(page.toDataURL('image/jpeg', 1.0), 'JPEG', 10, 10, a4w, Math.min(a4h, a4w * page.height / page.width)) // 添加图像到页面，保留10mm边距

//           renderedHeight += imgHeight
//           if (renderedHeight < canvas.height) { pdf.addPage(element, options, function () {}) }// 如果后面还有内容，添加一个空页
//           // delete page;
//         }
//         pdf.save(htmlTitle + currentTime)
//       })

//       // var element = document.getElementById('pdfContent')
//       // var c = document.createElement('canvas')// 创建照片
//       // var opts = {
//       //   scale: 2,
//       //   canvas: c,
//       //   logging: true,
//       //   width: element.clientWidth,
//       //   height: element.clientHeight
//       // }
//       // // 照片高度和宽度是页面元素的两倍
//       // c.width = element.clientWidth * 2
//       // c.height = element.clientHeight * 2
//       // c.getContext('2d').scale(2, 2)
//       // html2canvas(element, opts)
//       // .then(function (canvas) {
//       //   const contentWidth = canvas.width
//       //   const contentHeight = canvas.height
//       //   const pageHeight = contentWidth / 592.28 * 841.89
//       //   let leftHeight = contentHeight
//       //   let position = 0
//       //   const imgWidth = 595.28
//       //   const imgHeight = 592.28 / contentWidth * contentHeight
//       //   const pageData = canvas.toDataURL('image/jpeg', 1.0)
//       //   const PDF = new JSPDF('', 'pt', 'a4')
//       //   if (leftHeight < pageHeight) {
//       //     // 第一个20是img和pdf页面的左边距，第二个20是img与pdf页面的上边距
//       //     PDF.addImage(pageData, 'JPEG', 20, 20, imgWidth, imgHeight)
//       //   } else {
//       //     while (leftHeight > 0) {
//       //       PDF.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight)
//       //       leftHeight -= pageHeight
//       //       position -= 841.89
//       //       if (leftHeight > 0) {
//       //         PDF.addPage()
//       //       }
//       //     }
//       //   }
//       //   PDF.save(htmlTitle + currentTime)
//       // })

//     //   var element = document.getElementById('pdfCentent') // 这个dom元素是要导出pdf的div容器
//     //   var w = this.element.width() // 获得该容器的宽
//     //   var h = this.element.height() // 获得该容器的高
//     //   // var offsetTop = element.offset().top // 获得该容器到文档顶部的距离
//     //   // var offsetLeft = element.offset().left // 获得该容器到文档最左的距离
//     //   var canvas = document.createElement('canvas')
//     //   canvas.width = w * 2 // 将画布宽&&高放大两倍
//     //   canvas.height = h * 2
//     //   var context = canvas.getContext('2d')
//     //   var scale = 2
//     //   context.scale(2, 2)
//     // //  context.translate(-offsetLeft - abs, -offsetTop);

//     //   var opts = {
//     //       scale: scale,
//     //       canvas: canvas,
//     //       width: w,
//     //       height: h,
//     //       useCORS: true,
//     //       background: '#FFF'
//     //   }

//     //   html2canvas(element, opts).then(function (canvas) {
//     //       // allowTaint: false
//     //       // taintTest: false
//     //       var contentWidth = canvas.width
//     //       var contentHeight = canvas.height
//     //       // 一页pdf显示html页面生成的canvas高度;
//     //       var pageHeight = contentWidth / 592.28 * 841.89
//     //       // 未生成pdf的html页面高度
//     //       var leftHeight = contentHeight
//     //       // 页面偏移
//     //       var position = 0
//     //       // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
//     //       var imgWidth = 595.28
//     //       var imgHeight = 592.28 / contentWidth * contentHeight

//     //       var pageData = canvas.toDataURL('image/jpeg', 1.0)
//     //    //   var oCanvas = document.getElementById("print");
//     //      // Canvas2Image.saveAsJPEG(oCanvas);
//     //       var pdf = new JSPDF('', 'pt', 'a4')

//     //       // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
//     //       // 当内容未超过pdf一页显示的范围，无需分页
//     //       if (leftHeight < pageHeight) {
//     //           pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
//     //       } else { // 分页
//     //           while (leftHeight > 0) {
//     //               pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
//     //               leftHeight -= pageHeight
//     //               position -= 841.89
//     //               // 避免添加空白页
//     //               if (leftHeight > 0) {
//     //                   pdf.addPage()
//     //               }
//     //           }
//     //       }
//     //       pdf.save(htmlTitle + currentTime)
//     //    })

//       // 清晰度更高
//       // var downPdf = document.getElementById('pdfCentent')
//       // html2canvas(downPdf, {
//       //      logging: false,
//       //      dpi: window.devicePixelRatio * 4, // 将分辨率提高到特定的DPI 提高四倍
//       //      scale: 4 // 按比例增加分辨率
//       //              }).then(function (canvas) {
//       //                   var contentWidth = canvas.width
//       //                   var contentHeight = canvas.height

//       //                   // 一页pdf显示html页面生成的canvas高度;
//       //                   var pageHeight = contentWidth / 592.28 * 841.89
//       //                   // 未生成pdf的html页面高度
//       //                   var leftHeight = contentHeight
//       //                   // pdf页面偏移
//       //                   var position = 0
//       //                   // html页面生成的canvas在pdf中图片的宽高（a4纸的尺寸[595.28,841.89]）
//       //                   var imgWidth = 595.28
//       //                   var imgHeight = 592.28 / contentWidth * contentHeight

//       //                   var pageData = canvas.toDataURL('image/jpeg', 1.0)
//       //                   var pdf = new JSPDF('', 'pt', 'a4')

//       //                   // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
//       //                   // 当内容未超过pdf一页显示的范围，无需分页
//       //                   if (leftHeight < pageHeight) {
//       //                       pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
//       //                   } else {
//       //                       while (leftHeight > 0) {
//       //                           pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
//       //                           leftHeight -= pageHeight
//       //                           position -= 841.89
//       //                           // 避免添加空白页
//       //                           if (leftHeight > 0) {
//       //                               pdf.addPage()
//       //                           }
//       //                       }
//       //                   }
//       //                   pdf.save(htmlTitle + currentTime)
//       //                   // 背景设为白色（默认为黑色）
//       //                   // background: '#fff'
//       //              })

// //       var mainRight = document.getElementById('pdfCentent')
// //             html2canvas(mainRight, {
// //               allowTaint: true,
// //               scale: 2 // 提升画面质量，但是会增加文件大小
// //             }).then(function (canvas) {
// //   var contentWidth = canvas.width
// //   var contentHeight = canvas.height

// //   var pageData = canvas.toDataURL('image/jpeg', 0.4)

// //   var pdfWidth = (contentWidth + 10) / 2 * 0.75
// //   var pdfHeight = (contentHeight + 200) / 2 * 0.75 // 500为底部留白

// //   var imgWidth = pdfWidth
// //   var imgHeight = (contentHeight / 2 * 0.75) // 内容图片这里不需要留白的距离

// //   var pdf = new JSPDF('', 'pt', [pdfWidth, pdfHeight])
// //   pdf.addImage(pageData, 'jpeg', 0, 0, imgWidth, imgHeight)
// //   // pdf.save('report_pdf_' + new Date().getTime() + '.pdf')
// //   pdf.save(htmlTitle + currentTime)
// // })

//   // var element = document.getElementById('pdfCentent')
//   // html2canvas(element, {
//   //   logging: false,
//   //   background: '#fff',
//   //   allowTaint: true,
//   //   taintTest: false,
//   //   height: element.scrollHeight + 10, //
//   //   width: element.scrollWidth, //
//   //   async: false
//   // }).then(function (canvas) {
//   //     var contentWidth = canvas.width
//   //     var contentHeight = canvas.height
//   //     console.log('contentWidth', contentWidth)
//   //     console.log('contentHeight', contentHeight)

//   //     // 一页pdf显示html页面生成的canvas高度;
//   //     var pageHeight = contentWidth / 592.28 * 841.89
//   //     // 未生成pdf的html页面高度
//   //     var leftHeight = contentHeight
//   //     // 页面偏移
//   //     var position = 0
//   //     // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
//   //     var imgWidth = 595.28
//   //     var imgHeight = 592.28 / contentWidth * contentHeight
//   //     var pageData = canvas.toDataURL('image/jpeg', 1.0)
//   //     var pdf = new JSPDF('', 'pt', 'a4')
//   //     // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
//   //     // 当内容未超过pdf一页显示的范围，无需分页
//   //     if (leftHeight < pageHeight) {
//   //         pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
//   //     } else {
//   //         while (leftHeight > 0) {
//   //             // arg3-->距离左边距;arg4-->距离上边距;arg5-->宽度;arg6-->高度
//   //             pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
//   //             leftHeight -= pageHeight
//   //             position -= 841.89
//   //             // 避免添加空白页
//   //             if (leftHeight > 0) {
//   //                 pdf.addPage()
//   //             }
//   //         }
//   //     }
//   //     // pdf.save('流程表单信息.pdf')
//   //   pdf.save(htmlTitle + currentTime)
//   // })

//   // var target = document.getElementsByClassName('right-aside')[0]
//   // target.style.background = '#FFFFFF'

//   // html2canvas(target, {
//   //   onrendered: function (canvas) {
//   //       var contentWidth = canvas.width
//   //       var contentHeight = canvas.height

//   //       // 一页pdf显示html页面生成的canvas高度;
//   //       var pageHeight = contentWidth / 592.28 * 841.89
//   //       // 未生成pdf的html页面高度
//   //       var leftHeight = contentHeight
//   //       // 页面偏移
//   //       var position = 0
//   //       // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
//   //       var imgWidth = 595.28
//   //       var imgHeight = 592.28 / contentWidth * contentHeight

//   //       var pageData = canvas.toDataURL('image/jpeg', 1.0)

//   //       var pdf = new JSPDF('', 'pt', 'a4')

//   //       // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
//   //       // 当内容未超过pdf一页显示的范围，无需分页
//   //       if (leftHeight < pageHeight) {
//   //       pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
//   //       } else {
//   //           while (leftHeight > 0) {
//   //               pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
//   //               leftHeight -= pageHeight
//   //               position -= 841.89
//   //               // 避免添加空白页
//   //               if (leftHeight > 0) {
//   //                 pdf.addPage()
//   //               }
//   //           }
//   //       }

//   //       pdf.save(htmlTitle + currentTime)
//   //   }
//   // })
//     }
//   }
// }

// // utils -> htmlToPdf.js
// // 导出页面为PDF格式
// // import html2Canvas from 'html2canvas'
// // import JsPDF from 'jspdf'
// //   export default {
// //    install (Vue, options) {
// //      Vue.prototype.ExportSavePdf = function (dom, htmlTitle) {
// //        var title = htmlTitle
// //        var c = document.getElementById('pdfCentent')
// //        var opts = {
// //          scale: 2,
// //          canvas: c,
// //          logging: true,
// //          width: document.querySelector(dom).width,
// //          height: document.querySelector(dom).height
// //        }
// //        c.width = document.querySelector(dom).width * 2
// //        c.height = document.querySelector(dom).height * 2
// //        c.getContext('2d').scale(2, 2)
// //        html2Canvas(document.querySelector(dom), opts).then(function (canvas) {
// //          const contentWidth = canvas.width
// //          const contentHeight = canvas.height
// //          const pageHeight = contentWidth / 592.28 * 841.89
// //          let leftHeight = contentHeight
// //          let position = 0
// //          const imgWidth = 595.28
// //          const imgHeight = 592.28 / contentWidth * contentHeight
// //          const pageData = canvas.toDataURL('image/jpeg', 1.0)
// //          const PDF = new JsPDF('', 'pt', 'a4')
// //          if (leftHeight < pageHeight) {
// //            PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
// //          } else {
// //            while (leftHeight > 0) {
// //              PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
// //              leftHeight -= pageHeight
// //              position -= 841.89
// //              if (leftHeight > 0) {
// //                PDF.addPage()
// //              }
// //            }
// //         }
// //          PDF.save(title + '.pdf')
// //        }
// //        )
// //      }
// //    }
// //  }

// /* eslint-disable */
// //不使用JQuery版的
// // import html2canvas from 'html2canvas';
// // import JsPDF from 'jspdf';

// // /**
// //  * @param  ele          要生成 pdf 的DOM元素（容器）
// //  * @param  padfName     PDF文件生成后的文件名字
// //  * */

// // function downloadPDF(ele, pdfName){

// //     let eleW = ele.offsetWidth;// 获得该容器的宽
// //     let eleH = ele.offsetHeight;// 获得该容器的高
// //     let eleOffsetTop = ele.offsetTop;  // 获得该容器到文档顶部的距离
// //     let eleOffsetLeft = ele.offsetLeft; // 获得该容器到文档最左的距离

// //     var canvas = document.createElement("canvas");
// //     var abs = 0;

// //     let win_in = document.documentElement.clientWidth || document.body.clientWidth; // 获得当前可视窗口的宽度（不包含滚动条）
// //     let win_out = window.innerWidth; // 获得当前窗口的宽度（包含滚动条）

// //     if(win_out>win_in){
// //         // abs = (win_o - win_i)/2;    // 获得滚动条长度的一半
// //         abs = (win_out - win_in)/2;    // 获得滚动条宽度的一半
// //         // console.log(a, '新abs');
// //     }
// //     canvas.width = eleW * 2;    // 将画布宽&&高放大两倍
// //     canvas.height = eleH * 2;

// //     var context = canvas.getContext("2d");
// //     context.scale(2, 2);
// //     context.translate(-eleOffsetLeft -abs, -eleOffsetTop);
// //     // 这里默认横向没有滚动条的情况，因为offset.left(),有无滚动条的时候存在差值，因此
// //     // translate的时候，要把这个差值去掉

// //     // html2canvas(element).then( (canvas)=>{ //报错
// //     // html2canvas(element[0]).then( (canvas)=>{
// //     html2canvas( ele, {
// //         dpi: 300,
// //         // allowTaint: true,  //允许 canvas 污染， allowTaint参数要去掉，否则是无法通过toDataURL导出canvas数据的
// //         useCORS:true  //允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。
// //     } ).then( (canvas)=>{
// //         var contentWidth = canvas.width;
// //         var contentHeight = canvas.height;
// //         //一页pdf显示html页面生成的canvas高度;
// //         var pageHeight = contentWidth / 592.28 * 841.89;
// //         //未生成pdf的html页面高度
// //         var leftHeight = contentHeight;
// //         //页面偏移
// //         var position = 0;
// //         //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
// //         var imgWidth = 595.28;
// //         var imgHeight = 595.28/contentWidth * contentHeight;
// //         var pageData = canvas.toDataURL('image/jpeg', 1.0);
// //         var pdf = new JsPDF('', 'pt', 'a4');
// //         //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
// //         //当内容未超过pdf一页显示的范围，无需分页
// //         if (leftHeight < pageHeight) {
// //             //在pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置在pdf中显示；
// //             pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
// //             // pdf.addImage(pageData, 'JPEG', 20, 40, imgWidth, imgHeight);
// //         } else {    // 分页
// //             while(leftHeight > 0) {
// //                 pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
// //                 leftHeight -= pageHeight;
// //                 position -= 841.89;
// //                 //避免添加空白页
// //                 if(leftHeight > 0) {
// //                     pdf.addPage();
// //                 }
// //             }
// //         }
// //         //可动态生成
// //         pdf.save(pdfName);
// //     })
// // }
// // export default {
// //     downloadPDF
// // }

// // 导出页面为PDF格式
// // import html2Canvas from 'html2canvas'
// // import JsPDF from 'jspdf'
// // export default{
// //   install (Vue, options) {
// //     Vue.prototype.ExportSavePdf = function () {
// //       var title = this.htmlTitle  //DPF标题
// //       html2Canvas(document.querySelector('#pdfDom'), {
// //                 allowTaint: true,
// // 		        taintTest: false,
// // 		        useCORS: true,
// // 		        //width:960,
// // 		        //height:5072,
// // 		        dpi: window.devicePixelRatio*4, //将分辨率提高到特定的DPI 提高四倍
// // 		        scale:4 // 按比例增加分辨率
// //       }).then(function (canvas) {
// //         let contentWidth = canvas.width
// //         let contentHeight = canvas.height
// //         let pageHeight = contentWidth / 592.28 * 841.89
// //         let leftHeight = contentHeight
// //         let position = 0
// //         let imgWidth = 595.28
// //         let imgHeight = 592.28 / contentWidth * contentHeight
// //         let pageData = canvas.toDataURL('image/jpeg', 1.0)
// //         let PDF = new JsPDF('', 'pt', 'a4')
// //         if (leftHeight < pageHeight) {
// //           PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
// //         } else {
// //           while (leftHeight > 0) {
// //             PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
// //             leftHeight -= pageHeight
// //             position -= 841.89
// //             if (leftHeight > 0) {
// //               PDF.addPage()
// //             }
// //           }
// //         }
// //         PDF.save(title + '.pdf')
// //       }
// //       )
// //     }
// //   }
// // }
