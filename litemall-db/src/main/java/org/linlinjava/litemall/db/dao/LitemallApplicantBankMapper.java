package org.linlinjava.litemall.db.dao;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import org.linlinjava.litemall.db.domain.LitemallApplicantBank;
import org.linlinjava.litemall.db.domain.LitemallApplicantBankExample;

public interface LitemallApplicantBankMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant_bank
     *
     * @mbg.generated
     */
    long countByExample(LitemallApplicantBankExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant_bank
     *
     * @mbg.generated
     */
    int deleteByExample(LitemallApplicantBankExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant_bank
     *
     * @mbg.generated
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant_bank
     *
     * @mbg.generated
     */
    int insert(LitemallApplicantBank record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant_bank
     *
     * @mbg.generated
     */
    int insertSelective(LitemallApplicantBank record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant_bank
     *
     * @mbg.generated
     */
    LitemallApplicantBank selectOneByExample(LitemallApplicantBankExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant_bank
     *
     * @mbg.generated
     */
    LitemallApplicantBank selectOneByExampleSelective(@Param("example") LitemallApplicantBankExample example, @Param("selective") LitemallApplicantBank.Column ... selective);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant_bank
     *
     * @mbg.generated
     */
    List<LitemallApplicantBank> selectByExampleSelective(@Param("example") LitemallApplicantBankExample example, @Param("selective") LitemallApplicantBank.Column ... selective);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant_bank
     *
     * @mbg.generated
     */
    List<LitemallApplicantBank> selectByExample(LitemallApplicantBankExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant_bank
     *
     * @mbg.generated
     */
    LitemallApplicantBank selectByPrimaryKeySelective(@Param("id") Integer id, @Param("selective") LitemallApplicantBank.Column ... selective);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant_bank
     *
     * @mbg.generated
     */
    LitemallApplicantBank selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant_bank
     *
     * @mbg.generated
     */
    LitemallApplicantBank selectByPrimaryKeyWithLogicalDelete(@Param("id") Integer id, @Param("andLogicalDeleted") boolean andLogicalDeleted);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant_bank
     *
     * @mbg.generated
     */
    int updateByExampleSelective(@Param("record") LitemallApplicantBank record, @Param("example") LitemallApplicantBankExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant_bank
     *
     * @mbg.generated
     */
    int updateByExample(@Param("record") LitemallApplicantBank record, @Param("example") LitemallApplicantBankExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant_bank
     *
     * @mbg.generated
     */
    int updateByPrimaryKeySelective(LitemallApplicantBank record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant_bank
     *
     * @mbg.generated
     */
    int updateByPrimaryKey(LitemallApplicantBank record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant_bank
     *
     * @mbg.generated
     */
    int logicalDeleteByExample(@Param("example") LitemallApplicantBankExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_applicant_bank
     *
     * @mbg.generated
     */
    int logicalDeleteByPrimaryKey(Integer id);
}