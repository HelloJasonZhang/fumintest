package org.linlinjava.litemall.admin.web;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.linlinjava.litemall.admin.annotation.RequiresPermissionsDesc;
import org.linlinjava.litemall.admin.util.CheckBizTypeUtil;
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
import java.util.*;


@RestController
@RequestMapping("/admin/ba")
@Validated
public class AdminBankAuditController {
    private final Log logger = LogFactory.getLog(AdminApplicantController.class);

    @Autowired
    private LitemallApplicantService applicantService;
    @Autowired
    private LitemallApplicantBankService applicantBankService;
    @Autowired
    private LitemallBankService litemallBankService;
    @Autowired
    private LitemallApplicantService litemallApplicantService;
    @Autowired
    private LitemallAuditService auditService;

    @RequiresPermissions("admin:ba:list")
    @RequiresPermissionsDesc(menu = {"贷款银行", "银行审核"}, button = "查询")
    @GetMapping("/list")
    public Object list(String id, String name,
                       @RequestParam(defaultValue = "1") Integer page,
                       @RequestParam(defaultValue = "10") Integer limit,
                       @RequestParam(required = false) List<Integer> submitStatusArray,
                       @Sort @RequestParam(defaultValue = "add_time") String sort,
                       @Order @RequestParam(defaultValue = "desc") String order) {

        //查询改应该名称
        Subject currentUser = SecurityUtils.getSubject();
        LitemallAdmin currentAdmin = (LitemallAdmin) currentUser.getPrincipal();

        Integer uId = currentAdmin.getId();
        Integer[] roleIds = currentAdmin.getRoleIds();
        Integer[] bizTypes = currentAdmin.getBizType();
        List<LitemallApplicant> result = new ArrayList<LitemallApplicant>();

        List<Integer> roleIdsList = Arrays.asList(roleIds);

        List<LitemallApplicant> applicantList = applicantService.querySelective(id, name, page, limit, sort, order, submitStatusArray);

        for (LitemallApplicant al : applicantList) {
            //过滤担保公司审核没通过的数据
            if (al.getSubmitStatus() <7) {
                continue;
            }

            // 当前用户是否属于此银行关联的role  al.getBankId();
            boolean isHasRole = false;
            Integer[] bankIds = al.getBankId();
            List<LitemallBank>  bankList = null;
            if (bankIds != null) {
                List<Integer> bankIdsList = Arrays.asList(bankIds);
                if (roleIds.length == 1 && roleIds[0] == 1) { //超级管理员 ID = 1
                    bankList = litemallBankService.queryByIds(bankIdsList);
                } else {
                    bankList = litemallBankService.queryByIdsAndRoleIds(bankIdsList, roleIdsList);
                }
                if (bankList != null && bankList.size() > 0) {
                    isHasRole = true;
                }
            }
            if(isHasRole) {
                //存在当前用户绑定银行的数据
                result.add(al);
                //申请人绑定多家银行
                if (roleIds.length == 1 && roleIds[0] == 1) {
                    // do nothing
                } else {
//                    //获取当前银行的审核状态，复制给submitStatus
//                    List<Integer> bankIdsList = new ArrayList<>();
//                    for(LitemallBank bank : bankList) {
//                        bankIdsList.add(bank.getId());
//                    }
//                    List<LitemallApplicantBank> abList = applicantBankService.querySelectiveByAidAndBankId(al.getId(),bankIdsList);
//                    for (LitemallApplicantBank ab : abList) {
//                        //审核通过
//                        if (ab.getStatus() != null && ab.getStatus() == 2) {
//                            if (ab.getBankId() == al.getbBankId()) {
//                                al.setSubmitStatus(10);
//                            } else {
//                                al.setSubmitStatus(9);
//                            }
//                        } else if (ab.getStatus() != null && ab.getStatus() == 1) { //审核不通过
//                            al.setSubmitStatus(8);
//                        } else {
//                            al.setSubmitStatus(7);
//                        }
//                    }
                }
            }
        }

        //1. 担保通过后，银行才能看到数据
        //2. 管理员对接业务匹配，银行才能看到数据
        List<LitemallApplicant> tempList = new ArrayList<LitemallApplicant>();
        for (LitemallApplicant applicant : result) {
            if (applicant.getSubmitStatus() >= 7 && CheckBizTypeUtil.hasPermission(roleIds, bizTypes, applicant.getApplicantType())) {
                tempList.add(applicant);
            }
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

    @RequiresPermissions("admin:ba:create")
    @RequiresPermissionsDesc(menu = {"贷款银行", "银行审核"}, button = "添加")
    @PostMapping("/create")
    public Object create(@RequestBody LitemallApplicant Applicant) {
        Object error = validate(Applicant);
        if (error != null) {
            return error;
        }
        applicantService.add(Applicant);
        return ResponseUtil.ok(Applicant);
    }

    @RequiresPermissions("admin:ba:read")
    @RequiresPermissionsDesc(menu = {"贷款银行", "银行审核"}, button = "查看详情")
    @GetMapping("/read")
    public Object read(@NotNull Integer id) {
        LitemallApplicant Applicant = applicantService.findById(id);
        return ResponseUtil.ok(Applicant);
    }

    @RequiresPermissions("admin:ba:createAudit")
    @RequiresPermissionsDesc(menu = {"贷款银行", "银行审核"}, button = "添加审核")
    @PostMapping("/createAudit")
    public Object createAudit(@RequestBody LitemallApplicantBank applicantBank) {
        if (applicantBank.getStatus() == null) {
            return ResponseUtil.badArgumentValue();
        }

        //更新申请人
        LitemallApplicant applicant = applicantService.findById(applicantBank.getApplicantId());
        if (applicant.getSubmitStatus() == 7 && applicantBank.getStatus() == 2) {
            //有一家银行受理，改变申请人状态
            applicant.setSubmitStatus(9);
        } else if (applicant.getSubmitStatus() == 7 && applicantBank.getStatus() == 1){
            applicant.setSubmitStatus(8);
        }
        applicantService.updateById(applicant);
        //更新申请人银行关系表, 银行审核数据只有一条
        if(applicantBank.getId() != null ){
            applicantBankService.updateById(applicantBank);
        }
        Subject currentUser = SecurityUtils.getSubject();
        LitemallAdmin currentAdmin = (LitemallAdmin) currentUser.getPrincipal();
        Integer userId = currentAdmin.getId();
        String username = currentAdmin.getUsername();
        auditService.add(applicant,userId, username, applicantBank.getAuditComment());
        return ResponseUtil.ok(applicantBank);
    }

    @RequiresPermissions("admin:ba:createFinishAudit")
    @RequiresPermissionsDesc(menu = {"贷款银行", "银行审核"}, button = "添加结束")
    @PostMapping("/createFinishAudit")
    public Object createFinishAudit(@RequestBody LitemallApplicantBank applicantBank) {
        if (applicantBank.getApplicantId() == null) {
            return ResponseUtil.badArgumentValue();
        }
        LitemallApplicant al = litemallApplicantService.findById(applicantBank.getApplicantId());
        //给银行属性设置，状态修改为10
        al.setSubmitStatus(10);
        al.setbBankId(applicantBank.getBankId());
        if (applicantBank.getBankId() != null) {
            LitemallBank bank = litemallBankService.findById(applicantBank.getBankId());
            if (bank != null) {
                al.setbName(bank.getName());
            }
        }
        al.setbCredit(applicantBank.getCredit());
        al.setbLendingDate(applicantBank.getLendingDate());
        al.setbPeriodLoan(applicantBank.getPeriodLoan());
        al.setbRepayment(applicantBank.getRepayment());
        al.setbInterestRate(applicantBank.getInterest());
        al.setbInterestPeriod(applicantBank.getInterestPeriod());
        al.setbLoanStartDate(applicantBank.getLoanStartDate());
        al.setbLoanEndDate(applicantBank.getLoanEndDate());
        al.setbLoanFinance(applicantBank.getLoanFinance());
        al.setbLoanVoucherUrl(applicantBank.getLoanVoucherUrl());
        al.setbComment(applicantBank.getAuditComment());
        Subject currentUser = SecurityUtils.getSubject();
        LitemallAdmin currentAdmin = (LitemallAdmin) currentUser.getPrincipal();
        Integer userId = currentAdmin.getId();
        String username = currentAdmin.getUsername();
        al.setbOpertator(username);
        auditService.add(al,userId, username, al.getbComment());
        auditService.addRecord(al, applicantBank,username);
        if (litemallApplicantService.updateById(al) == 0) {
            return ResponseUtil.updatedDataFailed();
        }
        return ResponseUtil.ok(applicantBank);
    }

    @RequiresPermissions("admin:ba:readAudit")
    @RequiresPermissionsDesc(menu = {"贷款银行", "银行审核"}, button = "查看审核详情")
    @GetMapping("/readAudit")
    public Object readAudit(@RequestParam Integer id) {
        //通过UserName拿到角色ID
        Subject currentUser = SecurityUtils.getSubject();
        LitemallAdmin currentAdmin = (LitemallAdmin) currentUser.getPrincipal();
        Integer[] roleIds = currentAdmin.getRoleIds();

        //获取银行列表
        List< LitemallBank>  bankslist =  new ArrayList<LitemallBank>();
        //获取有审核数据
        List<LitemallApplicantBank> albList = new ArrayList<LitemallApplicantBank>();
        if (roleIds.length == 1 && roleIds[0] == 1) {
            //超级管理员 ID = 1
            albList = applicantBankService.querySelectiveByAdminId(id);
            List<Integer> banksId = new ArrayList<Integer>();
            for (LitemallApplicantBank abl : albList) {
                banksId.add(abl.getBankId());
            }
            bankslist =  litemallBankService.queryByIds(banksId);
        } else {
            bankslist =  litemallBankService.queryByRids(roleIds);
            List<Integer> bankIds = new ArrayList<Integer>();
            for (LitemallBank bank: bankslist) {
                bankIds.add(bank.getId());
            }
            albList = applicantBankService.querySelectiveByAidAndBankId(id,bankIds);

        }
        Map<String, Object> map = new HashMap<String,Object>();
        map.put("opertator",currentAdmin.getUsername());
        map.put("bankslist",bankslist);
        map.put("applicantBank",albList);
        return ResponseUtil.ok(map);
    }


    @RequiresPermissions("admin:ba:update")
    @RequiresPermissionsDesc(menu = {"贷款银行", "银行审核"}, button = "编辑")
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
        auditService.add(applicant,userId, username, applicant.getbComment());
        if (applicantService.updateById(applicant) == 0) {
            //创建对应的
            return ResponseUtil.updatedDataFailed();
        }
        return ResponseUtil.ok(applicant);
    }

    @RequiresPermissions("admin:ba:delete")
    @RequiresPermissionsDesc(menu = {"贷款银行", "银行审核"}, button = "删除")
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
