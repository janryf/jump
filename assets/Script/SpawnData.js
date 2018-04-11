var enemyGroups = [

    //0组 云中静止
      [
        {
            name: 'cloud',
            x: 0,
            y: 350,
            vSpeed : 0,
            hSpeed : 0,
            time : 0,
          },  
       ], 
   //1组 云右边静止
     [
        {
            name: 'cloud',
            x: 400,
            y: 350,
            vSpeed : 0,
            hSpeed : 0,
            time : 0,
          },       
     ],
   //2组 云左边静止
        [
         {
            name: 'cloud',
            x: -400,
            y: 350,
            vSpeed : 0,
            hSpeed : 0,
            time : 0,
         },
        ],
   //3组 右唐僧慢
     [
     {
        name: 'tang',
        x: 400,
        y: 350,
        vSpeed : -50,
        hSpeed : -60,
        time : 10000,
     },
     ],
   //4组 左唐僧右云
    [
     {
        name: 'tang',
        x: -400,
        y: 350,
        vSpeed : -80,
        hSpeed : -100,
        time : 1,
    },
    {
        name: 'cloud',
        x: 400,
        y: 350,
        vSpeed : 0,
        hSpeed : 0,
        time : 0,
     },
    ],
   //5组 中葫芦左云
        [
            {
                name: 'hulu',
                x: 0,
                y: 350,
                vSpeed : -100,
                hSpeed : -40,
                time : 1,
            },
            {
                name: 'cloud',
                x: -400,
                y: 350,
                vSpeed : 0,
                hSpeed : 0,
                time : 0,
            },
        ],
   //6组 2右唐僧中
    [
     {
        name: 'tang',
        x: 450,
        y: 400,
        vSpeed : -120,
        hSpeed : -100,
        time : 1,
    },
    {
    name: 'tang',
    x: 250,
    y: 350,
    vSpeed : -120,
    hSpeed : -100,
    time : 1,
    },
    ],
   //7组 2左唐僧慢
    [
     {
        name: 'tang',
        x: -450,
        y: 400,
        vSpeed : -70,
        hSpeed : 60,
        time : 1,
    },
    {
    name: 'tang',
    x: -250,
    y: 300,
    vSpeed : -70,
    hSpeed : 60,
    time : 1,
    },
    ],
   //8组 2左葫芦快
    [
     {
        name: 'hulu',
        x: -450,
        y: 400,
        vSpeed : -200,
        hSpeed : 100,
        time : 1,
     },
     {
    name: 'hulu',
    x: -300,
    y: 300,
    vSpeed : -200,
    hSpeed : 200,
    time : 0,
    },
    ],
   //9组 2中葫芦中
    [
    {
        name: 'hulu',
        x: 100,
        y: 350,
        vSpeed : -100,
        hSpeed : 110,
        time : 1,
    },
    {
    name: 'hulu',
    x: -100,
    y: 250,
    vSpeed : -100,
    hSpeed : -110,
    time : 1,
    },
    ],
   //10组 3左唐僧慢
    [
        {
            name: 'tang',
            x: -400,
            y: 350,
            vSpeed : -100,
            hSpeed : 70,
            time : 0,
        },
        {
            name: 'tang',
            x: -200,
            y: 500,
            vSpeed : -100,
            hSpeed : 70,
            time : 0,
        },
        {
           name: 'tang',
           x: 0,
           y: 650,
           vSpeed : -100,
           hSpeed : 70,
           time : 0,
         },
    ],
   //11组 3右葫芦中
    [
        {
            name: 'hulu',
            x: 400,
            y: 350,
            vSpeed : -130,
            hSpeed : -110,
            time : 0,
        },
        {
            name: 'hulu',
            x: 250,
            y: 500,
            vSpeed : -130,
            hSpeed : -110,
            time : 0,
        },
        {
           name: 'hulu',
           x: 100,
           y: 650,
           vSpeed : -100,
           hSpeed :-110,
           time : 0,
         },
    ],
   //12组 3中葫芦慢右1
    [
        {
            name: 'hulu',
            x: 150,
            y: 350,
            vSpeed : -100,
            hSpeed : 100,
            time : 0,
        },
        {
            name: 'hulu',
            x: 0,
            y: 350,
            vSpeed : -100,
            hSpeed : -100,
            time : 0,
        },
        {
           name: 'hulu',
           x: -150,
           y: 350,
           vSpeed : -100,
           hSpeed :-100,
           time : 0,
         },
    ],
   //13组 3中唐僧慢左1
    [
    {
        name: 'tang',
        x: 200,
        y: 350,
        vSpeed : -100,
        hSpeed : 100,
        time : 0,
    },
    {
        name: 'tang',
        x: 0,
        y: 350,
        vSpeed : -100,
        hSpeed : 100,
        time : 0,
    },
    {
       name: 'tang',
       x: -200,
       y: 350,
       vSpeed : -100,
       hSpeed :-100,
       time : 0,
     },
    ],
   //14组 4右唐僧慢
    [
    {
        name: 'tang',
        x: 450,
        y: 590,
        vSpeed : -60,
        hSpeed : -60,
        time : 1,
    },
    {
        name: 'tang',
        x: 300,
        y: 510,
        vSpeed : -60,
        hSpeed : -60,
        time : 1,
    },
    {
        name: 'tang',
        x: 150,
        y: 430,
        vSpeed : -60,
        hSpeed : -60,
        time : 1,
    },
    {
        name: 'tang',
        x: 0,
        y: 350,
        vSpeed : -60,
        hSpeed : -60,
        time : 1,
    },

    ],
   //15组 4左葫芦慢
    [
        {
            name: 'hulu',
            x: -450,
            y: 590,
            vSpeed : -60,
            hSpeed : 80,
            time : 1,
        },
        {
            name: 'hulu',
            x: -250,
            y: 510,
            vSpeed : -60,
            hSpeed : 80,
            time : 1,
        },
        {
            name: 'hulu',
            x: -50,
            y: 430,
            vSpeed : -60,
            hSpeed : 80,
            time : 1,
        },
        {
            name: 'hulu',
            x: 150,
            y: 350,
            vSpeed : -60,
            hSpeed : 80,
            time : 1,
        },

    ],
   //16组 4中唐僧慢
    [
    {
        name: 'tang',
        x: -450,
        y: 250,
        vSpeed : -60,
        hSpeed : 35,
        time : 0,
    },
    {
        name: 'tang',
        x: -300,
        y: 450,
        vSpeed : -60,
        hSpeed : 35,
        time : 0,
    },
    {
        name: 'tang',
        x: 450,
        y: 250,
        vSpeed : -60,
        hSpeed : -35,
        time : 0,
    },
    {
        name: 'tang',
        x: 300,
        y: 450,
        vSpeed : -60,
        hSpeed : -35,
        time : 0,
    },

    ],
   //17组 中1如来+1唐僧
    [
    {
        name: 'rulai',
        x: 0,
        y: 250,
        vSpeed : -50,
        hSpeed : 0,
        time : 1,
    },
    {
        name: 'tang',
        x: 0,
        y: 450,
        vSpeed : 0,
        hSpeed : 100,
        time : 1,
    },
     ],
   //18组 2中如来快
    [
    {
        name: 'rulai',
        x: 0,
        y:350,
        vSpeed : 0,
        hSpeed : -150,
        time : 3,
    },
    {
        name: 'rulai',
        x: 0,
        y: 550,
        vSpeed : 0,
        hSpeed : 150,
        time : 3,
    },
    ], 
   //19组 2中如来慢
    [
    {
        name: 'rulai',
        x: 0,
        y:350,
        vSpeed : 0,
        hSpeed : -50,
        time : 0,
    },
    {
        name: 'rulai',
        x: 0,
        y: 550,
        vSpeed : 0,
        hSpeed : 50,
        time : 0,
    },
    ],    

   //20组 2左右如来慢
    [
     {
        name: 'rulai',
        x: 450,
        y:350,
        vSpeed : 0,
        hSpeed : -150,
        time : 0,
     },
     {
        name: 'rulai',
        x: -450,
        y: 550,
        vSpeed : 0,
        hSpeed : 150,
        time : 0,
     },
     ],    
   //21组 3如来慢
    [
     {
        name: 'rulai',
        x: 0,
        y:350,
        vSpeed : -30,
        hSpeed : 90,
        time : 0,
     },
     {
        name: 'rulai',
        x: -0,
        y: 520,
        vSpeed : -30,
        hSpeed : 0,
        time : 0,
     },
     {
        name: 'rulai',
        x: 0,
        y: 690,
        vSpeed : -30,
        hSpeed : -90,
        time : 0,
     },
     ],   





]

var levels = [
//第一级别
{
    milesMax: 50,
    groups: [0,1,2,3,4],
    weight:[10,10,10,10,10],//一定要确保这个数组里的元素数跟上一个数组相同
},
 //第二级别
{
    milesMax: 100,
    groups: [0,3,5],
    weight:[5,10,10],//一定要确保这个数组里的元素数跟上一个数组相同
},
//第三级别
{
    milesMax: 150,
    groups: [2,3,5,6],
    weight:[10,20,20,20],//一定要确保这个数组里的元素数跟上一个数组相同
},
//第四级别
{
    milesMax: 200,
    groups: [1,3,5,6,7],
    weight:[10,10,10,80,80],//一定要确保这个数组里的元素数跟上一个数组相同
},


//第五级别
{
    milesMax: 250,
    groups:[1,4,5,6,7,8,9],
    weight:[10,10,20,20,20,40,40],//一定要确保这个数组里的元素数跟上一个数组相同
},


//第六级别
{
    milesMax: 300,
    groups:[4,5,6,7,8,9,10,11],
    weight:[10,10,10,10,10,10,20,20],//一定要确保这个数组里的元素数跟上一个数组相同
},


//第七级别
{
    milesMax: 350,
    groups: [5,6,8,10,11,12,13],
    weight:[10,10,10,20,20,20,20],//一定要确保这个数组里的元素数跟上一个数组相同
},
//第八级别
{
    milesMax: 400,
    groups: [4,9,10,12,14,15,17],
    weight:[10,10,20,20,10,10,5],//一定要确保这个数组里的元素数跟上一个数组相同
},
//第九级别
{
    milesMax: 450,
    groups: [1,5,8,11,12,14,15,16,17,18],
    weight:[5,5,5,10,10,20,20,20,10,10],//一定要确保这个数组里的元素数跟上一个数组相同
},

//第十级别
{
    milesMax: 500,
    groups: [0,3,9,11,12,14,16,18,19],
    weight:[5,5,5,10,10,10,10,20,20],//一定要确保这个数组里的元素数跟上一个数组相同
},
//第十一级别
{
    milesMax: 550,
    groups: [2,4,9,11,14,16,17,19,20],
    weight:[5,5,5,10,10,20,20,20],//一定要确保这个数组里的元素数跟上一个数组相同
},
//第十二级别
{
    milesMax: 600,
    groups: [0,5,8,12,15,16,18,19,20,21],
    weight:[5,5,5,10,10,20,20,20,10],//一定要确保这个数组里的元素数跟上一个数组相同
},
//第十三级别
{
    milesMax: 1500,
    groups: [10,11,12,13,14,15,16,17,18,19,20,21],
    weight: [20,20,20,20,20,20,20,30,30,30,30,30],//一定要确保这个数组里的元素数跟上一个数组相同
},
//第十四级别
{
    milesMax: 3000,
    groups: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],
    weight: [5,5,5,5,5,5,10,10,10,10,20,20,20,20,20,20,20,30,30,30,30,30],//一定要确保这个数组里的元素数跟上一个数组相同
},
]

export function getEnemy(mile)
{
    var level = null
    for(var i = 0; i < levels.length; i++)
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
    for(var i = 0; i < level.groups.length; i++)
    {
        allWeight += level.weight[i]
    }

    var random = randomFrom(0, allWeight - 1)
    for(var i = 0; i < level.groups.length; i++)
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