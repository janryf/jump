cc.Class({
    extends: cc.Component,

    properties: {
    },
    gameManager : null,

    start () {
        this.gameManager = cc.find('Canvas/GameManager').getComponent('GameManager')
        this.getComponent(cc.Animation).play('EffectCrash')
    },

    over()
    {
        this.node.destroy()
    },

    update (dt) 
    {
        if(this.gameManager != null && this.gameManager.logicSpeed != null && this.gameManager.logicSpeed > 0)
        {
            this.node.y -= this.gameManager.logicSpeed
        }
    },
});
