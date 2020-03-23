package org.linlinjava.litemall.admin.web;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.linlinjava.litemall.admin.annotation.RequiresPermissionsDesc;
import org.linlinjava.litemall.core.util.JacksonUtil;
import org.linlinjava.litemall.core.util.ResponseUtil;
import org.linlinjava.litemall.core.validator.Order;
import org.linlinjava.litemall.core.validator.Sort;
import org.linlinjava.litemall.db.domain.LitemallDict;
import org.linlinjava.litemall.db.service.LitemallDictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.List;

@RestController
@RequestMapping("/admin/dict")
@Validated
public class AdminDictController {
    private final Log logger = LogFactory.getLog(AdminDictController.class);

    @Autowired
    private LitemallDictService dictService;

    @RequiresPermissions("admin:dict:list")
    @GetMapping("/list")
    public Object list(String title, String subtitle,
                       @RequestParam(defaultValue = "1") Integer page,
                       @RequestParam(defaultValue = "10") Integer limit,
                       @Sort(accepts = {"id", "add_time", "name"}) @RequestParam(defaultValue = "add_time") String sort,
                       @Order @RequestParam(defaultValue = "desc") String order) {
        List<LitemallDict> DictList = dictService.querySelective(title, subtitle, page, limit, sort, order);
        return ResponseUtil.okList(DictList);
    }

    private Object validate(LitemallDict Dict) {
        String type = Dict.getType();
        if (StringUtils.isEmpty(type)) {
            return ResponseUtil.badArgument();
        }
        String name = Dict.getName();
        if (StringUtils.isEmpty(name)) {
            return ResponseUtil.badArgument();
        }
        String value = Dict.getValue();
        if (value == null) {
            return ResponseUtil.badArgument();
        }
        return null;
    }

    @RequiresPermissions("admin:dict:create")
    @RequiresPermissionsDesc(menu = {"系统管理", "字典项管理"}, button = "添加")
    @PostMapping("/create")
    public Object create(@RequestBody LitemallDict Dict) {
        Object error = validate(Dict);
        if (error != null) {
            return error;
        }
        dictService.add(Dict);
        return ResponseUtil.ok(Dict);
    }

    @RequiresPermissions("admin:dict:read")
    @RequiresPermissionsDesc(menu = {"系统管理", "字典项管理"}, button = "详情")
    @GetMapping("/read")
    public Object read(@NotNull Integer id) {
        LitemallDict Dict = dictService.findById(id);
        return ResponseUtil.ok(Dict);
    }

    @RequiresPermissions("admin:dict:update")
    @RequiresPermissionsDesc(menu = {"系统管理", "字典项管理"}, button = "编辑")
    @PostMapping("/update")
    public Object update(@RequestBody LitemallDict Dict) {
        Object error = validate(Dict);
        if (error != null) {
            return error;
        }
        if (dictService.updateById(Dict) == 0) {
            return ResponseUtil.updatedDataFailed();
        }
        return ResponseUtil.ok(Dict);
    }

    @RequiresPermissions("admin:dict:delete")
    @RequiresPermissionsDesc(menu = {"系统管理", "字典项管理"}, button = "删除")
    @PostMapping("/delete")
    public Object delete(@RequestBody LitemallDict Dict) {
        dictService.deleteById(Dict.getId());
        return ResponseUtil.ok();
    }

    @RequiresPermissions("admin:dict:batch-delete")
    @RequiresPermissionsDesc(menu = {"系统管理", "字典项管理"}, button = "批量删除")
    @PostMapping("/batch-delete")
    public Object batchDelete(@RequestBody String body) {
        List<Integer> ids = JacksonUtil.parseIntegerList(body, "ids");
        dictService.deleteByIds(ids);
        return ResponseUtil.ok();
    }
}
