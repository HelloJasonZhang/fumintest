package org.linlinjava.litemall.wx.web;

import org.linlinjava.litemall.core.util.ResponseUtil;
import org.linlinjava.litemall.db.domain.LitemallDict;
import org.linlinjava.litemall.db.service.LitemallDictService;
import org.linlinjava.litemall.wx.annotation.LoginUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/wx/dict")
@Validated
public class WxDictController {

    @Autowired
    private LitemallDictService dictService;

    @GetMapping("read")
    public Object read(@LoginUser Integer userId, @RequestParam String type) {
        if (userId == null) {
            return ResponseUtil.unlogin();
        }

        if (type == null) {
            return  ResponseUtil.badArgument();
        }
        List<LitemallDict> docList  = dictService.queryListByType(type);
        return ResponseUtil.ok(docList);
    }
}
