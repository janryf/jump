var GameManager = require('GameManager')
var Enemy = require('Enemy')
var State = require('State')

var _bakVVert = 0
var _bakVHorz = 0
var _maxSpeed = 0

cc.Class({
    extends: cc.Component,

    properties: {
        jumpHeight : 0,
        jumpDuration : 0,
        maxMoveSpeed : 0,
        accel : 0,
        vVert : 0,
        vHorz : 6,
        bmouse : false,
        gameManagerNode : {
            default : null,
            type : cc.Node , 
        },
        gameManager : null,
        stayTimeout : 0.7,
        jumpAudio: {
            default: null,
            url: cc.AudioClip
        },
        orgX : 0,//用于保存在上一帧里所处的位置
        orgY : 0,
        rushNode : {
            default : null,
            type : cc.Node , 
        },
    },

    onLoad ()
     {
     },

    start () {
        //this.vVert = -6
        this.node.on('touchstart', this.onMouseDown.bind(this))
        this.gameManager = this.gameManagerNode.getComponent('GameManager')
        this.restart()
        this.rushNode.getComponent(cc.Animation).play('rushAnim')
        this.rushNode.active = false
    },

    //0为左边，1为右边
    toward(direction)
    {
        if(direction == 0)
        {
            this.node.scaleX = Math.abs(this.node.scaleX)
            //this.node.anchorX = 1
        }
        else
        {
            this.node.scaleX = -Math.abs(this.node.scaleX)
            //this.node.anchorX = 0
        }
    },

    restart()
    {
        this.node.x = 0
        this.node.y = -200
        this.vHorz = 0
        this.vVert = 0
        this.getComponent(cc.Animation).play('animFall')
    },

    onCollisionEnter: function (other, self) 
    {
        //this.node.color = cc.Color.RED;
        //this.touchingNumber ++;
        cc.log(other);
    },

    onMouseDown()
    {
        //this.vVert = Math.sqrt(2 * -9.8 * this.node.y / 30)
        //this.gameManager.logicSpeed = -this.node.y / this.node.getParent().height
    },

    setStayData(vVert, vHorz, maxSpeed)
    {
        //cc.log(logicSpeed + " " + vVert + " " + vHorz)
        _bakVVert = vVert
        _bakVHorz = vHorz
        _maxSpeed = maxSpeed
        this.vVert = 0
        this.vHorz = 0
        this.gameManager.setLogicSpeed(0)
        this.stayTimeout = this.gameManager.STAY_TIME
        this.getComponent(cc.Animation).play('animStay')
    },

    up(isEnemy)
    {
        //this.node.x = this.orgX
        //this.node.y = crashUp + this.node.height * this.node.scaleY + 1
        if(isEnemy)
            cc.audioEngine.playEffect(this.gameManager.audioCrash, false);
        this.vVert = Math.abs(this.vVert)
    },

    right(isEnemy)
    {
        if(isEnemy)
            cc.audioEngine.playEffect(this.gameManager.audioCrash, false);
        this.toward(1)
        //this.node.x = crashRight + 1
        //this.node.y = this.orgY
        //this.vHorz = Math.min(this.vHorz + this.gameManager.BOUNCE_OFF, 0)
        this.vHorz = 0.5 * Math.abs(this.vHorz)
        if(this.vHorz < 200)
            this.vHorz = 200
        this.rushNode.active = false
    },

    down(isEnemy)
    {
        if(isEnemy)
            cc.audioEngine.playEffect(this.gameManager.audioCrash, false);
        this.vVert = -0.1 * Math.abs(this.vVert)
        this.getComponent(cc.Animation).play('animFall')
        this.gameManager.showSpeedLine(false)
    },

    left(isEnemy)
    {
        if(isEnemy)
            cc.audioEngine.playEffect(this.gameManager.audioCrash, false);
        //cc.log('往左弹' + this.node.x + " " + crashLeft)
        this.toward(0)
        //cc.log('往左弹---' + this.node.x + " " + crashLeft)
        //this.node.x = crashLeft - this.node.width * Math.abs(this.node.scaleX) / 2 - 1
        //this.node.y = this.orgY
        //this.vHorz = Math.max(this.vHorz - this.gameManager.BOUNCE_OFF, 0)
        this.vHorz = -0.5 * Math.abs(this.vHorz)
        if(this.vHorz > -200)
            this.vHorz = -200
        this.rushNode.active = false
    },

    update (dt) 
    {
        this.orgX = this.node.x
        this.orgY = this.node.y

        if(this.gameManager.getCurState() == State.STATE_STAY)//处理停留状态
        {
            this.stayTimeout -= dt
            if(this.stayTimeout <= 0)//停留时间到，解除停留
            {
                this.gameManager.enterState(State.STATE_NORMAL)
                this.vVert = _bakVVert
                this.vHorz = _bakVHorz
                this.getComponent(cc.Animation).play('animJump')
                cc.audioEngine.playEffect(this.gameManager.audioJump, false);
                if(this.vVert >= _maxSpeed / 2)
                {
                    this.rushNode.active = true
                    this.gameManager.showSpeedLine(true)
                }
                if(this.vHorz > 0)
                    this.toward(1)
                else
                    this.toward(0)
                cc.log('反弹时的速度值' + this.vVert)
            }
            return
        }

        var screenWidth = this.node.getParent().width
        var screenHeight = this.node.getParent().height

        //减慢在高处的停留时间
        var timeValue = 1
        if(this.node.y >= -screenHeight / 4)
        {
            timeValue = 1 + (screenHeight / 4 + this.node.y) * 4 / screenHeight
        }
        dt /= timeValue
        //cc.log(-screenHeight / 2 + " " + this.node.y + '时间' + timeValue)

        var sVert = this.vVert * dt - this.gameManager.GRAVITY / 2 * dt * dt
        //cc.log(sVert)
        var orgY = this.node.y
        var orgVVert = this.vVert
        this.vVert += -this.gameManager.GRAVITY * dt
        //cc.log("速度" + this.vVert)
        if(orgVVert > 0 && this.vVert <= 0)
            if(!this.gameManager.getCurState != State.STATE_STAY)
            {
                this.getComponent(cc.Animation).play('animFall')
                this.gameManager.showSpeedLine(false)
            }

        if(this.gameManager.logicSpeed <= 0)
           this.node.y += sVert
        if(this.node.y >= 0)
        {
            this.node.y = 0
            this.gameManager.setLogicSpeed(sVert)
        }
        else
        {
            this.gameManager.setLogicSpeed(0)
        }

        if(sVert <= 0)
        {
            this.rushNode.active = false
        }

        if(this.gameManager.getCurState() == State.STATE_DEAD)
            return

        if(this.gameManager.score == 0)
        {
            if(this.node.y < -screenHeight / 2 + 320)
            {
                this.vVert = Math.abs(this.vVert)
                if(!this.stay)
                    this.getComponent(cc.Animation).play('animJump')
            }
        }
        else
        {
            if(this.node.y < -screenHeight / 2)
                this.gameManager.enterState(State.STATE_DEAD)
        }

        var sHorz = this.vHorz * dt
        this.node.x += sHorz
        //cc.log(this.node.x)
        //cc.log(this.node.x + " " + (screenWidth / 2 - this.node.width * this.node.scaleX / 2) + " " + this.node.width)
        if(this.node.x < -screenWidth / 2 + this.node.width * Math.abs(this.node.scaleX) / 2)
		{
			this.gameManager.clearCrashFlag()
            this.right(false)
		}
        else if(this.node.x > screenWidth / 2 - this.node.width * Math.abs(this.node.scaleX) / 2)
		{
			this.gameManager.clearCrashFlag()
            this.left(false)
		}
    },  
});
