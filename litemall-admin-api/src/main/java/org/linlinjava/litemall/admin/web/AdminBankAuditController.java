package org.linlinjava.litemall.admin.web;

import org.apache.commons.lang3.ArrayUtils;
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
        List<LitemallApplicant> result = new ArrayList<LitemallApplicant>();

        List<Integer> roleIdsList = Arrays.asList(roleIds);

        List<LitemallApplicant> ApplicantList = applicantService.querySelective(id, name, page, limit, sort, order, submitStatusArray);
        for (LitemallApplicant al : ApplicantList) {
            // 当前用户是否属于此银行关联的role  al.getBankId();
            boolean isHasRole = false;
            Integer[] bankIds = al.getBankId();
            if (bankIds != null) {
                List<Integer> idsList = Arrays.asList(bankIds);
                List<LitemallBank>  bankList = litemallBankService.queryByIds(idsList, roleIdsList);
                if (bankList != null && bankList.size() > 0) {
                    isHasRole = true;
                }
            }
            if(isHasRole) {
                result.add(al);
            }
        }
        return ResponseUtil.okList(result);
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
    @RequiresPermissionsDesc(menu = {"贷款银行", "银行审核"}, button = "详情")
    @GetMapping("/read")
    public Object read(@NotNull Integer id) {
        LitemallApplicant Applicant = applicantService.findById(id);
        return ResponseUtil.ok(Applicant);
    }

    @RequiresPermissions("admin:ba:createAudit")
    @RequiresPermissionsDesc(menu = {"贷款银行", "银行审核"}, button = "添加")
    @PostMapping("/createAudit")
    public Object createAudit(@RequestBody LitemallApplicantBank applicantBank) {
        //审核状态 如果通过。
        //不通过，查看另外一个银行的审批状态。
        Subject currentUser = SecurityUtils.getSubject();
        LitemallAdmin currentAdmin = (LitemallAdmin) currentUser.getPrincipal();
        Integer uId = currentAdmin.getId();
        String username = currentAdmin.getUsername();
        Integer[] roleIds = currentAdmin.getRoleIds();
        //获取所有关联银行数据
        List<LitemallApplicantBank>  albList = applicantBankService.querySelectiveByAidAndBankId(uId,roleIds );
        if (albList.size() > 0) {
            int xIndex = 1;
            int yIndex = 1;
            for (LitemallApplicantBank appBank : albList) {
                if (appBank.getStatus() == 1) {
                    xIndex++;
                } else if (appBank.getStatus() == 2) {
                    yIndex++;
                }
            }
            if (albList.size() == xIndex) {
                //全部失败
                //更新应用人 8
                LitemallApplicant applicant = new LitemallApplicant();
                applicant.setId(applicantBank.getApplicantId());
                applicant.setSubmitStatus(8);
                applicantService.updateById(applicant);

            } else if (albList.size() == yIndex) {
                //全部成功
                //更新应用人 9
                LitemallApplicant applicant = new LitemallApplicant();
                applicant.setId(applicantBank.getApplicantId());
                applicant.setSubmitStatus(9);
                applicantService.updateById(applicant);
            } else {
                //有一家银行在审核，XX已经审核。
            }
        }
        applicantBankService.add(applicantBank);
        return ResponseUtil.ok(applicantBank);
    }

    @RequiresPermissions("admin:ba:readAudit")
    @RequiresPermissionsDesc(menu = {"贷款银行", "银行审核"}, button = "详情")
    @GetMapping("/readAudit")
    public Object readAudit(Integer id) {
        //通过UserName拿到角色ID
        Subject currentUser = SecurityUtils.getSubject();
        LitemallAdmin currentAdmin = (LitemallAdmin) currentUser.getPrincipal();
        Integer[] roleIds = currentAdmin.getRoleIds();
        List< LitemallBank>  bankslist = litemallBankService.queryByRids(roleIds);
        Map<String, Object> map = new HashMap<String,Object>();
        map.put("opertator",currentAdmin.getUsername());
        map.put("bankslist",bankslist);
        return ResponseUtil.ok(map);
    }


    @RequiresPermissions("admin:ba:update")
    @RequiresPermissionsDesc(menu = {"贷款银行", "银行审核"}, button = "编辑")
    @PostMapping("/update")
    public Object update(@RequestBody LitemallApplicant Applicant) {
        Object error = validate(Applicant);
        if (error != null) {
            return error;
        }
        if (applicantService.updateById(Applicant) == 0) {
            //创建对应的
            return ResponseUtil.updatedDataFailed();
        }
        return ResponseUtil.ok(Applicant);
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
