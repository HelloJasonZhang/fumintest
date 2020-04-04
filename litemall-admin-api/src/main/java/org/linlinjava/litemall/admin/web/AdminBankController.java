package org.linlinjava.litemall.admin.web;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.linlinjava.litemall.admin.annotation.RequiresPermissionsDesc;
import org.linlinjava.litemall.core.util.ResponseUtil;
import org.linlinjava.litemall.core.validator.Order;
import org.linlinjava.litemall.core.validator.Sort;
import org.linlinjava.litemall.db.domain.LitemallBank;
import org.linlinjava.litemall.db.service.LitemallBankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/admin/bank")
@Validated
public class AdminBankController {
    private final Log logger = LogFactory.getLog(AdminBankController.class);

    @Autowired
    private LitemallBankService bankService;

    @RequiresPermissions("admin:bank:list")
    @RequiresPermissionsDesc(menu = {"系统管理", "银行管理"}, button = "查询")
    @GetMapping("/list")
    public Object list(String id, String name,
                       @RequestParam(defaultValue = "1") Integer page,
                       @RequestParam(defaultValue = "10") Integer limit,
                       @Sort @RequestParam(defaultValue = "add_time") String sort,
                       @Order @RequestParam(defaultValue = "desc") String order) {
        List<LitemallBank> BankList = bankService.querySelective(id, name, page, limit, sort, order);
        return ResponseUtil.okList(BankList);
    }

    private Object validate(LitemallBank Bank) {
        String name = Bank.getName();
        if (StringUtils.isEmpty(name)) {
            return ResponseUtil.badArgument();
        }

        String desc = Bank.getName();
        if (StringUtils.isEmpty(desc)) {
            return ResponseUtil.badArgument();
        }
        return null;
    }

    @RequiresPermissions("admin:bank:create")
    @RequiresPermissionsDesc(menu = {"系统管理", "银行管理"}, button = "添加")
    @PostMapping("/create")
    public Object create(@RequestBody LitemallBank Bank) {
        Object error = validate(Bank);
        if (error != null) {
            return error;
        }
        bankService.add(Bank);
        return ResponseUtil.ok(Bank);
    }

    @RequiresPermissions("admin:bank:read")
    @RequiresPermissionsDesc(menu = {"系统管理", "银行管理"}, button = "详情")
    @GetMapping("/read")
    public Object read(@NotNull Integer id) {
        LitemallBank Bank = bankService.findById(id);
        return ResponseUtil.ok(Bank);
    }

    @RequiresPermissions("admin:bank:update")
    @RequiresPermissionsDesc(menu = {"系统管理", "银行管理"}, button = "编辑")
    @PostMapping("/update")
    public Object update(@RequestBody LitemallBank Bank) {
        Object error = validate(Bank);
        if (error != null) {
            return error;
        }
        if (bankService.updateById(Bank) == 0) {
            return ResponseUtil.updatedDataFailed();
        }
        return ResponseUtil.ok(Bank);
    }

    @RequiresPermissions("admin:bank:delete")
    @RequiresPermissionsDesc(menu = {"银行", "银行管理"}, button = "删除")
    @PostMapping("/delete")
    public Object delete(@RequestBody LitemallBank Bank) {
        Integer id = Bank.getId();
        if (id == null) {
            return ResponseUtil.badArgument();
        }
        bankService.deleteById(id);
        return ResponseUtil.ok();
    }

}
