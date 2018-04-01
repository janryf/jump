//直升机类敌人，螺旋桨位置会直接杀死主角
var Enemy = require('Enemy')

cc.Class({
    extends: Enemy,
    properties: 
    {
    },

    start () 
    {
    },

    // update (dt) {},

    checkCrash(player)
    {
        var top1 = player.node.y
        var right1 = player.node.x + 45
        var right1 = player.node.x + player.node.width * player.node.scaleX
        var down1 = player.node.y - player.node.height
        var left1 = player.node.x - 45
        
        var heliNode = this.node.getChildByName('heli')
        var top2 = heliNode.y + heliNode.height / 2 + this.node.y
        var right2 = this.node.x + heliNode.width / 2 - 20
        var down2 = heliNode.y - heliNode.height / 2 + this.node.y
        var left2 = this.node.x - heliNode.width / 2 + 20
        //cc.log('螺旋桨' + top2 + " " + right2 + " " + down2 + " " + left2)

        if(this.calcPosRelation(top1, right1, down1, left1, top2, right2, down2, left2) == 0)
        {
            cc.log('主角位置' + top1 + " " + right1 + " " + down1 + " " + left1)
            cc.log('碰到螺旋桨' + top2 + " " + right2 + " " + down2 + " " + left2)
            cc.log('机身' + this.node.x + " " + this.node.y)
            return {result:0}
        }

        top2 = this.node.y + this.node.height / 2
        right2 = this.node.x + this.node.width / 2
        down2 = this.node.y - this.node.height / 2
        left2 = this.node.x - this.node.width / 2
        //cc.log('机身' + top2 + " " + right2 + " " + down2 + " " + left2)
        if(this.calcPosRelation(top1, right1, down1, left1, top2, right2, down2, left2) == 0)
        {
            //cc.log('主角位置' + top1 + " " + right1 + " " + down1 + " " + left1)
            //cc.log('碰到机身' + top2 + " " + right2 + " " + down2 + " " + left2)
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
            {
                //cc.log('出错了，主角位置' + top1 + " " + right1 + " " + down1 + " " + left1)
                //cc.log('出错了，机身位置')
                return {result:3, top:top2, right:right2, down:down2, left:left2}
            }
            else
            {
                cc.log('碰撞结果' + ret)
                return {result:ret, top:top2, right:right2, down:down2, left:left2}
            }
        }
        return {result:-1}
        /*
        var kvDataList = new Array();
kvDataList.push({key:"you_defined_key",value:"you_defined_key_related_value"});
        */
    },
});
