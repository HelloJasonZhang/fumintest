package org.linlinjava.litemall.wx.web;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.linlinjava.litemall.core.util.ResponseUtil;
import org.linlinjava.litemall.core.validator.Order;
import org.linlinjava.litemall.core.validator.Sort;
import org.linlinjava.litemall.db.domain.LitemallApplicant;
import org.linlinjava.litemall.db.domain.LitemallBrand;
import org.linlinjava.litemall.db.domain.LitemallElectronicSignature;
import org.linlinjava.litemall.db.service.LitemallBrandService;
import org.linlinjava.litemall.db.service.LitemallElectronicSignatureService;
import org.linlinjava.litemall.wx.annotation.LoginUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.List;

@RestController
@RequestMapping("/wx/signature")
@Validated
public class WxElectronicSignatureController {
    private final Log logger = LogFactory.getLog(WxElectronicSignatureController.class);

    @Autowired
    private LitemallElectronicSignatureService esService;

    @PostMapping("create")
    public Object create(@LoginUser Integer userId, @RequestBody LitemallElectronicSignature electronicSignature) {
        if (userId == null) {
            return ResponseUtil.unlogin();
        }
        if (electronicSignature.getUuid() == null) {
            return ResponseUtil.fail();
        }

        if (electronicSignature.getSignatureUrl() == null) {
            return ResponseUtil.fail();
        }
        electronicSignature.setUserId(userId);
        esService.add(electronicSignature);
        //发送消息
        return ResponseUtil.ok(electronicSignature);
    }
}