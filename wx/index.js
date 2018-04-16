var playerID1 = null
var playerID2 = null
var rankList = null
var curPage = 0
var NUMBER_IN_PAGE = 2

function drawRank() {
  let sharedCanvas = wx.getSharedCanvas()
  let width = sharedCanvas.width
  let height = sharedCanvas.height
  let context = sharedCanvas.getContext('2d')
  context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height)
  context.fillStyle = 'white'
  context.font = "18px Arial";

  for (var i = curPage * NUMBER_IN_PAGE; i < (curPage + 1) * NUMBER_IN_PAGE && i < rankList.length; i++) {
    let avatar = rankList[i].avatarUrl
    let nick = rankList[i].nickname
    let userScore = 0
    for (var j = 0; j < rankList[i].KVDataList.length; j++) {
      var kv = rankList[i].KVDataList
      if (kv[j].key == 'score') {
        userScore = parseInt(kv[j].value)
        break
      }
    }
    //context.fillText(data1.data[0].KVDataList[0].value, 105, 25)
    let img = wx.createImage()
    img.src = avatar
    let posY = height / 5 + width / 8 * (i - curPage * NUMBER_IN_PAGE)
    context.fillText((i + 1).toString(), width / 4.6, posY + width / 16)
    context.fillText(nick, width / 2.6, posY + width / 16)
    context.fillText(userScore.toString() + '米', width / 1.5, posY + width / 16)

    console.log(posY)
    img.onload = function () {
      console.log("画" + nick)
      context.drawImage(img, width / 3.6, posY, width / 10, width / 10)
    }
  }
}

function sortRecord(a, b)
{
  let userScoreA = 0
  for (var j = 0; j < a.KVDataList.length; j++) {
    var kv = a.KVDataList
    if (kv[j].key == 'score') {
      userScoreA = parseInt(kv[j].value)
      break
    }
  }
  let userScoreB = 0
  for (var j = 0; j < b.KVDataList.length; j++) {
    var kv = b.KVDataList
    if (kv[j].key == 'score') {
      userScoreB = parseInt(kv[j].value)
      break
    }
  }
  return userScoreB - userScoreA
}

wx.onMessage(data => {
  if (data.func == 'getPlayerInfo') {
    wx.getUserInfo({
      withCredentials: true,
      openIdList: ['selfOpenId'],
      success: function (res) {
        console.log("玩家信息")
        console.log(res)
        playerID1 = res.data[0].nickName
        playerID2 = res.data[0].avatarUrl
      }
    })
  }
  else if (data.func == 'showRecord') {
    console.log('传入的得分' + data.score)
    let sharedCanvas = wx.getSharedCanvas()
    let width = sharedCanvas.width
    let height = sharedCanvas.height
    console.log('分辨率：' + sharedCanvas.width + " " + sharedCanvas.height)
    let context = sharedCanvas.getContext('2d')
    context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height)
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
          if (data1.data && data1.data.length > 0) {
            for (var i = 0; i < data1.data.length; i++) {
              if (data1.data[i].nickname == playerID1 && data1.data[i].avatarUrl == playerID2) {
                var kv = data1.data[i].KVDataList
                for (var j = 0; j < kv.length; j++) {
                  if (kv[j].key == "score") {
                    record = parseInt(kv[j].value)
                    break
                  }
                }
              }
            }
          }
          if (record >= score) {
            console.log('历史记录更大' + record)
            context.fillStyle = 'yellow'
            context.font = "15px Arial";
            context.fillText(recordString + record.toString(), width / 2.8, height / 2.4)
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
            context.fillStyle = 'yellow'
            context.font = "15px Arial";
            context.fillText(recordString + score.toString(), width / 2.8, height / 2.4)
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
  else if (data.func == 'showRank') {
    let sharedCanvas = wx.getSharedCanvas()
    let context = sharedCanvas.getContext('2d')
    context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height)
    console.log('子项' + data.page)
    if (data.page == 'init') {
      curPage = 0
      var kvDatalist = new Array()
      kvDatalist.push('score')
      wx.getFriendCloudStorage({
        keyList: kvDatalist,
        success: function (data1) {
          console.log("成功取得历史记录")
          console.log(data1.data)
          rankList = data1.data
          rankList.sort(sortRecord)
          drawRank()
        }
      })

    }
    else if (data.page == 'prev') {
      console.log("上一页")
      if (curPage > 0)
        curPage--
      drawRank()
    }
    else if (data.page == 'next') {
      console.log("下一页")
      if ((curPage + 1) * NUMBER_IN_PAGE < rankList.length)
        curPage++
      drawRank()
    }
  }
})