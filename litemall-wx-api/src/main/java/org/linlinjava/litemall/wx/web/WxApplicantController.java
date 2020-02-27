package org.linlinjava.litemall.wx.web;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.linlinjava.litemall.core.util.RegexUtil;
import org.linlinjava.litemall.core.util.ResponseUtil;
import org.linlinjava.litemall.db.domain.LitemallAddress;
import org.linlinjava.litemall.db.domain.LitemallApplicant;
import org.linlinjava.litemall.db.domain.LitemallApplicantBank;
import org.linlinjava.litemall.db.domain.LitemallBank;
import org.linlinjava.litemall.db.service.LitemallAddressService;
import org.linlinjava.litemall.db.service.LitemallApplicantBankService;
import org.linlinjava.litemall.db.service.LitemallApplicantService;
import org.linlinjava.litemall.db.service.LitemallRegionService;
import org.linlinjava.litemall.wx.annotation.LoginUser;
import org.linlinjava.litemall.wx.service.GetRegionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/wx/applicant")
@Validated
public class WxApplicantController extends GetRegionService {
    private final Log logger = LogFactory.getLog(WxAddressController.class);

    @Autowired
    private LitemallApplicantService applicantService;
    @Autowired
    private LitemallApplicantBankService litemallApplicantBankService;
    /**
     * 用户收货地址列表
     *
     * @param userId 用户ID
     * @return 收货地址列表
     */
    @GetMapping("list")
    public Object list(@LoginUser Integer userId) {
        if (userId == null) {
            return ResponseUtil.unlogin();
        }
        List<LitemallApplicant> applicantList = applicantService.queryByUid(userId);
        return ResponseUtil.okList(applicantList);
    }


    @GetMapping("audit")
    public Object audit(@LoginUser Integer userId, @RequestBody LitemallApplicant applicant) {
        List<LitemallApplicantBank> banikAuditList = litemallApplicantBankService.queryByAppliantId(applicant.getId());
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

        Object error = validate(applicant);
        if (error != null) {
            return error;
        }
        //查询当前该用户所有的数据，确实没有走在流程的数据，可以创建新数据。
        List<LitemallApplicant> applicantList = applicantService.queryByUid(userId);
        //Integer[] status= {0,1,3,5,6,8,9};
        ArrayList<Integer> statusList = new ArrayList<Integer>();
        statusList.add(0);
        statusList.add(1);
        statusList.add(2);
        statusList.add(4);
        statusList.add(5);
        statusList.add(7);
        for(LitemallApplicant apl : applicantList) {
            Integer i = apl.getSubmitStatus();
            if ( statusList.contains(i)) {
                return ResponseUtil.unlogin();
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
        LitemallApplicant applicant = null;
        List<LitemallApplicant> applicantList = applicantService.queryByUid(userId);
        if (applicantList.size() > 0) {
            applicant = applicantList.get(0);
            //if (applicant.getSubmitStatus() !=3 &&  applicant.getSubmitStatus() !=5 && applicant.getSubmitStatus() !=7) {
            return ResponseUtil.ok(applicant);
        }
        //非法数据,走新流程
        return ResponseUtil.ok(applicant);

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
}