package org.linlinjava.litemall.db.service;

import com.github.pagehelper.PageHelper;
import org.linlinjava.litemall.db.dao.LitemallRecordMapper;
import org.linlinjava.litemall.db.domain.LitemallRecord;
import org.linlinjava.litemall.db.domain.LitemallRecord.Column;
import org.linlinjava.litemall.db.domain.LitemallRecordExample;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class LitemallRecordService {
    @Resource
    private LitemallRecordMapper recordMapper;

    public List<LitemallRecord> query(Integer page, Integer limit, String sort, String order) {
        LitemallRecordExample example = new LitemallRecordExample();
        example.or().andDeletedEqualTo(false);
        if (!StringUtils.isEmpty(sort) && !StringUtils.isEmpty(order)) {
            example.setOrderByClause(sort + " " + order);
        }
        PageHelper.startPage(page, limit);
        return recordMapper.selectByExampleSelective(example);
    }

    public List<LitemallRecord> query(Integer page, Integer limit) {
        return query(page, limit, null, null);
    }

    public LitemallRecord findById(Integer id) {
        return recordMapper.selectByPrimaryKey(id);
    }

    public List<LitemallRecord> querySelective(String id, String name, String bankName, Integer page, Integer size, String sort, String order) {
        LitemallRecordExample example = new LitemallRecordExample();
        LitemallRecordExample.Criteria criteria = example.createCriteria();

        if (!StringUtils.isEmpty(id)) {
            criteria.andIdEqualTo(Integer.valueOf(id));
        }
        if (!StringUtils.isEmpty(name)) {
            criteria.andNameLike("%" + name + "%");
        }
        if (!StringUtils.isEmpty(bankName)) {
            criteria.andBankNameLike("%" + bankName + "%");
        }

        criteria.andDeletedEqualTo(false);

        if (!StringUtils.isEmpty(sort) && !StringUtils.isEmpty(order)) {
            example.setOrderByClause(sort + " " + order);
        }

        PageHelper.startPage(page, size);
        return recordMapper.selectByExample(example);
    }

    public int updateById(LitemallRecord record) {
        record.setUpdateTime(LocalDateTime.now());
        return recordMapper.updateByPrimaryKeySelective(record);
    }

    public void deleteById(Integer id) {
        recordMapper.logicalDeleteByPrimaryKey(id);
    }

    public void add(LitemallRecord record) {
        record.setAddTime(LocalDateTime.now());
        record.setUpdateTime(LocalDateTime.now());
        recordMapper.insertSelective(record);
    }

    public List<LitemallRecord> all(String name, String applicantType) {
        LitemallRecordExample example = new LitemallRecordExample();
        if (applicantType.equals("company")) {
            example.or().andNameLike("%" + name + "%").andDeletedEqualTo(false);
        } else {
            example.or().andIdCardNoLike("%" + name + "%").andDeletedEqualTo(false);
        }
        return recordMapper.selectByExample(example);
    }

    public void importData (List<LitemallRecord> recordList) {
        for (LitemallRecord record: recordList) {
            record.setAddTime(LocalDateTime.now());
            record.setUpdateTime(LocalDateTime.now());
            recordMapper.insertSelective(record);
        }
    }
}
