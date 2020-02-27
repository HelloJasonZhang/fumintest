package org.linlinjava.litemall.db.service;

import com.github.pagehelper.PageHelper;
import org.linlinjava.litemall.db.dao.LitemallBankMapper;
import org.linlinjava.litemall.db.domain.LitemallBank;
import org.linlinjava.litemall.db.domain.LitemallBank.Column;
import org.linlinjava.litemall.db.domain.LitemallBankExample;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class LitemallBankService {
    @Resource
    private LitemallBankMapper bankMapper;
    private Column[] columns = new Column[]{Column.id, Column.name, Column.contact, Column.address, Column.subBranch, Column.roleId};

    public List<LitemallBank> query(Integer page, Integer limit, String sort, String order) {
        LitemallBankExample example = new LitemallBankExample();
        example.or().andDeletedEqualTo(false);
        if (!StringUtils.isEmpty(sort) && !StringUtils.isEmpty(order)) {
           example.setOrderByClause(sort + " " + order);
        }
        PageHelper.startPage(page, limit);
        return bankMapper.selectByExampleSelective(example, columns);
    }

    public List<LitemallBank> queryByIds(List<Integer> ids, List<Integer> roleIds) {
        LitemallBankExample example = new LitemallBankExample();
        example.or().andIdIn(ids).andDeletedEqualTo(false).andRoleIdIn(roleIds);
        return bankMapper.selectByExampleSelective(example, columns);
    }

    public List<LitemallBank> queryByRids(Integer[] roleIds) {
        List<Integer> roleIdsList = new ArrayList<Integer>();
        for (int i =0 ; i < roleIds.length; i++){
            roleIdsList.add(new Integer(roleIds[i]));
        }
        LitemallBankExample example = new LitemallBankExample();
        example.or().andDeletedEqualTo(false).andRoleIdIn(roleIdsList);
        return bankMapper.selectByExampleSelective(example, columns);
    }

    public List<LitemallBank> query(Integer page, Integer limit) {
        return query(page, limit, null, null);
    }

    public LitemallBank findById(Integer id) {
        return bankMapper.selectByPrimaryKey(id);
    }

    public List<LitemallBank> querySelective(String id, String name, Integer page, Integer size, String sort, String order) {
        LitemallBankExample example = new LitemallBankExample();
        LitemallBankExample.Criteria criteria = example.createCriteria();

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

        PageHelper.startPage(page, size);
        return bankMapper.selectByExample(example);
    }

    public int updateById(LitemallBank Bank) {
        Bank.setUpdateTime(LocalDateTime.now());
        return bankMapper.updateByPrimaryKeySelective(Bank);
    }

    public void deleteById(Integer id) {
        bankMapper.logicalDeleteByPrimaryKey(id);
    }

    public void add(LitemallBank Bank) {
        Bank.setAddTime(LocalDateTime.now());
        Bank.setUpdateTime(LocalDateTime.now());
        bankMapper.insertSelective(Bank);
    }

    public List<LitemallBank> all() {
        LitemallBankExample example = new LitemallBankExample();
        example.or().andDeletedEqualTo(false);
        return bankMapper.selectByExample(example);
    }
}
