/*
SQLyog Ultimate v12.08 (64 bit)
MySQL - 5.7.1-m11 : Database - system_university
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`system_university` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `system_university`;

/*Table structure for table `active` */

DROP TABLE IF EXISTS `active`;

CREATE TABLE `active` (
  `acid` varchar(20) NOT NULL COMMENT '活动编号',
  `acname` varchar(100) NOT NULL COMMENT '活动名称',
  `accontent` varchar(200) NOT NULL COMMENT '活动内容',
  `actime` varchar(50) DEFAULT NULL COMMENT '活动时间',
  `acaddress` varchar(50) NOT NULL COMMENT '活动地址',
  `acimg` varchar(50) DEFAULT NULL COMMENT '活动图片',
  `clubid` varchar(20) NOT NULL COMMENT '所属社团编号',
  `isfresh` tinyint(4) NOT NULL COMMENT '是否为纳新活动',
  PRIMARY KEY (`acid`),
  UNIQUE KEY `unique` (`acid`),
  KEY `clubid` (`clubid`),
  CONSTRAINT `active_ibfk_1` FOREIGN KEY (`clubid`) REFERENCES `club` (`clubid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `active` */

insert  into `active`(`acid`,`acname`,`accontent`,`actime`,`acaddress`,`acimg`,`clubid`,`isfresh`) values ('ac123456','书法大赛','为了丰富校园文化生活，营造浓厚校园文化气氛，展现中国文化的博大精深，提升当代大学生的个人文化修养、审美情趣，特提供一个自我展现的平台，以便促进书法方面有爱好的同学间的交流，培养学生各方面的兴趣，为学生活动增添生气，展现我校良好的学习环境制造一个舞台。','2021-04-01--2021-04-22','','123','123456',0),('ac654321','国画大赛','为了丰富校园文化活动，营造浓厚的校园文化艺术氛围，充分展示中国国画的艺术魅力，继承和弘扬传统的国粹文化艺术，提高学生的艺术修养和审美情趣，培养学生各方面的素质，为学生活动增添生气。为国画爱好者提供展现自我价值的平台。','2021-05-21--2021-06-11','','0','654321',0);

/*Table structure for table `apply` */

DROP TABLE IF EXISTS `apply`;

CREATE TABLE `apply` (
  `apid` varchar(20) NOT NULL COMMENT '报名编号',
  `snum` varchar(20) DEFAULT NULL COMMENT '报名学生学号',
  `acid` varchar(20) DEFAULT NULL COMMENT '报名活动',
  `intro` varchar(50) DEFAULT NULL COMMENT '个人介绍',
  PRIMARY KEY (`apid`),
  KEY `clubid` (`acid`),
  KEY `snum` (`snum`),
  CONSTRAINT `apply_ibfk_2` FOREIGN KEY (`snum`) REFERENCES `user` (`snum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `apply` */

insert  into `apply`(`apid`,`snum`,`acid`,`intro`) values ('ap123456','2017011869','ac123456',NULL),('ap648288','2017011869','ac654321',NULL);

/*Table structure for table `club` */

DROP TABLE IF EXISTS `club`;

CREATE TABLE `club` (
  `clubid` varchar(20) NOT NULL COMMENT '社团编号',
  `clubname` varchar(50) NOT NULL COMMENT '社团名称',
  `clubcontent` varchar(200) NOT NULL COMMENT '社团简介',
  `clubimg` varchar(50) DEFAULT NULL COMMENT '社团图片',
  PRIMARY KEY (`clubid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `club` */

insert  into `club`(`clubid`,`clubname`,`clubcontent`,`clubimg`) values ('123456','书法社','书法社成立以来,组织同学们举行了一次书法比赛,并选出成绩非常出色的学生的作品进行了一次书法展览.活动中同学们积极参与,书法社为同学们提供了展示自我的机会,并在比赛中互相学习,互相帮助,形成了良好的学习氛围. 我们书法社的宗旨就是立足我们社的特色，为爱好书法的同学们提供一个学习和展示自我，提高自我和相互交流的一个平台,让同学们用简单的纸,笔,和墨水渲出一幅幅古色古香的书卷,从中体会到传统的书法中的古',NULL),('654321','美术社','美术社是一种个体加工店，可以做室内外喷绘、雕刻、印刷、名片、复印打字、制作标书、各种灯箱牌匾，标牌，科室牌，丝网印刷，条幅，锦旗，授带，展板，易拉宝，X展架，吸塑字，水晶字，白钢字，雪夫板字，户外广告，霓虹灯，奖杯，铜牌，金雕银雕证书等等。',NULL);

/*Table structure for table `college` */

DROP TABLE IF EXISTS `college`;

CREATE TABLE `college` (
  `coid` varchar(20) DEFAULT NULL COMMENT '学院编号',
  `coname` varchar(50) DEFAULT NULL COMMENT '学院名称'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `college` */

insert  into `college`(`coid`,`coname`) values ('co123456','软件工程'),('co654321','美术与设计');

/*Table structure for table `message` */

DROP TABLE IF EXISTS `message`;

CREATE TABLE `message` (
  `meid` varchar(20) NOT NULL COMMENT '留言编号',
  `mecontent` varchar(200) NOT NULL COMMENT '留言内容',
  `snum` varchar(20) NOT NULL COMMENT '留言学生学号',
  `agreenum` int(11) NOT NULL COMMENT '点赞数',
  `metime` varchar(50) DEFAULT NULL COMMENT '留言时间',
  PRIMARY KEY (`meid`),
  KEY `snum` (`snum`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`snum`) REFERENCES `user` (`snum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `message` */

insert  into `message`(`meid`,`mecontent`,`snum`,`agreenum`,`metime`) values ('me123456','好多优秀的作品呀！','2017011869',0,'2021-04-22 12:21:21');

/*Table structure for table `post` */

DROP TABLE IF EXISTS `post`;

CREATE TABLE `post` (
  `postid` varchar(20) NOT NULL COMMENT '职务编号',
  `postname` varchar(20) NOT NULL COMMENT '职务名称',
  PRIMARY KEY (`postid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `post` */

insert  into `post`(`postid`,`postname`) values ('p123456','社长'),('p654321','普通社员');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `snum` varchar(20) NOT NULL COMMENT '学号',
  `sname` varchar(20) NOT NULL COMMENT '昵称',
  `avatar` varchar(100) DEFAULT NULL COMMENT '头像',
  `interest` varchar(50) DEFAULT NULL COMMENT '兴趣爱好',
  `pwd` varchar(20) DEFAULT NULL COMMENT '密码',
  `coid` varchar(20) DEFAULT NULL COMMENT '学院编号',
  `clubid` varchar(20) DEFAULT NULL COMMENT '社团编号',
  `postid` varchar(20) DEFAULT NULL COMMENT '职务编号',
  `isloading` tinyint(4) NOT NULL COMMENT '是否登录',
  `isclub` tinyint(4) NOT NULL COMMENT '是否为社团成员',
  PRIMARY KEY (`snum`),
  KEY `clubid` (`clubid`),
  KEY `postid` (`postid`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`clubid`) REFERENCES `club` (`clubid`),
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`postid`) REFERENCES `post` (`postid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`snum`,`sname`,`avatar`,`interest`,`pwd`,`coid`,`clubid`,`postid`,`isloading`,`isclub`) values ('2017011267','果果',NULL,'乒乓球','123456','co123456',NULL,NULL,1,0),('2017011869','笑笑',NULL,'绘画、唱歌','654321','co654321','123456','p123456',1,1),('2019021654','默默',NULL,'跑步','111111','co654321','654321','p654321',1,1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
