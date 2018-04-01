export var enemyGroups = [
    //0组
    [{
        name: 'ufo',
        x: 0,
        y: 750,
        vSpeed : 0,
        hSpeed : 300,
        time : 0,
    },
    ],
    //1组
    [{
        name: 'ufo',
        x: -80,
        y: 750,
        vSpeed : 0,
        hSpeed : 0,
        time : 0,
    },
    {
        name: 'block',
        x: 160,
        y: 880,
        vSpeed : 0,
        hSpeed : 0,
        time : 0,
    },
    ],
]

export var levels = [
//第一级别
{
    milesMax: 100,
    groups: [0],
    weight:[100],//一定要确保这个数组里的元素数跟上一个数组相同
},
//第二级别
{
    milesMax: 400,
    groups: [0, 1],
    weight:[50, 100],//一定要确保这个数组里的元素数跟上一个数组相同
},
]

export function getEnemy(mile)
{
    var level = null
    for(i = 0; i < levels.length; i++)
    {
        if(levels[i].milesMax > mile)
        {
            level = levels[i]
            break;
        }
    }
    if(level === null)
        level = levels[levels.length - 1]

    var allWeight = 0
    for(i = 0; i < level.groups.length; i++)
    {
        allWeight += level.weight[i]
    }

    var random = randomFrom(0, allWeight - 1)
    for(i = 0; i < level.groups.length; i++)
    {
        if(random < level.weight[i])
        {
            return enemyGroups[level.groups[i]]
        }
        else
            random -= level.weight[i]
    }
    return null
}

function randomFrom(lowerValue, upperValue)
{
    return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
}