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
        gameManager : null,
    },

    onLoad () 
    {
        this.gameManager = cc.find('Canvas/GameManager').getComponent('GameManager')
        this.btnRestart.on('touchstart', this.onRestart.bind(this))
        this.btnRank.on('touchstart', this.onRank.bind(this))
    },

    onRestart()
    {
        this.gameManager.restart()
    },

    onRank()
    {
        this.gameManager.showPanelRank()
    },

    start () 
    {
    },

    onEnable()
    {
        this.scoreNode.getComponent(cc.Label).string = this.gameManager.scoreNode.getComponent(cc.Label).string
    }

    // update (dt) {},
});
