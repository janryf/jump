// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var State = require('State')

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },
    gameManager : null,
    orgX : 0,
    orgY : 0,
    vSpeed : 0,
    hSpeed : 0,
    time : 0,
    timeout : 0,
    crashFlag : false,

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.timeout = 0
        this.orgX = 0
        this.orgY = 0
        this.crashFlag = false
    },

    setEnemyData(gameManager, x, y, vSpeed, hSpeed)
    {
        this.gameManager = gameManager
        //gameManager.node.getParent().addChild(this.node)
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
        if(this.gameManager != null && this.gameManager.logicSpeed > 0)
        {
            this.node.y -= this.gameManager.logicSpeed * 1.8
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
            if(this.node.x < -screenWidth / 2 + this.node.width / 2)
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
    calcPosRelation(top1, right1, down1, left1, top2, right2, down2, left2)
    {
        if(this.gameManager.getCurState() != State.STATE_NORMAL)
            return -1
        if(down1 > top2)
            return 1
        if(left1 > right2)
            return 2
        if(top1 < down2)
            return 3
        if(right1 < left2)
            return 4
        cc.log('碰撞：' + ' ' + top1 + ' ' + right1 + ' ' + down1 + ' ' + left1 + '|' + top2 + ' ' + right2 + ' ' + down2 + ' ' + left2)
        return 0
    }
});
