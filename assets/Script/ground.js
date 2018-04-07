//用来表示背景，最重要的功能是滚动和在上面画出反弹线
var Line = require('Line')
var State = require('State')

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

    start () 
    {
        this.node.on('touchstart', this.touchStart.bind(this))
        this.node.on('touchmove', this.touchMove.bind(this))
    },

    initData(gameManager, stickPref)
    {
        this.gameManager = gameManager
        this.stickStraight = stickPref
    },

    touchStart(event)
    {
        if(this.gameManager.getCurState() != State.STATE_NORMAL && this.gameManager.getCurState() != State.STATE_MAIN_MENU)
            return

        if(this.gameManager.getCurState() == State.STATE_MAIN_MENU)
        {
            this.gameManager.bkMusic = cc.audioEngine.play(this.gameManager.audioBk, true);
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
        this.gameManager.getLineNode().setPosition(this.startPos.x - 540, this.startPos.y - 960)
        this.gameManager.node.getParent().addChild(this.gameManager.getLineNode())
        this.gameManager.getLineNode().width = this.gameManager.LINE_LENGTH_MIN//给最小长度
        this.gameManager.getLineNode().getComponent('Line').gameManager = this.gameManager

        //if(this.gameManager.lineNode != null)
          //  this.gameManager.lineNode.destroy()
        //this.gameManager.lineNode = this.arrow
    },

    touchMove(event)
    {
        if(this.gameManager.getCurState() != State.STATE_NORMAL && this.gameManager.getCurState() != State.STATE_MAIN_MENU)
            return
        var opos = event.getLocation()
        var pos = cc.p(opos.x, opos.y)
        //向量差计算,结束点-开始点，向量的指向是朝着结束点  
        var posSub = pos.sub(this.startPos);  
        //向量的角度计算，cc.pToAngle是获得弧度值，角度 = 弧度/PI*180  
        var angle = cc.pToAngle(posSub) / Math.PI * 180  
        this.gameManager.lineNode.rotation = -angle
        var distance = cc.pDistance(this.startPos, pos)
        if(distance < this.gameManager.LINE_LENGTH_MIN)
            distance = this.gameManager.LINE_LENGTH_MIN
        if(distance > this.gameManager.LINE_LENGTH_MAX)
            distance = this.gameManager.LINE_LENGTH_MAX
        this.gameManager.lineNode.width = distance
        //cc.log("角度" + -angle)
    },

    update (dt) {},
});
