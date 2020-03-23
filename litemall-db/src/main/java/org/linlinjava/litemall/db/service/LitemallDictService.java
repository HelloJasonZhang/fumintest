package org.linlinjava.litemall.db.service;

import com.github.pagehelper.PageHelper;
import org.linlinjava.litemall.db.dao.LitemallDictMapper;
import org.linlinjava.litemall.db.domain.LitemallDict;
import org.linlinjava.litemall.db.domain.LitemallDict.Column;
import org.linlinjava.litemall.db.domain.LitemallDictExample;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class LitemallDictService {
    @Resource
    private LitemallDictMapper dictMapper;
    private Column[] columns = new Column[]{Column.id, Column.name, Column.value, Column.active, Column.updateTime, Column.updator, Column.addTime, Column.creator};

    public List<LitemallDict> queryList(int offset, int limit) {
        return queryList(offset, limit, "add_time", "desc");
    }

    public List<LitemallDict> queryList(int offset, int limit, String sort, String order) {
        LitemallDictExample example = new LitemallDictExample();
        example.or().andDeletedEqualTo(false);
        example.setOrderByClause(sort + " " + order);
        PageHelper.startPage(offset, limit);
        return dictMapper.selectByExampleSelective(example, columns);
    }

    public List<LitemallDict> queryListByType( String type) {
        LitemallDictExample example = new LitemallDictExample();
        example.or().andTypeEqualTo(type).andDeletedEqualTo(false).andActiveEqualTo(true);
        example.setOrderByClause("add_time" + " " + "desc");
        return dictMapper.selectByExampleSelective(example, columns);
    }

    public int queryTotal() {
        LitemallDictExample example = new LitemallDictExample();
        example.or().andDeletedEqualTo(false);
        return (int) dictMapper.countByExample(example);
    }

    public LitemallDict findById(Integer id) {
        LitemallDictExample example = new LitemallDictExample();
        example.or().andIdEqualTo(id).andDeletedEqualTo(false);
        return dictMapper.selectOneByExample(example);
    }

    public List<LitemallDict> queryRelatedList(Integer id, int offset, int limit) {
        LitemallDictExample example = new LitemallDictExample();
        example.or().andIdEqualTo(id).andDeletedEqualTo(false);
        List<LitemallDict> Dicts = dictMapper.selectByExample(example);
        if (Dicts.size() == 0) {
            return queryList(offset, limit, "add_time", "desc");
        }
        LitemallDict Dict = Dicts.get(0);

        example = new LitemallDictExample();
        example.or().andIdNotEqualTo(Dict.getId()).andDeletedEqualTo(false);
        PageHelper.startPage(offset, limit);
        List<LitemallDict> relateds = dictMapper.selectByExample(example);
        if (relateds.size() != 0) {
            return relateds;
        }

        return queryList(offset, limit, "add_time", "desc");
    }

    public List<LitemallDict> querySelective(String title, String subtitle, Integer page, Integer limit, String sort, String order) {
        LitemallDictExample example = new LitemallDictExample();
        LitemallDictExample.Criteria criteria = example.createCriteria();

        criteria.andDeletedEqualTo(false);
        criteria.andActiveEqualTo(true);

        if (!StringUtils.isEmpty(sort) && !StringUtils.isEmpty(order)) {
            example.setOrderByClause(sort + " " + order);
        }

        PageHelper.startPage(page, limit);
        return dictMapper.selectByExample(example);
    }

    public int updateById(LitemallDict Dict) {
        Dict.setUpdateTime(LocalDateTime.now());
        LitemallDictExample example = new LitemallDictExample();
        example.or().andIdEqualTo(Dict.getId());
        return dictMapper.updateByExampleSelective(Dict, example);
    }

    public void deleteById(Integer id) {
        dictMapper.logicalDeleteByPrimaryKey(id);
    }

    public void add(LitemallDict Dict) {
        Dict.setAddTime(LocalDateTime.now());
        Dict.setUpdateTime(LocalDateTime.now());
        dictMapper.insertSelective(Dict);
    }

    public void deleteByIds(List<Integer> ids) {
        LitemallDictExample example = new LitemallDictExample();
        example.or().andIdIn(ids).andDeletedEqualTo(false);
        LitemallDict Dict = new LitemallDict();
        Dict.setUpdateTime(LocalDateTime.now());
        Dict.setDeleted(true);
        dictMapper.updateByExampleSelective(Dict, example);
    }
}
