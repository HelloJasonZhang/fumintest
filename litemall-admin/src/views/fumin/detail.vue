/* eslint-disable vue/html-indent */
/* eslint-disable no-trailing-spaces */
<template>
  <div class="app-container">
    <el-card class="box-card">
      <h3>申请人信息</h3>
      <el-form ref="goods" :model="goods" label-width="180px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请人（法人）姓名" prop="name">
              <el-input v-model="goods.name" :readonly="goodsReadyOnly" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别" prop="sex">
              <el-input v-model="goods.sex" :readonly="goodsReadyOnly" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="婚姻状况" prop="maritalStatus">
              <el-input v-model="goods.maritalStatus" :readonly="goodsReadyOnly" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="身份证号" prop="idCardNumber">
              <el-input v-model="goods.idCardNumber" :readonly="goodsReadyOnly" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系方式" prop="phoneNumber">
              <el-input v-model="goods.phoneNumber" :readonly="goodsReadyOnly" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="配偶身份证号" prop="spouseIdCardNumber">
              <el-input v-model="goods.spouseIdCardNumber" :readonly="goodsReadyOnly" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="配偶姓名" prop="spouseName">
              <el-input v-model="goods.spouseName" :readonly="goodsReadyOnly" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请类别" prop="applicantType">
              <el-input v-model="goods.applicantType" :readonly="goodsReadyOnly" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请额度" prop="applicantAmount">
              <el-input v-model="goods.applicantAmount" placeholder="0.00" :readonly="goodsReadyOnly" />
              <template slot="append">万元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请人（法人）类别" prop="applicantType">
              <el-input v-model="goods.applicantCategory" :readonly="goodsReadyOnly" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="新招/雇佣人类别" prop="applicantType">
              <el-input v-model="goods.recruitCategory" :readonly="goodsReadyOnly" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="申请主体现住址" prop="address">
          <el-input v-model="goods.address" :readonly="goodsReadyOnly" />
        </el-form-item>

        <el-row v-if="goods.applicantType != '企业'">
          <el-col :span="24"><h3>人社审核资料</h3></el-col>
          <el-col :span="6">
            <el-form-item label="营业执照正面" prop="businessLicenseUrl">
              <el-image v-if="goods.businessLicenseUrl" style="width:50px;height:50px;" :src="goods.businessLicenseUrl" :preview-src-list="[goods.businessLicenseUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="工资单" prop="salaryDetailUrl">
              <el-image v-if="goods.salaryDetailUrl" style="width:50px;height:50px;" :src="goods.salaryDetailUrl" :preview-src-list="[goods.salaryDetailUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="身份证正面" prop="idCardUrl">
              <el-image v-if="goods.idCardUrl" style="width:50px;height:50px;" :src="goods.idCardUrl" :preview-src-list="[goods.idCardUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="身份证反面" prop="idCardUrl2">
              <el-image v-if="goods.idCardUrl2" style="width:50px;height:50px;" :src="goods.idCardUrl2" :preview-src-list="[goods.idCardUrl2]" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="goods.applicantType != '企业'">
          <el-col :span="6">
            <el-form-item label="承诺书" prop="address">
              <el-image v-if="goods.undertakingUrl" style="width:50px;height:50px;" :src="goods.undertakingUrl" :preview-src-list="[goods.undertakingUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="电子签名" prop="address">
              <el-image v-if="goods.signatureUrl" style="width:50px;height:50px;" :src="goods.signatureUrl" :preview-src-list="[goods.signatureUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="就业创业证2" prop="jobUrl">
              <el-image v-if="goods.idCardUrl" style="width:50px;height:50px;" :src="goods.jobUrl" :preview-src-list="[goods.jobUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="就业创业证3" prop="jobUrl2">
              <el-image v-if="goods.idCardUrl2" style="width:50px;height:50px;" :src="goods.jobUrl2" :preview-src-list="[goods.jobUrl2]" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="goods.applicantType != '企业'">
          <el-col :span="6">
            <el-form-item label="配偶身份证正面" prop="addrespouseIdCardUrl">
              <el-image v-if="goods.spouseIdCardUrl" style="width:50px;height:50px;" :src="goods.spouseIdCardUrl" :preview-src-list="[goods.spouseIdCardUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="配偶身份证反面" prop="address">
              <el-image v-if="goods.spouseIdCardUrl2" style="width:50px;height:50px;" :src="goods.spouseIdCardUrl2" :preview-src-list="[goods.spouseIdCardUrl2]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结婚照/离婚征首页" prop="address">
              <el-image v-if="goods.marriageCertificateUrl" style="width:50px;height:50px;" :src="goods.marriageCertificateUrl" :preview-src-list="[goods.marriageCertificateUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结婚照/离婚征本人页" prop="address">
              <el-image v-if="goods.marriageCertificateUrl2" style="width:50px;height:50px;" :src="goods.marriageCertificateUrl2" :preview-src-list="[goods.marriageCertificateUrl2]" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="goods.applicantType != '企业'">
          <el-col :span="6">
            <el-form-item label="户口本首页" prop="address">
              <el-image v-if="goods.residenceBookletUrl" style="width:50px;height:50px;" :src="goods.residenceBookletUrl" :preview-src-list="[goods.residenceBookletUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="户口本本人页" prop="address">
              <el-image v-if="goods.residenceBookletUrl2" style="width:50px;height:50px;" :src="goods.residenceBookletUrl2" :preview-src-list="[goods.residenceBookletUrl2]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="信用报告" prop="address">
              <el-image v-if="goods.creditReportUrl" style="width:50px;height:50px;" :src="goods.creditReportUrl" :preview-src-list="[goods.creditReportUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="配偶信用报告" prop="address">
              <el-image v-if="goods.spouseCreditReportUrl" style="width:50px;height:50px;" :src="goods.spouseCreditReportUrl" :preview-src-list="[goods.spouseCreditReportUrl]" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row />

        <el-row v-if="goods.applicantType != '企业'">
          <el-col :span="24"><h3>担保审核资料</h3></el-col>
          <el-col :span="6">
            <el-form-item label="租赁合同" prop="address">
              <el-image v-if="goods.leaseContractUrl" style="width:50px;height:50px;" :src="goods.leaseContractUrl" :preview-src-list="[goods.leaseContractUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="产权证" prop="address">
              <el-image v-if="goods.propertyCertificateUrl" style="width:50px;height:50px;" :src="goods.propertyCertificateUrl" :preview-src-list="[goods.propertyCertificateUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="抵押信息" prop="address">
              <el-image v-if="goods.mortgageUrl" style="width:50px;height:50px;" :src="goods.mortgageUrl" :preview-src-list="[goods.mortgageUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="共同担保声明" prop="address">
              <el-image v-if="goods.guaranteeStatementUrl" style="width:50px;height:50px;" :src="goods.guaranteeStatementUrl" :preview-src-list="[goods.guaranteeStatementUrl]" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="goods.applicantType != '企业'">
          <el-col :span="6">
            <el-form-item label="个人资产证明" prop="address">
              <el-image v-if="goods.assetUrl" style="width:50px;height:50px;" :src="goods.assetUrl" :preview-src-list="[goods.assetUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="反担保人身份证正面" prop="address">
              <el-image v-if="goods.suretyIdCardUrl" style="width:50px;height:50px;" :src="goods.suretyIdCardUrl" :preview-src-list="[goods.suretyIdCardUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="反担保人身份证反面" prop="address">
              <el-image v-if="goods.suretyIdCardUrl2" style="width:50px;height:50px;" :src="goods.suretyIdCardUrl2" :preview-src-list="[goods.suretyIdCardUrl2]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="其他图片" prop="address">
              <el-image v-if="goods.extraUrl" style="width:50px;height:50px;" :src="goods.extraUrl" :preview-src-list="[goods.extraUrl]" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="goods.applicantType == '企业'">
          <el-col :span="24"><h3>人社审核资料</h3></el-col>
          <el-col :span="6">
            <el-form-item label="营业执照正面" prop="businessLicenseUrl">
              <el-image v-if="goods.businessLicenseUrl" style="width:50px;height:50px;" :src="goods.businessLicenseUrl" :preview-src-list="[goods.businessLicenseUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="身份证正面" prop="idCardUrl">
              <el-image v-if="goods.idCardUrl" style="width:50px;height:50px;" :src="goods.idCardUrl" :preview-src-list="[goods.idCardUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="身份证反面" prop="idCardUrl2">
              <el-image v-if="goods.idCardUrl2" style="width:50px;height:50px;" :src="goods.idCardUrl2" :preview-src-list="[goods.idCardUrl2]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="法人征信查询记录" prop="creditReportUrl">
              <el-image v-if="goods.creditReportUrl" style="width:50px;height:50px;" :src="goods.creditReportUrl" :preview-src-list="[goods.creditReportUrl]" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="goods.applicantType == '企业'">
          <el-col :span="6">
            <el-form-item label="承诺书" prop="address">
              <el-image v-if="goods.undertakingUrl" style="width:50px;height:50px;" :src="goods.undertakingUrl" :preview-src-list="[goods.undertakingUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="电子签名" prop="address">
              <el-image v-if="goods.signatureUrl" style="width:50px;height:50px;" :src="goods.signatureUrl" :preview-src-list="[goods.signatureUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="户口本首页" prop="address">
              <el-image v-if="goods.residenceBookletUrl" style="width:50px;height:50px;" :src="goods.residenceBookletUrl" :preview-src-list="[goods.residenceBookletUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="户口本本人页" prop="address">
              <el-image v-if="goods.residenceBookletUrl2" style="width:50px;height:50px;" :src="goods.residenceBookletUrl2" :preview-src-list="[goods.residenceBookletUrl2]" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="goods.applicantType == '企业'">
          <el-col :span="6">
            <el-form-item label="配偶身份证正面" prop="addrespouseIdCardUrl">
              <el-image v-if="goods.spouseIdCardUrl" style="width:50px;height:50px;" :src="goods.spouseIdCardUrl" :preview-src-list="[goods.spouseIdCardUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="配偶身份证反面" prop="address">
              <el-image v-if="goods.spouseIdCardUrl2" style="width:50px;height:50px;" :src="goods.spouseIdCardUrl2" :preview-src-list="[goods.spouseIdCardUrl2]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结婚照/离婚征首页" prop="address">
              <el-image v-if="goods.marriageCertificateUrl" style="width:50px;height:50px;" :src="goods.marriageCertificateUrl" :preview-src-list="[goods.marriageCertificateUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结婚照/离婚征本人页" prop="address">
              <el-image v-if="goods.marriageCertificateUrl2" style="width:50px;height:50px;" :src="goods.marriageCertificateUrl2" :preview-src-list="[goods.marriageCertificateUrl2]" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="goods.applicantType == '企业'">
          <el-col :span="6">
            <el-form-item label="带动就业人员信息" prop="employmentPromotionUrl">
              <el-image v-if="goods.employmentPromotionUrl" style="width:50px;height:50px;" :src="goods.employmentPromotionUrl" :preview-src-list="[goods.employmentPromotionUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="当年纳税申报及上年纳税收据" prop="address">
              <el-image v-if="goods.payTaxesUrl" style="width:50px;height:50px;" :src="goods.payTaxesUrl" :preview-src-list="[goods.payTaxesUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="其他补充图片" prop="address">
              <el-image v-if="goods.extraUrl" style="width:50px;height:50px;" :src="goods.extraUrl" :preview-src-list="[goods.extraUrl]" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row />
        <el-input v-model="rensheForm.hsAuditDate" type="hidden" />
        <el-input v-model="rensheForm.hsOperator" type="hidden" />
      </el-form>
    </el-card>
    <el-card v-if="isRenSheHidden" class="box-card">
      <h3>人社核查信息情况</h3>
      <el-form
        ref="rensheForm"
        :model="rensheForm"
        :rules="rensheRulrs"
        :disabled="disableRenSheHidden"
        label-position="right"
        label-width="200px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="营业执照类型" prop="hsBusinessLicenseType">
              <el-input v-model="rensheForm.hsBusinessLicenseType" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法定代表人/申请人" prop="hsApplicant">
              <el-input v-model="rensheForm.hsApplicant" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="统一社会信用代码" prop="hsUnifiedSocialCreditCode">
              <el-input v-model="rensheForm.hsUnifiedSocialCreditCode" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="身份证地址" prop="hsApplicantAdress">
              <el-input v-model="rensheForm.hsApplicantAdress" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="其他/备注" prop="hsMark">
              <el-input v-model="rensheForm.hsMark" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="注册日期" prop="hsRigsterDate">
              <el-date-picker
                v-model="rensheForm.hsRigsterDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions"
                style="width:100%"
              />
              <!-- <el-input v-model="rensheForm.hsRigsterDate" /> -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="就业创业证编号（申请主体）" prop="hsEmploymentBusinessLicenseNo">
              <el-input v-model="rensheForm.hsEmploymentBusinessLicenseNo" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="带动就业人员信息" prop="hsEmployeesInfo">
              <el-input v-model="rensheForm.hsEmployeesInfo" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="在职人数" prop="hsActiveEmployees">
              <el-input v-model="rensheForm.hsActiveEmployees" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="当年新招人数" prop="hsRecruitPeople">
              <el-input v-model="rensheForm.hsRecruitPeople" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="新招用员工占比" prop="hsRecuitRate">
              <el-input v-model="rensheForm.hsRecuitRate" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item v-if="rensheForm.hsExtraPicUrl.length > 0" label="补充资料">
              <el-image v-for="picUrl in rensheForm.hsExtraPicUrl" :key="picUrl" style="width:50px;height:50px; margin: 0px 10px" :src="picUrl" :preview-src-list="[picUrl]" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="人社部门意见" prop="hsComment">
          <el-input v-model="rensheForm.hsComment" type="textarea" :rows="7" />
        </el-form-item>
        <el-row v-if="disableRenSheHidden">
          <el-col :span="8">
            <el-form-item label="是否审核通过" prop="submitStatus">
              <el-select v-model="rensheForm.status" prop="submitStatus" style="width:100%">
                <el-option :value="4" label="通过" />
                <el-option :value="3" label="不通过" />
                <el-option :value="2" label="待补充" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经办日期" prop="hsRecruitPeople">
              <el-date-picker
                v-model="rensheForm.hsAuditDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions"
                style="width:100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经办人" prop="hsRecuitRate">
              <el-input v-model="rensheForm.hsOperator" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

    </el-card>
    <el-card v-if="isAssureHidden" class="box-card">
      <h3>担保公司核查信息情况</h3>
      <el-form
        ref="assureForm"
        :rules="assureRulrs"
        :model="assureForm"
        :disabled="disableAssureHidden"
        label-position="right"
        label-width="200px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="营业地址" prop="scBusinessAddress">
              <el-input v-model="assureForm.scBusinessAddress" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产权性质" prop="scPropertyRight">
              <el-input v-model="assureForm.scPropertyRight" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请人信用报告" prop="scApplicantCreditReport">
              <el-input v-model="assureForm.scApplicantCreditReport" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="配偶信用报告" prop="scSpouseCreditReport">
              <el-input v-model="assureForm.scSpouseCreditReport" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="担保人姓名" prop="scGuarantor">
              <el-input v-model="assureForm.scGuarantor" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="担保人抵押资产情况" prop="scGuarantorAsset">
              <el-input v-model="assureForm.scGuarantorAsset" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="其他补充情况" prop="scExtraInfo">
          <el-input v-model="assureForm.scExtraInfo" />
        </el-form-item>
        <el-form-item label="市人社部门意见" prop="scComment">
          <el-input v-model="assureForm.scComment" type="textarea" :rows="7" />
        </el-form-item>
        <el-form-item v-if="!disableAssureHidden" label="担保意向书" label-width="200px">
          <el-upload
            :action="uploadPath"
            :show-file-list="false"
            :headers="headers"
            :on-success="uploadPicUrl"
            class="avatar-uploader"
            accept=".jpg,.jpeg,.png,.gif"
          >
            <img v-if="assureForm.scLetterIntentUrl" :src="assureForm.scLetterIntentUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item v-if="disableAssureHidden" label="担保意向书" prop="address">
          <el-image v-if="assureForm.scLetterIntentUrl" style="width:50px;height:50px;" :src="assureForm.scLetterIntentUrl" :preview-src-list="[assureForm.scLetterIntentUrl]" />
        </el-form-item>
        <el-row v-if="disableAssureHidden">
          <el-col :span="24">
            <el-form-item v-if="assureForm.scExtraPicUrl.length > 0" label="补充资料">
              <el-image v-for="picUrl in assureForm.scExtraPicUrl" :key="picUrl" style="width:50px;height:50px; margin: 0px 10px" :src="picUrl" :preview-src-list="[picUrl]" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="disableAssureHidden">
          <el-col :span="8">
            <el-form-item label="是否审核通过" prop="submitStatus">
              <el-select v-model="assureForm.status" prop="submitStatus" style="width:100%">
                <el-option :value="7" label="通过" />
                <el-option :value="6" label="不通过" />
                <el-option :value="5" label="待补充" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经办日期" prop="hsRecruitPeople">
              <el-date-picker
                v-model="rensheForm.hsAuditDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions"
                style="width:100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经办人" prop="hsRecuitRate">
              <el-input v-model="rensheForm.scOperator" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item v-if="!disableAssureHidden" label="是否审核通过" prop="submitStatus">
          <el-select v-model="assureForm.status" prop="submitStatus" style="width:25%">
            <el-option :value="7" label="通过" />
            <el-option :value="6" label="不通过" />
            <el-option :value="5" label="待补充" />
          </el-select>
        </el-form-item>
        <el-input v-model="assureForm.scOperator" type="hidden" />
      </el-form>
      <div v-if="!disableAssureHidden" class="op-container">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleEdit">提交</el-button>
      </div>
    </el-card>

    <el-card v-if="isBankHidden" class="box-card">
      <h3>银行受理信息情况</h3>
      <el-form
        ref="bankForm"
        :rules="bankRules"
        :model="bankForm"
        :disabled="disableBankHidden"
        label-position="right"
        label-width="200px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="受理银行" prop="bName">
              <el-input v-model="bName" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="支行" prop="bSubBranch">
              <el-input v-model="bSubBranch" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经办人" prop="bOpertator">
              <el-input v-model="bankForm.bOpertator" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="授信额度" prop="bCredit">
              <el-input v-model="bankForm.bCredit" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="放贷日期" prop="bLendingDate">
              <el-date-picker
                v-model="rensheForm.bLendingDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions"
                style="width:100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="贷款期限" prop="bPeriodLoan">
              <el-input v-model="bankForm.bPeriodLoan" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="还款方式" prop="bRepayment">
              <el-input v-model="bankForm.bRepayment" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="利率" prop="bInterestRate">
              <el-input v-model="bankForm.bInterestRate" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="利息/期" prop="bInterestPeriod">
              <el-input v-model="bankForm.bInterestPeriod" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="银行受理情况" prop="bComment">
          <el-input v-model="bankForm.bComment" type="textarea" :rows="7" />
        </el-form-item>
        <el-col :span="8">
          <el-form-item label="是否审核通过" prop="submitStatus">
            <el-select v-model="bankForm.status" prop="submitStatus" style="width:100%">
              <el-option :value="10" label="通过" />
              <el-option :value="9" label="通过" />
              <el-option :value="8" label="不通过" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经办日期" prop="scAuditDate">
            <el-date-picker
              v-model="bankForm.scAuditDate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions"
              style="width:100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经办人" prop="scOperator">
            <el-input v-model="bankForm.scOperator" />
          </el-form-item>
        </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<style>
  .el-card {
    margin-bottom: 10px;
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .input-new-keyword {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .avatar-uploader .el-upload {
    width: 145px;
    height: 145px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

  .avatar {
    width: 145px;
    height: 145px;
    display: block;
  }
  .img-size {
    width: 145px;
    height: 145px;
  }
</style>

<script>
import { readApplicant, updateApplicant, readBank } from '@/api/applicant'
import { createStorage, uploadPath } from '@/api/storage'
import store from '@/store'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'

export default {
  name: 'GoodsCreate',
  components: { },
  data() {
    return {
      uploadPath,
      applicant: {},
      goodsReadyOnly: true,
      isRenSheHidden: false,
      isBankHidden: false,
      isAssureHidden: false,
      disableRenSheHidden: false,
      disableAssureHidden: false,
      disableBankHidden: false,
      goods: { picUrl: '' },
      bName: '',
      bSubBranch: '',
      specForm: { specification: '', value: '', picUrl: '' },
      rensheForm: { hsRigsterDate: undefined },
      assureForm: { scLetterIntentUrl: '', value: '', picUrl: '' },
      bankForm: { },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      rensheRulrs: {
        hsBusinessLicenseType: [{ required: true, message: '此字段不能为空', trigger: 'blur' }],
        hsApplicant: [{ required: true, message: '此字段不能为空', trigger: 'blur' }],
        hsUnifiedSocialCreditCode: [{ required: true, message: '此字段不能为空', trigger: 'blur' }],
        hsApplicantAdress: [{ required: true, message: '此字段不能为空', trigger: 'blur' }],
        hsRigsterDate: [{ required: true, message: '此字段不能为空', trigger: 'blur' }],
        submitStatus: [{ required: true, message: '此字段不能为空', trigger: 'change' }]
      },
      assureRulrs: {
        scBusinessAddress: [{ required: true, message: '此字段不能为空', trigger: 'blur' }],
        scPropertyRight: [{ required: true, message: '此字段不能为空', trigger: 'blur' }],
        scApplicantCreditReport: [{ required: true, message: '此字段不能为空', trigger: 'blur' }],
        scSpouseCreditReport: [{ required: true, message: '此字段不能为空', trigger: 'blur' }],
        hsApplicantAdress: [{ required: true, message: '此字段不能为空', trigger: 'blur' }],
        submitStatus: [{ required: true, message: '此字段不能为空', trigger: 'change' }]
      },
      bankRules: {
        bName: [{ required: true, message: '此字段不能为空', trigger: 'blur' }],
        bSubBranch: [{ required: true, message: '此字段不能为空', trigger: 'blur' }],
        submitStatus: [{ required: true, message: '此字段不能为空', trigger: 'change' }]
      }
    }
  },
  computed: {
    headers() {
      return {
        'X-Litemall-Admin-Token': getToken()
      }
    }
  },
  created() {
    this.init()
  },

  methods: {
    init: function() {
      if (this.$route.query.id == null) {
        return
      }
      if (this.$route.query.action == null) {
        return
      }

      const goAction = this.$route.query.action
      const goodsId = this.$route.query.id

      readApplicant({ id: goodsId }).then(response => {
        this.goods = response.data.data

        if (parseInt(goAction) === 1) {
          this.isRenSheHidden = false
          this.isAssureHidden = false
          this.isBankHidden = false
          this.rensheForm = response.data.data
        } else if (parseInt(goAction) === 2 || parseInt(goAction) === 3 || parseInt(goAction) === 4) {
          this.isRenSheHidden = true
          this.disableRenSheHidden = true
          this.isAssureHidden = false
          this.isBankHidden = false
          this.rensheForm = response.data.data
          this.rensheForm.status = 4
          this.extend(this.rensheForm, response.data.data)
        } else if (parseInt(goAction) === 4 || parseInt(goAction) === 5 || parseInt(goAction) === 6) {
          this.isRenSheHidden = true
          this.disableRenSheHidden = true
          this.isAssureHidden = true
          this.disableAssureHidden = true
          this.isBankHidden = false
          this.extend(this.rensheForm, response.data.data)
          this.rensheForm.status = 4
          this.extend(this.assureForm, response.data.data)
          this.assureForm.status = parseInt(goAction)
        } else if (parseInt(goAction) === 7 || parseInt(goAction) === 8 || parseInt(goAction) === 9 || parseInt(goAction) === 10) {
          this.isRenSheHidden = true
          this.disableRenSheHidden = true
          this.isAssureHidden = true
          this.disableAssureHidden = true
          this.isBankHidden = true
          this.disableBankHidden = true
          this.extend(this.rensheForm, response.data.data)
          this.rensheForm.status = 4
          this.extend(this.assureForm, response.data.data)
          this.assureForm.status = 7
          if (response.data.data.bBankId) {
            readBank({ bankId: response.data.data.bBankId }).then(bankRes => {
              this.bName = bankRes.data.data.name
              this.bSubBranch = bankRes.data.data.subBranch
            })
          }
          this.bankForm.status = parseInt(goAction)
          this.extend(this.bankForm, response.data.data)
        }
      })
    },
    handleCancel: function() {
      this.$router.go(-1)
    },
    extend: function() {
      var length = arguments.length
      var target = arguments[0] || {}
      if (typeof target !== 'object' && typeof target !== 'function') {
        target = {}
      }
      var i = 1
      if (length === 1) {
        target = this
        i--
      }
      for (i; i < length; i++) {
        var source = arguments[i]
        for (var key in source) {
          // 使用for in会遍历数组所有的可枚举属性，包括原型。
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key]
          }
        }
      }
      return target
    }
  }
}
</script>
