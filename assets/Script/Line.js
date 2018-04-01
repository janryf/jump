// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

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
        actived : true,
        gameManager : null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
    },

    start () {

    },

    disableLine()
    {
        this.actived = false
    },

    update (dt) 
    {
        if(this.gameManager.logicSpeed > 0)
        {
            this.node.y -= this.gameManager.logicSpeed
        }
    },

    crashDetect(playerNode)
    {
        var angle = this.node.rotation * Math.PI / 180
        var left = playerNode.x - 40
        var right = playerNode.x + 40
        var top = playerNode.y
        var down = playerNode.y - playerNode.height

        //cc.log(playerNode.x + "主角位置" + left + " " + right + " " + top + " " + down)

        for(var i = 0; i <= 4; i++)
        {
            var x = this.node.x + this.node.width * Math.cos(angle) * i / 4
            var y = this.node.y - this.node.width * Math.sin(angle) * i / 4
            //cc.log("点" + i + "位置" + x + " " + y)
            if(x >= left && x <= right && y >= down && y <= top)
                return true
        }
        return false
    }
});
