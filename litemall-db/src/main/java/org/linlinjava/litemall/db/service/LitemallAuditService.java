package org.linlinjava.litemall.db.service;

import org.linlinjava.litemall.db.dao.LitemallAuditMapper;
import org.linlinjava.litemall.db.domain.LitemallApplicant;
import org.linlinjava.litemall.db.domain.LitemallAudit;
import org.linlinjava.litemall.db.domain.LitemallAuditExample;

import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class LitemallAuditService {
    @Resource
    private LitemallAuditMapper auditMapper;

    public List<LitemallAudit> all(Integer applicantId) {
        LitemallAuditExample example = new LitemallAuditExample();
        example.or().andApplicantIdEqualTo(applicantId).andDeletedEqualTo(false);
        example.setOrderByClause("add_time" + " " + "desc");
        return auditMapper.selectByExample(example);
    }

    public void add(LitemallApplicant applicant, Integer userId, String username, String comment) {
        LitemallAudit litemallAudit = new LitemallAudit();
        litemallAudit.setApplicantId(applicant.getId());
        litemallAudit.setOperatorName(username);
        litemallAudit.setOperatorId(userId);
        litemallAudit.setSubmiteStatus(applicant.getSubmitStatus());
        litemallAudit.setAuditCommit(comment);
        litemallAudit.setAddTime(LocalDateTime.now());
        litemallAudit.setUpdateTime(LocalDateTime.now());
        auditMapper.insertSelective(litemallAudit);
    }
}
