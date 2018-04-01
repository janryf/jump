//直升机类敌人，螺旋桨位置会直接杀死主角，需要分别指定机体和螺旋桨的位置。这类敌人是左右不对称的，要有向左或向右的方向
var Enemy = require('Enemy')

cc.Class({
    extends: Enemy,
    properties: 
    {
        bodyTop : 0,
        bodyRight : 0,
        bodyBottom : 0,
        bodyLeft :0,
        headTop : 0,
        headRight : 0,
        headBottom : 0,
        headLeft :0,
    },
    orgBodyRight : 0,
    orgBodyLeft : 0,
    orgTopRight : 0,
    orgTopLeft : 0,

    start () 
    {
        this.orgBodyRight = this.bodyRight
        this.orgBodyLeft = this.bodyLeft
        this.orgHeadRight = this.headRight
        this.orgHeadLeft = this.headLeft
    },

    update (dt) 
    {
        this._super(dt)
        if(this.hSpeed <= 0)
        {
            this.node.scaleX = Math.abs(this.node.scaleX)
            this.bodyRight = this.orgBodyRight
            this.bodyLeft = this.orgBodyLeft
            this.headRight = this.orgHeadRight
            this.headLeft = this.orgHeadLeft
        }
        else
        {
            this.node.scaleX = -Math.abs(this.node.scaleX)
            this.bodyRight = -this.orgBodyLeft
            this.bodyLeft = -this.orgBodyRight
            this.headRight = -this.orgHeadLeft
            this.headLeft = -this.orgHeadRight
        }
    },

    checkCrash(player)
    {
        var top1 = player.node.y
        var right1 = player.node.x + 45
        var bottom1 = player.node.y - player.node.height
        var left1 = player.node.x - 45
        
        var heliNode = this.node.getChildByName('heli')
        var top2 = this.node.y + this.headTop
        var right2 = this.node.x + this.headRight
        var bottom2 = this.node.y + this.headBottom
        var left2 = this.node.x + this.headLeft
        //cc.log('螺旋桨' + top2 + " " + right2 + " " + bottom2 + " " + left2)

        if(this.calcPosRelation(top1, right1, bottom1, left1, top2, right2, bottom2, left2) == 0)
        {
            cc.log('主角位置' + top1 + " " + right1 + " " + bottom1 + " " + left1)
            cc.log('碰到螺旋桨' + top2 + " " + right2 + " " + bottom2 + " " + left2)
            cc.log('机身' + this.node.x + " " + this.node.y)
            return {result:0}
        }

        top2 = this.node.y + this.bodyTop
        right2 = this.node.x + this.bodyRight
        bottom2 = this.node.y + this.bodyBottom
        left2 = this.node.x + this.bodyLeft
        //cc.log('机身' + top2 + " " + right2 + " " + bottom2 + " " + left2)
        if(this.calcPosRelation(top1, right1, bottom1, left1, top2, right2, bottom2, left2) == 0)
        {
            //cc.log('主角位置' + top1 + " " + right1 + " " + bottom1 + " " + left1)
            //cc.log('碰到机身' + top2 + " " + right2 + " " + bottom2 + " " + left2)
            top1 = player.orgY
            right1 = player.orgX + 45
            bottom1 = player.orgY - player.node.height
            left1 = player.orgX - 45
            var top3 = this.orgY + this.bodyTop
            var right3 = this.orgX + this.bodyRight
            var bottom3 = this.orgY + this.bodyBottom
            var left3 = this.orgX + this.bodyLeft

            var ret = this.calcPosRelation(top1, right1, bottom1, left1, top3, right3, bottom3, left3)
            if(ret == 0)
            {
                //cc.log('出错了，主角位置' + top1 + " " + right1 + " " + bottom1 + " " + left1)
                //cc.log('出错了，机身位置')
                return {result:3, top:top2, right:right2, bottom:bottom2, left:left2}
            }
            else
            {
                cc.log('碰撞结果' + ret)
                return {result:ret, top:top2, right:right2, bottom:bottom2, left:left2}
            }
        }
        return {result:-1}
        /*
        var kvDataList = new Array();
kvDataList.push({key:"you_defined_key",value:"you_defined_key_related_value"});
        */
    },
});
