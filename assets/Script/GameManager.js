//中枢类，用于保存一些全局信息，已经各个实体之间的交互，如碰撞检测，背景滚动等
var Player = require('Player')
var Line = require('Line')
var Enemy = require('Enemy')
var EnemyBlock = require('EnemyBlock')
var SpawnData = require('SpawnData')
var State = require('State')

cc.Class({
    extends: cc.Component,

    properties: {
        background1 :{
            default : null,
            type : cc.Node,
        },
        background2 :{
            default : null,
            type : cc.Node,
        },//目前暂时拼两张背景图

        //配置项，全大写加下划线命名
        LINE_LENGTH_MAX : 180,//绳子的最大长度
        LINE_LENGTH_MIN : 35,//绳子的最小长度
        GRAVITY : 6,//重力系数
        STAY_TIME : 0.4,//在绳子上停留的时间
        SPEED_A : 0,
        SPEED_B : 0,
        SPEED_C : 0,
        BOUNCE_OFF : 1,
        
        playerNode :{
            default : null,
            type : cc.Node,
        },
        lineNode :{
            default : null,
            type : cc.Node,
        },
        stickBend : {
            default : null,
            type : cc.Prefab,
        },
        scoreNode : {
            default : null,
            type : cc.Node,
        },
        score : 0,
        overScoreNode : {
            default : null,
            type : cc.Node,
        },
        bestScoreNode : {
            default : null,
            type : cc.Node,
        },

        speedLineNode : {
            default : null,
            type : cc.Node,
        },
        
        buttonRestart:{
            default : null,
            type : cc.Node,
        },
        enemyNode:{
            default : null,
            type : cc.Node,
        },

        backgroundAudio: {
            default: null,
            url: cc.AudioClip
        },
        enemys : [],
        enemyPref : {
            default : null,
            type : cc.Prefab,
        },
        ufoPref : {
            default : null,
            type : cc.Prefab,
        },
        heliPref : {
            default : null,
            type : cc.Prefab,
        },
    },
    logicSpeed : 0,//游戏的逻辑速度，影响得分和背景等滚动速度
    enemyTimeout : 0,// 
    curState : 0, 
    wechat : 0,

    setLogicSpeed(logicSpeed)
    {
        this.logicSpeed = logicSpeed
    },

    onLoad()
    {
        this.curState = -1
        this.wechat = 0
    },

    showSpeedLine(bPlay)
    {
        if(bPlay)
            this.speedLineNode.active = false
        else
        this.speedLineNode.active = false
    },

    start () 
    {
        this.scoreNode.getComponent(cc.Label).string = 0
        this.overScoreNode.active = false
        //cc.audioEngine.playEffect(this.backgroundAudio, true);

        this.buttonRestart.on('touchstart', this.restart.bind(this))
        this.buttonRestart.active = false
        this.speedLineNode.active = false
        this.score = 0
        this.enemyTimeout = 2
        this.enterState(State.STATE_MAIN_MENU)
    },

    restart()
    {
        this.enterState(State.STATE_NORMAL)
        var player = this.playerNode.getComponent('Player')
        player.restart()
        this.score = 0
        this.scoreNode.getComponent(cc.Label).string = 0
        for(var i = 0; i < this.enemys.length; i++)
            this.enemys[i].destroy()
        this.enemys = []

        if(this.wechat == 1)
        {
           var openDataContext = wx.getOpenDataContext()
           openDataContext.postMessage({
            text: 'hello',
            year: (new Date()).getFullYear()
            })
        }
    },

    enterState(state)
    {
        State.leaveState(this, this.curState)
        State.enterState(this, state)
        this.curState = state
    },

    getCurState()
    {
        return this.curState
    },

    setLineNode(line)
    {
        this.lineNode = line
    },

    getLineNode()
    {
        return this.lineNode
    },

    clearCrashFlag()
    {
        for(var i = 0; i < this.enemys.length; i++)
        {
            this.enemys[i].getComponent('Enemy').crashFlag = false
        }
    },

    randomFrom(lowerValue, upperValue)
    {
        return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
    },

    update (dt) 
    {
        if(this.wechat == 1) 
        {
            let openDataContext = wx.getOpenDataContext()
            let sharedCanvas = openDataContext.canvas
      
            let context = canvas.getContext('2d')
            context.drawImage(sharedCanvas, 0, 0)
        }
        
        if(this.logicSpeed > 0)//逻辑速度影响背景卷动和计分
        {
            this.background1.y -= this.logicSpeed
            this.background2.y -= this.logicSpeed
            this.score += this.logicSpeed / 200
            this.scoreNode.getComponent(cc.Label).string = Math.floor(this.score)
            
            //刷障碍物
            if(this.preLogicSpeed > 20 && this.logicSpeed <= 20 && this.enemyTimeout <= 0)
            {
                this.enemyTimeout = 2
                var enemyGroup = SpawnData.getEnemy(this.score)
                for(var i = 0; i < enemyGroup.length; i++)
                {
                    var enemyInfo = enemyGroup[i]
                    var enemy = null
                    if(enemyInfo.name == 'block')
                        enemy = cc.instantiate(this.enemyPref)
                    else if(enemyInfo.name == 'ufo')
                        enemy = cc.instantiate(this.ufoPref)
                    else if(enemyInfo.name == 'heli')
                        enemy = cc.instantiate(this.heliPref)
                    this.enemyNode.addChild(enemy)
                    //this.node.getParent().addChild(enemy)
                    enemy.getComponent("Enemy").setEnemyData(this, enemyInfo.x, enemyInfo.y + 1000, enemyInfo.vSpeed, enemyInfo.hSpeed)
                    this.enemys.push(enemy)
                }
            }
            this.preLogicSpeed = this.logicSpeed
        }
        this.enemyTimeout -= dt 
        if(this.background1.y < -(this.node.getParent().height) / 2)
            this.background1.y += this.background1.height * 2
        if(this.background2.y < -(this.node.getParent().height) / 2)
            this.background2.y += this.background2.height * 2
        
        if(this.curState != State.STATE_NORMAL)
            return//只在normal状态下检测主角跟绳子和障碍物的碰撞

        //检测主角跟反弹线的碰撞
        if(this.lineNode != null)
        {
            var line = this.lineNode.getComponent('Line')
            if(line.actived && line.crashDetect(this.playerNode))//发生碰撞以后，首先播放绳子的动画
            {
                line.actived = false
                this.clearCrashFlag()
                this.lineNode.getComponent(cc.Animation).play('animBend')
                this.lineNode.height = 25
                this.lineNode.y -= 10
                if(this.lineNode.rotation < -90 && this.lineNode.rotation >= -180 || this.lineNode.rotation > 90 && this.lineNode.rotation <= 180)
                    this.lineNode.scaleY = -1
                
                var player = this.playerNode.getComponent('Player')

                var speed = this.SPEED_A * this.score + this.SPEED_B / (this.lineNode.width + 340) - this.playerNode.y / this.SPEED_C
                cc.log("速度值" + speed)
                //cc.log(this.lineNode.rotate)
                var angle = this.lineNode.rotation * Math.PI / 180
                if(this.lineNode.rotation < -90 && this.lineNode.rotation >= -180 || this.lineNode.rotation > 90 && this.lineNode.rotation <= 180)
                    angle *= -1
                var vHorz = speed * Math.sin(angle)
                var vVert = Math.abs(speed * Math.cos(angle))
                this.enterState(State.STATE_STAY)
                var maxSpeed = this.SPEED_A * this.score + this.SPEED_B / (this.LINE_LENGTH_MIN + 340)
                player.setStayData(vVert, vHorz, maxSpeed)
            }
        }

        //检测主角跟障碍物的碰撞
        for(var i = 0; i < this.enemys.length; i++)
            if(this.enemys[i].y < -this.node.getParent().height)
            {
                this.enemys[i].destroy()
                this.enemys.splice(i, 1)
                cc.log('清除敌人')
                break
            }

        for(var i = 0; i < this.enemys.length; i++)
        {
            var player = this.playerNode.getComponent('Player')
            if(this.enemys[i].getComponent('Enemy').crashFlag)
                continue

            //cc.log('检测碰撞' + player.node.x + " " + player.node.y)
            var ret = this.enemys[i].getComponent('Enemy').checkCrash(this.playerNode.getComponent('Player'))
            if(ret.result == 0)//直接结束
            {
                this.enterState(State.STATE_PREPAIR_DEAD)
            }
            else if(ret.result == -1)
                continue
            else
            {
                this.clearCrashFlag()
                this.enemys[i].getComponent('Enemy').crashFlag = true
                if(ret.result == 1)//向上
                {
                    player.up(ret.top)
                }
                else if(ret.result == 2)//向右
                {
                    player.right(ret.right)
                }
                else if(ret.result == 3)//向下
                {
                    player.down(ret.down)
                }
                else if(ret.result == 4)//向左
                {
                    player.left(ret.left)
                }
            }
        }
    },
});
