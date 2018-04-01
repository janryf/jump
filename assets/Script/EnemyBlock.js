//这类敌人只与主角产生单纯的碰撞
var Enemy = require('Enemy')

cc.Class({
    extends: Enemy,
    properties: {
    },

    start () 
    {
    },

    checkCrash(player)
    {
        var top1 = player.node.y
        var right1 = player.node.x + 45//player.node.width * player.node.scaleX
        var down1 = player.node.y - player.node.height
        var left1 = player.node.x - 45
        var top2 = this.node.y + this.node.height / 2
        var right2 = this.node.x + this.node.width / 2
        var down2 = this.node.y - this.node.height / 2
        var left2 = this.node.x - this.node.width / 2

        //cc.log("主角" + top1 + " " + right1 + " " + down1 + " " + left1 + " " + player.node.width + " " + player.node.scaleX)

        if(this.calcPosRelation(top1, right1, down1, left1, top2, right2, down2, left2) == 0)
        {
            cc.log('检测到碰撞了')
            top1 = player.orgY
            right1 = player.orgX + 45
            down1 = player.orgY - player.node.height
            left1 = player.orgX - 45
            var top3 = this.orgY + this.node.height / 2
            var right3 = this.orgX + this.node.width / 2
            var down3 = this.orgY - this.node.height / 2
            var left3 = this.orgX - this.node.width / 2
            var ret = this.calcPosRelation(top1, right1, down1, left1, top3, right3, down3, left3)
            if(ret == 0)
                cc.log('出错了' + player.node.x + ' ' + player.node.y + '原来的' + player.orgX + ' ' + player.orgY)
            else
                return {result:ret, top:top2, right:right2, down:down2, left:left2}
        }

        return {result:-1}
    },
    // update (dt) {},
});
