var State = require('State')

cc.Class({
    extends: cc.Component,
    properties: {
    },
    gameManager : null,
    orgX : 0,
    orgY : 0,
    vSpeed : 0,
    hSpeed : 0,
    time : 0,
    timeout : 0,
    crashFlag : false,

    onLoad()
    {
        this.gameManager = cc.find('Canvas/GameManager').getComponent('GameManager')
    },

    start () 
    {
        this.timeout = 0
        this.orgX = 0
        this.orgY = 0
        this.crashFlag = false
    },

    setEnemyData(x, y, vSpeed, hSpeed)
    {
        this.node.x = x
        this.node.y = y
        this.vSpeed = vSpeed
        this.hSpeed = hSpeed
        this.timeout = 0
    },

    update (dt) 
    {
        this.orgX = this.node.x
        this.orgY = this.node.y
        if(this.gameManager != null && this.gameManager.logicSpeed > 0)//随着屏幕滚动而出现，下落速度要比屏幕滚动速度更快
        {
            this.node.y -= this.gameManager.logicSpeed * 1.8
            if(this.node.y < -1000)
            {
                this.node.destroy()
                this.gameManager.removeEnemy(this.node)
            }
        }
        if(this.timeout >= 0)
        {
            var screenWidth = this.gameManager.node.getParent().width
            var screenHeight = this.gameManager.node.getParent().height

            var sVert = dt * this.vSpeed
            var sHorz = dt * this.hSpeed
            //cc.log(sHorz)
            this.node.y += sVert
            this.node.x += sHorz 
            if(this.node.x < -screenWidth / 2 + this.node.width / 2)//碰到左右边缘之后折返
            {
                this.node.x = -screenWidth / 2 + this.node.width / 2
                this.hSpeed *= -1
            }
            else if(this.node.x > screenWidth / 2 - this.node.width / 2)
            {
                this.node.x = screenWidth / 2 - this.node.width / 2
                this.hSpeed *= -1
            }
        }
        else
            this.timeout += dt
    },

    //判断两个矩形的位置关系，返回0表示相交，1表示1在2上方，2表示1在2右方，3表示1在2下方，4表示1在2左方。有可能出现类似左上的情况，但这里只需要校验一种就行了
    calcPosRelation(top1, right1, bottom1, left1, top2, right2, bottom2, left2)
    {
        if(this.gameManager.getCurState() != State.STATE_NORMAL)
            return -1
        if(bottom1 > top2)
            return 1
        if(left1 > right2)
            return 2
        if(top1 < bottom2)
            return 3
        if(right1 < left2)
            return 4
        console.log('碰撞：' + ' ' + top1 + ' ' + right1 + ' ' + bottom1 + ' ' + left1 + '|' + top2 + ' ' + right2 + ' ' + bottom2 + ' ' + left2)
        return 0
    }
});
