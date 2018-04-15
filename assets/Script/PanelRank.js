cc.Class({
    extends: cc.Component,

    properties: 
    {
        btnClose:{
            default : null,
            type : cc.Node,
        },  
        btnPrev:{
            default : null,
            type : cc.Node,
        },  
        btnNext:{
            default : null,
            type : cc.Node,
        },  
        gameManager : null,
    },

    onLoad () 
    {
        this.gameManager = cc.find('Canvas/GameManager').getComponent('GameManager')
    },

    onEnable()
    {
        cc.log('显示排行榜')
        this.curPage = 0
        this.node.active = true
        this.gameManager.openNode.active = true
        this.btnClose.on('touchstart', this.onClose.bind(this))
        this.btnPrev.on('touchstart', this.onPrev.bind(this))
        this.btnNext.on('touchstart', this.onNext.bind(this))
        if(this.gameManager.wechat == 1)
        {
            var openDataContext = wx.getOpenDataContext();
            var sharedCanvas = openDataContext.canvas;
            openDataContext.postMessage({
                func:'showRank',
                page: 'init',
            });
        }
    },

    onClose()
    {
        this.node.active = false
        this.gameManager.openNode.active = false
    },

    onPrev()
    {
        cc.log("前一页")
        if(this.gameManager.wechat == 1)
        {
            var openDataContext = wx.getOpenDataContext();
            var sharedCanvas = openDataContext.canvas;
            openDataContext.postMessage({
                func:'showRank',
                page: 'prev',
            });
        }
    },

    onNext()
    {
        cc.log("下一页")
        if(this.gameManager.wechat == 1)
        {
            var openDataContext = wx.getOpenDataContext();
            var sharedCanvas = openDataContext.canvas;
            openDataContext.postMessage({
                func:'showRank',
                page: 'next',
            });
        }
    },

    start () {

    },

    // update (dt) {},
});
