// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var Enemy = require('Enemy')

cc.Class({
    extends: Enemy,

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
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    checkCrash(player)
    {
        var top1 = player.node.y
        var right1 = player.node.x + player.node.width * player.node.scaleX
        var down1 = player.node.y - player.node.height
        var left1 = player.node.x
        var top2 = this.node.y + this.node.height / 2
        var right2 = this.node.x + this.node.width / 2
        var down2 = this.node.y - this.node.height / 2
        var left2 = this.node.x - this.node.width / 2

        if(this.calcPosRelation(top1, right1, down1, left1, top2, right2, down2, left2) == 0)
        {
            return {result:0}
        }
        return -1
    },
});
