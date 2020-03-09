package org.linlinjava.litemall.admin.web;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.linlinjava.litemall.admin.annotation.RequiresPermissionsDesc;
import org.linlinjava.litemall.admin.task.GrouponRuleExpiredTask;
import org.linlinjava.litemall.admin.util.AdminResponseCode;
import org.linlinjava.litemall.core.task.TaskService;
import org.linlinjava.litemall.core.util.ResponseUtil;
import org.linlinjava.litemall.core.validator.Order;
import org.linlinjava.litemall.core.validator.Sort;
import org.linlinjava.litemall.db.domain.LitemallGoods;
import org.linlinjava.litemall.db.domain.LitemallGroupon;
import org.linlinjava.litemall.db.domain.LitemallGrouponRules;
import org.linlinjava.litemall.db.service.LitemallGoodsService;
import org.linlinjava.litemall.db.service.LitemallGrouponRulesService;
import org.linlinjava.litemall.db.service.LitemallGrouponService;
import org.linlinjava.litemall.db.util.GrouponConstant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/groupon")
@Validated
public class AdminGrouponController {
    private final Log logger = LogFactory.getLog(AdminGrouponController.class);

    @Autowired
    private LitemallGrouponRulesService rulesService;
    @Autowired
    private LitemallGoodsService goodsService;
    @Autowired
    private LitemallGrouponService grouponService;
    @Autowired
    private TaskService taskService;

    @GetMapping("/listRecord")
    public Object listRecord(String grouponRuleId,
                             @RequestParam(defaultValue = "1") Integer page,
                             @RequestParam(defaultValue = "10") Integer limit,
                             @Sort @RequestParam(defaultValue = "add_time") String sort,
                             @Order @RequestParam(defaultValue = "desc") String order) {
        List<LitemallGroupon> grouponList = grouponService.querySelective(grouponRuleId, page, limit, sort, order);

        List<Map<String, Object>> groupons = new ArrayList<>();
        for (LitemallGroupon groupon : grouponList) {
            try {
                Map<String, Object> recordData = new HashMap<>();
                List<LitemallGroupon> subGrouponList = grouponService.queryJoinRecord(groupon.getId());
                LitemallGrouponRules rules = rulesService.findById(groupon.getRulesId());
                LitemallGoods goods = goodsService.findById(rules.getGoodsId());

                recordData.put("groupon", groupon);
                recordData.put("subGroupons", subGrouponList);
                recordData.put("rules", rules);
                recordData.put("goods", goods);

                groupons.add(recordData);
            } catch (Exception e) {
                logger.error(e.getMessage(), e);
            }
        }

        return ResponseUtil.okList(groupons, grouponList);
    }

    @GetMapping("/list")
    public Object list(String goodsId,
                       @RequestParam(defaultValue = "1") Integer page,
                       @RequestParam(defaultValue = "10") Integer limit,
                       @Sort @RequestParam(defaultValue = "add_time") String sort,
                       @Order @RequestParam(defaultValue = "desc") String order) {
        List<LitemallGrouponRules> rulesList = rulesService.querySelective(goodsId, page, limit, sort, order);
        return ResponseUtil.okList(rulesList);
    }

    private Object validate(LitemallGrouponRules grouponRules) {
        Integer goodsId = grouponRules.getGoodsId();
        if (goodsId == null) {
            return ResponseUtil.badArgument();
        }
        BigDecimal discount = grouponRules.getDiscount();
        if (discount == null) {
            return ResponseUtil.badArgument();
        }
        Integer discountMember = grouponRules.getDiscountMember();
        if (discountMember == null) {
            return ResponseUtil.badArgument();
        }
        LocalDateTime expireTime = grouponRules.getExpireTime();
        if (expireTime == null) {
            return ResponseUtil.badArgument();
        }

        return null;
    }

    @PostMapping("/update")
    public Object update(@RequestBody LitemallGrouponRules grouponRules) {
        Object error = validate(grouponRules);
        if (error != null) {
            return error;
        }

        LitemallGrouponRules rules = rulesService.findById(grouponRules.getId());
        if(rules == null){
            return ResponseUtil.badArgumentValue();
        }
        if(!rules.getStatus().equals(GrouponConstant.RULE_STATUS_ON)){
            return ResponseUtil.fail(AdminResponseCode.GROUPON_GOODS_OFFLINE, "团购已经下线");
        }

        Integer goodsId = grouponRules.getGoodsId();
        LitemallGoods goods = goodsService.findById(goodsId);
        if (goods == null) {
            return ResponseUtil.badArgumentValue();
        }

        grouponRules.setGoodsName(goods.getName());
        grouponRules.setPicUrl(goods.getPicUrl());

        if (rulesService.updateById(grouponRules) == 0) {
            return ResponseUtil.updatedDataFailed();
        }

        return ResponseUtil.ok();
    }

    @PostMapping("/create")
    public Object create(@RequestBody LitemallGrouponRules grouponRules) {
        Object error = validate(grouponRules);
        if (error != null) {
            return error;
        }

        Integer goodsId = grouponRules.getGoodsId();
        LitemallGoods goods = goodsService.findById(goodsId);
        if (goods == null) {
            return ResponseUtil.fail(AdminResponseCode.GROUPON_GOODS_UNKNOWN, "团购商品不存在");
        }
        if(rulesService.countByGoodsId(goodsId) > 0){
            return ResponseUtil.fail(AdminResponseCode.GROUPON_GOODS_EXISTED, "团购商品已经存在");
        }

        grouponRules.setGoodsName(goods.getName());
        grouponRules.setPicUrl(goods.getPicUrl());
        grouponRules.setStatus(GrouponConstant.RULE_STATUS_ON);
        rulesService.createRules(grouponRules);

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expire = grouponRules.getExpireTime();
        long delay = ChronoUnit.MILLIS.between(now, expire);
        // 团购过期任务
        taskService.addTask(new GrouponRuleExpiredTask(grouponRules.getId(), delay));

        return ResponseUtil.ok(grouponRules);
    }

    @PostMapping("/delete")
    public Object delete(@RequestBody LitemallGrouponRules grouponRules) {
        Integer id = grouponRules.getId();
        if (id == null) {
            return ResponseUtil.badArgument();
        }

        rulesService.delete(id);
        return ResponseUtil.ok();
    }
}
