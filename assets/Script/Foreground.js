cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad()
    {
        this.gameManager = cc.find('Canvas/GameManager').getComponent('GameManager')
    },

    start () {

    },

    update (dt) 
    {
        if(this.gameManager != null && this.gameManager.logicSpeed > 0)//随着屏幕滚动而出现，下落速度要比屏幕滚动速度更快
        {
            this.node.y -= this.gameManager.logicSpeed * 1.15
            if(this.node.y < -1000)
            {
                this.node.destroy()
                this.gameManager.removeFore(this.node)
            }
        }
    },
});
