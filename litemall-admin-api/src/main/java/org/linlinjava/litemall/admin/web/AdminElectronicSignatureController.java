package org.linlinjava.litemall.admin.web;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.linlinjava.litemall.core.util.ResponseUtil;
import org.linlinjava.litemall.db.domain.LitemallElectronicSignature;
import org.linlinjava.litemall.db.service.LitemallElectronicSignatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/admin/signature")
@Validated
public class AdminElectronicSignatureController {
    private final Log logger = LogFactory.getLog(AdminElectronicSignatureController.class);

    @Autowired
    private LitemallElectronicSignatureService esService;

    private Object validate(LitemallElectronicSignature ElectronicSignature) {
        String uuid = ElectronicSignature.getUuid();
        if (StringUtils.isEmpty(uuid)) {
            return ResponseUtil.badArgument();
        }
        String signatureUrl = ElectronicSignature.getSignatureUrl();
        if (StringUtils.isEmpty(signatureUrl)) {
            return ResponseUtil.badArgument();
        }
        return null;
    }

    @PostMapping("/create")
    public Object create(@RequestBody LitemallElectronicSignature ElectronicSignature) {
        Object error = validate(ElectronicSignature);
        if (error != null) {
            return error;
        }
        esService.add(ElectronicSignature);
        return ResponseUtil.ok(ElectronicSignature);
    }

    @GetMapping("/read")
    public Object read(@NotNull Integer applicantId, @NotNull String uuid) {
        List<LitemallElectronicSignature> electronicSignature = esService.findByApplicantIdAndUuid(applicantId, uuid);
        if (electronicSignature.size() > 0) {
            return ResponseUtil.ok(electronicSignature.get(0));
        }
        return ResponseUtil.ok(new ArrayList<LitemallElectronicSignature>());
    }
}
