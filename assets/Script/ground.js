//用来表示背景，最重要的功能是滚动和在上面画出反弹线
var Line = require('Line')
var State = require('State')
var Config = require('Config')

cc.Class({
    extends: cc.Component,

    properties: {
        startPos : 0,
        stickStraight : {
            default : null,
            type : cc.Prefab,
        },
        gameManager : null,
    },

    onLoad()
    {
        this.gameManager = cc.find('Canvas/GameManager').getComponent('GameManager')
    },

    start () 
    {
        this.node.on('touchstart', this.touchStart.bind(this))
        this.node.on('touchmove', this.touchMove.bind(this))
    },

    initData(stickPref)
    {
        this.stickStraight = stickPref
    },

    touchStart(event)
    {
        cc.log("touchStart " + this.gameManager)
        if(this.gameManager.getCurState() != State.STATE_NORMAL && this.gameManager.getCurState() != State.STATE_MAIN_MENU)
            return

        var curPos = event.getLocation()
        if(curPos.y >= this.gameManager.node.getParent().height * 3/ 7)
            return

        if(this.gameManager.getCurState() == State.STATE_MAIN_MENU)
        {
            this.gameManager.playSound('bk')
            this.gameManager.enterState(State.STATE_NORMAL)
        }

        if(this.gameManager.getLineNode() != null)
        {
            this.gameManager.getLineNode().destroy()
            this.gameManager.setLineNode(null)
        }
        this.startPos = event.getLocation()
        //console.log(this.startPos.x + ' ' + this.startPos.y)
        this.gameManager.setLineNode(cc.instantiate(this.stickStraight))
        this.gameManager.getLineNode().setPosition(this.startPos.x - 540, this.startPos.y - this.gameManager.node.getParent().height / 2)
        this.gameManager.node.getParent().addChild(this.gameManager.getLineNode())
        this.gameManager.getLineNode().width = Config.LINE_LENGTH_MIN//给最小长度

        //if(this.gameManager.lineNode != null)
          //  this.gameManager.lineNode.destroy()
        //this.gameManager.lineNode = this.arrow
    },

    touchMove(event)
    {
        if(this.gameManager.getCurState() != State.STATE_NORMAL && this.gameManager.getCurState() != State.STATE_MAIN_MENU)
            return
        var opos = event.getLocation()
        if(opos.y >= this.gameManager.node.getParent().height * 3/ 7)
            return
        var pos = cc.p(opos.x, opos.y)
        //向量差计算,结束点-开始点，向量的指向是朝着结束点  
        var posSub = pos.sub(this.startPos);  
        //向量的角度计算，cc.pToAngle是获得弧度值，角度 = 弧度/PI*180  
        var angle = cc.pToAngle(posSub) / Math.PI * 180  
        this.gameManager.lineNode.rotation = -angle
        var distance = cc.pDistance(this.startPos, pos)
        if(distance < Config.LINE_LENGTH_MIN)
            distance = Config.LINE_LENGTH_MIN
        if(distance > Config.LINE_LENGTH_MAX)
            distance = Config.LINE_LENGTH_MAX
        this.gameManager.lineNode.width = distance
        //cc.log("角度" + -angle)
    },

    update (dt) {},
});
