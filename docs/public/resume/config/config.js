var config = {
    /*在这里配置你的基本信息，所有数据以字符串形式给出*/
    name: "王海航",
    sex: "男",
    age: "25",
    phone: "15689876639",
    email: "wanghaihung@126.com",
    address: "现居山东省济南市",
    qq: "654671523",
    log: "Xuanmu",
    excpect_work: "WebGIS/前端开发",


    /*在这里配置首页的座右铭集合*/
    motto: [
        "明天不一定会更好，但要坚信更好的明天一定会来。",
        "要做的事情总找得出时间和机会，不愿意做的事情也总能找得出借口。",
        "Gor For It!",
        "有智者立长志，无志者长立志。",
        "那些过去的眼泪终将风干在记忆里。",
        "真相，是为了剿灭幻想。",
        "我欲将心向明月，奈何明月照沟渠。",
        "春风得意马蹄疾，一日看尽长安花。",
        "天凉好个秋！",
        "老骥伏枥，志在千里。烈士暮年，壮心不已。",
        "老当益壮，宁移白首之心。穷且益坚，不坠青云之志。",
        "我们必须拿我们所有的， 去换我们所没有的",
        "蒹葭苍苍，白露为霜；所谓伊人，在水一方。",
        "数风流人物，还看今朝！"
    ],


    /*在这里配置首页的见面信息，你可以内嵌HTML标签以调整格式*/
    welcome: "青青子衿，悠悠我心<br>" +
             "但为君故，沉吟至今<br>" +
             "你好，我是王海航，山东建筑大学资源与环境研二在读生<br>" +
             "很高兴见到你!",


    /*在这里配置关于我的信息，你可以内嵌HTML标签以调整格式*/
    about: "<p>你好！我叫王海航，性别男，山东建筑大学资源与环境研二在读生。我期望的工作岗位是WebGIS开发。</p>" +
        "<p>我有着较多的编程经验，计算机基础知识掌握扎实，能够在工作中很好的完成自己的任务。此外，我有着充满激情的工作态度，团队协同作战能力强，同时我也具备独立开发的能力，擅于发现并解决问题。我的执行力强、责任感高、集体荣誉感强、敢于担当，能够接受加班或出差等安排</p>" +
        "<p>十分期待与您的联系!</p>",



    /** 
    * 在这里配置你的技能点
    * ["技能点", 掌握程度, "技能条颜色"]
    */  
    skills: [
        ["Java", 60, "red"],
        ["Python", 70, "blue"],
        ["SQL", 75, "#1abc9c"],
        ["HTML5", 80, "rgba(0,0,0)"],
        ["CSS3", 80, "yellow"],
        ["JavaScript", 80, "pink"]
    ],


    /*这里填写你的技能描述，你可以内嵌HTML标签以调整格式*/
    skills_description: "<ul>" +
        "     <li>已掌握ArcGIS、ENVI、QGIS等地信和遥感软件的使用；</li>" +
        "     <li>已掌握Vue、JavaScript、CSS等技术，能进行网站开发；</li>" +
        "     <li>已掌握MySQL、Postgre SQL等数据库的使用，熟悉SQL语法；</li>" +
        "     <li>已掌握ArcGIS Server、GeoServer、Tomcat等，WebGIS开发；</li>" +
        "     <li>已掌握AntDesign、 Openlayers、 SuperMap Client等第三方库；</li>" +
        "     <li>已掌握UNI APP 等技术能够进行移动端APP的开发与打包。</li>" +
        "     <li>熟悉SpringBoot、 Maven等，能够进行一定的后端开发；</li>" +
        "     <li>熟悉Spring、ibatis、struts等框架的使用，了解其原理与机制。</li>" +
        "     <li>熟悉Linux、Docker，能够进行网站部署与维护。</li>" +
        "     <li>熟悉MATLAB、Python等语言，能够进行简单的脚本编写。</li>" +
        "     <li>接触R语言的在线处理工具开发。</li>" +
        " </ul>",


    /**
     * 这里填写你的个人作品展示
     * ["img"，"url", "ProjectName", "brief"]
     * img表示您的作品图片链接，url表示您的项目地址，ProjectName表示您的仓库或作品名称，brief是一句简短的介绍
     * 通过查看实际效果以调整字题长度
     */
    // portfolio: [
    //     ["./images/pro-1.png", "http://1.15.234.109:8000/", "个人博客", "这里记录了我的Java后端学习笔记<br>持续更新"],
    //     ["./images/pro-2.png", "https://github.com/happysnaker/Gobang", "智能人机对战五子棋", "采用C++编写的智能五子棋人机对战<br>2021/7/23"],
    //     ["https://pic3.zhimg.com/80/v2-d9766956d5c85c2780e4c5008fd946ca_1440w.jpg", "https://github.com/happysnaker/StudentsManageSystem", "学生管理系统", "C语言+AVL树+多重双向表实现"]
    // ],


    /**
     * 这里填写您的工作经历
     * ["日期"， "工作"， "介绍"]
     * 你可以内嵌HTML标签以排版格式
     */
    work: [
        //如果您内有工作经历，您可以采取下列写法
        // ["————————", "", "<p>暂无工作经历，期待您的联系。</p>"]

        ["2021/9/1 — 2024/6/20", "<br>山东建筑大学",
            "<p><strong>地理信息科学｜硕士</strong></p>" +
            "<p>主修课程：研究方向：地理信息服务</p>" +
            "<p>学习成绩：智育成绩第三名。综合测评成绩第三名。山东建筑大学一等奖学金。山东建筑大学优秀研究生团队。</p>"
        ],

        ["2017/9/7 — 2021/6/20", "<br>山东建筑大学",
            "<p><strong>地理信息科学｜本科</strong></p>" +
            "<p>主修课程：网络GIS原理、空间数据库、C#面向对象设计、GIS原理、遥感导论、Java语言程序设计、计算机图形学学习成绩：大一至大四成绩综合排名位于年级段第4名。</p>"  
        ]
    ],


    /**
     * 这里填写你的其他经历
     * ["日期"， "经历"， "介绍"]
     * 建议填写您的校级及以上得奖经历或或其他证书
     */
    others: [
        ["2023-1-25", "Monitoring Land Cover Change by Leveraging a Dynamic Service-Oriented Computing Model", "研二寒假Q1(Huaqiao Xing , Haihang Wang , Jinhua Zhang and Dongyang Hou)，https://doi.org/10.3390/rs15030736"],
        ["2022-12-15", "Domain constraints-driven automatic service composition for online land cover geoprocessing", "研二上Q2(Huaqiao Xing ,Chang Liu ,Rui Li ,Haihang Wang ,Jinhua Zhang  andHuayi Wu)，https://doi.org/10.3390/ijgi11120629"],
        ["2022-11", "第五届中国开源软件创新大赛", "研二上，https://mp.weixin.qq.com/s/K7gdErHmOaeVNhP_9qWd7g"],
        ["2022-9-19", "论文：面向地表覆盖 Web 服务组合的知识建機及推理", "研二上（刘畅、邢华桥、王海航）《测绘与空间地理信息》"],
        ["2022-9", "第六期百度飞浆论文复现挑战赛UNETR： Transformers for 3D Medical Image  第一名","研一"],
        ["2022-9", "第六期百度飞浆论文复现挑战赛STANet for remote sensing image change detection 第一名","研一"],
        ["2022-6", "软著：地表覆盖 Web 服务计算平台V1.0","研一下学期（山东建筑大学、邢华桥、王海航）"],
        ["2022-3", "专利：结合后验概率和空间邻域信息的遥感影像变化检测方法","研一，团队成果（邢华桥；朱林烨；王海航：项俊武：孙兩生；于明洋：仇培元：孟飞），https://kns-cnki-net-443.webvpn.sdjzu.edu.cn/kcms2/article/abstract?v=kxaUMs6x7-4I2jr5WTdXti3zQ9F92xu04RhPoVQd9-31yZc_wClc_9Xs9L1ucjY1vvrdhdAKsCqqRFZgAHni2eO4zl3izxe-&uniplatform=NZKPT"],
        ["2019-11", "第八届全国大学生GIS技能大赛", "大三上学期，安徽芜湖"],
        ["2019-9", "17届SuperMap杯全国GIS技能大赛三等奖（开发组）", "大三上学期，北京超图"]
    ],


    /**
     * 在这里填写您的社交网络平台
     * ["img", "url", "desc"]
     * img是社交平台的图标，在./svg目录下我们已经准备好了 微博、简书、掘金、小红书、知乎、csdn、facebook、github、力扣、CF和qq的图标
     * url是您链接
     * desc是一段描述，将鼠标移入将会显示该描述
     * 建议您放置数量 <= 5
     */
    icon: [
        ["./svg/LeetCode.svg", "https://leetcode-cn.com/u/happysnaker/", "我的力扣主页"],
        ["./svg/github.svg", "https://github.com/happysnaker", "我的GitHub主页"],
        ["./svg/博客.svg", "http://1.15.234.109:8000", "我的个人博客"],
        ["./svg/掘金.svg", "https://juejin.cn/user/3853167638625000", "我的掘金主页"],
        ["./svg/知乎.svg", "https://www.zhihu.com/people/tian-xia-you-dao-81", "我的知乎主页"]
    ],


    //这是一些图片链接，建议您仅更改第二个头像图片
    url: [
        //背景图、头像、作品展示背景、其他经历背景
        "./images/4.jpg",
        "./images/head-img.JPG",
        "./images/earth.jpg",
        "./images/back.jpg"
    ]

}