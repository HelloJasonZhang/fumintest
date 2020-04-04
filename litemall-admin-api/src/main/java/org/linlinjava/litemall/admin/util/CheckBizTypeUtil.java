package org.linlinjava.litemall.admin.util;

public class CheckBizTypeUtil {
    public static Boolean hasPermission(Integer[] roleIds, Integer[] bizTyes, String applicantType) {
        Boolean hasPermit = false;
        if (roleIds.length == 1 && roleIds[0] == 1) {
            hasPermit = true;
        } else {
            for (Integer type : bizTyes) {
                if (type == 0 && applicantType.equals("personal")) {
                    hasPermit = true;
                } else if (type == 1 && applicantType.equals("company")) {
                    hasPermit = true;
                }
            }
        }
        return hasPermit;
    }
}
