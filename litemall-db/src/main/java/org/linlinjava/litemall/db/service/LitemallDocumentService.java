package org.linlinjava.litemall.db.service;

import com.github.pagehelper.PageHelper;
import org.linlinjava.litemall.db.dao.LitemallDocumentMapper;
import org.linlinjava.litemall.db.domain.LitemallDocument;
import org.linlinjava.litemall.db.domain.LitemallDocument.Column;
import org.linlinjava.litemall.db.domain.LitemallDocumentExample;
import org.linlinjava.litemall.db.domain.LitemallDocumentExample;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class LitemallDocumentService {
    @Resource
    private LitemallDocumentMapper documentMapper;
    private Column[] columns = new Column[]{Column.id, Column.docType, Column.docName, Column.detail, Column.updateTime, Column.updator, Column.addTime, Column.creator};

    public List<LitemallDocument> queryList(int offset, int limit) {
        return queryList(offset, limit, "add_time", "desc");
    }

    public List<LitemallDocument> queryList(int offset, int limit, String sort, String order) {
        LitemallDocumentExample example = new LitemallDocumentExample();
        example.or().andDeletedEqualTo(false);
        example.setOrderByClause(sort + " " + order);
        PageHelper.startPage(offset, limit);
        return documentMapper.selectByExampleSelective(example, columns);
    }

    public List<LitemallDocument> queryListByDocType( String docType) {
        LitemallDocumentExample example = new LitemallDocumentExample();
        example.or().andDocTypeEqualTo(docType).andDeletedEqualTo(false).andActiveEqualTo(true);
        example.setOrderByClause("add_time" + " " + "desc");
        return documentMapper.selectByExampleSelective(example, columns);
    }

    public int queryTotal() {
        LitemallDocumentExample example = new LitemallDocumentExample();
        example.or().andDeletedEqualTo(false);
        return (int) documentMapper.countByExample(example);
    }

    public LitemallDocument findById(Integer id) {
        LitemallDocumentExample example = new LitemallDocumentExample();
        example.or().andIdEqualTo(id).andDeletedEqualTo(false);
        return documentMapper.selectOneByExampleWithBLOBs(example);
    }

    public List<LitemallDocument> queryRelatedList(Integer id, int offset, int limit) {
        LitemallDocumentExample example = new LitemallDocumentExample();
        example.or().andIdEqualTo(id).andDeletedEqualTo(false);
        List<LitemallDocument> documents = documentMapper.selectByExample(example);
        if (documents.size() == 0) {
            return queryList(offset, limit, "add_time", "desc");
        }
        LitemallDocument document = documents.get(0);

        example = new LitemallDocumentExample();
        example.or().andIdNotEqualTo(document.getId()).andDeletedEqualTo(false);
        PageHelper.startPage(offset, limit);
        List<LitemallDocument> relateds = documentMapper.selectByExampleWithBLOBs(example);
        if (relateds.size() != 0) {
            return relateds;
        }

        return queryList(offset, limit, "add_time", "desc");
    }

    public List<LitemallDocument> querySelective(String title, String subtitle, Integer page, Integer limit, String sort, String order) {
        LitemallDocumentExample example = new LitemallDocumentExample();
        LitemallDocumentExample.Criteria criteria = example.createCriteria();

        criteria.andDeletedEqualTo(false);

        if (!StringUtils.isEmpty(sort) && !StringUtils.isEmpty(order)) {
            example.setOrderByClause(sort + " " + order);
        }

        PageHelper.startPage(page, limit);
        return documentMapper.selectByExampleWithBLOBs(example);
    }

    public int updateById(LitemallDocument document) {
        document.setUpdateTime(LocalDateTime.now());
        LitemallDocumentExample example = new LitemallDocumentExample();
        example.or().andIdEqualTo(document.getId());
        return documentMapper.updateByExampleSelective(document, example);
    }

    public void deleteById(Integer id) {
        documentMapper.logicalDeleteByPrimaryKey(id);
    }

    public void add(LitemallDocument document) {
        document.setAddTime(LocalDateTime.now());
        document.setUpdateTime(LocalDateTime.now());
        documentMapper.insertSelective(document);
    }

    public void deleteByIds(List<Integer> ids) {
        LitemallDocumentExample example = new LitemallDocumentExample();
        example.or().andIdIn(ids).andDeletedEqualTo(false);
        LitemallDocument document = new LitemallDocument();
        document.setUpdateTime(LocalDateTime.now());
        document.setDeleted(true);
        documentMapper.updateByExampleSelective(document, example);
    }
}
