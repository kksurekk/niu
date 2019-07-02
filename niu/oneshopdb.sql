/*
Navicat MySQL Data Transfer

Source Server         : 192.168.41.118
Source Server Version : 50725
Source Host           : localhost:3306
Source Database       : oneshopdb

Target Server Type    : MYSQL
Target Server Version : 50725
File Encoding         : 65001

Date: 2019-05-09 10:16:28
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `t_category`
-- ----------------------------
DROP TABLE IF EXISTS `t_category`;
CREATE TABLE `t_category` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT,
  `t_name` varchar(255) NOT NULL COMMENT '分类名称',
  PRIMARY KEY (`t_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_category
-- ----------------------------
INSERT INTO `t_category` VALUES ('5', '进口 · 生鲜');
INSERT INTO `t_category` VALUES ('6', '个人美妆洗');
INSERT INTO `t_category` VALUES ('7', '母婴玩具');

-- ----------------------------
-- Table structure for `t_product`
-- ----------------------------
DROP TABLE IF EXISTS `t_product`;
CREATE TABLE `t_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `number` int(11) NOT NULL DEFAULT '0',
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_product
-- ----------------------------
INSERT INTO `t_product` VALUES ('14', '贝思客 草莓先生&蓝莓小姐', '翻领女款纯色T恤休闲百搭夏装班服工作服定制有领短袖运动POLO衫', '198', 'upload/picImg1557365887131.png', '1', '5');
INSERT INTO `t_product` VALUES ('15', '微笑果园SMILE 智利进口绿奇异果', '星期六（ST&SAT）2019年春季专柜同款羊皮革拼色小香风粗高', '84', 'upload/pictureImg1557364372097.png', '1', '5');
INSERT INTO `t_product` VALUES ('16', '新鲜美味 进口美食', '翻领女款纯色T恤休闲百搭夏装班服工作服定制有领短袖运动POLO衫', '98', 'upload/pictureImg1557364397858.png', '1', '5');
INSERT INTO `t_product` VALUES ('17', '新鲜美味 进口美食', '翻领女款纯色T恤休闲百搭夏装班服工作服定制有领短袖运动POLO衫', '24', 'upload/pictureImg1557364422587.png', '1', '5');
INSERT INTO `t_product` VALUES ('18', '新鲜美味 纯牛奶', '星期六（ST&SAT）2019年春季专柜同款羊皮革拼色小香风粗高', '142', 'upload/pictureImg1557364448822.png', '1', '5');
INSERT INTO `t_product` VALUES ('19', '莫斯利安', '翻领女款纯色T恤休闲百搭夏装班服工作服定制有领短袖运动POLO衫', '62', 'upload/pictureImg1557364470180.png', '1', '5');
INSERT INTO `t_product` VALUES ('20', '美宝莲粉饼', '翻领女款纯色T恤休闲百搭夏装班服工作服定制有领短袖运动POLO衫', '260', 'upload/pictureImg1557364499307.png', '1', '6');
INSERT INTO `t_product` VALUES ('21', '儿童推车', '翻领女款纯色T恤休闲百搭夏装班服工作服定制有领短袖运动POLO衫', '100', 'upload/pictureImg1557364521086.png', '1', '7');
INSERT INTO `t_product` VALUES ('22', '男士洗发水', '翻领女款纯色T恤休闲百搭夏装班服工作服定制有领短袖运动POLO衫', '100', 'upload/pictureImg1557367815062.png', '1', '6');
INSERT INTO `t_product` VALUES ('23', '儿童推车', '翻领女款纯色T恤休闲百搭夏装班服工作服定制有领短袖运动POLO衫', '400', 'upload/pictureImg1557367955978.png', '1', '7');
INSERT INTO `t_product` VALUES ('24', '妈咪纸尿裤', '翻领女款纯色T恤休闲百搭夏装班服工作服定制有领短袖运动POLO衫', '400', 'upload/pictureImg1557367972569.png', '1', '7');

-- ----------------------------
-- Table structure for `t_user`
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `headerurl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('60', 'admin', '123', 'upload/userHeader1557364050113.png');
