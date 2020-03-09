package org.linlinjava.litemall.admin.web;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.linlinjava.litemall.admin.annotation.RequiresPermissionsDesc;
import org.linlinjava.litemall.core.util.JacksonUtil;
import org.linlinjava.litemall.core.util.ResponseUtil;
import org.linlinjava.litemall.core.validator.Order;
import org.linlinjava.litemall.core.validator.Sort;
import org.linlinjava.litemall.db.domain.LitemallGoods;
import org.linlinjava.litemall.db.domain.LitemallDocument;
import org.linlinjava.litemall.db.service.LitemallGoodsService;
import org.linlinjava.litemall.db.service.LitemallDocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/document")
@Validated
public class AdminDocumentController {
    private final Log logger = LogFactory.getLog(AdminDocumentController.class);

    @Autowired
    private LitemallDocumentService documentService;

    @RequiresPermissions("admin:document:list")
    @RequiresPermissionsDesc(menu = {"系统管理", "富文本管理"}, button = "查询")
    @GetMapping("/list")
    public Object list(String title, String subtitle,
                       @RequestParam(defaultValue = "1") Integer page,
                       @RequestParam(defaultValue = "10") Integer limit,
                       @Sort(accepts = {"id", "add_time", "name"}) @RequestParam(defaultValue = "add_time") String sort,
                       @Order @RequestParam(defaultValue = "desc") String order) {
        List<LitemallDocument> documentList = documentService.querySelective(title, subtitle, page, limit, sort, order);
        return ResponseUtil.okList(documentList);
    }

    private Object validate(LitemallDocument document) {
        String name = document.getDocName();
        if (StringUtils.isEmpty(name)) {
            return ResponseUtil.badArgument();
        }
        String docType = document.getDocType();
        if (StringUtils.isEmpty(docType)) {
            return ResponseUtil.badArgument();
        }
        String detail = document.getDetail();
        if (detail == null) {
            return ResponseUtil.badArgument();
        }
        return null;
    }

    @RequiresPermissions("admin:document:create")
    @RequiresPermissionsDesc(menu = {"系统管理", "富文本管理"}, button = "添加")
    @PostMapping("/create")
    public Object create(@RequestBody LitemallDocument document) {
        Object error = validate(document);
        if (error != null) {
            return error;
        }
        documentService.add(document);
        return ResponseUtil.ok(document);
    }

    @RequiresPermissions("admin:document:read")
    @RequiresPermissionsDesc(menu = {"系统管理", "富文本管理"}, button = "详情")
    @GetMapping("/read")
    public Object read(@NotNull Integer id) {
        LitemallDocument document = documentService.findById(id);
        return ResponseUtil.ok(document);
    }

    @RequiresPermissions("admin:document:update")
    @RequiresPermissionsDesc(menu = {"系统管理", "富文本管理"}, button = "编辑")
    @PostMapping("/update")
    public Object update(@RequestBody LitemallDocument document) {
        Object error = validate(document);
        if (error != null) {
            return error;
        }
        if (documentService.updateById(document) == 0) {
            return ResponseUtil.updatedDataFailed();
        }
        return ResponseUtil.ok(document);
    }

    @RequiresPermissions("admin:document:delete")
    @RequiresPermissionsDesc(menu = {"系统管理", "富文本管理"}, button = "删除")
    @PostMapping("/delete")
    public Object delete(@RequestBody LitemallDocument document) {
        documentService.deleteById(document.getId());
        return ResponseUtil.ok();
    }

    @RequiresPermissions("admin:document:batch-delete")
    @RequiresPermissionsDesc(menu = {"系统管理", "富文本管理"}, button = "批量删除")
    @PostMapping("/batch-delete")
    public Object batchDelete(@RequestBody String body) {
        List<Integer> ids = JacksonUtil.parseIntegerList(body, "ids");
        documentService.deleteByIds(ids);
        return ResponseUtil.ok();
    }
}
