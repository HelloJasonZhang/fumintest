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
import org.linlinjava.litemall.db.domain.LitemallBank;
import org.linlinjava.litemall.db.service.LitemallApplicantService;
import org.linlinjava.litemall.db.service.LitemallAuditService;
import org.linlinjava.litemall.db.service.LitemallBankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.List;

@RestController
@RequestMapping("/admin/applicantReview")
@Validated
public class AdminApplicantReviewController {
    private final Log logger = LogFactory.getLog(AdminApplicantReviewController.class);

    @Autowired
    private LitemallApplicantService applicantService;
    @Autowired
    private LitemallBankService bankService;
    @Autowired
    private LitemallAuditService auditService;

    @RequiresPermissions("admin:applicantReview:list")
    @RequiresPermissionsDesc(menu = {"人社管理", "人社复核"}, button = "查询")
    @GetMapping("/list")
    public Object list(String id, String name,
                       @RequestParam(defaultValue = "1") Integer page,
                       @RequestParam(defaultValue = "10") Integer limit,
                       @RequestParam(required = false) List<Integer> submitStatusArray,
                       @Sort @RequestParam(defaultValue = "add_time") String sort,
                       @Order @RequestParam(defaultValue = "desc") String order) {
        List<LitemallApplicant> ApplicantList = applicantService.querySelective(id, name, page, limit, sort, order, submitStatusArray);
        return ResponseUtil.okList(ApplicantList);
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

    @RequiresPermissions("admin:applicantReview:read")
    @RequiresPermissionsDesc(menu = {"人社管理", "人社复核"}, button = "详情")
    @GetMapping("/read")
    public Object read(@NotNull Integer id) {
        LitemallApplicant Applicant = applicantService.findById(id);
        return ResponseUtil.ok(Applicant);
    }

    @RequiresPermissions("admin:applicantReview:readBank")
    @RequiresPermissionsDesc(menu = {"人社管理", "人社复核"}, button = "银行详情")
    @GetMapping("/readBank")
    public Object readBank(@NotNull Integer bankId) {
        LitemallBank bank = bankService.findById(bankId);
        return ResponseUtil.ok(bank);
    }


    @RequiresPermissions("admin:applicantReview:update")
    @RequiresPermissionsDesc(menu = {"人社管理", "人社复核"}, button = "编辑")
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
}
