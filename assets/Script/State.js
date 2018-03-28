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
        gameManager.logicSpeed = 0
        gameManager.playerNode.getComponent('Player').vHorz = 0
        gameManager.playerNode.getComponent('Player').vVert = 0
        gameManager.overScoreNode.active = true
        gameManager.overScoreNode.getComponent(cc.Label).string = '成绩为：' + gameManager.scoreNode.getComponent(cc.Label).string + "米"
        gameManager.buttonRestart.active = true
        if(gameManager.lineNode != null)
        {
            gameManager.lineNode.destroy()
            gameManager.lineNode = null
        }
    }
    else if(state == STATE_MAIN_MENU)
    {
        gameManager.bestScoreNode.active = true
        //显示引导动画
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
        gameManager.buttonRestart.active = false
    }
    else if(state == STATE_MAIN_MENU)
    {
        cc.log('隐藏')
        gameManager.bestScoreNode.active = false
        //隐藏引导动画
    }
}