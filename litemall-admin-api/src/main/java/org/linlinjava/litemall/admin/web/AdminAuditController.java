package org.linlinjava.litemall.admin.web;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.linlinjava.litemall.admin.annotation.RequiresPermissionsDesc;
import org.linlinjava.litemall.core.util.JacksonUtil;
import org.linlinjava.litemall.core.util.ResponseUtil;
import org.linlinjava.litemall.core.validator.Order;
import org.linlinjava.litemall.core.validator.Sort;
import org.linlinjava.litemall.db.domain.LitemallAudit;
import org.linlinjava.litemall.db.service.LitemallAuditService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/audit")
@Validated
public class AdminAuditController {
    private final Log logger = LogFactory.getLog(AdminAuditController.class);

    @Autowired
    private LitemallAuditService auditService;

    @GetMapping("/list")
    public Object list(@RequestParam Integer id) {
        List<LitemallAudit> auditList = auditService.all(id);
        return ResponseUtil.ok(auditList);
    }
}
