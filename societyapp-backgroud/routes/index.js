var express = require('express');
var router = express.Router();
var data=require('../data.json');var List=data.chapterList;
var mysql=require('mysql');
var dbconfig = require('../config/dbconfig.json');
var bodyParser=require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var con = mysql.createConnection(dbconfig);
con.connect();
router.get('/', function(req, res, next) {
  res.render('login', { title:'高校社团后台管理系统' });
  console.log(req.query);
});

//查找个人资料
router.post("/login/person", function (req, res, next) {
  var username=req.body.username;
  var con = mysql.createConnection(dbconfig);
  con.connect();
  con.query("select username,intro,sex,snumber,college from login where username=?",[username], function (err, result) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(result);
      var response = {
        message:result[0]
      }
      res.json(response);
    }
  })
})

//更新个人资料
router.post("/newintroduce/add",function(req,res,next){
  var intro=req.body.intro;
  var username=req.body.username;
  var sex=req.body.sex;
  var snumber=req.body.snumber;
  var college=req.body.college;
  // console.log(username,birth,sex);
  var con=mysql.createConnection(dbconfig);
  // console.log(username, imgpath, sex, birth, oldusername);
  con.connect();
  // update chapters set content=? where chapterid=?  更新，注册创建
  // insert into users(username,imgpath,sex,birth) values(?,?,?,?)
  con.query("update login set intro=?,sex=?,snumber=?,college=? where username=?",[intro,sex,snumber,college,username],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.end("success");
    }
  })
})

// 提交动态
router.post("/dt/save", function (req, res, next) {
  // var timestamp = new Date().getTime();
  // var timestamp = (new Date()).valueOf();
  var timestamp = Date.parse(new Date());
  var username = req.body.username;
  var content = req.body.content;
  var picpath = "../../assets/yjy/ytx.png";
  console.log(timestamp,username,content);
  // console.log(picpath);
  // var aa = 'picpath';

  // var aa=picpath.toString('base64');
  // console.log(aa);

  // console.log(req.body);
  var con = mysql.createConnection(dbconfig);
  con.connect();
  con.query("insert into dt(username,content,picpath,createtime) values(?,?,?,?)", [username, content,picpath, timestamp], function (err, result) {
    if (err) {
      console.log(err);
    }
    else {
      var response = {
        message: 'success'
      }
      res.json(response);
    }
  })
})

// 获取我的动态
router.post("/dt/mine", function (req, res, next) {
  var username = req.body.username;
  // var username = req.body.username;
  var con = mysql.createConnection(dbconfig);
  con.connect();
  con.query("select login.username,imgpath,content,createtime,picpath from login,dt where login.username=dt.username and dt.username=? Order By createtime Desc", [username], function (err, result) {
    if (err) {
      console.log(err);
    }
    else {
      // console.log(result)
      for (var i = 0; i < result.length; i++) {
        var time = new Date(parseInt(result[i].createtime));
        result[i].createtime = time.toLocaleDateString().replace(/\//g, "-") + " " + time.toTimeString().substr(0, 8);
      }
      var response = {
        message: result
      }
      res.json(response);
    }
  })
})

// 获取动态列表
router.get("/dt/list", function (req, res, next) {
  var con = mysql.createConnection(dbconfig);
  con.connect();
  con.query("select login.username,content,createtime,picpath from dt,login where dt.username=login.username Order By createtime Desc", function (err, result) {
    if (err) {
      console.log(err);
    }
    else {
      for (var i = 0; i < result.length; i++) {
        var time = new Date(parseInt(result[i].createtime));
        result[i].createtime = time.toLocaleDateString().replace(/\//g, "-") + " " + time.toTimeString().substr(0, 8);
      }
      // console.log(result)
      var response = {
        message: result
      }
      res.json(response);
    }
  })
})





















// /* POST 登录验证 && GET login page. */
router.get('/login', function(req, res, next) {
  var response = {
    "snum":req.query.snum,
    "pwd":req.query.pwd,
};
var selectSQL = "select snum,pwd from user where snum = '"+req.query.snum+"' and pwd = '"+req.query.pwd+"'";
   
  con.query(selectSQL,function(err,result){
    if(err){
      console.log(err);
    }
    else if(result==''){
      res.json({ret_code : 1, ret_msg : '用户名密码错误'});// 若登录失败
    }
    else{
        res.redirect('/system');
      
    }
  });
});


router.get('/system', function(req, res, next) {
    con.query("select * from user where isclub=1",function(err,result){
      if(err){
        console.log(err);
      }
      else{
        res.render("system",{manager:result});
        console.log(result);
      } 
    })
});




//编辑管理员
router.get('/editM', function(req, res, next) {
  var snum=req.query.snum;
  con.query("select * from user where snum=?",[snum],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      console.log(result);
      res.render('editM',{editMList:result});
    }
  })
});

router.post('/editManager',function(req,res,next){
  var snum=req.query.snum;
  var sname=req.body.sname;
  var coid= req.body.coid;
  var clubid=req.body.clubid;
  var postid=req.body.postid;
  var pwd=req.body.pwd;
  con.query("update user set sname=?,coid=?,clubid=?,postid=?,pwd=? where snum=?",[sname,coid,clubid,postid,pwd,snum],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.redirect("/system");
    }
  })
})
// 删除
// 删除-管理员
router.get('/del',function(req,res,next){
  var snum=req.query.snum;
  con.query("delete from user where snum=?",[snum],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      console.log(result);
      res.redirect("/system");
    }
  });
});
// 删除社团
router.get('/delClub',function(req,res,next){
  var clubid=req.query.clubid;
  con.query("delete from club where clubid=?",[clubid],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      console.log(result);
      res.redirect("/club");
    }
  });
});
// del-active
router.get('/dela',function(req,res,next){
  var acid=req.query.acid;
  con.query("SET FOREIGN_KEY_CHECKS=0");
  con.query("delete from active where acid=?",[acid],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      console.log(result);
    res.redirect("/activity");
    }
  });
}); 
// del-message
router.get('/deld',function(req,res,next){
  var meid=req.query.meid;
  con.query("delete from message where meid=?",[meid],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      console.log(result);
    res.redirect("/dongtai");
    }
  });
});
// del-user
router.get('/delu',function(req,res,next){
  var snum=req.query.snum;
  con.query("SET FOREIGN_KEY_CHECKS=0")
  con.query("delete from user where snum=?",[snum],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      console.log(result);
    res.redirect("/userguanli");
    }
  });
});
// del-applyer
router.get('/delbm',function(req,res,next){
  var apid=req.query.apid;
  var acid=req.query.acid;
  con.query("SET FOREIGN_KEY_CHECKS=0")
  con.query("delete from apply where apid=?",[apid],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      console.log(result);
    res.redirect('/activity');
    }
  });
});


// 搜索
// 搜索-系统管理
router.post('/this_system',function(req,res,next){
  console.log(req.body);
  var search_result = JSON.stringify(req.body.search_Dongtai).slice(1,-1);
  console.log(search_result);
  var selectSQL = "select * from user where snum=?";
  console.log(selectSQL);
  con.query(selectSQL,search_result,function(err,result){
    console.log(result);
    if(err){
      console.log(err);
    }
    else{
      res.render('editM',{editMList:result});
    }
  })
});
// 搜索-社团管理
router.post('/this_club',function(req,res,next){
  console.log(req.body);
  var search_result = JSON.stringify(req.body.search_Dongtai).slice(1,-1);
  console.log(search_result);
  var selectSQL = "select * from club where clubname=?";
  console.log(selectSQL);
  con.query(selectSQL,search_result,function(err,result){
    console.log(result);
    if(err){
      console.log(err);
    }
    else{
      res.render('editM',{editMList:result});
    }
  })
});
// search-active
router.post('/activeli',function(req,res,next){
  var search_result = JSON.stringify(req.body.search_Dongtai).slice(1,-1);
  console.log(search_result);
  var selectSQL = "select * from active where acname=?";
  console.log(selectSQL);
  con.query(selectSQL,search_result,function(err,result){
    console.log(result);
    if(err){
      console.log(err);
    }
    else{
      res.render("activityM",{active:result});
    }
  })
  })
// search-message
router.post('/dongtai',function(req,res,next){
  var search_result = JSON.stringify(req.body.search_Dongtai).slice(1,-1);
  console.log(search_result);
    var selectSQL = "select * from message where snum=?";
    console.log(selectSQL);
    con.query(selectSQL,search_result,function(err,result){
      console.log(result);
      if(err){
        console.log(err);
      }
      else{
        res.render("dongtaiM",{dynamic:result});
      }
    })
  })
// search-user
router.post('/this_manager',function(req,res,next){
  console.log(req.body);
  var search_result = JSON.stringify(req.body.search_Dongtai).slice(1,-1);
  console.log(search_result);
  var selectSQL = "select * from user where snum=?";
  console.log(selectSQL);
  con.query(selectSQL,search_result,function(err,result){
    console.log(result);
    if(err){
      console.log(err);
    }
    else{
      res.render("userGuanli",{userinfo:result});
    }
  })
});



// 添加
// 添加-管理员
router.post('/add',function(req,res,next){
  var snum=req.body.snum;
  var sname= req.body.sname;
  var interest=req.body.interest;
  var coid=req.body.coid;
  var clubid=req.body.clubid;
  var postid=req.body.postid;
  var isclub=1;
  con.query("SET FOREIGN_KEY_CHECKS=0");
  con.query("insert into user(snum,sname,interest,coid,clubid,postid,isclub) values(?,?,?,?,?,?,?)",[snum,sname,interest,coid,clubid,postid,isclub],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      console.log(result);
      res.redirect("/system");
    }
  });
});
// 添加-添加社团
router.post('/addclub',function(req,res,next){
  var clubname=req.body.clubname;
  var clubcontent=req.body.clubcontent;
  var clubimg=req.body.clubimg;
  con.query("SET FOREIGN_KEY_CHECKS=0");
  con.query("insert into club(clubid,clubname,clubContent,clubimg) values(?,?,?,?)",[parseInt((Math.random()*1000000)),clubname,clubcontent,clubimg],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      console.log(result);
      res.redirect("/club");
    }
  });
});
// 添加-添加活动
router.post('/addPlay',function(req,res,next){
  var acname= req.body.acname;
  var accontent=req.body.accontent;
  var acimg=req.body.acimg;
  var acaddress=req.body.acaddress;
  var actime=req.body.actime;
  var clubid = req.body.clubid;
  con.query("SET FOREIGN_KEY_CHECKS=0");
  con.query("insert into active(acid,acname,accontent,acimg,acaddress,actime,clubid) values(?,?,?,?,?,?,?)",['ac'+parseInt((Math.random()*1000000)),acname,accontent,acimg,acaddress,actime,clubid],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      console.log(result);
      res.redirect("/activity");
    }
  });
});



//社团管理
router.get('/club',function(req,res,next){
  con.query("select * from club",function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render("club",{club:result})
    }
  });
})
// 成员表
router.get("/clubMember",function(req,res,next){
  var clubid=req.query.clubid;
  con.query("select * from user where clubid=?",[clubid],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render('clubMember',{members:result})
    }
  })
});
// 编辑
// 编辑-成员
router.get('/editMember', function(req, res, next) {
  var snum=req.query.snum;
  con.query("select * from user where snum=?",[snum],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      console.log(result);
      res.render('editMember',{members:result});
    }
  })
});
// 编辑-社团
router.get('/editClub', function(req, res, next) {
  var clubid=req.query.clubid;
  con.query("select * from club where clubid=?",[clubid],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      console.log(result);
      res.render('editClub',{club:result});
    }
  })
});
// 编辑-活动
router.get('/editA', function(req, res, next) {
  var acid=req.query.acid;
  con.query("select * from active where acid=?",[acid],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      console.log(result);
      res.render('editA',{editAList:result});
    }
  })
});


// 编辑后
// edit af-member
router.post('/editMember',function(req,res,next){
  var snum=req.query.snum;
  var sname=req.body.sname;
  var coid= req.body.coid;
  var postid=req.body.postid;
  con.query("update user set sname=?,coid=?,postid=? where snum=?",[sname,coid,postid,snum],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.redirect("/clubMember?snum="+snum);
    }
  })
})
// edit af-active
router.post('/editAcitve',function(req,res,next){
  var acid=req.query.acid;
  var acname= req.body.acname;
  var accontent=req.body.accontent;
  var acimg=req.body.acimg;
  var acaddress=req.body.accddress;
  var actime=req.body.actime;
  con.query("update active set acname=?,accontent=?,acimg=?,acaddress=?,actime=? where acid=?",[acname,accontent,acimg,acaddress,actime,acid],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      console.log(result);
      res.redirect("/activity");
    }
  })
})
// edit ef-club
router.post('/editClub', function(req, res, next) {
  var clubid=req.query.clubid;
  var clubname=req.body.clubname;
  var clubcontent=req.body.clubcontent;
  var clubimg=req.body.clubimg;
  con.query("update club set clubname=?,clubcontent=?,clubimg=? where clubid=?",[clubname,clubcontent,clubimg,clubid],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      console.log(result);
      res.redirect("/club");
    }
  })
});

// 活动管理
router.get('/activity', function(req, res, next) {
  con.query("select * from active",function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render("activityM",{active:result});
      // console.log(result);
    }
  });
});

// 社区管理
router.get('/dongtai', function(req, res, next) {
  con.query("select * from message",function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render("dongtaiM",{dynamic:result});
    }
  });
});

// 用户管理
router.get('/userguanli', function(req, res, next) {
  con.query("select * from user",function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render("userGuanli",{userinfo:result});
      // console.log(result);
    }
  });
});

// 报名表
router.get('/listb', function(req, res, next) {
  var acid=req.query.acid;
  con.query("select * from apply where acid=?",[acid],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render("listb",{signup:result});
      // console.log(result);
    }
  });
});


router.get('/zhuce', function(req, res, next) {
  res.render('zhuceM', {List:List});
});
router.get('/showPlay',function(req,res,next){
  res.render('showPlay',{List:List});
})
router.get('/addclub',function(req,res,next){
  res.render('addclub',{List:List});
})

router.get('/editD', function(req, res, next) {
  var dynamicId=req.query.dynamicId;
  con.query("select * from dynamic where dynamicId=?",[dynamicId],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      console.log(result);
      res.render('editD',{editDList:result});
    }
  })
});
router.post('/editDynamic',function(req,res,next){
  var dynamicId=req.query.dynamicId;
  var dynamicContent=req.body.content;
  var dynamicImg= req.body.img;
  var likeNum=req.body.num;
 
  con.query("update dynamic set dynamicContent=?,dynamicImg=?,likeNum=? where dynamicId=?",[dynamicContent,dynamicImg,likeNum,dynamicId],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.redirect("/dongtai");
    }
  })
})

router.get('/editU', function(req, res, next) {
  var userId=req.query.userId;
  con.query("select * from userinfo where userId=?",[userId],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      console.log(result);
      res.render('editU',{editUList:result});
    }
  })
});





  
     
   
    
    
    router.get('/delpet',function(req,res,next){
      var petId=req.query.petId;
      var userId=req.query.userId;
      con.query("SET FOREIGN_KEY_CHECKS=0")
      con.query("delete from petinfo where petId=?",[petId],function(err,result){
        if(err){
          console.log(err);
        }
        else{
          console.log(result);
        res.redirect(`/listp?userId=${userId}`);
        }
      });
    });
    router.get('/delclock',function(req,res,next){
      var clockId=req.query.clockId;
      var userId=req.query.userId;
      con.query("SET FOREIGN_KEY_CHECKS=0")
      con.query("delete from clockin where clockId=?",[clockId],function(err,result){
        if(err){
          console.log(err);
        }
        else{
          console.log(result);
        res.redirect(`/listd?userId=${userId}`);
        }
      });

    });


    router.get('/delguanzhu',function(req,res,next){
      var clockId=req.query.clockId;
      var userId=req.query.userId;
      con.query("SET FOREIGN_KEY_CHECKS=0")
      con.query("delete from guanzhu where userId=?",[userId],function(err,result){
        if(err){
          console.log(err);
        }
        else{
          console.log(result);
        res.redirect(`/liste?userId=${userId}`);
        }
      });
    });











router.get('/listt', function(req, res, next) {
  res.render('listt', {title:'吾宠后台管理系统'});
  // res.render('list', {List:List});
});
router.get('/listp', function(req, res, next) {
  var userId=req.query.userId;
  con.query("select * from petinfo where userId=?",[userId],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render("listp",{petinfo:result});
      // console.log(result);
    }
  });
});

router.get('/listd', function(req, res, next) {
  var userId=req.query.userId
  con.query("select * from clockin where userId=?",[userId],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render("listd",{clockin:result});
      // console.log(result);
    }
  });
});
router.get('/liste', function(req, res, next) {
  var userId=req.query.userId
  con.query("select * from guanzhu where userId=?",[userId],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render("liste",{guanzhu:result});
      // console.log(result);
    }
  });
});


module.exports = router;

//领域
