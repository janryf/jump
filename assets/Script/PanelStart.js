cc.Class({
    extends: cc.Component,

    properties: 
    {
    },

    onLoad () 
    {
        this.gameManager = cc.find('Canvas/GameManager').getComponent('GameManager')
    },

    start () 
    {
    },

});
