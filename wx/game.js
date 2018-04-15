require('libs/weapp-adapter-min');
var Parser = require('libs/xmldom/dom-parser');
window.DOMParser = Parser.DOMParser;
require('libs/wx-downloader.js');
wxDownloader.REMOTE_SERVER_ROOT = "";
require('src/settings');
require('main');

wx.login({
  success : function(res)
  {
    wx.authorize({
      scope: 'scope.userInfo'
    })

    /*
    wx.openSetting({
      success: function (res) {
        console.log("界面弹出来了")
      }
    })
    */

    wx.getSetting({
      success: function (res) 
      {
        var authSetting = res.authSetting
        if (authSetting['scope.userInfo'] === true) 
        {
          console.log("获得授权")
          //wx.getUserInfo({
            //withCredentials: true,
            //success:function(res)
            //{
              //console.log(res)
            //}
          //})
        }
        else if (authSetting['scope.userInfo'] === false) 
        {
          console.log("没获得授权，弹出设置界面")
          wx.openSetting({
            success: function (res) 
            {
              console.log("界面弹出来了")
              wx.getSetting({
                success: function (res) 
                {
                  var authSetting = res.authSetting
                  if (authSetting['scope.userInfo'] === false) 
                  {
                    wx.exitMiniProgram()
                    console.log("退出程序")
                  }
                }
              })
            }
          })
        }
      }
    })
  }
})
