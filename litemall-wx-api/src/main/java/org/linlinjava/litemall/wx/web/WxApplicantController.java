package org.linlinjava.litemall.wx.web;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.linlinjava.litemall.core.util.RegexUtil;
import org.linlinjava.litemall.core.util.ResponseUtil;
import org.linlinjava.litemall.db.domain.*;
import org.linlinjava.litemall.db.service.*;
import org.linlinjava.litemall.wx.annotation.LoginUser;
import org.linlinjava.litemall.wx.service.GetRegionService;
import org.linlinjava.litemall.wx.vo.BankAuditVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;


@RestController
@RequestMapping("/wx/applicant")
@Validated
public class WxApplicantController extends GetRegionService {
    private final Log logger = LogFactory.getLog(WxAddressController.class);

    @Autowired
    private LitemallApplicantService applicantService;
    @Autowired
    private LitemallApplicantBankService litemallApplicantBankService;
    @Autowired
    private LitemallBankService bankService;

    @GetMapping("list")
    public Object list(@LoginUser Integer userId) {
        if (userId == null) {
            return ResponseUtil.unlogin();
        }
        List<LitemallApplicant> applicantList = applicantService.queryByUid(userId);
        return ResponseUtil.okList(applicantList);
    }


    @GetMapping("audit")
    public Object audit(@LoginUser Integer userId, @RequestParam Integer id ) {
        List<LitemallApplicantBank> banikAuditList = litemallApplicantBankService.queryByAppliantId(id);
        return ResponseUtil.okList(banikAuditList);
    }

    private Object validate(LitemallApplicant applicant) {
/*        String name = Applicant.getName();
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
        }*/
        return null;
    }

    @PostMapping("create")
    public Object create(@LoginUser Integer userId, @RequestBody LitemallApplicant applicant) {
        if (userId == null) {
            return ResponseUtil.unlogin();
        }

        //查询当前该用户所有的数据，确实没有走流程的数据，可以创建新数据。
        // 人社拒绝 submiteStatus = 3
        // 担保拒绝 submiteStatus = 6
        // 银行拒绝 submiteStatus = 9
        ArrayList<Integer> statusList = new ArrayList<Integer>();
        statusList.add(0);
        statusList.add(1);
        statusList.add(2);
        statusList.add(4);
        statusList.add(5);
        statusList.add(7);
        statusList.add(8);
        statusList.add(10);
        List<LitemallApplicant> applicantList = applicantService.queryByUidAndSubmitStatus(userId,statusList);

        //拦截状态非法的数据
        for (LitemallApplicant tempAllicant: applicantList) {
            if(!tempAllicant.getIsAvailable())  {
                return ResponseUtil.fail();
            }
        }

        applicant.setUserId(userId);
        applicantService.add(applicant);
        Integer[] bankIds = applicant.getBankId();
        if (bankIds != null && bankIds.length > 0) {
            for (int i = 0; i < bankIds.length; i ++) {
                LitemallApplicantBank litemallApplicantBank = new LitemallApplicantBank();
                litemallApplicantBank.setApplicantId(applicant.getId());
                litemallApplicantBank.setBankId(bankIds[i]);
                litemallApplicantBankService.add(litemallApplicantBank);
            }
        }
        return ResponseUtil.ok(applicant);
    }

    @GetMapping("read")
    public Object read(@LoginUser Integer userId) {
        if (userId == null) {
            return ResponseUtil.unlogin();
        }

        List<Integer> submitStatusList = new ArrayList<>();
        submitStatusList.add(10);
        LitemallApplicant applicant = null;
        //submiteStatus不等于10的申请数据, 流程结束重新开始流程
        List<LitemallApplicant> applicantList = applicantService.queryByUidAndSubmitStatus(userId,submitStatusList);
        if (applicantList.size() > 0) {
            applicant = applicantList.get(0);
            return ResponseUtil.ok(applicant);
        }
        return ResponseUtil.fail();
    }

    @GetMapping("readById")
    public Object readById(@LoginUser Integer userId, @RequestParam Integer id ) {
        if (userId == null) {
            return ResponseUtil.unlogin();
        }
        if(id == null) {
            return  ResponseUtil.fail();
        }
        LitemallApplicant applicantList = applicantService.findById(id);
        return ResponseUtil.ok(applicantList);
    }

    @GetMapping("getBankAudits")
    public Object getBankAudits(@LoginUser Integer userId) {
        if (userId == null) {
            return ResponseUtil.unlogin();
        }
        List<Integer> submitStatusList = new ArrayList<>();
        submitStatusList.add(10);
        LitemallApplicant applicant = null;
        //获取submiteStatus不等于10的申请数据, 否则表示流程结束, 重新开始流程
        List<LitemallApplicant> applicantList = applicantService.queryByUidAndSubmitStatus(userId, submitStatusList);
        if (applicantList.size() > 0) {
            applicant = applicantList.get(0);
            List<LitemallApplicantBank> appBankList = litemallApplicantBankService.queryByAppliantId(applicant.getId());
            List<LitemallBank> bankList = bankService.queryByIds(Arrays.asList( applicant.getBankId()));
            List<BankAuditVo> bankAuditVoList = new ArrayList<>();
            for (LitemallApplicantBank appBank: appBankList) {
                BankAuditVo bankAuditVo = new BankAuditVo();
                Integer bankId = appBank.getBankId();
                bankAuditVo.setId(appBank.getId());
                bankAuditVo.setInterest(appBank.getInterest());
                if (applicant.getHsTopAmount() != null) {
                    bankAuditVo.setHsTopAmount(applicant.getHsTopAmount().toString());
                }
                bankAuditVo.setStatus(appBank.getStatus());
                bankAuditVo.setBankAmount(appBank.getCredit());
                bankAuditVo.setComment(appBank.getAuditComment());
                for (LitemallBank objBank : bankList) {
                    if (objBank.getId() == bankId) {
                        bankAuditVo.setName(objBank.getName());
                        bankAuditVo.setSubBranch(objBank.getSubBranch());
                        bankAuditVo.setIcon(objBank.getIcon());
                    }
                }
                bankAuditVoList.add(bankAuditVo);
            }
            return ResponseUtil.ok(bankAuditVoList);
        }
        return ResponseUtil.fail();
    }

    @PostMapping("update")
    public Object update(@LoginUser Integer userId, @RequestBody LitemallApplicant applicant) {
        if (userId == null) {
            return ResponseUtil.unlogin();
        }

        if (applicantService.updateById(applicant) == 0) {
            return ResponseUtil.updatedDataFailed();
        }
        Integer[] bankIds = applicant.getBankId();
        if (bankIds != null && bankIds.length > 0) {
            List<LitemallApplicantBank> litemallApplicantBankList = litemallApplicantBankService.queryByAppliantId(applicant.getId());
            for (LitemallApplicantBank lab : litemallApplicantBankList) {
                litemallApplicantBankService.deleteById(lab.getId());
            }

            for (int i = 0; i < bankIds.length; i ++) {
                LitemallApplicantBank litemallApplicantBank = new LitemallApplicantBank();
                litemallApplicantBank.setApplicantId(applicant.getId());
                litemallApplicantBank.setBankId(bankIds[i]);
                litemallApplicantBankService.add(litemallApplicantBank);
            }
        }
        return ResponseUtil.ok(applicant);
    }

    @PostMapping("redo")
    public Object redo(@LoginUser Integer userId, @RequestBody LitemallApplicant applicant) {
        if (userId == null) {
            return ResponseUtil.unlogin();
        }
        LitemallApplicant objApplicant = applicantService.findById(applicant.getId());
        if (objApplicant.getSubmitStatus() == 3 || objApplicant.getSubmitStatus() == 6 || objApplicant.getSubmitStatus() == 8) {
            objApplicant.setSubmitStatus(objApplicant.getSubmitStatus() - 1);
        }
        if (applicantService.updateById(objApplicant) == 0) {
            return ResponseUtil.updatedDataFailed();
        }
        return ResponseUtil.ok(objApplicant);
    }

    @PostMapping("redoBank")
    public Object redoBank(@LoginUser Integer userId, @RequestBody LitemallApplicant applicant) {
        if (userId == null) {
            return ResponseUtil.unlogin();
        }
        LitemallApplicant objApplicant = applicantService.findById(applicant.getId());
        if (objApplicant.getSubmitStatus() == 7 ) {
            //担保公司有已经审核，银行未受理
            objApplicant.setSubmitStatus(1);
        }
        if (applicantService.updateById(objApplicant) == 0) {
            return ResponseUtil.updatedDataFailed();
        }
        Integer[] bankIds = applicant.getBankId();
        if (bankIds != null && bankIds.length > 0) {
            List<LitemallApplicantBank> litemallApplicantBankList = litemallApplicantBankService.queryByAppliantId(applicant.getId());
            for (LitemallApplicantBank lab : litemallApplicantBankList) {
                litemallApplicantBankService.deleteById(lab.getId());
            }
            for (int i = 0; i < bankIds.length; i ++) {
                LitemallApplicantBank litemallApplicantBank = new LitemallApplicantBank();
                litemallApplicantBank.setApplicantId(applicant.getId());
                litemallApplicantBank.setBankId(bankIds[i]);
                litemallApplicantBankService.add(litemallApplicantBank);
            }
        }
        return ResponseUtil.ok(objApplicant);
    }


    @PostMapping("redoUpdate")
    public Object redoUpdate(@LoginUser Integer userId, @RequestBody LitemallApplicant applicant) {
        if (userId == null) {
            return ResponseUtil.unlogin();
        }
        if (applicant.getId() == null) {
            return ResponseUtil.fail();
        }
        //回到申请人提交流程节点、重新审核
        applicant.setSubmitStatus(1);
        // 重新补充资料后再次上传
        if (applicantService.updateById(applicant) == 0) {
            return ResponseUtil.updatedDataFailed();
        }
        //发送消息
        return ResponseUtil.ok(applicant);
    }
}