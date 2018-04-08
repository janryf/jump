export var STATE_NORMAL = 0
export var STATE_PAUSE = 1
export var STATE_STAY = 2
export var STATE_PREPAIR_DEAD = 3
export var STATE_DEAD = 4
export var STATE_MAIN_MENU = 5

export function enterState(gameManager, state)
{
    if(state == STATE_NORMAL)
    {

    }
    else if(state == STATE_PAUSE)
    {

    }
    else if(state == STATE_STAY)
    {
        
    }
    else if(state == STATE_PREPAIR_DEAD)
    {
        gameManager.logicSpeed = 0
        gameManager.playerNode.getComponent('Player').vHorz = 0
        gameManager.playerNode.getComponent('Player').vVert = 0
        gameManager.playerNode.getComponent(cc.Animation).play('animDead')
    }
    else if(state == STATE_DEAD)
    {
        gameManager.playSound('over')
        gameManager.logicSpeed = 0
        gameManager.playerNode.getComponent('Player').vHorz = 0
        gameManager.playerNode.getComponent('Player').vVert = 0
        gameManager.overScoreNode.active = true
        gameManager.overScoreBg.active = true
        gameManager.overScoreNode.getComponent(cc.Label).string = '成绩为：' + gameManager.scoreNode.getComponent(cc.Label).string
        gameManager.buttonRestart.active = true
        if(gameManager.lineNode != null)
        {
            gameManager.lineNode.destroy()
            gameManager.lineNode = null
        }

        if(gameManager.wechat == 1)
        {

            
            var kvDataList = new Array();
            kvDataList.push({key:"highestScore",value:"12321"});

            wx.setUserCloudStorage({KVDataList:kvDataList,
            success:function(){console.log("成功")},
            fail:function(){console.log("失败")},
            complete:function(){console.log("完成")}
            })
        }
    }
    else if(state == STATE_MAIN_MENU)
    {
        gameManager.logoNode.active = true
        gameManager.guideNode.active = true
        gameManager.bestScoreNode.active = false
        gameManager.scoreNode.active = false
        gameManager.scoreBg.active = false
    }
}

export function leaveState(gameManager, state)
{
    if(state == STATE_NORMAL)
    {
        gameManager.showSpeedLine(false)
    }
    else if(state == STATE_PAUSE)
    {

    }
    else if(state == STATE_STAY)
    {
        
    }
    else if(state == STATE_PREPAIR_DEAD)
    {
        
    }
    else if(state == STATE_DEAD)
    {
        gameManager.overScoreNode.active = false
        gameManager.overScoreBg.active = false
        gameManager.buttonRestart.active = false
    }
    else if(state == STATE_MAIN_MENU)
    {
        gameManager.logoNode.active = false
        gameManager.guideNode.active = false
        gameManager.scoreNode.active = true
        gameManager.scoreBg.active = true
    }
}