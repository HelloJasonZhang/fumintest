/*
 Navicat Premium Data Transfer

 Source Server         : localhost-jason
 Source Server Type    : MySQL
 Source Server Version : 80016
 Source Host           : localhost:3306
 Source Schema         : litemall

 Target Server Type    : MySQL
 Target Server Version : 80016
 File Encoding         : 65001

 Date: 23/03/2020 10:20:48
*/
-- ----------------------------
INSERT INTO `litemall_dict` VALUES (1, '获取途径', '报纸', 'paper', 1, 1, 0, NULL, NULL, NULL, '2020-03-22 15:22:56');
INSERT INTO `litemall_dict` VALUES (2, '更换银行', '提示语', '是否更换银行', 2, 1, 0, NULL, NULL, '2020-03-22 15:12:43', '2020-03-22 15:22:17');
INSERT INTO `litemall_dict` VALUES (3, '立即结束', '提示语', '是否立即结束', 1, 1, 0, NULL, NULL, '2020-03-22 15:14:05', '2020-03-22 15:21:57');
INSERT INTO `litemall_dict` VALUES (4, '申请银行', '提示语', '是否确定选择银行', 1, 1, 0, NULL, NULL, '2020-03-22 15:15:48', '2020-03-22 15:21:35');
INSERT INTO `litemall_dict` VALUES (5, '获取途径', '银行', 'bank', 2, 1, 0, NULL, NULL, '2020-03-22 15:23:16', '2020-03-22 15:23:16');
INSERT INTO `litemall_dict` VALUES (6, '获取途径', '人社', 'hr', 3, 1, 0, NULL, NULL, '2020-03-22 15:23:46', '2020-03-22 15:23:46');
INSERT INTO `litemall_dict` VALUES (7, '获取途径', '网络', 'network', 4, 1, 0, NULL, NULL, '2020-03-22 15:32:32', '2020-03-22 15:33:08');
INSERT INTO `litemall_dict` VALUES (8, '未审批更改银行', '提示语', '担保公司未审批，能随意更换银行', 1, 1, 0, NULL, NULL, NULL, NULL);
INSERT INTO `litemall_dict` VALUES (9, '已审批更改银行', '提示语', '担保公司已审批，更换银行需要重新审核', 1, 1, 0, NULL, NULL, NULL, NULL);
