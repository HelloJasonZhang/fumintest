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
          <el-col :span="8">
            <el-form-item label="申请类别" prop="applicantTypeLable">
              <el-input v-model="goods.applicantTypeLable" :readonly="goodsReadyOnly" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请额度" prop="applicantAmount">
              <el-input v-model="goods.applicantAmount" placeholder="0.00" :readonly="goodsReadyOnly">
                <template slot="append">万元</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="获取途径" prop="obtainInfo">
              <el-input v-model="goods.obtainInfo" :readonly="goodsReadyOnly" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="企业名称" prop="applicantTypeLable">
              <el-input v-model="goods.companyName" :readonly="goodsReadyOnly" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请银行" prop="applicantAmount">
              <el-input v-model="goods.bankName" placeholder="0.00" :readonly="goodsReadyOnly" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="goods.applicantType == 'company'">
          <el-col :span="6">
            <el-form-item label="营业执照正面" prop="businessLicenseUrl">
              <el-image v-if="goods.businessLicenseUrl" style="width:50px;height:50px;" :src="goods.businessLicenseUrl" :preview-src-list="[goods.businessLicenseUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="创业就业证照片页" prop="jobUrl">
              <el-image v-if="goods.jobUrl" style="width:50px;height:50px;" :src="goods.jobUrl" :preview-src-list="[goods.jobUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="申请人身份证正面" prop="idCardUrl">
              <el-image v-if="goods.idCardUrl" style="width:50px;height:50px;" :src="goods.idCardUrl" :preview-src-list="[goods.idCardUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="申请人身份证反面" prop="idCardUrl2">
              <el-image v-if="goods.idCardUrl2" style="width:50px;height:50px;" :src="goods.idCardUrl2" :preview-src-list="[goods.idCardUrl2]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="在职职工花名册" prop="employmentPromotionUrl">
              <el-image v-if="goods.employmentPromotionUrl" style="width:50px;height:50px;" :src="goods.employmentPromotionUrl" :preview-src-list="[goods.employmentPromotionUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="电子签名" prop="signatureUrl">
              <el-image v-if="goods.signatureUrl" style="width:50px;height:50px;" :src="goods.signatureUrl" :preview-src-list="[goods.signatureUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="其他补充图片" prop="extraUrl">
              <el-image v-if="goods.extraUrl" style="width:50px;height:50px;" :src="goods.extraUrl" :preview-src-list="[goods.extraUrl]" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="goods.applicantType == 'personal' && goods.applicantAmount < 15">
          <el-col :span="6">
            <el-form-item label="营业执照正面" prop="businessLicenseUrl">
              <el-image v-if="goods.businessLicenseUrl" style="width:50px;height:50px;" :src="goods.businessLicenseUrl" :preview-src-list="[goods.businessLicenseUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="创业就业证照片页" prop="jobUrl">
              <el-image v-if="goods.jobUrl" style="width:50px;height:50px;" :src="goods.jobUrl" :preview-src-list="[goods.jobUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="申请人身份证正面" prop="idCardUrl">
              <el-image v-if="goods.idCardUrl" style="width:50px;height:50px;" :src="goods.idCardUrl" :preview-src-list="[goods.idCardUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="申请人身份证反面" prop="idCardUrl2">
              <el-image v-if="goods.idCardUrl2" style="width:50px;height:50px;" :src="goods.idCardUrl2" :preview-src-list="[goods.idCardUrl2]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="电子签名" prop="signatureUrl">
              <el-image v-if="goods.signatureUrl" style="width:50px;height:50px;" :src="goods.signatureUrl" :preview-src-list="[goods.signatureUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="其他补充图片" prop="extraUrl">
              <el-image v-if="goods.extraUrl" style="width:50px;height:50px;" :src="goods.extraUrl" :preview-src-list="[goods.extraUrl]" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="goods.applicantType == 'personal' && goods.applicantAmount >= 15">
          <el-col :span="6">
            <el-form-item label="营业执照正面" prop="businessLicenseUrl">
              <el-image v-if="goods.businessLicenseUrl" style="width:50px;height:50px;" :src="goods.businessLicenseUrl" :preview-src-list="[goods.businessLicenseUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="创业就业证照片页" prop="jobUrl">
              <el-image v-if="goods.jobUrl" style="width:50px;height:50px;" :src="goods.jobUrl" :preview-src-list="[goods.jobUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="申请人身份证正面" prop="idCardUrl">
              <el-image v-if="goods.idCardUrl" style="width:50px;height:50px;" :src="goods.idCardUrl" :preview-src-list="[goods.idCardUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="申请人身份证反面" prop="idCardUrl2">
              <el-image v-if="goods.idCardUrl2" style="width:50px;height:50px;" :src="goods.idCardUrl2" :preview-src-list="[goods.idCardUrl2]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="带动员工资流水" prop="employmentPromotionUrl">
              <el-image v-if="goods.employmentPromotionUrl" style="width:50px;height:50px;" :src="goods.employmentPromotionUrl" :preview-src-list="[goods.employmentPromotionUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="电子签名" prop="signatureUrl">
              <el-image v-if="goods.signatureUrl" style="width:50px;height:50px;" :src="goods.signatureUrl" :preview-src-list="[goods.signatureUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="其他补充图片" prop="extraUrl">
              <el-image v-if="goods.extraUrl" style="width:50px;height:50px;" :src="goods.extraUrl" :preview-src-list="[goods.extraUrl]" />
            </el-form-item>
          </el-col>
        </el-row>
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
          <el-col :span="8">
            <el-form-item label="贴息类型" prop="hsDiscount">
              <el-select v-model="rensheForm.hsDiscount" style="width:100%">
                <el-option v-for="item in hsDiscountArray" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司所在地" prop="hsApplicantAdress">
              <el-input v-model="rensheForm.hsApplicantAdress" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="最高额度(万元)" prop="hsTopAmount">
              <el-input v-model="rensheForm.hsTopAmount" />
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
            <el-form-item v-if="rensheForm.hsExtraPicUrl" label="补充资料">
              <el-image v-for="picUrl in rensheForm.hsExtraPicUrl" :key="picUrl" style="width:50px;height:50px; margin: 0px 10px" :src="picUrl" :preview-src-list="[picUrl]" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="备注" prop="hsMark">
            <el-input v-model="rensheForm.hsMark" type="textarea" :rows="7" />
          </el-form-item>
        </el-row>
        <el-form-item label="人社部门意见" prop="hsComment">
          <el-input v-model="rensheForm.hsComment" type="textarea" :rows="7" />
        </el-form-item>
        <el-row v-if="disableRenSheHidden">
          <el-col :span="8">
            <el-form-item label="是否审核通过" prop="submitStatus">
              <el-select v-model="rensheForm.status" prop="submitStatus" style="width:100%">
                <el-option :value="5" label="复核通过" />
                <el-option :value="4" label="审核通过" />
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
        <el-form-item v-if="!disableRenSheHidden" label="是否审核通过" prop="submitStatus">
          <el-select v-model="rensheForm.status" style="width:25%">
            <el-option :value="5" label="复核通过" />
            <el-option :value="4" label="审核通过" />
            <el-option :value="3" label="不通过" />
            <el-option :value="2" label="待补充" />
          </el-select>
        </el-form-item>
        <el-input v-if="!disableRenSheHidden" v-model="rensheForm.hsOperator" type="hidden" />
      </el-form>
      <div v-if="!disableRenSheHidden" class="op-container">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleEdit">提交</el-button>
      </div>
      <!--       <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="6">
          <div class="op-container">
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="handleEdit">提交</el-button>
          </div>
        </el-col>
      </el-row> -->
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
            <el-form-item v-if="!disableAssureHidden" label="是否审核通过" prop="status">
              <el-select v-model="assureForm.status" style="width:100%" @change="onChangeAcSubmitstatus">
                <el-option :value="8" label="通过" />
                <el-option :value="7" label="不通过" />
                <el-option :value="6" label="待补充" />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col v-if="assureForm.isApproval" :span="12">
            <el-form-item label="受理银行" prop="bankCascader">
              <div class="block">
                <el-cascader v-model="assureForm.bankCascader" :options="assureForm.cascaderOptions" :props="{ expandTrigger: 'hover' }" style="width:100%" @change="handleCascaderChange" />
              </div>
            </el-form-item>
          </el-col> -->
        </el-row>
        <!-- <el-row v-if="assureForm.isApproval">
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
        </el-row> -->
        <el-form-item label="担保公司核查信息情况" prop="scComment">
          <el-input v-model="assureForm.scComment" type="textarea" :rows="7" />
        </el-form-item>
        <el-row v-if="assureForm.isApproval">
          <el-col :span="4">
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
          </el-col>
          <el-col :span="20">
            <el-form-item label="补充资料">
              <el-upload
                :action="uploadPath"
                :limit="100"
                :file-list="scExtraPicUrlList"
                :headers="headers"
                :on-exceed="uploadOverrun"
                :on-success="handleExtraPicUrl"
                :on-remove="handleRemove"
                multiple
                accept="*"
                list-type="picture-card"
              >
                <i class="el-icon-plus" />
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="电子签名">
              <el-button type="success" style="position: absolute" @click="showQrCode()">生成二维码</el-button>
              <el-image v-if="assureForm.qrCodeSignature != null" style="width:50px;height:50px; margin-left: 150px" :src="assureForm.qrCodeSignature" :preview-src-list="[assureForm.qrCodeSignature]" />
              <el-dialog title="请扫二维码，去小程序签名" :visible.sync="qrCodeDialogVisible" width="15%">
                <el-row type="flex" justify="center">
                  <div id="qrcode" />
                </el-row>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="qrCodeDialogVisible = false">取消</el-button>
                  <el-button type="primary" @click="qrCodeHandle()">确定</el-button>
                </span>
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item v-if="disableAssureHidden" label="担保意向书" prop="address">
          <el-image v-if="assureForm.scLetterIntentUrl" style="width:50px;height:50px;" :src="assureForm.scLetterIntentUrl" :preview-src-list="[assureForm.scLetterIntentUrl]" />
        </el-form-item>
        <el-input v-model="assureForm.scOperator" type="hidden" />
      </el-form>
      <div v-if="!disableAssureHidden" class="op-container">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleEdit">提交</el-button>
      </div>
    </el-card>
    <el-card>
      <h3>审核记录</h3>
      <div class="block">
        <el-row v-for="(item) in auditList" :key="item.id">
          <el-timeline>
            <el-timeline-item :timestamp="item.updateTime" placement="top">
              <el-card>
                <h4>{{ item.auditCommit }}</h4>
                <p>审批人:{{ item.operatorName }}, 审批状态: {{ item.submiteStatus }}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-row>
      </div>
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
import { readApplicant, updateApplicant, updateByBank, listBank } from '@/api/assure'
import { createStorage, uploadPath } from '@/api/storage'
import store from '@/store'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
import { listAudit } from '@/api/audit'
import { readSignature } from '@/api/signature'
import { qrCodeUrl, getAuditByStatus, uuid2, hsDiscountArray } from '@/utils'
import QRCode from 'qrcodejs2'

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
      scExtraPicUrlList: [],
      goods: { picUrl: '' },
      specForm: { specification: '', value: '', picUrl: '' },
      rensheForm: { hsRigsterDate: undefined },
      assureForm: { scLetterIntentUrl: '', value: '', picUrl: '', isApproval: false, scComment: '', scExtraPicUrl: [], bankList: [], cascaderOptions: [], bankCascader: [],
        qrCodeSignature: undefined },
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
        // scBusinessAddress: [{ required: true, message: '此字段不能为空', trigger: 'blur' }],
        // scPropertyRight: [{ required: true, message: '此字段不能为空', trigger: 'blur' }],
        // scApplicantCreditReport: [{ required: true, message: '此字段不能为空', trigger: 'blur' }],
        // scSpouseCreditReport: [{ required: true, message: '此字段不能为空', trigger: 'blur' }],
        // hsApplicantAdress: [{ required: true, message: '此字段不能为空', trigger: 'blur' }],
        submitStatus: [{ required: true, message: '此字段不能为空', trigger: 'change' }],
        // bankCascader: [{ required: true, message: '此字段不能为空', trigger: 'change' }],
        status: [{ required: true, message: '此字段不能为空', trigger: 'change' }]
      },
      bankRules: {
        bName: [{ required: true, message: '此字段不能为空', trigger: 'blur' }],
        bSubBranch: [{ required: true, message: '此字段不能为空', trigger: 'blur' }],
        submitStatus: [{ required: true, message: '此字段不能为空', trigger: 'change' }]
      },
      user: store,
      auditList: [],
      uuid: '',
      qrCodeDialogVisible: false
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

        if (parseInt(goAction) === 1 || parseInt(goAction) === 2) {
          this.isRenSheHidden = true
          this.isAssureHidden = false
          this.isBankHidden = false
          this.rensheForm = response.data.data
        } else if (parseInt(goAction) === 5 || parseInt(goAction) === 6) {
          this.isRenSheHidden = true
          this.disableRenSheHidden = true
          this.isAssureHidden = true
          this.isBankHidden = false
          this.extend(this.rensheForm, response.data.data)
          this.rensheForm.status = 5
          this.extend(this.assureForm, response.data.data)
          this.assureForm.scComment = ''
          this.getAuditList(goodsId)
        } else if (parseInt(goAction) === 9) {
          this.isRenSheHidden = true
          this.disableRenSheHidden = true
          this.isAssureHidden = true
          this.disableAssureHidden = true
          this.isBankHidden = true
          this.extend(this.rensheForm, response.data.data)
          this.rensheForm.status = 5
          this.extend(this.assureForm, response.data.data)
          this.assureForm.status = 9
          this.extend(this.bankForm, response.data.data)
        }
        this.scExtraPicUrlList = []
        for (var i = 0; i < this.assureForm.scExtraPicUrl.length; i++) {
          this.scExtraPicUrlList.push({
            url: this.assureForm.scExtraPicUrl[i]
          })
        }
      })

      // listBank().then(response => {
      //   for (var i = 0; i < response.data.data.length; i++) {
      //     var bank = response.data.data[i]
      //     this.assureForm.cascaderOptions.push({
      //       value: bank.id,
      //       label: bank.name,
      //       children: [{
      //         value: bank.subBranch,
      //         label: bank.subBranch
      //       }]
      //     })
      //   }
      // })
    },
    handleCancel: function() {
      this.goBoack()
    },
    getAuditList: function(id) {
      listAudit({ id: id }).then(response => {
        for (let i = 0; i < response.data.data.length; i++) {
          const element = response.data.data[i]
          element.submiteStatus = getAuditByStatus(element.submiteStatus)
        }
        this.auditList = response.data.data
        console.log(this.auditList)
      })
    },
    goBoack: function() {
      var goAction = this.$route.query.action
      if (parseInt(goAction) === 1 || parseInt(goAction) === 2 || parseInt(goAction) === 3 || parseInt(goAction) === 4) {
        this.$router.push({ path: '/hr/audit' })
      } else if (parseInt(goAction) === 5 || parseInt(goAction) === 6 || parseInt(goAction) === 7 || parseInt(goAction) === 8) {
        this.$router.push({ path: '/assure/list' })
      } else if (parseInt(goAction) === 10 || parseInt(goAction) === 11) {
        this.$router.push({ path: '/bank/list' })
      } else {
        this.$router.push({ path: '/dashboard' })
      }
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
    },
    handleEdit: function() {
      if (this.assureForm.isApproval && (this.assureForm.qrCodeSignature == null || this.assureForm.qrCodeSignature === '')) {
        MessageBox.alert('请上传电子签名', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return
      }
      this.$refs['assureForm'].validate((valid) => {
        if (valid) {
          const finalGoods = {}
          this.extend(finalGoods, { 'id': this.$route.query.id })
          this.assureForm.submitStatus = this.assureForm.status
          this.assureForm.scOperator = this.user.getters.name
          this.extend(finalGoods, this.assureForm)
          updateByBank(finalGoods)
            .then(response => {
              this.$notify.success({
                title: '成功',
                message: '创建成功'
              })
              this.$router.go(-1)
              this.goBoack()
            })
            .catch(response => {
              MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
                confirmButtonText: '确定',
                type: 'error'
              })
            })
        }
      })
    },
    uploadPicUrl: function(response) {
      this.assureForm.scLetterIntentUrl = response.data.url
    },
    uploadOverrun: function() {
      this.$message({
        type: 'error',
        message: '上传文件个数超出限制!最多上传5张图片!'
      })
    },
    handleRemove: function(file, fileList) {
      for (var i = 0; i < this.assureForm.scExtraPicUrl.length; i++) {
        // 这里存在两种情况
        // 1. 如果所删除图片是刚刚上传的图片，那么图片地址是file.response.data.url
        //    此时的file.url虽然存在，但是是本机地址，而不是远程地址。
        // 2. 如果所删除图片是后台返回的已有图片，那么图片地址是file.url
        var url
        if (file.response === undefined) {
          url = file.url
        } else {
          url = file.response.data.url
        }

        if (this.assureForm.scExtraPicUrl[i] === url) {
          this.assureForm.scExtraPicUrl.splice(i, 1)
        }
      }
    },
    handleExtraPicUrl: function(response) {
      if (response.errno === 0) {
        if (this.assureForm.scExtraPicUrl == null) {
          this.assureForm.scExtraPicUrl = []
        }
        this.assureForm.scExtraPicUrl.push(response.data.url)
      }
    },
    handleCascaderChange: function(value) {
      this.assureForm.bankId = [value[0]]
    },
    onChangeAcSubmitstatus: function(value) {
      if (value === 8) {
        this.assureForm.isApproval = true
      } else {
        this.assureForm.isApproval = false
      }
    },
    showQrCode() {
      this.qrCodeDialogVisible = true
      this.uuid = uuid2() // 5715891D-0E3E-4A13-835A-09D4715FFE17
      // this.$route.query.id
      this.$nextTick(function() {
        document.getElementById('qrcode').innerHTML = ''
        const qrcode = new QRCode('qrcode', {
          width: 150,
          height: 150,
          text: qrCodeUrl + '?applicant=1&uuid=5715891D-0E3E-4A13-835A-09D4715FFE17',
          colorDark: '#109dff',
          colorLight: '#d9d9d9'
        })
      })
    },
    qrCodeHandle() {
      readSignature({ applicantId: 100, uuid: '5715891D-0E3E-4A13-835A-09D4715FFE17' }).then(response => {
        if (response.data.data.signatureUrl != null && response.data.data.signatureUrl !== '') {
          this.qrCodeDialogVisible = false
          this.assureForm.qrCodeSignature = response.data.data.signatureUrl
        } else {
          MessageBox.alert('请在小程序里面上传电子签名', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
        }
      }).catch(response => {
        this.$notify.error({
          title: '失败',
          message: response.data.errmsg
        })
      })
    }
  }
}
</script>
