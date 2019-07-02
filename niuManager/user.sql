/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50725
Source Host           : localhost:3306
Source Database       : usermanager

Target Server Type    : MYSQL
Target Server Version : 50725
File Encoding         : 65001

Date: 2019-04-26 16:37:53
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `headerurl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('13', 'dsd', '123', 'upload/upHeaderImg1556180254932.png');
INSERT INTO `user` VALUES ('34', 'admin1', '123', 'upload/upHeaderImg1556184031072.png');
INSERT INTO `user` VALUES ('35', 'gdy', '999', 'upload/upHeaderImg1556183960824.png');
INSERT INTO `user` VALUES ('42', 'aaaaa', '111', 'upload/headerImg1556179381592.png');
INSERT INTO `user` VALUES ('43', '小就', '159', 'upload/upHeaderImg1556180794153.png');
INSERT INTO `user` VALUES ('44', 'gh', '459', 'upload/headerImg1556180786622.png');
INSERT INTO `user` VALUES ('46', 'qwe', '159', null);
INSERT INTO `user` VALUES ('47', 'uill', 'jljk', 'upload/headerImg1556183436064.png');
INSERT INTO `user` VALUES ('48', 'kjljkl', 'jl', 'upload/headerImg1556183436064.png');
INSERT INTO `user` VALUES ('49', 'jkljkl', 'jklu', 'upload/upHeaderImg1556183514341.png');
INSERT INTO `user` VALUES ('51', '小就s', 'fdg', null);
INSERT INTO `user` VALUES ('53', 'ty', '159', null);
INSERT INTO `user` VALUES ('54', 'yiy', '4569', null);
INSERT INTO `user` VALUES ('55', 'yui', '459', 'upload/upHeaderImg1556183846177.png');
INSERT INTO `user` VALUES ('56', 'jkljds', '159', null);
INSERT INTO `user` VALUES ('57', 'pokp', 'pko', null);
INSERT INTO `user` VALUES ('61', '小就', 'sd', null);
