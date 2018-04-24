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
        gameManager : null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        this.gameManager = cc.find('Canvas/GameManager').getComponent('GameManager')
    },

    start () {
        if(this.gameManager.wechat == 1)
        {
            var openDataContext = wx.getOpenDataContext();
            var sharedCanvas = openDataContext.canvas;
        
            //发送消息通知开放数据域，生成sharedCanvas
            openDataContext.postMessage({
                func:'getPlayerInfo',
                score: 0,
            });
        
            var main = function () {
                var texture = new cc.Texture2D();
                texture.initWithElement(sharedCanvas);
                texture.handleLoadedTexture();
        
                this.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            };
            this.schedule(main,0.015);
        }
    },

    update (dt) 
    {
    },
});
