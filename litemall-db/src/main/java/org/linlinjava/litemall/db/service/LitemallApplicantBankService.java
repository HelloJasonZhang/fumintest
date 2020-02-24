package org.linlinjava.litemall.db.service;

import com.github.pagehelper.PageHelper;
import org.linlinjava.litemall.db.dao.LitemallApplicantBankMapper;
import org.linlinjava.litemall.db.domain.LitemallApplicantBank;
import org.linlinjava.litemall.db.domain.LitemallApplicantBank.Column;
import org.linlinjava.litemall.db.domain.LitemallApplicantBankExample;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class LitemallApplicantBankService {
    @Resource
    private LitemallApplicantBankMapper ApplicantBankMapper;
    private Column[] columns = new Column[]{Column.id, Column.bankId};

    public List<LitemallApplicantBank> query(Integer page, Integer limit, String sort, String order) {
        LitemallApplicantBankExample example = new LitemallApplicantBankExample();
        example.or().andDeletedEqualTo(false);
        if (!StringUtils.isEmpty(sort) && !StringUtils.isEmpty(order)) {
            example.setOrderByClause(sort + " " + order);
        }
        PageHelper.startPage(page, limit);
        return ApplicantBankMapper.selectByExampleSelective(example, columns);
    }

    public List<LitemallApplicantBank> query(Integer page, Integer limit) {
        return query(page, limit, null, null);
    }

    public LitemallApplicantBank findById(Integer id) {
        return ApplicantBankMapper.selectByPrimaryKey(id);
    }

    public List<LitemallApplicantBank> querySelective(String id, String name, Integer page, Integer size, String sort, String order) {
        LitemallApplicantBankExample example = new LitemallApplicantBankExample();
        LitemallApplicantBankExample.Criteria criteria = example.createCriteria();

        if (!StringUtils.isEmpty(id)) {
            criteria.andIdEqualTo(Integer.valueOf(id));
        }

        criteria.andDeletedEqualTo(false);

        if (!StringUtils.isEmpty(sort) && !StringUtils.isEmpty(order)) {
            example.setOrderByClause(sort + " " + order);
        }

        PageHelper.startPage(page, size);
        return ApplicantBankMapper.selectByExample(example);
    }

    public int updateById(LitemallApplicantBank ApplicantBank) {
        ApplicantBank.setUpdateTime(LocalDateTime.now());
        return ApplicantBankMapper.updateByPrimaryKeySelective(ApplicantBank);
    }

    public void deleteById(Integer id) {
        ApplicantBankMapper.logicalDeleteByPrimaryKey(id);
    }

    public void add(LitemallApplicantBank ApplicantBank) {
        ApplicantBank.setAddTime(LocalDateTime.now());
        ApplicantBank.setUpdateTime(LocalDateTime.now());
        ApplicantBankMapper.insertSelective(ApplicantBank);
    }

    public List<LitemallApplicantBank> all() {
        LitemallApplicantBankExample example = new LitemallApplicantBankExample();
        example.or().andDeletedEqualTo(false);
        return ApplicantBankMapper.selectByExample(example);
    }
}
