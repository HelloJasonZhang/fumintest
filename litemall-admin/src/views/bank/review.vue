<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入申请人" />
      <el-select v-model="listQuery.submitStatusArray" style="width: 200px" class="filter-item" placeholder="请选择审核状态" clearable>
        <el-option v-for="(key, value) in queryStatusMap" :key="key" :label="key" :value="value" />
      </el-select>
      <el-button v-permission="['GET /admin/baReview/list']" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <!-- <el-button v-permission="['POST /admin/ba/create']" class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">审核</el-button> -->
      <!--
      <el-button v-permission="['POST /admin/applicant/create']" class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">担保公司审核</el-button>
      <el-button v-permission="['POST /admin/applicant/create']" class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">银行审核</el-button> -->
      <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row @selection-change="handleApplicantSelectionChange">
      <el-table-column type="selection" min-width="30px" />
      <el-table-column align="center" label="ID" min-width="50px" prop="id">
        <template slot-scope="scope">
          <a class="link-type" @click="handleView(scope.row)">{{ scope.row.id }}</a>
        </template>
      </el-table-column>
      <el-table-column align="center" label="姓名" prop="name" />
      <el-table-column align="center" label="性别" prop="sex" />
      <el-table-column align="center" label="婚姻状况" prop="maritalStatus" />
      <el-table-column align="center" label="身份证号" prop="idCardNumber" />
      <el-table-column align="center" label="联系方式" prop="phoneNumber" />
      <el-table-column align="center" label="类别" prop="applicantTypeLable" />
      <el-table-column align="center" label="申请额度" prop="applicantAmount" />
      <el-table-column align="center" label="贴息比例(%)" prop="hsDiscount">
        <template slot-scope="scope">
          <el-tag size="mini">{{ scope.row.hsDiscount }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" prop="isAvailable">
        <template slot-scope="scope">
          <el-tag size="mini">{{ scope.row.isAvailable ? "作废" : "有效" }}</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="当前状态" prop="statusLable" /> -->
      <el-table-column
        align="center"
        label="审核状态"
        width="350"
      >
        <template slot-scope="scope">
          <el-steps :space="100" :active="scope.row.statusName" :process-status="scope.row.status" align-center>
            <el-step title="申请人" />
            <el-step title="人社" />
            <el-step title="担保" />
            <el-step title="银行" />
          </el-steps>
        </template>
      </el-table-column>
      <!--       <el-table-column align="center" label="审核状态" prop="submitStatus" /> -->
      <el-table-column align="left" label="操作" width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-permission="['GET /admin/baReview/read']" type="primary" size="mini" @click="handleAuditView(scope.row)">查看</el-button>
          <el-button v-permission="['POST /admin/baReview/update']" type="primary" :disabled="scope.row.has_edit" size="mini" @click="handleAudit(scope.row)">复核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @paginat3ion="getList" />

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" append-to-body>
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="right" label-width="120px">
        <el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="是否复核通过" prop="status">
                <el-select v-model="dataForm.status" prop="status" style="width:100%" @change="onChangeAuditStatus">
                  <el-option :value="12" label="通过" />
                  <el-option :value="10" label="不通过" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="复核意见" prop="bComment">
                <el-input v-model="dataForm.bComment" type="textarea" :rows="7" />
              </el-form-item>     
            </el-col>
          </el-row>
          <el-col v-if="dataForm.isApprove" :span="20">
            <el-form-item label="电子签名">
              <el-button type="success" style="position: absolute" @click="showQrCode()">生成二维码</el-button>
              <el-image v-if="dataForm.qrCodeSignature != null" style="width:50px;height:50px; margin-left: 150px" :src="dataForm.qrCodeSignature" :preview-src-list="[dataForm.qrCodeSignature]" />
              <el-dialog title="请扫二维码，去小程序签名" :visible.sync="qrCodeDialogVisible" width="15%" append-to-body>
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
        <!-- <el-form-item label="银行受理情况" prop="auditComment">
          <el-input v-model="dataForm.auditComment" type="textarea" :rows="7" />
        </el-form-item> -->
        <el-input v-model="dataForm.applicantId" type="hidden" />
        <el-input v-model="dataForm.id" type="hidden" />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateData">确定</el-button>
        <!-- <el-button v-else type="primary" @click="updateData">确定</el-button> -->
      </div>
    </el-dialog>

    <!-- 查看详情对话框 -->
    <el-dialog title="受理详情" :visible.sync="dialogAduitFormVisible" width="70%">
      <template>
        <el-table :data="dataForm.applicantBank" stripestyle="width: 100%">
          <el-table-column align="center" prop="bankName" label="银行" />
          <!-- <el-table-column align="center" prop="subBranch" label="分行" /> -->
          <el-table-column align="center" prop="loanStartDate" label="贷款发放日" />
          <el-table-column align="center" prop="loanEndDate" label="贷款到期日" />
          <el-table-column align="center" prop="loanFinance" label="贷款金融" />
          <!-- <el-table-column align="center" prop="credit" label="授信额度(万元)" />
          <el-table-column align="center" prop="opertator" label="经办人" />
          <el-table-column align="center" prop="lendingDate" label="放贷日期" width="180" />
          <el-table-column align="center" prop="periodLoan" label="还款方式" />
          <el-table-column align="center" prop="repayment" label="还款方式" />-->
          <el-table-column align="center" prop="interest" label="利率(%)" />
          <el-table-column align="center" prop="credit" label="授信额度(万元)" />
          <el-table-column align="center" prop="auditComment" label="银行受理情况" width="180" />
          <el-table-column align="center" property="loanVoucherUrl" label="受理凭证">
            <template slot-scope="scope">
              <el-row class="row-bg" justify="center">
                <el-col v-for="item in scope.row.loanVoucherUrl" :span="8">
                  <el-image style="width:40px;height:40px;" :src="item" :preview-src-list="[item]" />
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="status" label="受理状态" />
        </el-table>
      </template>
    </el-dialog>
  </div>
</template>

<style>
  .el-step__title {
    font-size: 12px;
    line-height: 25px;
  }
    .el-step__icon {
    width:20px;
    height:20px;
  }
  .el-step__icon.is-text {
    right: 2px;
  }
</style>

<script>
import { readApplicantBank, listApplicant, updateApplicant } from '@/api/bankAuditReview'
import { uploadPath } from '@/api/storage'
import { getToken } from '@/utils/auth'
import { MessageBox } from 'element-ui'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { qrCodeUrl, uuid2 } from '@/utils'
import QRCode from 'qrcodejs2'
import { readSignature } from '@/api/signature'

const queryStatusMap = {
  '9': '待审核',
  '10': '不通过',
  '11': '通过',
  '12': '复核',
  '13': '放贷'
}

export default {
  name: 'Applicant',
  components: { Pagination, QRCode },
  filters: {
    submitStatuFilter(status) {
      return queryStatusMap[status]
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        id: undefined,
        name: undefined,
        sort: 'add_time',
        submitStatusArray: [],
        order: 'desc'
      },
      uploadPath,
      statusMap: [
        '申请人已提交',
        '人社审核待补充',
        '人社审核不通过',
        '人社审核通过',
        '人社审核复核',
        '担保公司审核待补充',
        '担保公司审核不通过',
        '担保公司审核通过',
        '担保公司审核复核',
        '银行审核不通过',
        '银行审核受理',
        '银行审核复核',
        '银行审核通过'
      ],
      setepStatusArray: [
        { step: 0, status: 'success' }, // 申请人 1
        { step: 1, status: 'wait' }, // 人社待补充 2
        { step: 1, status: 'error' }, // 人社不通过 3
        { step: 1, status: 'process' }, // 人社复核 4
        { step: 1, status: 'success' }, // 人社通过 5
        { step: 2, status: 'wait' }, // 担保公司待补充 6
        { step: 2, status: 'error' }, // 担保公司不通过 7
        { step: 2, status: 'process' }, // 担保公司复核 8
        { step: 2, status: 'success' }, // 担保公司通过 9
        { step: 3, status: 'error' }, // 银行待不通过 10
        { step: 3, status: 'process' }, // 银行通过 11
        { step: 3, status: 'success' }, // 银行复核 12
        { step: 3, status: 'finish' } // 银行复核 结束 13
      ],
      queryStatusMap: queryStatusMap,
      downloadLoading: false,
      dataForm: {
        id: null,
        status: '',
        qrCodeSignature: undefined,
        auditComment: '',
        isApprove: false
      },
      dialogFormVisible: false,
      dialogAduitFormVisible: false,
      dialogFinnishFormVisible: false,
      canFinish: true,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '复核'
      },
      rules: {
        status: [
          { required: true, message: '此字段不能为空', trigger: 'change' }
        ]
      },
      multipleSelection: [],
      loanVoucherUrlList: [],
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
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      listApplicant(this.listQuery)
        .then(response => {
          this.list = response.data.data.list
          this.total = response.data.data.total
          this.listLoading = false
          console.log(this.list)
          for (let index = 0; index < this.list.length; index++) {
            var element = this.list[index]
            element['has_edit'] = true
            if (element.submitStatus === 11) {
              element['has_edit'] = false
            }
            element.statusLable = this.statusMap[element.submitStatus - 1]
            element.status = this.setepStatusArray[element.submitStatus - 1].status
            element.statusName = this.setepStatusArray[element.submitStatus - 1].step
          }
        })
        .catch(() => {
          this.list = []
          this.total = 0
          this.listLoading = false
        })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    updateData() {
      if (this.dataForm.isApprove && (this.dataForm.qrCodeSignature == null || this.dataForm.qrCodeSignature === '')) {
        MessageBox.alert('请上传电子签名', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return
      }
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateApplicant(this.dataForm)
            .then(response => {
              this.dialogFormVisible = false
              this.getList()
              this.$notify.success({
                title: '成功',
                message: '创建成功'
              })
            })
            .catch(response => {
              this.$notify.error({
                title: '失败',
                message: response.data.errmsg
              })
            })
        }
      })
    },
    resetForm() {
      this.dataForm = {
        id: undefined,
        status: undefined,
        qrCodeSignature: undefined,
        bComment: ''
      }
    },
    handleAudit(row) {
      // 显示银行数据
      readApplicantBank({ 'id': row.id })
        .then(response => {
          console.log(response)
          this.dataForm.bankList = response.data.data.bankslist
          this.dataForm.applicantBank = response.data.data.applicantBank
          this.dialogStatus = 'create'
          this.dialogFormVisible = true
          this.resetForm()
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
          this.dataForm.id = row.id
        }).catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.data.errmsg
          })
        })
    },
    handleView(row) {
      this.$router.push({ path: '/ba/reviewDetailView', query: { id: row.id, action: row.submitStatus }})
    },
    handleAuditView(row) {
      // 显示银行受理数据
      readApplicantBank({ 'id': row.id })
        .then(response => {
          for (let x = 0; x < response.data.data.applicantBank.length; x++) {
            var a = response.data.data.applicantBank[x]
            if (a.status === 1) {
              a.status = '不通过'
            } else if (a.status === 2) {
              a.status = '通过'
            } else {
              a.status = '未受理'
            }
            for (let j = 0; j < response.data.data.bankslist.length; j++) {
              var b = response.data.data.bankslist[j]
              if (a.bankId === b.id) {
                a['bankName'] = b.name
                a['subBranch'] = b.subBranch
              }
            }
          }
          this.dataForm.applicantBank = response.data.data.applicantBank
          console.log(this.dataForm.applicantBank)
          this.dialogAduitFormVisible = true
        }).catch(response => {
          console.log(response)
          this.$notify.error({
            title: '失败',
            message: response.data.errmsg
          })
        })
    },
    onChangeAuditStatus(value) {
      if (value === 12) {
        this.dataForm.isApprove = true
        this.dataForm.submitStatus = 12
      } else {
        this.dataForm.isApprove = false
        this.dataForm.submitStatus = 9
      }
    },
    handleApplicantSelectionChange(value) {
      this.multipleSelection = value
    },
    handleDownload() {
      if (this.multipleSelection.length > 0) {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = [
            '姓名',
            '性别',
            '联系方式',
            '申请人（法人）类别',
            '申请额度'
          ]
          const filterVal = ['name', 'sex', 'phoneNumber', 'applicantType', 'applicantAmount']
          excel.export_json_to_excel2(
            tHeader,
            this.multipleSelection,
            filterVal,
            '申请人'
          )
          this.downloadLoading = false
        })
      } else {
        this.$notify.warning({
          title: '无法下载',
          message: '请选择数据'
        })
      }
    },
    uploadOverrun: function() {
      this.$message({
        type: 'error',
        message: '上传文件个数超出限制!最多上传5张图片!'
      })
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
          this.dataForm.qrCodeSignature = response.data.data.signatureUrl
        } else {
          this.$notify.warning({
            title: '提示',
            message: '请在小程序里面上传电子签名'
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
