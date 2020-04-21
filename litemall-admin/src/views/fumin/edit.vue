<template>
  <div class="app-container">
    <el-card class="box-card">
      <h3>人社审核</h3>
      <el-form ref="goods" :model="goods" label-width="200px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请人（法人）姓名" prop="name">
              <el-input v-model="goods.name" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别" prop="sex">
              <el-select v-model="goods.sex" style="width:100%">
                <el-option key="男" label="男" value="男" />
                <el-option key="女" label="女" value="女" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="婚姻状况" prop="maritalStatus">
              <el-select v-model="goods.maritalStatus" style="width:100%">
                <el-option key="结婚" label="结婚" value="结婚" />
                <el-option key="离异" label="离异" value="离异" />
                <el-option key="未婚" label="未婚" value="未婚" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="身份证号" prop="idCardNumber">
              <el-input v-model="goods.idCardNumber" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系方式" prop="phoneNumber">
              <el-input v-model="goods.phoneNumber" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="配偶身份证号" prop="spouseIdCardNumber">
              <el-input v-model="goods.spouseIdCardNumber" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="配偶姓名" prop="spouseName">
              <el-input v-model="goods.spouseName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请人（法人）类别" prop="applicantType">
              <el-select v-model="goods.applicantType" style="width:100%">
                <el-option key="小微企业  " label="小微企业  " value="小微企业  " />
                <el-option key="个人" label="个人" value="个人" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请额度" prop="applicantAmount">
              <el-input v-model="goods.applicantAmount" placeholder="0.00">
                <template slot="append">万元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="申请人（法人）类别" prop="applicantCategory">
          <el-radio-group v-model="goods.applicantCategory">
            <el-radio key="城镇登记失业人员" label="城镇登记失业人员" value="城镇登记失业人员" />
            <el-radio key="就业困难人员" label="就业困难人员" value="就业困难人员" />
            <el-radio key="复员转业退役军人" label="复员转业退役军人" value="复员转业退役军人" />
            <el-radio key="刑满释放人员" label="刑满释放人员" value="刑满释放人员" />
            <el-radio key="高校毕业生" label="高校毕业生" value="高校毕业生" />
            <el-radio key="化解过剩产能企业职工和失业职工" label="化解过剩产能企业职工和失业职工" value="化解过剩产能企业职工和失业职工" />
            <el-radio key="返乡创业农民工" label="返乡创业农民工" value="返乡创业农民工" />
            <el-radio key="网络商户" label="网络商户" value="网络商户" />
            <el-radio key="建档立卡贫困人口" label="建档立卡贫困人口" value="建档立卡贫困人口" />
            <el-radio key="农村自主创业农民" label="农村自主创业农民" value="农村自主创业农民" />
            <el-radio key="其他" label="其他" value="其他" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="新招/雇佣人类别" prop="recruitCategory">
          <el-radio-group v-model="goods.recruitCategory">
            <el-radio key="城镇登记失业人员" label="城镇登记失业人员" value="城镇登记失业人员" />
            <el-radio key="就业困难人员" label="就业困难人员" value="就业困难人员" />
            <el-radio key="复员转业退役军人" label="复员转业退役军人" value="复员转业退役军人" />
            <el-radio key="刑满释放人员" label="刑满释放人员" value="刑满释放人员" />
            <el-radio key="高校毕业生" label="高校毕业生" value="高校毕业生" />
            <el-radio key="化解过剩产能企业职工和失业职工" label="化解过剩产能企业职工和失业职工" value="化解过剩产能企业职工和失业职工" />
            <el-radio key="返乡创业农民工" label="返乡创业农民工" value="返乡创业农民工" />
            <el-radio key="网络商户" label="网络商户" value="网络商户" />
            <el-radio key="建档立卡贫困人口" label="建档立卡贫困人口" value="建档立卡贫困人口" />
            <el-radio key="农村自主创业农民" label="农村自主创业农民" value="农村自主创业农民" />
            <el-radio key="其他" label="其他" value="其他" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="申请主体现住址" prop="address">
          <el-input v-model="goods.address" />
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="营业执照正面" label-width="200px">
              <el-upload
                :action="uploadPath"
                :show-file-list="false"
                :headers="headers"
                :on-success="uploadBusinessLicenseUrl"
                class="avatar-uploader"
                accept=".jpg,.jpeg,.png,.gif"
              >
                <img v-if="goods.businessLicenseUrl" :src="goods.businessLicenseUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="营业执照反面" label-width="200px">
              <el-upload
                :action="uploadPath"
                :show-file-list="false"
                :headers="headers"
                :on-success="uploadBusinessLicenseUrl2"
                class="avatar-uploader"
                accept=".jpg,.jpeg,.png,.gif"
              >
                <img v-if="goods.businessLicenseUrl2" :src="goods.businessLicenseUrl2" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="劳动合同" label-width="200px">
              <el-upload
                :action="uploadPath"
                :show-file-list="false"
                :headers="headers"
                :on-success="uploadLaborContractUrl"
                class="avatar-uploader"
                accept=".jpg,.jpeg,.png,.gif"
              >
                <img v-if="goods.laborContractUrl" :src="goods.laborContractUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="近三个月工资发放明细" label-width="200px">
              <el-upload
                :action="uploadPath"
                :show-file-list="false"
                :headers="headers"
                :on-success="uploadSalaryDetailUrl"
                class="avatar-uploader"
                accept=".jpg,.jpeg,.png,.gif"
              >
                <img v-if="goods.salaryDetailUrl" :src="goods.salaryDetailUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="法定代表人身份证正面" label-width="200px">
              <el-upload
                :action="uploadPath"
                :show-file-list="false"
                :headers="headers"
                :on-success="uploadIdCardUrl"
                class="avatar-uploader"
                accept=".jpg,.jpeg,.png,.gif"
              >
                <img v-if="goods.idCardUrl" :src="goods.idCardUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="法定代表人身份证反面" label-width="200px">
              <el-upload
                :action="uploadPath"
                :show-file-list="false"
                :headers="headers"
                :on-success="uploadIdCardUrl2"
                class="avatar-uploader"
                accept=".jpg,.jpeg,.png,.gif"
              >
                <img v-if="goods.idCardUrl2" :src="goods.idCardUrl2" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="配偶身份证正面" label-width="200px">
              <el-upload
                :action="uploadPath"
                :show-file-list="false"
                :headers="headers"
                :on-success="uploadSpouseIdCardUrl"
                class="avatar-uploader"
                accept=".jpg,.jpeg,.png,.gif"
              >
                <img v-if="goods.spouseIdCardUrl" :src="goods.spouseIdCardUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="配偶身份证反面" label-width="200px">
              <el-upload
                :action="uploadPath"
                :show-file-list="false"
                :headers="headers"
                :on-success="uploadSpouseIdCardUrl2"
                class="avatar-uploader"
                accept=".jpg,.jpeg,.png,.gif"
              >
                <img v-if="goods.spouseIdCardUrl2" :src="goods.spouseIdCardUrl2" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="结婚照/离婚征首页" label-width="200px">
              <el-upload
                :action="uploadPath"
                :show-file-list="false"
                :headers="headers"
                :on-success="uploadMarriageCertificateUrl"
                class="avatar-uploader"
                accept=".jpg,.jpeg,.png,.gif"
              >
                <img v-if="goods.marriageCertificateUrl" :src="goods.marriageCertificateUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结婚照/离婚征本人页" label-width="200px">
              <el-upload
                :action="uploadPath"
                :show-file-list="false"
                :headers="headers"
                :on-success="uploadMarriageCertificateUrl2"
                class="avatar-uploader"
                accept=".jpg,.jpeg,.png,.gif"
              >
                <img v-if="goods.marriageCertificateUrl2" :src="goods.marriageCertificateUrl2" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="户口本首页本人页" label-width="200px">
              <el-upload
                :action="uploadPath"
                :show-file-list="false"
                :headers="headers"
                :on-success="uploadResidenceBookletUrl"
                class="avatar-uploader"
                accept=".jpg,.jpeg,.png,.gif"
              >
                <img v-if="goods.residenceBookletUrl" :src="goods.residenceBookletUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="户口本首页本人页" label-width="200px">
              <el-upload
                :action="uploadPath"
                :show-file-list="false"
                :headers="headers"
                :on-success="uploadResidenceBookletUrl2"
                class="avatar-uploader"
                accept=".jpg,.jpeg,.png,.gif"
              >
                <img v-if="goods.residenceBookletUrl2" :src="goods.residenceBookletUrl2" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="承诺书" label-width="200px">
              <el-upload
                :action="uploadPath"
                :show-file-list="false"
                :headers="headers"
                :on-success="uploadUndertakingUrl"
                class="avatar-uploader"
                accept=".jpg,.jpeg,.png,.gif"
              >
                <img v-if="goods.undertakingUrl" :src="goods.undertakingUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="租赁合同" label-width="200px">
              <el-upload
                :action="uploadPath"
                :show-file-list="false"
                :headers="headers"
                :on-success="uploadLeaseContractUrl"
                class="avatar-uploader"
                accept=".jpg,.jpeg,.png,.gif"
              >
                <img v-if="goods.leaseContractUrl" :src="goods.leaseContractUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产权证" label-width="200px">
              <el-upload
                :action="uploadPath"
                :show-file-list="false"
                :headers="headers"
                :on-success="uploadPropertyCertificateUrl"
                class="avatar-uploader"
                accept=".jpg,.jpeg,.png,.gif"
              >
                <img v-if="goods.propertyCertificateUrl" :src="goods.propertyCertificateUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请主体房产证" label-width="200px">
              <el-upload
                :action="uploadPath"
                :show-file-list="false"
                :headers="headers"
                :on-success="uploadHouseProprietaryCertificateUrl"
                class="avatar-uploader"
                accept=".jpg,.jpeg,.png,.gif"
              >
                <img v-if="goods.houseProprietaryCertificateUrl" :src="goods.houseProprietaryCertificateUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车辆权证" label-width="200px">
              <el-upload
                :action="uploadPath"
                :show-file-list="false"
                :headers="headers"
                :on-success="uploadVehiclesCertificateUrl"
                class="avatar-uploader"
                accept=".jpg,.jpeg,.png,.gif"
              >
                <img v-if="goods.vehiclesCertificateUrl" :src="goods.vehiclesCertificateUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业/申请人近一年银行对账" label-width="200px">
              <el-upload
                :action="uploadPath"
                :show-file-list="false"
                :headers="headers"
                :on-success="uploadBankReconciliationUrl"
                class="avatar-uploader"
                accept=".jpg,.jpeg,.png,.gif"
              >
                <img v-if="goods.bankReconciliationUrl" :src="goods.bankReconciliationUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="担保人身份证" label-width="200px">
              <el-upload
                :action="uploadPath"
                :show-file-list="false"
                :headers="headers"
                :on-success="uploadSuretyIdCardUrl"
                class="avatar-uploader"
                accept=".jpg,.jpeg,.png,.gif"
              >
                <img v-if="goods.suretyIdCardUrl" :src="goods.suretyIdCardUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="其他图片（跟申请人电话沟通后，上传）" label-width="200px">
              <el-upload
                :action="uploadPath"
                :show-file-list="false"
                :headers="headers"
                :on-success="uploadExtraUrl"
                class="avatar-uploader"
                accept=".jpg,.jpeg,.png,.gif"
              >
                <img v-if="goods.extraUrl" :src="goods.extraUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="op-container">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleEdit">修改</el-button>
      </div>
    </el-card>
    <el-card class="box-card">
      <h3>人社核查信息情况</h3>
      <el-form
        ref="rensheForm"
        :rules="rensheRulrs"
        :model="rensheForm"
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
            <el-form-item label="公司所在地" prop="hsApplicantAdress">
              <el-input v-model="rensheForm.hsApplicantAdress" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业名称" prop="hsMark">
              <el-input v-model="rensheForm.hsMark" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="注册日期" prop="hsRigsterDate">
              <el-input v-model="rensheForm.hsRigsterDate" />
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
              <el-input v-model="rensheForm.hsActiveEmployees" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="当年新招人数" prop="hsRecruitPeople">
              <el-input v-model="rensheForm.hsRecruitPeople" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="新招用员工占比" prop="hsRecuitRate">
              <el-input v-model="rensheForm.hsRecuitRate" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="市人社部门意见" prop="hsComment">
          <el-input v-model="rensheForm.hsComment" type="textarea" :rows="7" />
        </el-form-item>
        <el-form-item label="是否审核通过" prop="submitStatus">
          <el-select v-model="rensheForm.submitStatus" style="width:100%">
            <el-option key="通过  " label="通过  " value="3" />
            <el-option key="不通过" label="不通过" value="4" />
          </el-select>
        </el-form-item>
        <el-input v-model="rensheForm.hsAuditDate" type="hidden" />
        <el-input v-model="rensheForm.hsOperator" type="hidden" />
        <div class="op-container">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handlePublish">提交</el-button>
        </div>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <h3>担保公司核查信息情况</h3>
      <el-form
        ref="assureForm"
        :rules="assureRulrs"
        :model="assureForm"
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
        <el-form-item label="担保意向书" label-width="200px">
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
        <el-form-item label="是否审核通过" prop="submitStatus">
          <el-select v-model="rensheForm.submitStatus" prop="submitStatus" style="width:100%">
            <el-option key="通过  " label="通过  " value="5" />
            <el-option key="不通过" label="不通过" value="6" />
          </el-select>
        </el-form-item>
        <el-input v-model="rensheForm.scAuditDate" type="hidden" />
        <el-input v-model="rensheForm.scOperator" type="hidden" />
      </el-form>
      <div class="op-container">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handlePublish">提交</el-button>
      </div>
    </el-card>

    <el-card class="box-card">
      <h3>银行受理信息情况</h3>
      <el-form
        ref="bankForm"
        :rules="bankRules"
        :model="bankForm"
        label-position="right"
        label-width="200px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="受理银行" prop="bName">
              <el-input v-model="bankForm.bName" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="支行" prop="bSubBranch">
              <el-input v-model="bankForm.bSubBranch" />
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
              <el-input v-model="bankForm.bLendingDate" />
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
        <el-form-item label="是否审核通过" prop="submitStatus">
          <el-select v-model="bankForm.submitStatus" style="width:100%">
            <el-option key="通过  " label="复核通过  " value="13" />
            <el-option key="通过" label="复审通过" value="12" />
            <el-option key="通过" label="审核通过" value="11" />
            <el-option key="不通过" label="不通过" value="10" />
          </el-select>
        </el-form-item>
        <el-input v-model="bankForm.scAuditDate" type="hidden" />
        <el-input v-model="bankForm.scOperator" type="hidden" />
      </el-form>
      <div class="op-container">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handlePublish">提交</el-button>
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
</style>

<script>
import { publishGoods, listCatAndBrand } from '@/api/goods'
import { readApplicant, updateApplicant } from '@/api/applicant'
import { createStorage, uploadPath } from '@/api/storage'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'

export default {
  name: 'GoodsCreate',
  components: { },
  data() {
    return {
      uploadPath,
      applicant: {},
      newKeywordVisible: false,
      newKeyword: '',
      keywords: [],
      categoryList: [],
      brandList: [],
      goods: { picUrl: '', businessLicenseUrl: '', BusinessLicenseUrl2: '', salaryDetailUrl: '', idCardUrl: '', idCardUrl2: '', spouseIdCardUrl: '', spouseIdCardUrl2: '', marriageCertificateUrl: '', marriageCertificateUrl2: '', residenceBookletUrl: '', residenceBookletUrl2: '', undertakingUrl: '', leaseContractUrl: '', propertyCertificateUrl: '', houseProprietaryCertificateUrl: '', vehiclesCertificateUrl: '', bankReconciliationUrl: '', suretyIdCardUrl: '', extraUrl: '' },
      specVisiable: false,
      specForm: { specification: '', value: '', picUrl: '' },
      multipleSpec: false,
      specifications: [{ specification: '规格', value: '标准', picUrl: '' }],
      productVisiable: false,
      productForm: { id: 0, specifications: [], price: 0.00, number: 0, url: '' },
      products: [{ id: 0, specifications: ['标准'], price: 0.00, number: 0, url: '' }],
      attributeVisiable: false,
      attributeForm: { attribute: '', value: '' },
      rensheForm: { attribute: '', value: '' },
      assureForm: { attribute: '', value: '' },
      bankForm: { attribute: '', value: '' },
      attributes: [],
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
      },
      checkList: ['选中且禁用', '复选框 A'],
      editorInit: {
        language: 'zh_CN',
        height: 500,
        convert_urls: false,
        plugins: ['advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount'],
        toolbar: ['searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample', 'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen'],
        images_upload_handler: function(blobInfo, success, failure) {
          const formData = new FormData()
          formData.append('file', blobInfo.blob())
          createStorage(formData).then(res => {
            success(res.data.data.url)
          }).catch(() => {
            failure('上传失败，请重新上传')
          })
        }
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

      const goodsId = this.$route.query.id
      readApplicant({ id: goodsId }).then(response => {
        this.goods = response.data.data
      })
    },
    handleCancel: function() {
      this.$router.push({ path: '/mall/applicant' })
    },
    handlePublish: function() {
      createApplicant(this.goods).then(response => {
        this.$notify.success({
          title: '成功',
          message: '创建成功'
        })
        this.$router.push({ path: '/hr/audit' })
      }).catch(response => {
        MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
          confirmButtonText: '确定',
          type: 'error'
        })
      })
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
      console.log(11111111111)
      const finalGoods = this.extend({ 'id': this.$route.query.id }, this.goods)
      updateApplicant(finalGoods)
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '创建成功'
          })
          this.$router.push({ path: '/hr/audit' })
        })
        .catch(response => {
          MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })
    },
    uploadPicUrl: function(response) {
      this.goods.picUrl = response.data.url
    },
    uploadOverrun: function() {
      this.$message({
        type: 'error',
        message: '上传文件个数超出限制!最多上传5张图片!'
      })
    },
    handleRemove: function(file, fileList) {
      for (var i = 0; i < this.goods.gallery.length; i++) {
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

        if (this.goods.gallery[i] === url) {
          this.goods.gallery.splice(i, 1)
        }
      }
    },
    uploadSpecPicUrl: function(response) {
      this.specForm.picUrl = response.data.url
    },
    handleSpecificationShow() {
      this.specForm = { specification: '', value: '', picUrl: '' }
      this.specVisiable = true
    },
    handleProductShow(row) {
      this.productForm = Object.assign({}, row)
      this.productVisiable = true
    },
    uploadBusinessLicenseUrl: function(response) {
      this.goods.businessLicenseUrl = response.data.url
    },
    uploadBusinessLicenseUrl2: function(response) {
      console.log(response)
      this.goods.businessLicenseUrl2 = response.data.url
      console.log(this.goods.businessLicenseUrl2)
    },
    uploadLaborContractUrl: function(response) {
      this.goods.laborContractUrl = response.data.url
    },
    uploadSalaryDetailUrl: function(response) {
      this.goods.salaryDetailUrl = response.data.url
    },
    uploadIdCardUrl: function(response) {
      this.goods.idCardUrl = response.data.url
    },
    uploadIdCardUrl2: function(response) {
      this.goods.idCardUrl2 = response.data.url
    },
    uploadSpouseIdCardUrl: function(response) {
      this.goods.spouseIdCardUrl = response.data.url
    },
    uploadSpouseIdCardUrl2: function(response) {
      this.goods.spouseIdCardUrl2 = response.data.url
    },
    uploadMarriageCertificateUrl: function(response) {
      this.goods.marriageCertificateUrl = response.data.url
    },
    uploadMarriageCertificateUrl2: function(response) {
      this.goods.marriageCertificateUrl2 = response.data.url
    },
    uploadResidenceBookletUrl: function(response) {
      this.goods.residenceBookletUrl = response.data.url
    },
    uploadResidenceBookletUrl2: function(response) {
      this.goods.residenceBookletUrl2 = response.data.url
    },
    uploadUndertakingUrl: function(response) {
      this.goods.undertakingUrl = response.data.url
    },
    uploadLeaseContractUrl: function(response) {
      this.goods.leaseContractUrl = response.data.url
    },
    uploadPropertyCertificateUrl: function(response) {
      this.goods.propertyCertificateUrl = response.data.url
    },
    uploadHouseProprietaryCertificateUrl: function(response) {
      this.goods.houseProprietaryCertificateUrl = response.data.url
    },
    uploadVehiclesCertificateUrl: function(response) {
      this.goods.vehiclesCertificateUrl = response.data.url
    },
    uploadBankReconciliationUrl: function(response) {
      this.goods.bankReconciliationUrl = response.data.url
    },
    uploadSuretyIdCardUrl: function(response) {
      this.goods.suretyIdCardUrl = response.data.url
    },
    uploadExtraUrl: function(response) {
      this.goods.extraUrl = response.data.url
    }
  }
}
</script>
