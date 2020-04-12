package org.linlinjava.litemall.db.domain;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;

public class LitemallAudit {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table litemall_audit
     *
     * @mbg.generated
     */
    public static final Boolean IS_DELETED = Deleted.IS_DELETED.value();

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table litemall_audit
     *
     * @mbg.generated
     */
    public static final Boolean NOT_DELETED = Deleted.NOT_DELETED.value();

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column litemall_audit.id
     *
     * @mbg.generated
     */
    private Integer id;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column litemall_audit.applicant_id
     *
     * @mbg.generated
     */
    private Integer applicantId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column litemall_audit.operator_id
     *
     * @mbg.generated
     */
    private Integer operatorId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column litemall_audit.operator_name
     *
     * @mbg.generated
     */
    private String operatorName;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column litemall_audit.orignal_status
     *
     * @mbg.generated
     */
    private Integer orignalStatus;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column litemall_audit.submite_status
     *
     * @mbg.generated
     */
    private Integer submiteStatus;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column litemall_audit.audit_commit
     *
     * @mbg.generated
     */
    private String auditCommit;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column litemall_audit.singnature
     *
     * @mbg.generated
     */
    private String singnature;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column litemall_audit.review
     *
     * @mbg.generated
     */
    private Boolean review;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column litemall_audit.signature_url
     *
     * @mbg.generated
     */
    private String signatureUrl;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column litemall_audit.add_time
     *
     * @mbg.generated
     */
    private LocalDateTime addTime;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column litemall_audit.update_time
     *
     * @mbg.generated
     */
    private LocalDateTime updateTime;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column litemall_audit.deleted
     *
     * @mbg.generated
     */
    private Boolean deleted;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column litemall_audit.id
     *
     * @return the value of litemall_audit.id
     *
     * @mbg.generated
     */
    public Integer getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column litemall_audit.id
     *
     * @param id the value for litemall_audit.id
     *
     * @mbg.generated
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column litemall_audit.applicant_id
     *
     * @return the value of litemall_audit.applicant_id
     *
     * @mbg.generated
     */
    public Integer getApplicantId() {
        return applicantId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column litemall_audit.applicant_id
     *
     * @param applicantId the value for litemall_audit.applicant_id
     *
     * @mbg.generated
     */
    public void setApplicantId(Integer applicantId) {
        this.applicantId = applicantId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column litemall_audit.operator_id
     *
     * @return the value of litemall_audit.operator_id
     *
     * @mbg.generated
     */
    public Integer getOperatorId() {
        return operatorId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column litemall_audit.operator_id
     *
     * @param operatorId the value for litemall_audit.operator_id
     *
     * @mbg.generated
     */
    public void setOperatorId(Integer operatorId) {
        this.operatorId = operatorId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column litemall_audit.operator_name
     *
     * @return the value of litemall_audit.operator_name
     *
     * @mbg.generated
     */
    public String getOperatorName() {
        return operatorName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column litemall_audit.operator_name
     *
     * @param operatorName the value for litemall_audit.operator_name
     *
     * @mbg.generated
     */
    public void setOperatorName(String operatorName) {
        this.operatorName = operatorName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column litemall_audit.orignal_status
     *
     * @return the value of litemall_audit.orignal_status
     *
     * @mbg.generated
     */
    public Integer getOrignalStatus() {
        return orignalStatus;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column litemall_audit.orignal_status
     *
     * @param orignalStatus the value for litemall_audit.orignal_status
     *
     * @mbg.generated
     */
    public void setOrignalStatus(Integer orignalStatus) {
        this.orignalStatus = orignalStatus;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column litemall_audit.submite_status
     *
     * @return the value of litemall_audit.submite_status
     *
     * @mbg.generated
     */
    public Integer getSubmiteStatus() {
        return submiteStatus;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column litemall_audit.submite_status
     *
     * @param submiteStatus the value for litemall_audit.submite_status
     *
     * @mbg.generated
     */
    public void setSubmiteStatus(Integer submiteStatus) {
        this.submiteStatus = submiteStatus;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column litemall_audit.audit_commit
     *
     * @return the value of litemall_audit.audit_commit
     *
     * @mbg.generated
     */
    public String getAuditCommit() {
        return auditCommit;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column litemall_audit.audit_commit
     *
     * @param auditCommit the value for litemall_audit.audit_commit
     *
     * @mbg.generated
     */
    public void setAuditCommit(String auditCommit) {
        this.auditCommit = auditCommit;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column litemall_audit.singnature
     *
     * @return the value of litemall_audit.singnature
     *
     * @mbg.generated
     */
    public String getSingnature() {
        return singnature;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column litemall_audit.singnature
     *
     * @param singnature the value for litemall_audit.singnature
     *
     * @mbg.generated
     */
    public void setSingnature(String singnature) {
        this.singnature = singnature;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column litemall_audit.review
     *
     * @return the value of litemall_audit.review
     *
     * @mbg.generated
     */
    public Boolean getReview() {
        return review;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column litemall_audit.review
     *
     * @param review the value for litemall_audit.review
     *
     * @mbg.generated
     */
    public void setReview(Boolean review) {
        this.review = review;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column litemall_audit.signature_url
     *
     * @return the value of litemall_audit.signature_url
     *
     * @mbg.generated
     */
    public String getSignatureUrl() {
        return signatureUrl;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column litemall_audit.signature_url
     *
     * @param signatureUrl the value for litemall_audit.signature_url
     *
     * @mbg.generated
     */
    public void setSignatureUrl(String signatureUrl) {
        this.signatureUrl = signatureUrl;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column litemall_audit.add_time
     *
     * @return the value of litemall_audit.add_time
     *
     * @mbg.generated
     */
    public LocalDateTime getAddTime() {
        return addTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column litemall_audit.add_time
     *
     * @param addTime the value for litemall_audit.add_time
     *
     * @mbg.generated
     */
    public void setAddTime(LocalDateTime addTime) {
        this.addTime = addTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column litemall_audit.update_time
     *
     * @return the value of litemall_audit.update_time
     *
     * @mbg.generated
     */
    public LocalDateTime getUpdateTime() {
        return updateTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column litemall_audit.update_time
     *
     * @param updateTime the value for litemall_audit.update_time
     *
     * @mbg.generated
     */
    public void setUpdateTime(LocalDateTime updateTime) {
        this.updateTime = updateTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_audit
     *
     * @mbg.generated
     */
    public void andLogicalDeleted(boolean deleted) {
        setDeleted(deleted ? Deleted.IS_DELETED.value() : Deleted.NOT_DELETED.value());
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column litemall_audit.deleted
     *
     * @return the value of litemall_audit.deleted
     *
     * @mbg.generated
     */
    public Boolean getDeleted() {
        return deleted;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column litemall_audit.deleted
     *
     * @param deleted the value for litemall_audit.deleted
     *
     * @mbg.generated
     */
    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_audit
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
        sb.append(", applicantId=").append(applicantId);
        sb.append(", operatorId=").append(operatorId);
        sb.append(", operatorName=").append(operatorName);
        sb.append(", orignalStatus=").append(orignalStatus);
        sb.append(", submiteStatus=").append(submiteStatus);
        sb.append(", auditCommit=").append(auditCommit);
        sb.append(", singnature=").append(singnature);
        sb.append(", review=").append(review);
        sb.append(", signatureUrl=").append(signatureUrl);
        sb.append(", addTime=").append(addTime);
        sb.append(", updateTime=").append(updateTime);
        sb.append(", deleted=").append(deleted);
        sb.append("]");
        return sb.toString();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_audit
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
        LitemallAudit other = (LitemallAudit) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getApplicantId() == null ? other.getApplicantId() == null : this.getApplicantId().equals(other.getApplicantId()))
            && (this.getOperatorId() == null ? other.getOperatorId() == null : this.getOperatorId().equals(other.getOperatorId()))
            && (this.getOperatorName() == null ? other.getOperatorName() == null : this.getOperatorName().equals(other.getOperatorName()))
            && (this.getOrignalStatus() == null ? other.getOrignalStatus() == null : this.getOrignalStatus().equals(other.getOrignalStatus()))
            && (this.getSubmiteStatus() == null ? other.getSubmiteStatus() == null : this.getSubmiteStatus().equals(other.getSubmiteStatus()))
            && (this.getAuditCommit() == null ? other.getAuditCommit() == null : this.getAuditCommit().equals(other.getAuditCommit()))
            && (this.getSingnature() == null ? other.getSingnature() == null : this.getSingnature().equals(other.getSingnature()))
            && (this.getReview() == null ? other.getReview() == null : this.getReview().equals(other.getReview()))
            && (this.getSignatureUrl() == null ? other.getSignatureUrl() == null : this.getSignatureUrl().equals(other.getSignatureUrl()))
            && (this.getAddTime() == null ? other.getAddTime() == null : this.getAddTime().equals(other.getAddTime()))
            && (this.getUpdateTime() == null ? other.getUpdateTime() == null : this.getUpdateTime().equals(other.getUpdateTime()))
            && (this.getDeleted() == null ? other.getDeleted() == null : this.getDeleted().equals(other.getDeleted()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table litemall_audit
     *
     * @mbg.generated
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getApplicantId() == null) ? 0 : getApplicantId().hashCode());
        result = prime * result + ((getOperatorId() == null) ? 0 : getOperatorId().hashCode());
        result = prime * result + ((getOperatorName() == null) ? 0 : getOperatorName().hashCode());
        result = prime * result + ((getOrignalStatus() == null) ? 0 : getOrignalStatus().hashCode());
        result = prime * result + ((getSubmiteStatus() == null) ? 0 : getSubmiteStatus().hashCode());
        result = prime * result + ((getAuditCommit() == null) ? 0 : getAuditCommit().hashCode());
        result = prime * result + ((getSingnature() == null) ? 0 : getSingnature().hashCode());
        result = prime * result + ((getReview() == null) ? 0 : getReview().hashCode());
        result = prime * result + ((getSignatureUrl() == null) ? 0 : getSignatureUrl().hashCode());
        result = prime * result + ((getAddTime() == null) ? 0 : getAddTime().hashCode());
        result = prime * result + ((getUpdateTime() == null) ? 0 : getUpdateTime().hashCode());
        result = prime * result + ((getDeleted() == null) ? 0 : getDeleted().hashCode());
        return result;
    }

    /**
     * This enum was generated by MyBatis Generator.
     * This enum corresponds to the database table litemall_audit
     *
     * @mbg.generated
     */
    public enum Deleted {
        NOT_DELETED(new Boolean("0"), "未删除"),
        IS_DELETED(new Boolean("1"), "已删除");

        /**
         * This field was generated by MyBatis Generator.
         * This field corresponds to the database table litemall_audit
         *
         * @mbg.generated
         */
        private final Boolean value;

        /**
         * This field was generated by MyBatis Generator.
         * This field corresponds to the database table litemall_audit
         *
         * @mbg.generated
         */
        private final String name;

        /**
         * This method was generated by MyBatis Generator.
         * This method corresponds to the database table litemall_audit
         *
         * @mbg.generated
         */
        Deleted(Boolean value, String name) {
            this.value = value;
            this.name = name;
        }

        /**
         * This method was generated by MyBatis Generator.
         * This method corresponds to the database table litemall_audit
         *
         * @mbg.generated
         */
        public Boolean getValue() {
            return this.value;
        }

        /**
         * This method was generated by MyBatis Generator.
         * This method corresponds to the database table litemall_audit
         *
         * @mbg.generated
         */
        public Boolean value() {
            return this.value;
        }

        /**
         * This method was generated by MyBatis Generator.
         * This method corresponds to the database table litemall_audit
         *
         * @mbg.generated
         */
        public String getName() {
            return this.name;
        }
    }

    /**
     * This enum was generated by MyBatis Generator.
     * This enum corresponds to the database table litemall_audit
     *
     * @mbg.generated
     */
    public enum Column {
        id("id", "id", "INTEGER", false),
        applicantId("applicant_id", "applicantId", "INTEGER", false),
        operatorId("operator_id", "operatorId", "INTEGER", false),
        operatorName("operator_name", "operatorName", "VARCHAR", false),
        orignalStatus("orignal_status", "orignalStatus", "INTEGER", false),
        submiteStatus("submite_status", "submiteStatus", "INTEGER", false),
        auditCommit("audit_commit", "auditCommit", "VARCHAR", false),
        singnature("singnature", "singnature", "VARCHAR", false),
        review("review", "review", "BIT", false),
        signatureUrl("signature_url", "signatureUrl", "VARCHAR", false),
        addTime("add_time", "addTime", "TIMESTAMP", false),
        updateTime("update_time", "updateTime", "TIMESTAMP", false),
        deleted("deleted", "deleted", "BIT", false);

        /**
         * This field was generated by MyBatis Generator.
         * This field corresponds to the database table litemall_audit
         *
         * @mbg.generated
         */
        private static final String BEGINNING_DELIMITER = "`";

        /**
         * This field was generated by MyBatis Generator.
         * This field corresponds to the database table litemall_audit
         *
         * @mbg.generated
         */
        private static final String ENDING_DELIMITER = "`";

        /**
         * This field was generated by MyBatis Generator.
         * This field corresponds to the database table litemall_audit
         *
         * @mbg.generated
         */
        private final String column;

        /**
         * This field was generated by MyBatis Generator.
         * This field corresponds to the database table litemall_audit
         *
         * @mbg.generated
         */
        private final boolean isColumnNameDelimited;

        /**
         * This field was generated by MyBatis Generator.
         * This field corresponds to the database table litemall_audit
         *
         * @mbg.generated
         */
        private final String javaProperty;

        /**
         * This field was generated by MyBatis Generator.
         * This field corresponds to the database table litemall_audit
         *
         * @mbg.generated
         */
        private final String jdbcType;

        /**
         * This method was generated by MyBatis Generator.
         * This method corresponds to the database table litemall_audit
         *
         * @mbg.generated
         */
        public String value() {
            return this.column;
        }

        /**
         * This method was generated by MyBatis Generator.
         * This method corresponds to the database table litemall_audit
         *
         * @mbg.generated
         */
        public String getValue() {
            return this.column;
        }

        /**
         * This method was generated by MyBatis Generator.
         * This method corresponds to the database table litemall_audit
         *
         * @mbg.generated
         */
        public String getJavaProperty() {
            return this.javaProperty;
        }

        /**
         * This method was generated by MyBatis Generator.
         * This method corresponds to the database table litemall_audit
         *
         * @mbg.generated
         */
        public String getJdbcType() {
            return this.jdbcType;
        }

        /**
         * This method was generated by MyBatis Generator.
         * This method corresponds to the database table litemall_audit
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
         * This method corresponds to the database table litemall_audit
         *
         * @mbg.generated
         */
        public String desc() {
            return this.getEscapedColumnName() + " DESC";
        }

        /**
         * This method was generated by MyBatis Generator.
         * This method corresponds to the database table litemall_audit
         *
         * @mbg.generated
         */
        public String asc() {
            return this.getEscapedColumnName() + " ASC";
        }

        /**
         * This method was generated by MyBatis Generator.
         * This method corresponds to the database table litemall_audit
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
         * This method corresponds to the database table litemall_audit
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
         * This method corresponds to the database table litemall_audit
         *
         * @mbg.generated
         */
        public String getAliasedEscapedColumnName() {
            return this.getEscapedColumnName();
        }
    }
}