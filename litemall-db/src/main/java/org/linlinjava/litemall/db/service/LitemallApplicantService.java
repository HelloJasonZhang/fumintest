package org.linlinjava.litemall.db.service;

import com.github.pagehelper.PageHelper;
import org.linlinjava.litemall.db.dao.LitemallApplicantMapper;
import org.linlinjava.litemall.db.domain.LitemallApplicant;
import org.linlinjava.litemall.db.domain.LitemallApplicant.Column;
import org.linlinjava.litemall.db.domain.LitemallApplicantExample;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class LitemallApplicantService {
    @Resource
    private LitemallApplicantMapper applicantMapper;
    private Column[] columns = new Column[]{Column.id, Column.name};

    public List<LitemallApplicant> queryByUid(Integer uid) {
        LitemallApplicantExample example = new LitemallApplicantExample();
        example.or().andUserIdEqualTo(uid).andDeletedEqualTo(false);
        example.setOrderByClause("id" + " " + "desc");
        return applicantMapper.selectByExample(example);
    }

    public List<LitemallApplicant> queryByUidAndSubmitStatus(Integer uid, List<Integer> submitStatusList) {
        LitemallApplicantExample example = new LitemallApplicantExample();
        example.or().andUserIdEqualTo(uid).andSubmitStatusNotIn(submitStatusList).andDeletedEqualTo(false).andIsAvailableEqualTo(false);
        example.setOrderByClause("id" + " " + "desc");
        return applicantMapper.selectByExample(example);
    }

    public List<LitemallApplicant> queryByUidAndFinishApplicant(Integer uid, List<Integer> submitStatusList) {
        LitemallApplicantExample example = new LitemallApplicantExample();
        example.or().andUserIdEqualTo(uid).andSubmitStatusIn(submitStatusList).andDeletedEqualTo(false).andIsAvailableEqualTo(false);
        example.setOrderByClause("id" + " " + "desc");
        return applicantMapper.selectByExample(example);
    }

    public List<LitemallApplicant> queryByUidAndNotAvailable(Integer uid) {
        LitemallApplicantExample example = new LitemallApplicantExample();
        example.or().andUserIdEqualTo(uid).andDeletedEqualTo(false).andIsAvailableEqualTo(true);
        example.setOrderByClause("id" + " " + "desc");
        return applicantMapper.selectByExample(example);
    }


    public List<LitemallApplicant> query(Integer page, Integer limit, String sort, String order) {
        LitemallApplicantExample example = new LitemallApplicantExample();
        example.or().andDeletedEqualTo(false);
        if (!StringUtils.isEmpty(sort) && !StringUtils.isEmpty(order)) {
            example.setOrderByClause(sort + " " + order);
        }
        PageHelper.startPage(page, limit);
        return applicantMapper.selectByExampleSelective(example, columns);
    }

    public List<LitemallApplicant> query(Integer page, Integer limit) {
        return query(page, limit, null, null);
    }

    public LitemallApplicant findById(Integer id) {
        return applicantMapper.selectByPrimaryKey(id);
    }


    public List<LitemallApplicant> querySelective(String id, String name, Integer page, Integer size, String sort, String order, List<Integer> submitStatusArray, String isAvaiable) {
        LitemallApplicantExample example = new LitemallApplicantExample();
        LitemallApplicantExample.Criteria criteria = example.createCriteria();

        if (!StringUtils.isEmpty(id)) {
            criteria.andIdEqualTo(Integer.valueOf(id));
        }
        if (!StringUtils.isEmpty(name)) {
            criteria.andNameLike("%" + name + "%");
        }
        criteria.andDeletedEqualTo(false);

        if (!StringUtils.isEmpty(sort) && !StringUtils.isEmpty(order)) {
            example.setOrderByClause(sort + " " + order);
        }
        if (submitStatusArray != null && submitStatusArray.size() != 0) {
            criteria.andSubmitStatusIn(submitStatusArray);
        }
        if (isAvaiable != null && isAvaiable != "") {
            criteria.andIsAvailableEqualTo(Boolean.parseBoolean(isAvaiable));
        }

        PageHelper.startPage(page, size);
        return applicantMapper.selectByExample(example);
    }

    public List<LitemallApplicant> querySelective(String id, String name, Integer page, Integer size, String sort, String order, List<Integer> submitStatusArray) {
        LitemallApplicantExample example = new LitemallApplicantExample();
        LitemallApplicantExample.Criteria criteria = example.createCriteria();

        if (!StringUtils.isEmpty(id)) {
            criteria.andIdEqualTo(Integer.valueOf(id));
        }
        if (!StringUtils.isEmpty(name)) {
            criteria.andNameLike("%" + name + "%");
        }
        criteria.andDeletedEqualTo(false);

        if (!StringUtils.isEmpty(sort) && !StringUtils.isEmpty(order)) {
            example.setOrderByClause(sort + " " + order);
        }
        if (submitStatusArray != null && submitStatusArray.size() != 0) {
            criteria.andSubmitStatusIn(submitStatusArray);
        }
        PageHelper.startPage(page, size);
        return applicantMapper.selectByExample(example);
    }

    public int updateById(LitemallApplicant Applicant) {
        Applicant.setUpdateTime(LocalDateTime.now());
        if (Applicant.getSubmitStatus() != null) {
            if (Applicant.getSubmitStatus() == 2 || Applicant.getSubmitStatus() == 3 || Applicant.getSubmitStatus() == 4) {
                Applicant.setHsAuditDate(LocalDateTime.now());
            } else if (Applicant.getSubmitStatus() == 5 || Applicant.getSubmitStatus() == 6 || Applicant.getSubmitStatus() == 7) {
                Applicant.setScAuditDate(LocalDateTime.now());
            } else if (Applicant.getSubmitStatus() == 8 || Applicant.getSubmitStatus() == 9 || Applicant.getSubmitStatus() == 10) {
                Applicant.setbAuditDate(LocalDateTime.now());
            }
        }
        return applicantMapper.updateByPrimaryKeySelective(Applicant);
    }

    public int updateById(LitemallApplicant Applicant, String username) {
        Applicant.setUpdateTime(LocalDateTime.now());
        if (Applicant.getSubmitStatus() != null) {
            if (Applicant.getSubmitStatus() == 2 || Applicant.getSubmitStatus() == 3 || Applicant.getSubmitStatus() == 4) {
                Applicant.setHsAuditDate(LocalDateTime.now());
                Applicant.setHsOperator(username);
            } else if (Applicant.getSubmitStatus() == 5 || Applicant.getSubmitStatus() == 6 || Applicant.getSubmitStatus() == 7) {
                Applicant.setScAuditDate(LocalDateTime.now());
                Applicant.setScOperator(username);
            } else if (Applicant.getSubmitStatus() == 8 || Applicant.getSubmitStatus() == 9 || Applicant.getSubmitStatus() == 10) {
                Applicant.setbAuditDate(LocalDateTime.now());
                Applicant.setbOpertator(username);
            }
        }
        return applicantMapper.updateByPrimaryKeySelective(Applicant);
    }

    public void deleteById(Integer id) {
        applicantMapper.logicalDeleteByPrimaryKey(id);
    }

    public void add(LitemallApplicant Applicant) {
        Applicant.setAddTime(LocalDateTime.now());
        Applicant.setUpdateTime(LocalDateTime.now());
        if (Applicant.getSubmitStatus() == null ) {
            Applicant.setSubmitStatus(1);
        }
        applicantMapper.insertSelective(Applicant);
    }

    public List<LitemallApplicant> all() {
        LitemallApplicantExample example = new LitemallApplicantExample();
        example.or().andDeletedEqualTo(false);
        return applicantMapper.selectByExample(example);
    }
}
