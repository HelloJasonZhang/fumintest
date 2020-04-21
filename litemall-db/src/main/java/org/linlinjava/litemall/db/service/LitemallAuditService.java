package org.linlinjava.litemall.db.service;

import org.linlinjava.litemall.db.dao.LitemallAuditMapper;
import org.linlinjava.litemall.db.dao.LitemallRecordMapper;
import org.linlinjava.litemall.db.domain.*;

import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class LitemallAuditService {
    @Resource
    private LitemallAuditMapper auditMapper;
    @Resource
    private LitemallRecordMapper recordMapper;

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
        litemallAudit.setSignatureUrl(applicant.getQrCodeSignature());
        auditMapper.insertSelective(litemallAudit);
    }

    public void addRecord(LitemallApplicant al, LitemallApplicantBank ab, String username) {
        LitemallRecord record = new LitemallRecord();
        //给历史数据赋值
        if (al.getApplicantType().equals("company")) {
            // 企业
            record.setName(al.getCompanyName());
            record.setIdCardNo(al.getHsUnifiedSocialCreditCode());
        } else {
            // 个人
            record.setName(al.getName());
            record.setIdCardNo(al.getIdCardNumber());
        }
        record.setLoanStartDate(ab.getLoanStartDate().toLocalDate());
        record.setLoanEndDate(ab.getLoanEndDate().toLocalDate());
        record.setPeriodLoan(ab.getPeriodLoan());
        record.setCredit(ab.getCredit());
        record.setInterest(ab.getInterest());
        record.setBankName(al.getbName());
        record.setAddTime(LocalDateTime.now());
        record.setUpdateTime(LocalDateTime.now());
        record.setAddPerson(username);
        record.setUpdatePerson(username);
        recordMapper.insertSelective(record);
    }

}
