cc.Class({
    extends: cc.Component,
    properties: 
    {
        scoreNode : {
            default : null,
            type : cc.Node,
        },
        btnRank : {
            default : null,
            type : cc.Node,
        },
        btnRestart : {
            default : null,
            type : cc.Node,
        },
        btnWechat : {
            default : null,
            type : cc.Node,
        },
        count : {
            default : null,
            type : cc.Node,
        },
        gameManager : null,
    },

    onLoad () 
    {
        this.gameManager = cc.find('Canvas/GameManager').getComponent('GameManager')
        this.btnRestart.on('touchstart', this.onRestart.bind(this))
        this.btnRank.on('touchstart', this.onRank.bind(this))
        this.btnWechat.on('touchstart', this.onWechat.bind(this))
    },

    onRestart()
    {
        this.gameManager.restart()
    },

    onRank()
    {
        this.gameManager.showPanelRank()
    },

    onWechat()
    {
        if(this.gameManager.wechat == 1)
        {
            wx.shareAppMessage({
                success:function()
                {
                    console.log('成功分享')
                    this.gameManager.life = 0
                    this.gameManager.continueGame()
                },
                fail:function()
                {
                    console.log('失败分享')
                },
                complete:function()
                {
                    console.log('结束分享')
                },
              })
            console.log('在这里结束')
        }
        else
        {
            this.gameManager.life = 0
            this.gameManager.continueGame()
        }
    },

    start () 
    {
    },

    countOver()
    {
        cc.log('计时结束')
        this.gameManager.life = 0
        this.btnRestart.active = true
        this.btnRank.active = true
        this.btnWechat.active = false
        this.count.active = false
    },

    onEnable()
    {
        this.scoreNode.getComponent(cc.Label).string = this.gameManager.scoreNode.getComponent(cc.Label).string
        if(this.gameManager.life > 0)
        {
            this.btnRestart.active = false
            this.btnRank.active = false
            this.btnWechat.active = true
            this.count.active = true
            this.count.getComponent(cc.Animation).play('count')
            this.gameManager.openNode.active = false
        }
        else
        {
            this.btnRestart.active = true
            this.btnRank.active = true
            this.btnWechat.active = false
            this.count.active = false
            this.gameManager.openNode.active = true
        }
    }

    // update (dt) {},
});
