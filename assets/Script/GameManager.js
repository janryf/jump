//中枢类，用于保存一些全局信息，已经各个实体之间的交互，如碰撞检测，背景滚动等
var Player = require('Player')
var Line = require('Line')
var Enemy = require('Enemy')
var EnemyBlock = require('EnemyBlock')
var SpawnData = require('SpawnData')
var State = require('State')
var ground = require('ground')
var Config = require('Config')
var AudioMgr = require('AudioMgr')

cc.Class({
    extends: cc.Component,

    properties: {
        background :{
            default : null,
            type : cc.Node,
        },
        
        background1 :{
            default : null,
            type : cc.Node,
        },
        background2 :{
            default : null,
            type : cc.Node,
        },
        
        playerNode :{
            default : null,
            type : cc.Node,
        },
        lineNode :{
            default : null,
            type : cc.Node,
        },
        openNode :{
            default : null,
            type : cc.Node,
        },
        score : 0,
        curLevel : 1,
        beginChangeBK : false,

        //--------- ui ------------
        scoreBg : {
            default : null,
            type : cc.Node,
        },
        scoreNode : {
            default : null,
            type : cc.Node,
        },
        overScoreBg : {
            default : null,
            type : cc.Node,
        },
        overScoreNode : {
            default : null,
            type : cc.Node,
        },
        bestScoreNode : {
            default : null,
            type : cc.Node,
        },
        logoNode : {
            default : null,
            type : cc.Node,
        },
        guideNode : {
            default : null,
            type : cc.Node,
        },
        buttonRestart:{
            default : null,
            type : cc.Node,
        },
        buttonMusicOn:{
            default : null,
            type : cc.Node,
        },
        buttonMusicOff:{
            default : null,
            type : cc.Node,
        },
        openNode:{
            default : null,
            type : cc.Node,
        },      
        //-------------------------
        
        enemyGroupNode:{
            default : null,
            type : cc.Node,
        },
        foregrounds : [],
        foregroundBuffer : 0,
        enemys : [],
        config : null,
        bMusic : true,
        preRoleSpeed : 0,
    },
    logicSpeed : 0,//游戏的逻辑速度，影响得分和背景等滚动速度
    enemyTimeout : 0,// 
    curState : 0, 
    wechat : 0,
    bPlayMusic : 0,

    setLogicSpeed(logicSpeed)
    {
        this.logicSpeed = logicSpeed
    },

    onLoad()
    {
        this.curState = -1
        this.wechat = 0
        this.bPlayMusic = true
        this.config = this.getComponent('Config')
    },

    showSpeedLine(bPlay)
    {
        /*
        if(bPlay)
            this.speedLineNode.active = false
        else
        this.speedLineNode.active = false
        */
    },

    start () 
    {
        SpawnData.checkConfig()
        this.scoreNode.getComponent(cc.Label).string = 0
        this.overScoreNode.active = false
        this.overScoreBg.active = false
        //cc.audioEngine.playEffect(this.backgroundAudio, true);

        this.buttonRestart.on('touchstart', this.restart.bind(this))
        this.buttonRestart.active = false
        this.buttonMusicOn.on('touchstart', this.musicOn.bind(this))
        this.buttonMusicOn.active = false
        this.buttonMusicOff.on('touchstart', this.musicOff.bind(this))
        this.buttonMusicOff.active = false
        this.score = 0
        this.curLevel = 1
        this.beginChangeBK = false
        this.enemyTimeout = 2
        this.enterState(State.STATE_MAIN_MENU)

        this.background1 = cc.instantiate(this.config.bgPrefs[0])
        this.background1.getComponent('ground').initData(this.config.stickPref)
        this.background.addChild(this.background1)
        this.background1.x = 0
        this.background1.y = 192
        this.background2 = cc.instantiate(this.config.bgPrefs[1])
        this.background2.getComponent('ground').initData(this.config.stickPref)
        this.background.addChild(this.background2)
        this.background2.x = 0
        this.background2.y = 192 + 2304
    },

    musicOn()
    {
        this.bMusic = false
        this.buttonMusicOn.active = false
        this.buttonMusicOff.active = true
        AudioMgr.stopBkMusic()
    },

    musicOff()
    {
        this.bMusic = true
        this.buttonMusicOn.active = true
        this.buttonMusicOff.active = false
        if(this.getCurState() != State.STATE_MAIN_MENU)
            this.playSound('bk')
    },

    restart()
    {
        //this.playSound('bk')
        this.enterState(State.STATE_NORMAL)
        var player = this.playerNode.getComponent('Player')
        player.restart()
        this.score = 0
        this.curLevel = 1
        this.beginChangeBK = false
        this.scoreNode.getComponent(cc.Label).string = 0 + '米'
        for(var i = 0; i < this.enemys.length; i++)
            this.enemys[i].destroy()
        this.enemys = []

        /*
        if(this.wechat == 1)
        {
           var openDataContext = wx.getOpenDataContext()
           openDataContext.postMessage({
            text: 'hello',
            year: (new Date()).getFullYear()
            })
        }
        */

        this.background1 = cc.instantiate(this.config.bgPrefs[0])
        this.background1.getComponent('ground').initData(this.config.stickPref)
        this.background.addChild(this.background1)
        this.background1.x = 0
        this.background1.y = 192
        this.background2 = cc.instantiate(this.config.bgPrefs[1])
        this.background2.getComponent('ground').initData(this.config.stickPref)
        this.background.addChild(this.background2)
        this.background2.x = 0
        this.background2.y = 192 + 2304
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

    playSound(soundStr)
    {
        if(!this.bMusic)
            return

        if(soundStr == 'bk')
            AudioMgr.playBkMusic(this.config.audioBk, true)
        else if(soundStr == 'over')
            AudioMgr.playSound(this.config.audioGameover)
        else if(soundStr == 'crash')
            AudioMgr.playSound(this.config.audioCrash)
        else if(soundStr == 'dead')
            AudioMgr.playSound(this.config.audioDead)
        else if(soundStr == 'jump')
            AudioMgr.playSound(this.config.audioJump)
        else if(soundStr == 'up')
            AudioMgr.playSound(this.config.audioUp)
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

    removeEnemy(enemy)
    {
        for(var i = 0; i < this.enemys.length; i++)
        {
            if(this.enemys[i] == enemy)
            {
                this.enemys.splice(i, 1)
                return
            }
        }
    },

    removeFore(fore)
    {
        for(var i = 0; i < this.foregrounds.length; i++)
        {
            if(this.foregrounds[i] == fore)
            {
                this.foregrounds.splice(i, 1)
                return
            }
        }
    },

    update (dt) 
    {
        //cc.log(this.background1.x + " " + this.background.x)
        if(this.logicSpeed > 0)//逻辑速度影响背景卷动和计分
        {
            this.foregroundBuffer -= this.logicSpeed
            if(this.foregroundBuffer <= 0)
            {
                this.foregroundBuffer = this.randomFrom(150, 300)
                var random = this.randomFrom(0, this.config.forePrefs.length - 1)
                var fore = cc.instantiate(this.config.forePrefs[random])
                fore.x = this.randomFrom(-540, 540)
                fore.y = 1010
                this.background.addChild(fore)
                this.foregrounds.push(fore)
            }

            this.background1.y -= this.logicSpeed
            this.background2.y -= this.logicSpeed
            this.score += this.logicSpeed / 200
            this.scoreNode.getComponent(cc.Label).string = Math.floor(this.score) + '米'
            
            //刷障碍物
            var player = this.playerNode.getComponent('Player')
            var triggerSpeed = 2350
            //if(this.preLogicSpeed > 20 && this.logicSpeed <= 20 && this.enemyTimeout <= 0)
            if(this.preRoleSpeed > triggerSpeed && player.vVert <= triggerSpeed && this.enemyTimeout <= 0)
            {
                cc.log("生成11111111111111111")
                this.enemyTimeout = 2
                var enemyGroup = SpawnData.getEnemy(this.score)
                for(var i = 0; i < enemyGroup.length; i++)
                {
                    var enemyInfo = enemyGroup[i]
                    var enemy = null
                    if(enemyInfo.name == 'cloud')
                        enemy = cc.instantiate(this.config.enemyCloudPref)
                    else if(enemyInfo.name == 'tang')
                        enemy = cc.instantiate(this.config.enemyTangPref)
                    else if(enemyInfo.name == 'rulai')
                        enemy = cc.instantiate(this.config.enemyRulaiPref)
                    else if(enemyInfo.name == 'hulu')
                        enemy = cc.instantiate(this.config.enemyHuluPref)
                    else
                        console.log('错误的障碍物名字' + enemyInfo.name)
                    this.enemyGroupNode.addChild(enemy)
                    //this.node.getParent().addChild(enemy)
                    enemy.getComponent("Enemy").setEnemyData(enemyInfo.x, enemyInfo.y + 1000, enemyInfo.vSpeed, enemyInfo.hSpeed)
                    this.enemys.push(enemy)
                }
            }
            this.preLogicSpeed = this.logicSpeed
            this.preRoleSpeed = player.vVert
        }
        this.enemyTimeout -= dt 
        
        //滚动背景
        var actualLevel = 0
        for(var i = Config.LEVELS.length - 1; i >= 0; i--)
        {
            if(this.score >= Config.LEVELS[i])
            {
                actualLevel = i + 1
                break
            }
        }

        if(actualLevel > this.curLevel)
        {
            if(this.background2.y < 192)
            {
                var targetBkIndex = (actualLevel - 1) * 2
                if(this.background1.name != this.config.bgPrefs[targetBkIndex].name)
                {
                    this.beginChangeBK = true
                    this.background1.destroy()
                    this.background1 = cc.instantiate(this.config.bgPrefs[(actualLevel - 1) * 2])
                    this.background1.getComponent('ground').initData(this.config.stickPref)
                    this.background.addChild(this.background1)
                    this.background1.x = 0
                    this.background1.y = this.background2.y + 2304
                }
            }
            if(this.background1.y < 192 && this.beginChangeBK)
            {
                this.beginChangeBK = false
                this.background2.destroy()
                this.background2 = cc.instantiate(this.config.bgPrefs[(actualLevel - 1) * 2 + 1])
                this.background2.getComponent('ground').initData(this.config.stickPref)
                this.background.addChild(this.background2)
                this.background2.x = 0
                this.background2.y = this.background1.y + 2304
                this.curLevel = actualLevel
            }
        }
        else
        {
            if(this.background2.y < 192)
            {
                this.background1.y = this.background2.y + 2304
            }
            if(this.background1.y < 192)
            {
                this.background2.y = this.background1.y + 2304
            }
        }
        
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

                var speed = Config.SPEED_A * this.score + Config.SPEED_B / (this.lineNode.width + 240) - this.playerNode.y / Config.SPEED_C
                cc.log("速度值" + speed)
                //cc.log(this.lineNode.rotate)
                var angle = this.lineNode.rotation * Math.PI / 180
                if(this.lineNode.rotation < -90 && this.lineNode.rotation >= -180 || this.lineNode.rotation > 90 && this.lineNode.rotation <= 180)
                    angle *= -1
                var vHorz = speed * Math.sin(angle)
                var vVert = Math.abs(speed * Math.cos(angle))
                this.enterState(State.STATE_STAY)
                var maxSpeed = Config.SPEED_A * this.score + Config.SPEED_B / (Config.LINE_LENGTH_MIN + 240)
                player.setStayData(vVert, vHorz, maxSpeed)
            }
        }

        //检测主角跟障碍物的碰撞
        for(var i = 0; i < this.enemys.length; i++)
        {
            var player = this.playerNode.getComponent('Player')
            if(this.enemys[i].getComponent('Enemy').crashFlag)
                continue

            //cc.log('检测碰撞' + player.node.x + " " + player.node.y)
            var ret = this.enemys[i].getComponent('Enemy').checkCrash(this.playerNode.getComponent('Player'))
            if(ret.result == 0)//直接结束
            {
                var effect = cc.instantiate(this.config.effectCrash)
                this.node.getParent().addChild(effect)
                effect.x = player.node.x
                effect.y = player.node.y
                this.playSound('dead')
                this.enterState(State.STATE_PREPAIR_DEAD)
            }
            else if(ret.result == -1)
                continue
            else
            {
                var effect = cc.instantiate(this.config.effectCrash)
                this.node.getParent().addChild(effect)
                effect.x = player.node.x
                effect.y = player.node.y
                this.clearCrashFlag()
                this.enemys[i].getComponent('Enemy').crashFlag = true
                if(ret.result == 1)//向上
                {
                    player.up(true)
                }
                else if(ret.result == 2)//向右
                {
                    player.right(true)
                }
                else if(ret.result == 3)//向下
                {
                    player.down(true)
                }
                else if(ret.result == 4)//向左
                {
                    player.left(true)
                }
            }
        }
    },
});
