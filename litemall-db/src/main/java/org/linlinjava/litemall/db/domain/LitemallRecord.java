package org.linlinjava.litemall.db.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;

public class LitemallRecord {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table litemall_record
     *
     * @mbg.generated
     */
    public static final Boolean IS_DELETED = Deleted.IS_DELETED.value();

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table litemall_record
     *
     * @mbg.generated
     */
    public static final Boolean NOT_DELETED = Deleted.NOT_DELETED.value();

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column litemall_record.id
     *
     * @mbg.generated
     */
    private Integer id;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column litemall_record.name
     *
     * @mbg.generated
     */
    private String name;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column litemall_record.id_card_no
     *
     * @mbg.generated
     */
    private String idCardNo;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column litemall_record.loan_start_date
     *
     * @mbg.generated
     */
    private LocalDate loanStartDate;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column litemall_record.loan_end_date
     *
     * @mbg.generated
     */
    private LocalDate loanEndDate;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column litemall_record.period_loan
     *
     * @mbg.generated
     */
    private String periodLoan;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column litemall_record.credit
     *
     * @mbg.generated
     */
    private String credit;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column litemall_record.interest
     *
     * @mbg.generated
     */
    private String interest;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column litemall_record.bank_name
     *
     * @mbg.generated
     */
    private String bankName;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column litemall_record.add_time
     *
     * @mbg.generated
     */
    private LocalDateTime addTime;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column litemall_record.add_person
     *
     * @mbg.generated
     */
    private String addPerson;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column litemall_record.update_time
     *
     * @mbg.generated
     */
    private LocalDateTime updateTime;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column litemall_record.update_person
     *
     * @mbg.generated
     */
    private String updatePerson;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column litemall_record.deleted
     *
     * @mbg.generated
     */
    private Boolean deleted;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column litemall_record.id
     *
     * @return the value of litemall_record.id
     *
     * @mbg.generated
     */
    public Integer getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column litemall_record.id
     *
     * @param id the value for litemall_record.id
     *
     * @mbg.generated
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column litemall_record.name
     *
     * @return the value of litemall_record.name
     *
     * @mbg.generated
     */
    public String getName() {
        return name;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column litemall_record.name
     *
     * @param name the value for litemall_record.name
     *
     * @mbg.generated
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column litemall_record.id_card_no
     *
     * @return the value of litemall_record.id_card_no
     *
     * @mbg.generated
     */
    public String getIdCardNo() {
        return idCardNo;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column litemall_record.id_card_no
     *
     * @param idCardNo the value for litemall_record.id_card_no
     *
     * @mbg.generated
     */
    public void setIdCardNo(String idCardNo) {
        this.idCardNo = idCardNo;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column litemall_record.loan_start_date
     *
     * @return the value of litemall_record.loan_start_date
     *
     * @mbg.generated
     */
    public LocalDate getLoanStartDate() {
        return loanStartDate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column litemall_record.loan_start_date
     *
     * @param loanStartDate the value for litemall_record.loan_start_date
     *
     * @mbg.generated
     */
    public void setLoanStartDate(LocalDate loanStartDate) {
        this.loanStartDate = loanStartDate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column litemall_record.loan_end_date
     *
     * @return the value of litemall_record.loan_end_date
     *
     * @mbg.generated
     */
    public LocalDate getLoanEndDate() {
        return loanEndDate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column litemall_record.loan_end_date
     *
     * @param loanEndDate the value for litemall_record.loan_end_date
     *
     * @mbg.generated
     */
    public void setLoanEndDate(LocalDate loanEndDate) {
        this.loanEndDate = loanEndDate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column litemall_record.period_loan
     *
     * @return the value of litemall_record.period_loan
     *
     * @mbg.generated
     */
    public String getPeriodLoan() {
        return periodLoan;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column litemall_record.period_loan
     *
     * @param periodLoan the value for litemall_record.period_loan
     *
     * @mbg.generated
     */
    public void setPeriodLoan(String periodLoan) {
        this.periodLoan = periodLoan;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column litemall_record.credit
     *
     * @return the value of litemall_record.credit
     *
     * @mbg.generated
     */
    public String getCredit() {
        return credit;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column litemall_record.credit
     *
     * @param credit the value for litemall_record.credit
     *
     * @mbg.generated
     */
    public void setCredit(String credit) {
        this.credit = credit;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column litemall_record.interest
     *
     * @return the value of litemall_record.interest
     *
     * @mbg.generated
     */
    public String getInterest() {
        return interest;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column litemall_record.interest
     *
     * @param interest the value for litemall_record.interest
     *
     * @mbg.generated
     */
    public void setInterest(String interest) {
        this.interest = interest;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column litemall_record.bank_name
     *
     * @return the value of litemall_record.bank_name
     *
     * @mbg.generated
     */
    public String getBankName() {
        return bankName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column litemall_record.bank_name
     *
     * @param bankName the value for litemall_record.bank_name
     *
     * @mbg.generated
     */
    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column litemall_record.add_time
     *
     * @return the value of litemall_record.add_time
     *
     * @mbg.generated
     */
    public LocalDateTime getAddTime() {
        return addTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column litemall_record.add_time
     *
     * @param addTime the value for litemall_record.add_time
     *
     * @mbg.generated
     */
    public void setAddTime(LocalDateTime addTime) {
        this.addTime = addTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column litemall_record.add_person
     *
     * @return the value of litemall_record.add_person
     *
     * @mbg.generated
     */
    public String getAddPerson() {
        return addPerson;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column litemall_record.add_person
     *
     * @param addPerson the value for litemall_record.add_person
     *
     * @mbg.generated
     */
    public void setAddPerson(String addPerson) {
        this.addPerson = addPerson;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column litemall_record.update_time
     *
     * @return the value of litemall_record.update_time
     *
     * @mbg.generated
     */
    public LocalDateTime getUpdateTime() {
        return updateTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column litemall_record.update_time
     *
     * @param updateTime the value for litemall_record.update_time
     *
     * @mbg.generated
     */
    public void setUpdateTime(LocalDateTime updateTime) {
        this.updateTime = updateTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column litemall_record.update_person
     *
     * @return the value of litemall_record.update_person
     *
     * @mbg.generated
     */
    public String getUpdatePerson() {
        return updatePerson;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column litemall_record.update_person
     *
     * @param updatePerson the value for litemall_record.update_person
     *
     * @mbg.generated
     */
    public void setUpdatePerson(String updatePerson) {
        this.updatePerson = updatePerson;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_record
     *
     * @mbg.generated
     */
    public void andLogicalDeleted(boolean deleted) {
        setDeleted(deleted ? Deleted.IS_DELETED.value() : Deleted.NOT_DELETED.value());
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column litemall_record.deleted
     *
     * @return the value of litemall_record.deleted
     *
     * @mbg.generated
     */
    public Boolean getDeleted() {
        return deleted;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column litemall_record.deleted
     *
     * @param deleted the value for litemall_record.deleted
     *
     * @mbg.generated
     */
    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_record
     *
     * @mbg.generated
     */
    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", IS_DELETED=").append(IS_DELETED);
        sb.append(", NOT_DELETED=").append(NOT_DELETED);
        sb.append(", id=").append(id);
        sb.append(", name=").append(name);
        sb.append(", idCardNo=").append(idCardNo);
        sb.append(", loanStartDate=").append(loanStartDate);
        sb.append(", loanEndDate=").append(loanEndDate);
        sb.append(", periodLoan=").append(periodLoan);
        sb.append(", credit=").append(credit);
        sb.append(", interest=").append(interest);
        sb.append(", bankName=").append(bankName);
        sb.append(", addTime=").append(addTime);
        sb.append(", addPerson=").append(addPerson);
        sb.append(", updateTime=").append(updateTime);
        sb.append(", updatePerson=").append(updatePerson);
        sb.append(", deleted=").append(deleted);
        sb.append("]");
        return sb.toString();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_record
     *
     * @mbg.generated
     */
    @Override
    public boolean equals(Object that) {
        if (this == that) {
            return true;
        }
        if (that == null) {
            return false;
        }
        if (getClass() != that.getClass()) {
            return false;
        }
        LitemallRecord other = (LitemallRecord) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getName() == null ? other.getName() == null : this.getName().equals(other.getName()))
            && (this.getIdCardNo() == null ? other.getIdCardNo() == null : this.getIdCardNo().equals(other.getIdCardNo()))
            && (this.getLoanStartDate() == null ? other.getLoanStartDate() == null : this.getLoanStartDate().equals(other.getLoanStartDate()))
            && (this.getLoanEndDate() == null ? other.getLoanEndDate() == null : this.getLoanEndDate().equals(other.getLoanEndDate()))
            && (this.getPeriodLoan() == null ? other.getPeriodLoan() == null : this.getPeriodLoan().equals(other.getPeriodLoan()))
            && (this.getCredit() == null ? other.getCredit() == null : this.getCredit().equals(other.getCredit()))
            && (this.getInterest() == null ? other.getInterest() == null : this.getInterest().equals(other.getInterest()))
            && (this.getBankName() == null ? other.getBankName() == null : this.getBankName().equals(other.getBankName()))
            && (this.getAddTime() == null ? other.getAddTime() == null : this.getAddTime().equals(other.getAddTime()))
            && (this.getAddPerson() == null ? other.getAddPerson() == null : this.getAddPerson().equals(other.getAddPerson()))
            && (this.getUpdateTime() == null ? other.getUpdateTime() == null : this.getUpdateTime().equals(other.getUpdateTime()))
            && (this.getUpdatePerson() == null ? other.getUpdatePerson() == null : this.getUpdatePerson().equals(other.getUpdatePerson()))
            && (this.getDeleted() == null ? other.getDeleted() == null : this.getDeleted().equals(other.getDeleted()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_record
     *
     * @mbg.generated
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getName() == null) ? 0 : getName().hashCode());
        result = prime * result + ((getIdCardNo() == null) ? 0 : getIdCardNo().hashCode());
        result = prime * result + ((getLoanStartDate() == null) ? 0 : getLoanStartDate().hashCode());
        result = prime * result + ((getLoanEndDate() == null) ? 0 : getLoanEndDate().hashCode());
        result = prime * result + ((getPeriodLoan() == null) ? 0 : getPeriodLoan().hashCode());
        result = prime * result + ((getCredit() == null) ? 0 : getCredit().hashCode());
        result = prime * result + ((getInterest() == null) ? 0 : getInterest().hashCode());
        result = prime * result + ((getBankName() == null) ? 0 : getBankName().hashCode());
        result = prime * result + ((getAddTime() == null) ? 0 : getAddTime().hashCode());
        result = prime * result + ((getAddPerson() == null) ? 0 : getAddPerson().hashCode());
        result = prime * result + ((getUpdateTime() == null) ? 0 : getUpdateTime().hashCode());
        result = prime * result + ((getUpdatePerson() == null) ? 0 : getUpdatePerson().hashCode());
        result = prime * result + ((getDeleted() == null) ? 0 : getDeleted().hashCode());
        return result;
    }

    /**
     * This enum was generated by MyBatis Generator.
     * This enum corresponds to the database table litemall_record
     *
     * @mbg.generated
     */
    public enum Deleted {
        NOT_DELETED(new Boolean("0"), "未删除"),
        IS_DELETED(new Boolean("1"), "已删除");

        /**
         * This field was generated by MyBatis Generator.
         * This field corresponds to the database table litemall_record
         *
         * @mbg.generated
         */
        private final Boolean value;

        /**
         * This field was generated by MyBatis Generator.
         * This field corresponds to the database table litemall_record
         *
         * @mbg.generated
         */
        private final String name;

        /**
         * This method was generated by MyBatis Generator.
         * This method corresponds to the database table litemall_record
         *
         * @mbg.generated
         */
        Deleted(Boolean value, String name) {
            this.value = value;
            this.name = name;
        }

        /**
         * This method was generated by MyBatis Generator.
         * This method corresponds to the database table litemall_record
         *
         * @mbg.generated
         */
        public Boolean getValue() {
            return this.value;
        }

        /**
         * This method was generated by MyBatis Generator.
         * This method corresponds to the database table litemall_record
         *
         * @mbg.generated
         */
        public Boolean value() {
            return this.value;
        }

        /**
         * This method was generated by MyBatis Generator.
         * This method corresponds to the database table litemall_record
         *
         * @mbg.generated
         */
        public String getName() {
            return this.name;
        }
    }

    /**
     * This enum was generated by MyBatis Generator.
     * This enum corresponds to the database table litemall_record
     *
     * @mbg.generated
     */
    public enum Column {
        id("id", "id", "INTEGER", false),
        name("name", "name", "VARCHAR", true),
        idCardNo("id_card_no", "idCardNo", "VARCHAR", false),
        loanStartDate("loan_start_date", "loanStartDate", "DATE", false),
        loanEndDate("loan_end_date", "loanEndDate", "DATE", false),
        periodLoan("period_loan", "periodLoan", "VARCHAR", false),
        credit("credit", "credit", "VARCHAR", false),
        interest("interest", "interest", "VARCHAR", false),
        bankName("bank_name", "bankName", "VARCHAR", false),
        addTime("add_time", "addTime", "TIMESTAMP", false),
        addPerson("add_person", "addPerson", "VARCHAR", false),
        updateTime("update_time", "updateTime", "TIMESTAMP", false),
        updatePerson("update_person", "updatePerson", "VARCHAR", false),
        deleted("deleted", "deleted", "BIT", false);

        /**
         * This field was generated by MyBatis Generator.
         * This field corresponds to the database table litemall_record
         *
         * @mbg.generated
         */
        private static final String BEGINNING_DELIMITER = "`";

        /**
         * This field was generated by MyBatis Generator.
         * This field corresponds to the database table litemall_record
         *
         * @mbg.generated
         */
        private static final String ENDING_DELIMITER = "`";

        /**
         * This field was generated by MyBatis Generator.
         * This field corresponds to the database table litemall_record
         *
         * @mbg.generated
         */
        private final String column;

        /**
         * This field was generated by MyBatis Generator.
         * This field corresponds to the database table litemall_record
         *
         * @mbg.generated
         */
        private final boolean isColumnNameDelimited;

        /**
         * This field was generated by MyBatis Generator.
         * This field corresponds to the database table litemall_record
         *
         * @mbg.generated
         */
        private final String javaProperty;

        /**
         * This field was generated by MyBatis Generator.
         * This field corresponds to the database table litemall_record
         *
         * @mbg.generated
         */
        private final String jdbcType;

        /**
         * This method was generated by MyBatis Generator.
         * This method corresponds to the database table litemall_record
         *
         * @mbg.generated
         */
        public String value() {
            return this.column;
        }

        /**
         * This method was generated by MyBatis Generator.
         * This method corresponds to the database table litemall_record
         *
         * @mbg.generated
         */
        public String getValue() {
            return this.column;
        }

        /**
         * This method was generated by MyBatis Generator.
         * This method corresponds to the database table litemall_record
         *
         * @mbg.generated
         */
        public String getJavaProperty() {
            return this.javaProperty;
        }

        /**
         * This method was generated by MyBatis Generator.
         * This method corresponds to the database table litemall_record
         *
         * @mbg.generated
         */
        public String getJdbcType() {
            return this.jdbcType;
        }

        /**
         * This method was generated by MyBatis Generator.
         * This method corresponds to the database table litemall_record
         *
         * @mbg.generated
         */
        Column(String column, String javaProperty, String jdbcType, boolean isColumnNameDelimited) {
            this.column = column;
            this.javaProperty = javaProperty;
            this.jdbcType = jdbcType;
            this.isColumnNameDelimited = isColumnNameDelimited;
        }

        /**
         * This method was generated by MyBatis Generator.
         * This method corresponds to the database table litemall_record
         *
         * @mbg.generated
         */
        public String desc() {
            return this.getEscapedColumnName() + " DESC";
        }

        /**
         * This method was generated by MyBatis Generator.
         * This method corresponds to the database table litemall_record
         *
         * @mbg.generated
         */
        public String asc() {
            return this.getEscapedColumnName() + " ASC";
        }

        /**
         * This method was generated by MyBatis Generator.
         * This method corresponds to the database table litemall_record
         *
         * @mbg.generated
         */
        public static Column[] excludes(Column ... excludes) {
            ArrayList<Column> columns = new ArrayList<>(Arrays.asList(Column.values()));
            if (excludes != null && excludes.length > 0) {
                columns.removeAll(new ArrayList<>(Arrays.asList(excludes)));
            }
            return columns.toArray(new Column[]{});
        }

        /**
         * This method was generated by MyBatis Generator.
         * This method corresponds to the database table litemall_record
         *
         * @mbg.generated
         */
        public String getEscapedColumnName() {
            if (this.isColumnNameDelimited) {
                return new StringBuilder().append(BEGINNING_DELIMITER).append(this.column).append(ENDING_DELIMITER).toString();
            } else {
                return this.column;
            }
        }

        /**
         * This method was generated by MyBatis Generator.
         * This method corresponds to the database table litemall_record
         *
         * @mbg.generated
         */
        public String getAliasedEscapedColumnName() {
            return this.getEscapedColumnName();
        }
    }
}