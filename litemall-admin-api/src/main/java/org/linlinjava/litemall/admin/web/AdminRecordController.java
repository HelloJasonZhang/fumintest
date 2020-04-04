package org.linlinjava.litemall.admin.web;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.linlinjava.litemall.admin.annotation.RequiresPermissionsDesc;
import org.linlinjava.litemall.core.util.ResponseUtil;
import org.linlinjava.litemall.core.validator.Order;
import org.linlinjava.litemall.core.validator.Sort;
import org.linlinjava.litemall.db.domain.LitemallRecord;
import org.linlinjava.litemall.db.service.LitemallRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/admin/record")
@Validated
public class AdminRecordController {
    private final Log logger = LogFactory.getLog(AdminRecordController.class);

    @Autowired
    private LitemallRecordService recordService;

    @RequiresPermissions("admin:record:list")
    @RequiresPermissionsDesc(menu = {"历史数据", "数据管理"}, button = "查询")
    @GetMapping("/list")
    public Object list(String id, String name,String bankName,
                       @RequestParam(defaultValue = "1") Integer page,
                       @RequestParam(defaultValue = "10") Integer limit,
                       @Sort @RequestParam(defaultValue = "add_time") String sort,
                       @Order @RequestParam(defaultValue = "desc") String order) {
        List<LitemallRecord> RecordList = recordService.querySelective(id, name, bankName, page, limit, sort, order);
        return ResponseUtil.okList(RecordList);
    }

    @GetMapping("/listByIdCardNo")
    public Object list(@RequestParam String name, @RequestParam String applicantType) {
        if (StringUtils.isEmpty(name)) {
            return ResponseUtil.badArgument();
        }
        if (StringUtils.isEmpty(applicantType)) {
            return ResponseUtil.badArgument();
        }
        List<LitemallRecord> RecordList = recordService.all(name, applicantType);
        return ResponseUtil.okList(RecordList);
    }

    private Object validate(LitemallRecord Record) {
        String name = Record.getName();
        if (StringUtils.isEmpty(name)) {
            return ResponseUtil.badArgument();
        }

        String desc = Record.getBankName();
        if (StringUtils.isEmpty(desc)) {
            return ResponseUtil.badArgument();
        }

        String price = Record.getIdCardNo();
        if (StringUtils.isEmpty(desc)) {
            return ResponseUtil.badArgument();
        }
        return null;
    }
    @RequiresPermissions("admin:record:create")
    @RequiresPermissionsDesc(menu = {"历史数据", "数据管理"}, button = "新增")
    @PostMapping("/create")
    public Object create(@RequestBody LitemallRecord Record) {
        Object error = validate(Record);
        if (error != null) {
            return error;
        }
        recordService.add(Record);
        return ResponseUtil.ok(Record);
    }
    @RequiresPermissions("admin:record:read")
    @RequiresPermissionsDesc(menu = {"历史数据", "数据管理"}, button = "详情")
    @GetMapping("/read")
    public Object read(@NotNull Integer id) {
        LitemallRecord Record = recordService.findById(id);
        return ResponseUtil.ok(Record);
    }

    @RequiresPermissions("admin:record:update")
    @RequiresPermissionsDesc(menu = {"历史数据", "数据管理"}, button = "编辑")
    @PostMapping("/update")
    public Object update(@RequestBody LitemallRecord Record) {
        Object error = validate(Record);
        if (error != null) {
            return error;
        }
        if (recordService.updateById(Record) == 0) {
            return ResponseUtil.updatedDataFailed();
        }
        return ResponseUtil.ok(Record);
    }

    @RequiresPermissions("admin:record:delete")
    @RequiresPermissionsDesc(menu = {"历史数据", "数据管理"}, button = "删除")
    @PostMapping("/delete")
    public Object delete(@RequestBody LitemallRecord Record) {
        Integer id = Record.getId();
        if (id == null) {
            return ResponseUtil.badArgument();
        }
        recordService.deleteById(id);
        return ResponseUtil.ok();
    }

    @RequiresPermissions("admin:record:importData")
    @RequiresPermissionsDesc(menu = {"历史数据", "数据管理"}, button = "导入")
    @PostMapping("/importData")
    public Object importData(@RequestBody List<LitemallRecord> recordList) {
        recordService.importData(recordList);
        return ResponseUtil.ok();
    }
}
