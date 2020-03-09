package org.linlinjava.litemall.wx.vo;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class BankAuditVo {
    private Integer id;
    private String name;
    private String subBranch;
    private String interest;
    private String bankAmount;
    private String hsTopAmount;
    private Integer status;
    private String comment;

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    private String icon;
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSubBranch() {
        return subBranch;
    }

    public void setSubBranch(String subBranch) {
        this.subBranch = subBranch;
    }

    public String getInterest() {
        return interest;
    }

    public void setInterest(String interest) {
        this.interest = interest;
    }

    public String getBankAmount() {
        return bankAmount;
    }

    public void setBankAmount(String bankAmount) {
        this.bankAmount = bankAmount;
    }

    public String getHsTopAmount() {
        return hsTopAmount;
    }

    public void setHsTopAmount(String hsTopAmount) {
        this.hsTopAmount = hsTopAmount;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
