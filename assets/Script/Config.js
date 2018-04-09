export var LINE_LENGTH_MAX = 400//绳子的最大长度
export var LINE_LENGTH_MIN = 80//绳子的最小长度
export var LEVELS = [0, 0, 200, 500]
export var GRAVITY = 5500//重力系数
export var STAY_TIME = 0.4//在绳子上停留的时间
export var SPEED_A = 5
export var SPEED_B = 2600000
export var SPEED_C = 1

cc.Class({
    extends: cc.Component,

    properties: {
        //音乐
        audioBk: {
            default: null,
            url: cc.AudioClip
        },
        audioCrash: {
            default: null,
            url: cc.AudioClip
        },
        audioGameover: {
            default: null,
            url: cc.AudioClip
        },
        audioJump: {
            default: null,
            url: cc.AudioClip
        },
        audioPerfect: {
            default: null,
            url: cc.AudioClip
        },
        audioDead: {
            default: null,
            url: cc.AudioClip
        },
        audioUp: {
            default: null,
            url: cc.AudioClip
        },

        //其他预设
        effectCrash:{
            default: null,
            type : cc.Prefab,
        },
        enemyCloudPref : {
            default : null,
            type : cc.Prefab,
        },
        enemyTangPref : {
            default : null,
            type : cc.Prefab,
        },
        enemyRulaiPref : {
            default : null,
            type : cc.Prefab,
        },
        enemyHuluPref : {
            default : null,
            type : cc.Prefab,
        },        
        bgPrefs : [cc.Prefab],
        stickPref : {
            default : null,
            type : cc.Prefab,
        },
        forePrefs : [cc.Prefab],
    },

    onLoad ()
    {
    },
})