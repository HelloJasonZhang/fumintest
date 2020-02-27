package org.linlinjava.litemall.wx.web;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.linlinjava.litemall.core.util.RegexUtil;
import org.linlinjava.litemall.core.util.ResponseUtil;
import org.linlinjava.litemall.db.domain.LitemallAddress;
import org.linlinjava.litemall.db.domain.LitemallBank;
import org.linlinjava.litemall.db.service.*;
import org.linlinjava.litemall.db.service.LitemallBankService;
import org.linlinjava.litemall.wx.annotation.LoginUser;
import org.linlinjava.litemall.wx.service.GetRegionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.List;


@RestController
@RequestMapping("/wx/bank")
@Validated
public class WxBankController extends GetRegionService {
    private final Log logger = LogFactory.getLog(WxAddressController.class);

    @Autowired
    private LitemallBankService BankService;
    @Autowired
    private LitemallApplicantBankService litemallApplicantBankService;

    @GetMapping("list")
    public Object list() {
        List<LitemallBank> banikList = BankService.all();
        return ResponseUtil.okList(banikList);
    }

    private Object validate(LitemallBank Bank) {
        String name = Bank.getName();
        if (StringUtils.isEmpty(name)) {
            return ResponseUtil.badArgument();
        }
        String desc = Bank.getName();
        if (StringUtils.isEmpty(desc)) {
            return ResponseUtil.badArgument();
        }

        return null;
    }

    @PostMapping("create")
    public Object create(@LoginUser Integer userId, @RequestBody LitemallBank Bank) {

        Object error = validate(Bank);
        if (error != null) {
            return error;
        }
        BankService.add(Bank);
        return ResponseUtil.ok(Bank);
    }

    @PostMapping("read")
    public Object read( @NotNull Integer id) {
        LitemallBank Bank = BankService.findById(id);
        return ResponseUtil.ok(Bank);
    }

    @PostMapping("update")
    public Object update( @RequestBody LitemallBank Bank) {
        Object error = validate(Bank);
        if (error != null) {
            return error;
        }
        if (BankService.updateById(Bank) == 0) {
            return ResponseUtil.updatedDataFailed();
        }
        return ResponseUtil.ok(Bank);
    }
}