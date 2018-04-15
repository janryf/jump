var playerID1 = null
var playerID2 = null

wx.onMessage(data => {
  if(data.func == 'getPlayerInfo')
  {
    wx.getUserInfo({
      withCredentials:true,
      openIdList: ['selfOpenId'],
      success: function (res) {
        console.log("玩家信息")
        console.log(res)
        playerID1 = res.data[0].nickName
        playerID2 = res.data[0].avatarUrl
      }
    })
  }
  else if(data.func == 'showRecord')
  {
    console.log('传入的得分' + data.score)
    let sharedCanvas = wx.getSharedCanvas()
    let width = sharedCanvas.width
    let height = sharedCanvas.height
    console.log('分辨率：' + sharedCanvas.width + " " + sharedCanvas.height)
    let context = sharedCanvas.getContext('2d')
    context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height)

    context.fillStyle = 'white'
    context.font = "15px Arial";
    let recordString = '最高记录：'

    var score = 0
    if (data.score)
      score = data.score

    var kvDatalist = new Array()
    kvDatalist.push('score')
    wx.getFriendCloudStorage(
      {
        keyList: kvDatalist,
        success: function (data1) {
          console.log("成功取得历史记录")
          console.log(data1.data)
          var record = 0
          if (data1.data && data1.data.length > 0)
          {
            for(var i = 0; i < data1.data.length; i++)
            {
              if (data1.data[i].nickname == playerID1 && data1.data[i].avatarUrl == playerID2)
              {
                var kv = data1.data[i].KVDataList
                for(var j = 0; j < kv.length; j++)
                {
                  if(kv[j].key == "score")
                  {
                    record = parseInt(kv[j].value)
                    break
                  }
                }
              }
            }
          }
          if (record >= score) {
            console.log('历史记录更大' + record)
            context.fillText(recordString + record.toString(), width / 3, height / 3)
          }
          else {
            console.log('历史记录更小' + record)
            var kv1 = new Array();
            kv1.push({ key: "score", value: score.toString() });

            wx.setUserCloudStorage({
              KVDataList: kv1,
              success: function () { console.log("成功写入历史记录") },
              fail: function () { console.log("失败写入历史记录") },
              complete: function () { console.log("完成写入历史记录") }
            })
            context.fillText(recordString + score.toString(), width / 3, height / 3)
          }
          //context.fillText(data1.data[0].KVDataList[0].value, 105, 25)
          //var img = wx.createImage()
          //img.src = data1.data[0].avatarUrl
          //img.onload = function () {
          //context.drawImage(img, 333, 85, 50, 50)
          //}
        },
        fail: function () {
          console.log("失败取得历史记录")
        },
        complete: function () { console.log("完成取得历史记录") }

      })
  }
  else if(data.func == 'showRank')
  {
    //page
    let sharedCanvas = wx.getSharedCanvas()
    let width = sharedCanvas.width
    let height = sharedCanvas.height
    console.log('分辨率：' + sharedCanvas.width + " " + sharedCanvas.height)
    let context = sharedCanvas.getContext('2d')
    context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height)
  }
})