wx.onMessage(data => {
  console.log('传入的得分' + data.score)
  /* {
    text: 'hello',
    year: 2018
  } */

  let sharedCanvas = wx.getSharedCanvas()
  console.log(sharedCanvas.width + " " + sharedCanvas.height)
  let context = sharedCanvas.getContext('2d')
  context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height)

  context.fillStyle = 'white'
  //context.fillRect(0, 0, 100, 100)
  context.font = "20px Georgia";
  context.fillText('最高记录：', 5, 20)
  //context.fillText("Hello World!", 55, 55)

  var score = 0
  if(data.score)
    score = data.score

  var kvDatalist = new Array()
  kvDatalist.push('score')
  wx.getFriendCloudStorage(
    {
      keyList: kvDatalist,
      success: function (data1) {
        console.log("成功取得历史记录")
        //console.log(data1.errMsg)
        //console.log(data1.data)
        //console.log(data1.data[0].KVDataList[0].key)
        //console.log(data1.data[0].KVDataList[0].value)
        var record = parseInt(data1.data[0].KVDataList[0].value)
        if(record >= score)
        {
          console.log('历史记录更大' + record)
          context.fillText(record.toString(), 105, 20)
        }
        else
        {
          console.log('历史记录更小' + record)
          var kv1 = new Array();
          kv1.push({ key: "score", value: score.toString()});

          wx.setUserCloudStorage({
            KVDataList: kv1,
            success: function () { console.log("成功写入历史记录") },
            fail: function () { console.log("失败写入历史记录") },
            complete: function () { console.log("完成写入历史记录") }
          })
          context.fillText(score.toString(), 105, 20)
        }
        //context.fillText(data1.data[0].KVDataList[0].value, 105, 25)
        //var img = wx.createImage()
        //img.src = data1.data[0].avatarUrl
        //img.onload = function () {
          //context.drawImage(img, 333, 85, 50, 50)
        //}
      },
      fail: function () 
      { console.log("失败取得历史记录") 
      },
      complete: function () { console.log("完成取得历史记录") }

    })
  //context.fillText(score.toString(), 105, 25)
})