package org.linlinjava.litemall.admin.web;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.linlinjava.litemall.admin.annotation.RequiresPermissionsDesc;
import org.linlinjava.litemall.core.util.ResponseUtil;
import org.linlinjava.litemall.core.validator.Order;
import org.linlinjava.litemall.core.validator.Sort;
import org.linlinjava.litemall.db.domain.LitemallAdmin;
import org.linlinjava.litemall.db.domain.LitemallApplicant;
import org.linlinjava.litemall.db.domain.LitemallApplicantBank;
import org.linlinjava.litemall.db.domain.LitemallBank;
import org.linlinjava.litemall.db.service.LitemallApplicantBankService;
import org.linlinjava.litemall.db.service.LitemallApplicantService;
import org.linlinjava.litemall.db.service.LitemallAuditService;
import org.linlinjava.litemall.db.service.LitemallBankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/admin/applicant")
@Validated
public class AdminApplicantController {
    private final Log logger = LogFactory.getLog(AdminApplicantController.class);

    @Autowired
    private LitemallApplicantService applicantService;
    @Autowired
    private LitemallBankService bankService;
    @Autowired
    private LitemallAuditService auditService;

    @RequiresPermissions("admin:applicant:list")
    @RequiresPermissionsDesc(menu = {"人社管理", "人社审核"}, button = "查询")
    @GetMapping("/list")
    public Object list(String id, String name,
                       @RequestParam(defaultValue = "1") Integer page,
                       @RequestParam(defaultValue = "10") Integer limit,
                       @RequestParam(required = false) List<Integer> submitStatusArray,
                       @RequestParam(required = false) String isAvailable,
                       @Sort @RequestParam(defaultValue = "add_time") String sort,
                       @Order @RequestParam(defaultValue = "desc") String order) {
        List<LitemallApplicant> applicantList = applicantService.querySelective(id, name, page, limit, sort, order, submitStatusArray, isAvailable);
        List<LitemallApplicant> tempList = new ArrayList<>();
        for (LitemallApplicant applicant :  applicantList) {
            if (applicant.getSubmitStatus() != null && applicant.getSubmitStatus() != 0)
            tempList.add(applicant);
        }
        return ResponseUtil.okList(tempList);
    }

    private Object validate(LitemallApplicant Applicant) {
        String name = Applicant.getName();
        if (StringUtils.isEmpty(name)) {
            return ResponseUtil.badArgument();
        }

        String desc = Applicant.getName();
        if (StringUtils.isEmpty(desc)) {
            return ResponseUtil.badArgument();
        }

        String phoneNumber = Applicant.getPhoneNumber();
        if (phoneNumber == null) {
            return ResponseUtil.badArgument();
        }
        return null;
    }

    @RequiresPermissions("admin:applicant:create")
    @RequiresPermissionsDesc(menu = {"人社管理", "人社审核"}, button = "添加")
    @PostMapping("/create")
    public Object create(@RequestBody LitemallApplicant Applicant) {
        Object error = validate(Applicant);
        if (error != null) {
            return error;
        }
        applicantService.add(Applicant);
        return ResponseUtil.ok(Applicant);
    }

    @RequiresPermissions("admin:applicant:read")
    @RequiresPermissionsDesc(menu = {"人社管理", "人社审核"}, button = "详情")
    @GetMapping("/read")
    public Object read(@NotNull Integer id) {
        LitemallApplicant Applicant = applicantService.findById(id);
        return ResponseUtil.ok(Applicant);
    }

    @RequiresPermissions("admin:applicant:readBank")
    @RequiresPermissionsDesc(menu = {"人社管理", "人社审核"}, button = "银行详情")
    @GetMapping("/readBank")
    public Object readBank(@NotNull Integer bankId) {
        LitemallBank bank = bankService.findById(bankId);
        return ResponseUtil.ok(bank);
    }


    @RequiresPermissions("admin:applicant:update")
    @RequiresPermissionsDesc(menu = {"人社管理", "人社审核"}, button = "编辑")
    @PostMapping("/update")
    public Object update(@RequestBody LitemallApplicant Applicant) {
        Object error = validate(Applicant);
        if (error != null) {
            return error;
        }
        Subject currentUser = SecurityUtils.getSubject();
        LitemallAdmin currentAdmin = (LitemallAdmin) currentUser.getPrincipal();
        Integer userId = currentAdmin.getId();
        String username = currentAdmin.getUsername();
        auditService.add(Applicant,userId, username, Applicant.getHsComment());
        Applicant.setQrCodeSignature(null);
        if (applicantService.updateById(Applicant, username) == 0) {
            return ResponseUtil.updatedDataFailed();
        }
        return ResponseUtil.ok(Applicant);
    }

    @RequiresPermissions("admin:applicant:delete")
    @RequiresPermissionsDesc(menu = {"人社管理", "人社审核"}, button = "删除")
    @PostMapping("/delete")
    public Object delete(@RequestBody LitemallApplicant Applicant) {
        Integer id = Applicant.getId();
        if (id == null) {
            return ResponseUtil.badArgument();
        }
        applicantService.deleteById(id);
        return ResponseUtil.ok();
    }

}
