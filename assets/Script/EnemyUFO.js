//此类敌人在碰撞后会直接杀死主角
var Enemy = require('Enemy')

cc.Class({
    extends: Enemy,
    properties: {
    },
    start () {
    },
    // update (dt) {},

    checkCrash(player)
    {
        var top1 = player.node.y
        var right1 = player.node.x + 45
        var bottom1 = player.node.y - player.node.height
        var left1 = player.node.x - 45
        var top2 = this.node.y + this.node.height / 2
        var right2 = this.node.x + this.node.width / 2
        var bottom2 = this.node.y - this.node.height / 2
        var left2 = this.node.x - this.node.width / 2

        if(this.calcPosRelation(top1, right1, bottom1, left1, top2, right2, bottom2, left2) == 0)
        {
            return {result:0}
        }
        return {result:-1}
    },
});
