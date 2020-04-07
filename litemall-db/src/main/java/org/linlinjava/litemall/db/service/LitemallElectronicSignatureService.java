package org.linlinjava.litemall.db.service;

import com.github.pagehelper.PageHelper;
import org.linlinjava.litemall.db.dao.LitemallElectronicSignatureMapper;
import org.linlinjava.litemall.db.domain.LitemallElectronicSignature;
import org.linlinjava.litemall.db.domain.LitemallElectronicSignature.Column;
import org.linlinjava.litemall.db.domain.LitemallElectronicSignatureExample;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class LitemallElectronicSignatureService {
    @Resource
    private LitemallElectronicSignatureMapper ElectronicSignatureMapper;

    public List<LitemallElectronicSignature> query(Integer page, Integer limit, String sort, String order) {
        LitemallElectronicSignatureExample example = new LitemallElectronicSignatureExample();
        example.or().andDeletedEqualTo(false);
        if (!StringUtils.isEmpty(sort) && !StringUtils.isEmpty(order)) {
            example.setOrderByClause(sort + " " + order);
        }
        PageHelper.startPage(page, limit);
        return ElectronicSignatureMapper.selectByExampleSelective(example);
    }

    public List<LitemallElectronicSignature> query(Integer page, Integer limit) {
        return query(page, limit, null, null);
    }

    public LitemallElectronicSignature findById(Integer id) {
        return ElectronicSignatureMapper.selectByPrimaryKey(id);
    }

    public List<LitemallElectronicSignature> querySelective(String id, String name, Integer page, Integer size, String sort, String order) {
        LitemallElectronicSignatureExample example = new LitemallElectronicSignatureExample();
        LitemallElectronicSignatureExample.Criteria criteria = example.createCriteria();

        if (!StringUtils.isEmpty(id)) {
            criteria.andIdEqualTo(Integer.valueOf(id));
        }
        if (!StringUtils.isEmpty(name)) {
            criteria.andUuidEqualTo("%" + name + "%");
        }
        criteria.andDeletedEqualTo(false);

        if (!StringUtils.isEmpty(sort) && !StringUtils.isEmpty(order)) {
            example.setOrderByClause(sort + " " + order);
        }

        PageHelper.startPage(page, size);
        return ElectronicSignatureMapper.selectByExample(example);
    }

    public int updateById(LitemallElectronicSignature ElectronicSignature) {
        ElectronicSignature.setUpdateTime(LocalDateTime.now());
        return ElectronicSignatureMapper.updateByPrimaryKeySelective(ElectronicSignature);
    }

    public void deleteById(Integer id) {
        ElectronicSignatureMapper.logicalDeleteByPrimaryKey(id);
    }

    public void add(LitemallElectronicSignature ElectronicSignature) {
        ElectronicSignature.setAddTime(LocalDateTime.now());
        ElectronicSignature.setUpdateTime(LocalDateTime.now());
        ElectronicSignatureMapper.insertSelective(ElectronicSignature);
    }

    public List<LitemallElectronicSignature> all() {
        LitemallElectronicSignatureExample example = new LitemallElectronicSignatureExample();
        example.or().andDeletedEqualTo(false);
        return ElectronicSignatureMapper.selectByExample(example);
    }

    public List<LitemallElectronicSignature> findByApplicantIdAndUuid (Integer applicantId, String uuid) {
        LitemallElectronicSignatureExample example = new LitemallElectronicSignatureExample();
        example.or().andApplicantIdEqualTo(applicantId).andUuidEqualTo(uuid).andDeletedEqualTo(false);
        example.setOrderByClause("add_time desc");
        return ElectronicSignatureMapper.selectByExampleSelective(example);
    }
}
