package org.linlinjava.litemall.db.dao;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import org.linlinjava.litemall.db.domain.LitemallDict;
import org.linlinjava.litemall.db.domain.LitemallDictExample;

public interface LitemallDictMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_dict
     *
     * @mbg.generated
     */
    long countByExample(LitemallDictExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_dict
     *
     * @mbg.generated
     */
    int deleteByExample(LitemallDictExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_dict
     *
     * @mbg.generated
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_dict
     *
     * @mbg.generated
     */
    int insert(LitemallDict record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_dict
     *
     * @mbg.generated
     */
    int insertSelective(LitemallDict record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_dict
     *
     * @mbg.generated
     */
    LitemallDict selectOneByExample(LitemallDictExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_dict
     *
     * @mbg.generated
     */
    LitemallDict selectOneByExampleSelective(@Param("example") LitemallDictExample example, @Param("selective") LitemallDict.Column ... selective);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_dict
     *
     * @mbg.generated
     */
    List<LitemallDict> selectByExampleSelective(@Param("example") LitemallDictExample example, @Param("selective") LitemallDict.Column ... selective);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_dict
     *
     * @mbg.generated
     */
    List<LitemallDict> selectByExample(LitemallDictExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_dict
     *
     * @mbg.generated
     */
    LitemallDict selectByPrimaryKeySelective(@Param("id") Integer id, @Param("selective") LitemallDict.Column ... selective);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_dict
     *
     * @mbg.generated
     */
    LitemallDict selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_dict
     *
     * @mbg.generated
     */
    LitemallDict selectByPrimaryKeyWithLogicalDelete(@Param("id") Integer id, @Param("andLogicalDeleted") boolean andLogicalDeleted);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_dict
     *
     * @mbg.generated
     */
    int updateByExampleSelective(@Param("record") LitemallDict record, @Param("example") LitemallDictExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_dict
     *
     * @mbg.generated
     */
    int updateByExample(@Param("record") LitemallDict record, @Param("example") LitemallDictExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_dict
     *
     * @mbg.generated
     */
    int updateByPrimaryKeySelective(LitemallDict record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_dict
     *
     * @mbg.generated
     */
    int updateByPrimaryKey(LitemallDict record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_dict
     *
     * @mbg.generated
     */
    int logicalDeleteByExample(@Param("example") LitemallDictExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_dict
     *
     * @mbg.generated
     */
    int logicalDeleteByPrimaryKey(Integer id);
}