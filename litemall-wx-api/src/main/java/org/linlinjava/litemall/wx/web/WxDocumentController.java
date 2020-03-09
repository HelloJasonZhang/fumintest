package org.linlinjava.litemall.wx.web;

import org.linlinjava.litemall.core.util.ResponseUtil;
import org.linlinjava.litemall.db.domain.LitemallApplicant;
import org.linlinjava.litemall.db.domain.LitemallDocument;
import org.linlinjava.litemall.db.service.LitemallDocumentService;
import org.linlinjava.litemall.wx.annotation.LoginUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/wx/document")
@Validated
public class WxDocumentController {

    @Autowired
    private LitemallDocumentService documentService;

    @GetMapping("read")
    public Object read(@LoginUser Integer userId, @RequestParam String docType) {
        if (userId == null) {
            return ResponseUtil.unlogin();
        }

        if (docType == null) {
            return  ResponseUtil.badArgument();
        }

        List<LitemallDocument> docList  = documentService.queryListByDocType(docType);
        if (docList.size() == 1) {
            return ResponseUtil.ok(docList.get(0));
        }
        return ResponseUtil.fail();
    }
}
