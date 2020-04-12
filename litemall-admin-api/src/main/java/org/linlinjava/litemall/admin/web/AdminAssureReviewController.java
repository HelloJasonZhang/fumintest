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
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/admin/assureReview")
@Validated
public class AdminAssureReviewController {
    private final Log logger = LogFactory.getLog(AdminApplicantController.class);

    @Autowired
    private LitemallApplicantService applicantService;
    @Autowired
    private LitemallBankService bankService;
    @Autowired
    private LitemallApplicantBankService applicantBankService;
    @Autowired
    private LitemallAuditService auditService;

    @RequiresPermissions("admin:assureReview:list")
    @RequiresPermissionsDesc(menu = {"担保公司管理", "担保公司复核"}, button = "查询")
    @GetMapping("/list")
    public Object list(String id, String name,
                       @RequestParam(defaultValue = "1") Integer page,
                       @RequestParam(defaultValue = "10") Integer limit,
                       @RequestParam(required = false) List<Integer> submitStatusArray,
                       @Sort @RequestParam(defaultValue = "add_time") String sort,
                       @Order @RequestParam(defaultValue = "desc") String order) {
        List<LitemallApplicant> applicantList= new ArrayList<LitemallApplicant>();
        List<LitemallApplicant> tempList = applicantService.querySelective(id, name, page, limit, sort, order, submitStatusArray);
        for (LitemallApplicant applicant : tempList) {
            if (applicant.getSubmitStatus() >= 5) {
                applicantList.add(applicant);
            }
        }
        return ResponseUtil.okList(applicantList);
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


    @RequiresPermissions("admin:assureReview:read")
    @RequiresPermissionsDesc(menu = {"担保公司管理", "担保公司复核"}, button = "详情")
    @GetMapping("/read")
    public Object read(@NotNull Integer id) {
        LitemallApplicant Applicant = applicantService.findById(id);
        return ResponseUtil.ok(Applicant);
    }

    @RequiresPermissions("admin:assureReview:listBank")
    @RequiresPermissionsDesc(menu = {"担保公司管理", "担保公司复核"}, button = "查询银行")
    @GetMapping("/listBank")
    public Object listBank() {
        List<LitemallBank> bankList =bankService.all();
        return ResponseUtil.ok(bankList);
    }

    @RequiresPermissions("admin:assureReview:update")
    @RequiresPermissionsDesc(menu = {"担保公司管理", "担保公司复核"}, button = "编辑")
    @PostMapping("/update")
    public Object update(@RequestBody LitemallApplicant applicant) {
        Object error = validate(applicant);
        if (error != null) {
            return error;
        }

        Subject currentUser = SecurityUtils.getSubject();
        LitemallAdmin currentAdmin = (LitemallAdmin) currentUser.getPrincipal();
        Integer userId = currentAdmin.getId();
        String username = currentAdmin.getUsername();
        auditService.add(applicant,userId, username, applicant.getScComment());
        applicant.setQrCodeSignature(null);
        if (applicantService.updateById(applicant) == 0) {
            return ResponseUtil.updatedDataFailed();
        }
        return ResponseUtil.ok(applicant);
    }

    @RequiresPermissions("admin:assure:updateByBank")
    @RequiresPermissionsDesc(menu = {"担保公司管理", "担保公司复核"}, button = "提交")
    @PostMapping("/updateByBank")
    public Object updateByBank(@RequestBody LitemallApplicant applicant) {
        Object error = validate(applicant);
        if (error != null) {
            return error;
        }

        if (applicant.getBankId() != null) {
            //删除申请人-银行关联表
            List<LitemallApplicantBank> applicantBankList = applicantBankService.queryByAppliantId(applicant.getId());
            for (LitemallApplicantBank applicantBank :  applicantBankList) {
                applicantBankService.deleteById(applicantBank.getId());
            }

            //新增担保公司指定银行
            LitemallApplicantBank newApplicantBank = new LitemallApplicantBank();
            Integer[] bankIds = applicant.getBankId();
            for (Integer id : bankIds) {
                newApplicantBank.setApplicantId(applicant.getId());
                newApplicantBank.setBankId(id);
                applicantBankService.add(newApplicantBank);
            }
        }

        Subject currentUser = SecurityUtils.getSubject();
        LitemallAdmin currentAdmin = (LitemallAdmin) currentUser.getPrincipal();
        Integer userId = currentAdmin.getId();
        String username = currentAdmin.getUsername();
        auditService.add(applicant,userId, username, applicant.getScComment());
        applicant.setQrCodeSignature(null);
        applicant.setScComment(null);
        if (applicantService.updateById(applicant) == 0) {
            return ResponseUtil.updatedDataFailed();
        }
        return ResponseUtil.ok(applicant);
    }
}
