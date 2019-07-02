/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : localhost:3306
 Source Schema         : testdb

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 23/01/2019 11:23:39
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `city` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `picture` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES (1, '沃特篮球鞋', '佛山', 180, 500, '001.jpg');
INSERT INTO `product` VALUES (2, '安踏运动鞋', '福州', 120, 800, '002.jpg');
INSERT INTO `product` VALUES (3, '耐克运动鞋', '广州', 500, 1000, '003.jpg');
INSERT INTO `product` VALUES (4, '阿迪达斯T血衫', '上海', 388, 600, '004.jpg');
INSERT INTO `product` VALUES (5, '李宁文化衫', '广州', 180, 900, '005.jpg');
INSERT INTO `product` VALUES (6, '小米3', '北京', 1999, 3000, '006.jpg');
INSERT INTO `product` VALUES (7, '小米2S', '北京', 1299, 1000, '007.jpg');
INSERT INTO `product` VALUES (8, 'thinkpad笔记本', '北京', 6999, 500, '008.jpg');
INSERT INTO `product` VALUES (9, 'dell笔记本', '北京', 3999, 500, '009.jpg');
INSERT INTO `product` VALUES (10, 'ipad5', '北京', 5999, 500, '010.jpg');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `headerurl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 42 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'test', '123', '/upload/headerimg-1547690833947.jpg');
INSERT INTO `user` VALUES (2, 'tes3', '123', '/upload/headerimg-1547690938512.jpg');
INSERT INTO `user` VALUES (3, 'test5', '123', '');
INSERT INTO `user` VALUES (4, 'admin', '202cb962ac59075b964b07152d234b70', '/upload/headerimg-1547691338239.jpg');
INSERT INTO `user` VALUES (5, '小明', '123', '/upload/headerimg-1547693362843.jpg');
INSERT INTO `user` VALUES (7, '张小三', '122', NULL);
INSERT INTO `user` VALUES (8, '小丽', '123', NULL);
INSERT INTO `user` VALUES (9, '小明', '13', '/upload/headerimg-1547704491807.jpg');
INSERT INTO `user` VALUES (10, '张小三', '123', '/upload/headerimg-1547704502350.jpg');
INSERT INTO `user` VALUES (11, '小明', '321', '/upload/headerimg-1547704518962.jpg');
INSERT INTO `user` VALUES (27, '小丽', '123', '/upload/headerimg-1547773282642.jpg');
INSERT INTO `user` VALUES (29, '小明', '1111', NULL);
INSERT INTO `user` VALUES (30, '小明', '1213', NULL);
INSERT INTO `user` VALUES (31, '小明11', '222', NULL);
INSERT INTO `user` VALUES (33, '小明34', '1212', NULL);
INSERT INTO `user` VALUES (34, '小明a', '112', NULL);
INSERT INTO `user` VALUES (35, '小明aaaa', '11111', NULL);
INSERT INTO `user` VALUES (36, '小明3212', '123', NULL);
INSERT INTO `user` VALUES (38, '王刚', 'b123', '/upload/headerimg-1548137155341.jpg');
INSERT INTO `user` VALUES (39, '田七', 'caf1a3dfb505ffed0d024130f58c5cfa', '/upload/headerimg-1548137358261.jpg');
INSERT INTO `user` VALUES (40, 'root', '202cb962ac59075b964b07152d234b70', '/upload/headerimg-1548206400797.jpg');
INSERT INTO `user` VALUES (41, '周sir', '202cb962ac59075b964b07152d234b70', NULL);

SET FOREIGN_KEY_CHECKS = 1;
