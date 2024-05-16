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
  }
];
var t_load = setInterval(() => {
  if (document.querySelector("meting-js").aplayer != undefined){
    document.querySelector("meting-js").aplayer.list.add(JaySongsheet);
    clearInterval(t_load);
  };
},50);
