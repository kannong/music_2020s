console.log("\n %c基于 HeoMusic 开源静态音乐播放器 v1.3.2 二改（自用）：Gavin Chen%c https://github.com/zhheo/HeoMusic \n", "color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;")
var volume = 0.8;

// 获取地址栏参数
// 创建URLSearchParams对象并传入URL中的查询字符串
const params = new URLSearchParams(window.location.search);

var heo = {
  // 音乐节目切换背景
  changeMusicBg: function (isChangeBg = true) {
    const heoMusicBg = document.getElementById("music_bg")

    if (isChangeBg) {
      // player loadeddata 会进入此处
      const musiccover = document.querySelector("#heoMusic-page .aplayer-pic");
      var img = new Image();
      img.src = extractValue(musiccover.style.backgroundImage);
      img.onload = function() {
        heoMusicBg.style.backgroundImage = musiccover.style.backgroundImage;
      };
    } else {
      // 第一次进入，绑定事件，改背景
      let timer = setInterval(()=>{
        const musiccover = document.querySelector("#heoMusic-page .aplayer-pic");
        // 确保player加载完成
        // console.info(heoMusicBg);
        if (musiccover) {
          clearInterval(timer)
          //初始化音量
          document.querySelector('meting-js').aplayer.volume(0.8,true);
          // 绑定事件
          heo.addEventListenerChangeMusicBg();
        }
      }, 100)
    }
  },
  addEventListenerChangeMusicBg: function () {
    const heoMusicPage = document.getElementById("heoMusic-page");
    heoMusicPage.querySelector("meting-js").aplayer.on('loadeddata', function () {
      heo.changeMusicBg();
      // console.info('player loadeddata');
    });
  },
  getCustomPlayList: function() {
    const heoMusicPage = document.getElementById("heoMusic-page");
    if (params.get("id") && params.get("server")) {
      console.log("获取到自定义内容")
      var id = params.get("id")
      var server = params.get("server")
      heoMusicPage.innerHTML = `<meting-js id="${id}" server=${server} type="playlist" mutex="true" preload="auto" order="random"></meting-js>`;
    }else {
      console.log("无自定义内容")
      heoMusicPage.innerHTML = `<meting-js id="${userId}" server="${userServer}" type="playlist" mutex="true" preload="auto" order="random"></meting-js>`;
    }
    heo.changeMusicBg(false);
  }
}

// 调用
heo.getCustomPlayList();


// 改进vh
const vh = window.innerHeight * 1;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 1;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

//获取图片url
function extractValue(input) {
  var valueRegex = /\("([^\s]+)"\)/g;
  var match = valueRegex.exec(input);
  return match[1];
}

//空格控制音乐
document.addEventListener("keydown", function(event) {
  //暂停开启音乐
  if (event.code === "Space") {
    event.preventDefault();
    document.querySelector('meting-js').aplayer.toggle();
  };
  //切换下一曲
  if (event.keyCode === 39) {
    event.preventDefault();
    document.querySelector('meting-js').aplayer.skipForward();
  };
  //切换上一曲
  if (event.keyCode === 37) {
    event.preventDefault();
    document.querySelector('meting-js').aplayer.skipBack();
  }
  //增加音量
  if (event.keyCode === 38) {
    if (volume <= 1) {
      volume += 0.1;
      document.querySelector('meting-js').aplayer.volume(volume,true);
    }
  }
  //减小音量
  if (event.keyCode === 40) {
    if (volume >= 0) {
      volume += -0.1;
      document.querySelector('meting-js').aplayer.volume(volume,true);
    }
  }
});


//外接歌单置入
var JaySongsheet = [
  // 2020 大号
  {
      "title":"幻爱",
      "author":"小尘埃",
      "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/mp3/01.mp3",
      "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/cover/01.jpg",
      "lrc":"../all_lrc/lrc2020/1_幻爱-小尘埃.lrc"
  },
  {
    "title":"幻爱（国语版）",
    "author":"小尘埃",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/mp3/02.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/cover/02.jpg",
    "lrc":"../all_lrc/lrc2020/2_幻爱（国语版）-小尘埃.lrc"
  },
  {
    "title":"碧玉",
    "author":"王菀之",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/mp3/03.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/cover/03.jpg",
    "lrc":"../all_lrc/lrc2020/3_碧玉-王菀之.lrc"
  },
  {
    "title":"无名指的勇气",
    "author":"林欣彤",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/mp3/04.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/cover/04.jpg",
    "lrc":"../all_lrc/lrc2020/4_无名指的勇气-林欣彤.lrc"
  },
  {
    "title":"拼命无恙",
    "author":"林家谦",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/mp3/05.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/cover/05.jpg",
    "lrc":"../all_lrc/lrc2020/5_拼命无恙-林家谦.lrc"
  },
  {
      "title":"自由之夏",
      "author":"黄耀明",
      "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/mp3/06.mp3",
      "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/cover/06.jpg",
      "lrc":"../all_lrc/lrc2020/6_自由之夏-黄耀明.lrc"
  },
  {
      "title":"恨",
      "author":"許廷鏗",
      "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/mp3/07.mp3",
      "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/cover/07.jpg",
      "lrc":"../all_lrc/lrc2020/7_恨-許廷鏗.lrc"
  },
  {
      "title":"慌",
      "author":"許廷鏗",
      "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/mp3/08.mp3",
      "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/cover/08.jpg",
      "lrc":"../all_lrc/lrc2020/8_慌-許廷鏗.lrc"
  },
  {
      "title":"贱",
      "author":"許廷鏗",
      "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/mp3/09.mp3",
      "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/cover/09.jpg",
      "lrc":"../all_lrc/lrc2020/9_贱-許廷鏗.lrc"
  },
  {
      "title":"谎",
      "author":"許廷鏗",
      "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/mp3/10.mp3",
      "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/cover/10.jpg",
      "lrc":"../all_lrc/lrc2020/10_谎-許廷鏗.lrc"
  },
  {
      "title":"亲密距离",
      "author":"刘美君",
      "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/mp3/11.mp3",
      "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/cover/11.jpg",
      "lrc":"../all_lrc/lrc2020/11_亲密距离-刘美君.lrc"
  },
  {
      "title":"只想死于你身边",
      "author":"谢安琪",
      "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/mp3/12.mp3",
      "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/cover/12.jpg",
      "lrc":"../all_lrc/lrc2020/12_只想死于你身边-谢安琪.lrc"
  },

  // 2021 大号
  {
    "title":"废柴",
    "author":"小肥",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/mp3/01.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/cover/01.jpg",
    "lrc":"../all_lrc/lrc2021/1_废柴-小肥.lrc"
  },
  {
    "title":"你好吗",
    "author":"方皓玟",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/mp3/02.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/cover/02.jpg",
    "lrc":"../all_lrc/lrc2021/2_你好吗-方皓玟.lrc"
  },
  {
    "title":"自白的勇气",
    "author":"林二汶",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/mp3/03.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/cover/03.jpg",
    "lrc":"../all_lrc/lrc2021/3_自白的勇气-林二汶.lrc"
  },
  {
    "title":"佛系人生",
    "author":"许廷铿",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/mp3/04.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/cover/04.jpg",
    "lrc":"../all_lrc/lrc2021/4_佛系人生-许廷铿.lrc"
  },
  {
    "title":"别放弃治疗",
    "author":"连诗雅",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/mp3/05.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/cover/05.jpg",
    "lrc":"../all_lrc/lrc2021/5_别放弃治疗-连诗雅.lrc"
  },
  {
    "title":"最好好好讲再见",
    "author":"陈天翱",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/mp3/06.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/cover/06.jpg",
    "lrc":"../all_lrc/lrc2021/6_最好好好讲再见-陈天翱.lrc"
  },
  {
    "title":"我的男朋友",
    "author":"达明一派",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/mp3/07.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/cover/07.jpg",
    "lrc":"../all_lrc/lrc2021/7_我的男朋友-达明一派.lrc"
  },
  {
    "title":"两种人 Love Follows",
    "author":"何嘉莉",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/mp3/08.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/cover/08.jpg",
    "lrc":"../all_lrc/lrc2021/8_两种人 Love Follows-何嘉莉.lrc"
  },

  // 2022 大号
  {
    "title":"某种老朋友",
    "author":"林家谦",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2022/mp3/01.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2022/cvover/01.jpg",
    "lrc":"../all_lrc/lrc2021/1_某种老朋友-林家谦.lrc"
  },
  {
    "title":"海底隧道",
    "author":"Kolor",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2022/mp3/02.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2022/cvover/02.jpg",
    "lrc":"../all_lrc/lrc2021/2_海底隧道-Kolor.lrc"
  },
  {
    "title":"推理的爱",
    "author":"Yuta",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2022/mp3/03.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2022/cvover/03.jpg",
    "lrc":"../all_lrc/lrc2021/3_推理的爱-Yuta.lrc"
  },
  {
    "title":"修罗场",
    "author":"许廷铿",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2022/mp3/04.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2022/cvover/04.jpg",
    "lrc":"../all_lrc/lrc2021/4_修罗场-许廷铿.lrc"
  },
  {
    "title":"没有人可以为你的幸福负责",
    "author":"许廷铿",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2022/mp3/05.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2022/cvover/05.jpg",
    "lrc":"../all_lrc/lrc2021/5_没有人可以为你的幸福负责-许廷铿.lrc"
  },
  {
    "title":"有今生没来世",
    "author":"许廷铿",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2022/mp3/06.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2022/cvover/06.jpg",
    "lrc":"../all_lrc/lrc2021/6_有今生没来世-许廷铿.lrc"
  },
  {
    "title":"煽风点火",
    "author":"许廷铿",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2022/mp3/07.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2022/cvover/07.jpg",
    "lrc":"../all_lrc/lrc2021/7_煽风点火-许廷铿.lrc"
  },
  {
    "title":"都是别人的",
    "author":"许廷铿",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2022/mp3/08.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2022/cvover/08.jpg",
    "lrc":"../all_lrc/lrc2021/8_都是别人的-许廷铿.lrc"
  },
  {
    "title":"旁听他人的秘密",
    "author":"许廷铿",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2022/mp3/09.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2022/cvover/09.jpg",
    "lrc":"../all_lrc/lrc2021/9_旁听他人的秘密-许廷铿.lrc"
  },
  {
    "title":"小奇迹日",
    "author":"许廷铿",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2022/mp3/10.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2022/cvover/10.jpg",
    "lrc":"../all_lrc/lrc2021/10_小奇迹日-许廷铿.lrc"
  },
  {
    "title":"自我安慰",
    "author":"古巨基 MC 張天賦",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2022/mp3/11.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2022/cvover/11.jpg",
    "lrc":"../all_lrc/lrc2021/11_自我安慰-古巨基 MC 張天賦.lrc"
  },
  {
    "title":"漂流教室",
    "author":"古巨基 Edan 呂爵安",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2022/mp3/12.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2022/cvover/12.jpg",
    "lrc":"../all_lrc/lrc2021/12_漂流教室-古巨基 Edan 呂爵安.lrc"
  },

  // 2020 小号
  {
      "title":"亲密距离",
      "author":"李幸倪",
      "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/mp3/13.mp3",
      "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/cover/13.jpg",
      "lrc":"../all_lrc/lrc2020/13_敢-李幸倪.lrc"
  },
  {
      "title":"开错灯",
      "author":"李幸倪",
      "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/mp3/14.mp3",
      "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/cover/14.jpg",
      "lrc":"../all_lrc/lrc2020/14_开错灯-李幸倪.lrc"
  },
  {
      "title":"开灯 . 熄灯 (熄灯版)",
      "author":"李幸倪",
      "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/mp3/15.mp3",
      "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/cover/15.jpg",
      "lrc":"../all_lrc/lrc2020/15_开灯 . 熄灯 (熄灯版)-李幸倪.lrc"
  },
  {
      "title":"开灯 . 熄灯 (开灯版)",
      "author":"李幸倪",
      "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/mp3/16.mp3",
      "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/cover/16.jpg",
      "lrc":"../all_lrc/lrc2020/16_开灯 . 熄灯 (开灯版)-李幸倪.lrc"
  },
  {
      "title":"幸福门",
      "author":"李幸倪",
      "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/mp3/17.mp3",
      "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/cover/17.jpg",
      "lrc":"../all_lrc/lrc2020/17_幸福门-李幸倪.lrc"
  },
  {
      "title":"美男子与香烟",
      "author":"李幸倪",
      "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/mp3/18.mp3",
      "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/cover/18.jpg",
      "lrc":"../all_lrc/lrc2020/18_美男子与香烟-李幸倪.lrc"
  },
  {
      "title":"别人的家",
      "author":"李幸倪",
      "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/mp3/19.mp3",
      "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/cover/19.jpg",
      "lrc":"../all_lrc/lrc2020/19_别人的家-李幸倪.lrc"
  },
  {
      "title":"搬",
      "author":"李幸倪",
      "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/mp3/20.mp3",
      "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/cover/20.jpg",
      "lrc":"../all_lrc/lrc2020/20_搬-李幸倪.lrc"
  },
  {
      "title":"成家",
      "author":"李幸倪",
      "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/mp3/21.mp3",
      "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/cover/21.jpg",
      "lrc":"../all_lrc/lrc2020/21_成家-李幸倪.lrc"
  },
  {
      "title":"See You Next Time",
      "author":"AGA 江海迦",
      "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/mp3/22.mp3",
      "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2020/cover/22.jpg",
      "lrc":"../all_lrc/lrc2020/22_See You Next Time-AGA.lrc"
  },

  // 2021 小号
  {
    "title":"Old Fashioned",
    "author":"黎明 张敬轩",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/mp3/09.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/cover/09.jpg",
    "lrc":"../all_lrc/lrc2021/9_Old Fashioned-黎明 张敬轩.lrc"
  },
  {
    "title":"烟花纪",
    "author":"容祖儿",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/mp3/10.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/cover/10.jpg",
    "lrc":"../all_lrc/lrc2021/10_烟花纪-容祖儿.lrc"
  },
  {
    "title":"辛苦你了",
    "author":"容祖儿",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/mp3/11.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/cover/11.jpg",
    "lrc":"../all_lrc/lrc2021/11_辛苦你了-容祖儿.lrc"
  },
  {
    "title":"何日不再来",
    "author":"邓丽欣",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/mp3/12.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/cover/12.jpg",
    "lrc":"../all_lrc/lrc2021/12_何日不再来-邓丽欣.lrc"
  },
  {
    "title":"一个人的地球",
    "author":"张敬轩",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/mp3/13.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/cover/13.jpg",
    "lrc":"../all_lrc/lrc2021/13_一个人的地球 (SACD Mastering)-张敬轩.lrc"
  },
  {
    "title":"花样年华",
    "author":"郭子",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/mp3/14.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/cover/14.jpg",
    "lrc":"../all_lrc/lrc2021/14_花样年华-郭子.lrc"
  },
  {
    "title":"因為愛所以恨",
    "author":"潘裕文",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/mp3/15.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/cover/15.jpg",
    "lrc":"../all_lrc/lrc2021/15_因為愛所以恨-潘裕文.lrc"
  },
  {
    "title":"无人知晓的浪漫",
    "author":"潘裕文",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/mp3/16.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/cover/16.jpg",
    "lrc":"../all_lrc/lrc2021/16_无人知晓的浪漫-潘裕文.lrc"
  },
  {
    "title":"迟了悔改",
    "author":"周殷廷",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/mp3/17.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/cover/17.jpg",
    "lrc":"../all_lrc/lrc2021/17_迟了悔改-周殷廷.lrc"
  },
  {
    "title":"你为何还未睡",
    "author":"邓思朗",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/mp3/18.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/cover/18.jpg",
    "lrc":"../all_lrc/lrc2021/18_你为何还未睡-邓思朗.lrc"
  },
  {
    "title":"记忆棉",
    "author":"MC 张天赋",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/mp3/19.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2021/cover/19.jpg",
    "lrc":"../all_lrc/lrc2021/19_记忆棉-MC 张天赋.lrc"
  },

  // 2022 小号  
  {
    "title":"不演了",
    "author":"潘嘉丽",
    "url":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2022/mp3/13.mp3",
    "pic":"https://kannong.oss-cn-shenzhen.aliyuncs.com/xiye/everyyears/2020s/2022/cvover/13.jpg",
    "lrc":"../all_lrc/lrc2021/13_不演了-潘嘉丽.lrc"
  }
      
];
var t_load = setInterval(() => {
  if (document.querySelector("meting-js").aplayer != undefined){
    document.querySelector("meting-js").aplayer.list.add(JaySongsheet);
    clearInterval(t_load);
  };
},50);
