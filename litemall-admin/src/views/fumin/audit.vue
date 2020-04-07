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
          <el-col :span="8">
            <el-form-item label="身份证号" prop="idCardNumber">
              <el-input v-model="goods.idCardNumber" :readonly="goodsReadyOnly" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系方式" prop="phoneNumber">
              <el-input v-model="goods.phoneNumber" :readonly="goodsReadyOnly" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="推荐人" prop="recommender">
              <el-input v-model="goods.recommender" :readonly="goodsReadyOnly" />
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
        <el-row v-if="goods.applicantType == 'company' || goods.applicantAmount >= 10">
          <el-col :span="6">
            <el-form-item label="营业执照正面" prop="businessLicenseUrl">
              <el-image v-if="goods.businessLicenseUrl" style="width:50px;height:50px;" :src="goods.businessLicenseUrl" :preview-src-list="[goods.businessLicenseUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手持营业执照正面" prop="businessLicenseUrl">
              <el-image v-if="goods.handBusinessLicenseUrl" style="width:50px;height:50px;" :src="goods.handBusinessLicenseUrl" :preview-src-list="[goods.handBusinessLicenseUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="身份证正面" prop="idCardUrl">
              <el-image v-if="goods.idCardUrl" style="width:50px;height:50px;" :src="goods.idCardUrl" :preview-src-list="[goods.idCardUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手持身份证" prop="idCardUrl2">
              <el-image v-if="goods.handIdCardUrl" style="width:50px;height:50px;" :src="goods.handIdCardUrl" :preview-src-list="[goods.handIdCardUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="身份证反面" prop="idCardUrl2">
              <el-image v-if="goods.idCardUrl2" style="width:50px;height:50px;" :src="goods.idCardUrl2" :preview-src-list="[goods.idCardUrl2]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="就业创业证" prop="jobUrl">
              <el-image v-if="goods.jobUrl" style="width:50px;height:50px;" :src="goods.jobUrl" :preview-src-list="[goods.jobUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="带动人员工资流水" prop="employmentPromotionUrl">
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
        <el-row v-if="goods.applicantType == 'personal' && goods.applicantAmount < 10">
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
            <el-form-item label="手持身份证" prop="idCardUrl2">
              <el-image v-if="goods.handIdCardUrl" style="width:50px;height:50px;" :src="goods.handIdCardUrl" :preview-src-list="[goods.handIdCardUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="身份证反面" prop="idCardUrl2">
              <el-image v-if="goods.idCardUrl2" style="width:50px;height:50px;" :src="goods.idCardUrl2" :preview-src-list="[goods.idCardUrl2]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="户口本首页" prop="residenceBookletUrl">
              <el-image v-if="goods.residenceBookletUrl" style="width:50px;height:50px;" :src="goods.residenceBookletUrl" :preview-src-list="[goods.residenceBookletUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="户口本本人页" prop="residenceBookletUrl2">
              <el-image v-if="goods.residenceBookletUrl2" style="width:50px;height:50px;" :src="goods.residenceBookletUrl2" :preview-src-list="[goods.residenceBookletUrl2]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="婚姻证首页" prop="marriageCertificateUrl">
              <el-image v-if="goods.marriageCertificateUrl" style="width:50px;height:50px;" :src="goods.marriageCertificateUrl" :preview-src-list="[goods.marriageCertificateUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="婚姻证本人页" prop="marriageCertificateUrl2">
              <el-image v-if="goods.marriageCertificateUrl2" style="width:50px;height:50px;" :src="goods.marriageCertificateUrl2" :preview-src-list="[goods.marriageCertificateUrl2]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单身声明" prop="guaranteeStatementUrl">
              <el-image v-if="goods.guaranteeStatementUrl" style="width:50px;height:50px;" :src="goods.guaranteeStatementUrl" :preview-src-list="[goods.guaranteeStatementUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="租赁合同" prop="leaseContractUrl">
              <el-image v-if="goods.leaseContractUrl" style="width:50px;height:50px;" :src="goods.leaseContractUrl" :preview-src-list="[goods.leaseContractUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="产权证" prop="propertyCertificateUrl">
              <el-image v-if="goods.propertyCertificateUrl" style="width:50px;height:50px;" :src="goods.propertyCertificateUrl" :preview-src-list="[goods.propertyCertificateUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="房产证" prop="houseProprietaryCertificateUrl">
              <el-image v-if="goods.houseProprietaryCertificateUrl" style="width:50px;height:50px;" :src="goods.houseProprietaryCertificateUrl" :preview-src-list="[goods.houseProprietaryCertificateUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车辆权证" prop="vehiclesCertificateUrl">
              <el-image v-if="goods.vehiclesCertificateUrl" style="width:50px;height:50px;" :src="goods.vehiclesCertificateUrl" :preview-src-list="[goods.vehiclesCertificateUrl]" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="就业创业证" prop="jobUrl">
              <el-image v-if="goods.jobUrl" style="width:50px;height:50px;" :src="goods.jobUrl" :preview-src-list="[goods.jobUrl]" />
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
            <el-form-item v-if="!disableRenSheHidden" label="是否审核通过" prop="status">
              <el-select v-model="rensheForm.status" style="width:100%" @change="onChangeHrSubmitstatus">
                <el-option :value="4" label="通过" />
                <el-option :value="3" label="不通过" />
                <el-option :value="2" label="待补充" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="rensheForm.isApproval" :span="8">
            <el-form-item label="最高额度(万元)" prop="hsTopAmount">
              <el-input v-model="rensheForm.hsTopAmount" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="rensheForm.isApproval">
          <el-row>
            <el-col :span="8">
              <el-form-item label="营业执照类型" prop="hsBusinessLicenseType">
                <el-input v-model="rensheForm.hsBusinessLicenseType" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请人" prop="hsApplicant">
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
              <el-form-item v-if="goods.applicantType === 'company'" label="企业名称" prop="hsMark">
                <el-input v-model="rensheForm.hsMark"><el-button slot="append" icon="el-icon-search" @click="readRecords(rensheForm.hsMark)">历史数据</el-button></el-input>
              </el-form-item>
              <el-form-item v-else label="身份证号" prop="idCardNumber">
                <el-input v-model="goods.idCardNumber" readonly><el-button slot="append" icon="el-icon-search" @click="readRecords(goods.idCardNumber)">历史数据</el-button></el-input>
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
          <el-form-item label="补充资料">
            <el-upload
              :action="uploadPath"
              :limit="100"
              :headers="headers"
              :file-list="renSheExtraPicUrlList"
              :on-exceed="uploadOverrun"
              :on-success="handleExtraPicUrl"
              :on-remove="handleRemove"
              multiple
              accept=".jpg,.jpeg,.png,.gif"
              list-type="picture-card"
            >
              <i class="el-icon-plus" />
            </el-upload>
          </el-form-item>
          <el-form-item label="电子签名">
            <el-button type="success" style="position: absolute" @click="showQrCode()">生成二维码</el-button>
            <el-image v-if="rensheForm.qrCodeSignature != null" style="width:50px;height:50px; margin-left: 150px" :src="rensheForm.qrCodeSignature" :preview-src-list="[rensheForm.qrCodeSignature]" />
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
        </el-row>
        <el-form-item label="人社部门意见" prop="hsComment">
          <el-input v-model="rensheForm.hsComment" type="textarea" :rows="7" />
        </el-form-item>
        <el-input v-if="!disableRenSheHidden" v-model="rensheForm.hsOperator" type="hidden" />
      </el-form>
      <div v-if="!disableRenSheHidden" class="op-container">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleEdit">提交</el-button>
      </div>
    </el-card>
    <el-card v-if="auditList.length > 0">
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
    <!-- 结束对话框 -->
    <el-dialog title="历史数据" :visible.sync="dialogVisible" width="70%">
      <template>
        <el-table :data="recordList" stripestyle="width: 100%">
          <el-table-column align="center" label="ID" min-width="50px" prop="id" />
          <el-table-column align="center" label="姓名" prop="name" />
          <el-table-column align="center" label="身份证号" property="idCardNo" />
          <el-table-column align="center" label="贷款发放日期" prop="loanStartDate" />
          <el-table-column align="center" label="贷款到期日期" prop="loanEndDate" />
          <el-table-column align="center" label="贷款期限" prop="periodLoan" />
          <el-table-column align="center" label="贷款金额" prop="credit" />
          <el-table-column align="center" label="利率" prop="interest" />
          <el-table-column align="center" label="贷款银行" prop="bankName" />
        </el-table>
      </template>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
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
import { readApplicant, updateApplicant } from '@/api/applicant'
import { listByIdCardNo } from '@/api/record'
import { readSignature } from '@/api/signature'
import { createStorage, uploadPath } from '@/api/storage'
import store from '@/store'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
import { listAudit } from '@/api/audit'
import { getAuditByStatus, uuid2 } from '@/utils'
import QRCode from 'qrcodejs2'

export default {
  name: 'GoodsCreate',
  components: {
    QRCode
  },
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
      dialogVisible: false,
      recordList: [],
      renSheExtraPicUrlList: [],
      goods: { picUrl: '' },
      specForm: { specification: '', value: '', picUrl: '' },
      rensheForm: {
        hsRigsterDate: undefined,
        isApproval: false,
        status: '',
        hsComment: '',
        hsExtraPicUrl: [],
        qrCodeSignature: undefined
      },
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
        hsTopAmount: [{ required: true, message: '此字段不能为空', trigger: 'blur' }],
        hsBusinessLicenseType: [{ required: true, message: '此字段不能为空', trigger: 'blur' }],
        hsApplicant: [{ required: true, message: '此字段不能为空', trigger: 'blur' }],
        hsUnifiedSocialCreditCode: [{ required: true, message: '此字段不能为空', trigger: 'blur' }],
        hsApplicantAdress: [{ required: true, message: '此字段不能为空', trigger: 'blur' }],
        hsRigsterDate: [{ required: true, message: '此字段不能为空', trigger: 'blur' }],
        submitStatus: [{ required: true, message: '此字段不能为空', trigger: 'change' }],
        status: [{ required: true, message: '此字段不能为空', trigger: 'change' }]
      },
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
          this.rensheForm.hsApplicant = response.data.data.name
          this.rensheForm.hsRigsterDate = response.data.data.addTime
          this.getAuditList(goodsId)
        } else if (parseInt(goAction) === 4 || parseInt(goAction) === 5) {
          this.isRenSheHidden = true
          this.disableRenSheHidden = true
          this.isAssureHidden = true
          this.isBankHidden = false
          this.extend(this.rensheForm, response.data.data)
          this.rensheForm.status = 4
          this.extend(this.assureForm, response.data.data)
        } else if (parseInt(goAction) === 7) {
          this.isRenSheHidden = true
          this.disableRenSheHidden = true
          this.isAssureHidden = true
          this.disableAssureHidden = true
          this.isBankHidden = true
          this.extend(this.rensheForm, response.data.data)
          this.rensheForm.status = 4
          this.extend(this.assureForm, response.data.data)
          console.log(this.assureForm)
          this.assureForm.status = 7
          this.extend(this.bankForm, response.data.data)
        }

        this.renSheExtraPicUrlList = []
        this.rensheForm.hsExtraPicUrl = []
        for (var i = 0; i < this.rensheForm.hsExtraPicUrl.length; i++) {
          this.renSheExtraPicUrlList.push({
            url: this.rensheForm.hsExtraPicUrl[i]
          })
        }
      })
    },
    handleCancel: function() {
      this.goBoack()
    },
    goBoack: function() {
      var goAction = this.$route.query.action
      if (parseInt(goAction) === 1 || parseInt(goAction) === 2 || parseInt(goAction) === 3) {
        this.$router.push({ path: '/hr/audit' })
      } else if (parseInt(goAction) === 4 || parseInt(goAction) === 5 || parseInt(goAction) === 6) {
        this.$router.push({ path: '/assure/list' })
      } else if (parseInt(goAction) === 7 || parseInt(goAction) === 8) {
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
      if (this.rensheForm.isApproval && (this.rensheForm.qrCodeSignature == null || this.rensheForm.qrCodeSignature === '')) {
        MessageBox.alert('请上传电子签名', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return
      }
      this.$refs['rensheForm'].validate((valid) => {
        if (valid) {
          const finalGoods = {}
          this.extend(finalGoods, { 'id': this.$route.query.id })
          if (parseInt(this.$route.query.action) === 1 || parseInt(this.$route.query.action) === 2) {
            this.rensheForm.submitStatus = this.rensheForm.status
            this.extend(finalGoods, this.rensheForm)
          }
          updateApplicant(finalGoods)
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
    getAuditList: function(id) {
      listAudit({ id: id }).then(response => {
        for (let i = 0; i < response.data.data.length; i++) {
          const element = response.data.data[i]
          element.submiteStatus = getAuditByStatus(element.submiteStatus)
        }
        this.auditList = response.data.data
      })
    },
    uploadOverrun: function() {
      this.$message({
        type: 'error',
        message: '上传文件个数超出限制!最多上传100张图片!'
      })
    },
    handleExtraPicUrl(response, file, fileList) {
      if (response.errno === 0) {
        if (this.rensheForm.hsExtraPicUrl == null) {
          this.rensheForm.hsExtraPicUrl = []
        }
        this.rensheForm.hsExtraPicUrl.push(response.data.url)
      }
    },
    handleRemove: function(file, fileList) {
      for (var i = 0; i < this.rensheForm.hsExtraPicUrl.length; i++) {
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

        if (this.rensheForm.hsExtraPicUrl[i] === url) {
          this.rensheForm.hsExtraPicUrl.splice(i, 1)
        }
      }
    },
    readRecords: function(name) {
      if (name === null || name === '') {
        this.$notify.warning({
          title: '提示',
          message: this.goods.applicantType === 'company' ? '请输入企业名称' : '请输入身份证号'
        })
        return true
      }
      this.dialogVisible = true
      listByIdCardNo({ name: name, applicantType: this.goods.applicantType }).then(response => {
        this.recordList = response.data.data.list
      })
    },
    onChangeHrSubmitstatus: function(value) {
      if (value === 4) {
        this.rensheForm.isApproval = true
      } else {
        this.rensheForm.isApproval = false
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
          text: 'https://testrenshe.zujioa.com/abc/?applicant=1&uuid=5715891D-0E3E-4A13-835A-09D4715FFE17',
          colorDark: '#109dff',
          colorLight: '#d9d9d9'
        })
      })
    },
    qrCodeHandle() {
      readSignature({ applicantId: 100, uuid: '5715891D-0E3E-4A13-835A-09D4715FFE17' }).then(response => {
        if (response.data.data.signatureUrl != null && response.data.data.signatureUrl !== '') {
          this.qrCodeDialogVisible = false
          this.rensheForm.qrCodeSignature = response.data.data.signatureUrl
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
