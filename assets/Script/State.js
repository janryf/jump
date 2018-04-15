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
        gameManager.panelOver.active = true
        gameManager.maskNode.active = true
        gameManager.logicSpeed = 0
        gameManager.playerNode.getComponent('Player').vHorz = 0
        gameManager.playerNode.getComponent('Player').vVert = 0
        gameManager.openNode.active = true
        if(gameManager.lineNode != null)
        {
            gameManager.lineNode.destroy()
            gameManager.lineNode = null
        }

        if(gameManager.wechat == 1)
        {
            var openDataContext = wx.getOpenDataContext()
            openDataContext.postMessage({
                func: 'showRecord',
                score: Math.floor(gameManager.score),
             })
        }
    }
    else if(state == STATE_MAIN_MENU)
    {
        gameManager.panelStart.active = true
        gameManager.panelRank.active = false
        gameManager.panelOver.active = false

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
        gameManager.openNode.active = false
        gameManager.panelOver.active = false
        gameManager.maskNode.active = false
    }
    else if(state == STATE_MAIN_MENU)
    {
        gameManager.panelStart.active = false
        gameManager.scoreNode.active = true
        gameManager.scoreBg.active = true
    }
}