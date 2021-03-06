package org.linlinjava.litemall.db.dao;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import org.linlinjava.litemall.db.domain.LitemallApplicant;
import org.linlinjava.litemall.db.domain.LitemallApplicantExample;

public interface LitemallApplicantMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant
     *
     * @mbg.generated
     */
    long countByExample(LitemallApplicantExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant
     *
     * @mbg.generated
     */
    int deleteByExample(LitemallApplicantExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant
     *
     * @mbg.generated
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant
     *
     * @mbg.generated
     */
    int insert(LitemallApplicant record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant
     *
     * @mbg.generated
     */
    int insertSelective(LitemallApplicant record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant
     *
     * @mbg.generated
     */
    LitemallApplicant selectOneByExample(LitemallApplicantExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant
     *
     * @mbg.generated
     */
    LitemallApplicant selectOneByExampleSelective(@Param("example") LitemallApplicantExample example, @Param("selective") LitemallApplicant.Column ... selective);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant
     *
     * @mbg.generated
     */
    List<LitemallApplicant> selectByExampleSelective(@Param("example") LitemallApplicantExample example, @Param("selective") LitemallApplicant.Column ... selective);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant
     *
     * @mbg.generated
     */
    List<LitemallApplicant> selectByExample(LitemallApplicantExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant
     *
     * @mbg.generated
     */
    LitemallApplicant selectByPrimaryKeySelective(@Param("id") Integer id, @Param("selective") LitemallApplicant.Column ... selective);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant
     *
     * @mbg.generated
     */
    LitemallApplicant selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant
     *
     * @mbg.generated
     */
    LitemallApplicant selectByPrimaryKeyWithLogicalDelete(@Param("id") Integer id, @Param("andLogicalDeleted") boolean andLogicalDeleted);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant
     *
     * @mbg.generated
     */
    int updateByExampleSelective(@Param("record") LitemallApplicant record, @Param("example") LitemallApplicantExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant
     *
     * @mbg.generated
     */
    int updateByExample(@Param("record") LitemallApplicant record, @Param("example") LitemallApplicantExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant
     *
     * @mbg.generated
     */
    int updateByPrimaryKeySelective(LitemallApplicant record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant
     *
     * @mbg.generated
     */
    int updateByPrimaryKey(LitemallApplicant record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant
     *
     * @mbg.generated
     */
    int logicalDeleteByExample(@Param("example") LitemallApplicantExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant
     *
     * @mbg.generated
     */
    int logicalDeleteByPrimaryKey(Integer id);
}