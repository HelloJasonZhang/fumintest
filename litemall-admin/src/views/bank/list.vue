<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入申请人" />
      <el-select v-model="listQuery.submitStatusArray" style="width: 200px" class="filter-item" placeholder="请选择审核状态" clearable>
        <el-option v-for="(key, value) in queryStatusMap" :key="key" :label="key" :value="value" />
      </el-select>
      <el-button v-permission="['GET /admin/ba/list']" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
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
      <el-table-column align="center" label="类别" prop="applicantType" />
      <el-table-column align="center" label="申请额度" prop="applicantAmount" />
      <el-table-column align="center" label="状态" prop="isAvailable">
        <template slot-scope="scope">
          <el-tag size="mini">{{ scope.row.isAvailable ? "作废" : "有效" }}</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="审核状态" prop="submitStatus" /> -->
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
          <el-button v-permission="['POST /admin/ba/update']" type="primary" size="mini" @click="handleAuditView(scope.row)">查看</el-button>
          <el-button v-if="scope.row.submitStatus === 7 && !scope.row.isAvailable " v-permission="['POST /admin/ba/update']" type="primary" :disabled="scope.row.has_edit" size="mini" @click="handleAudit(scope.row)">受理</el-button>
          <el-button v-if="scope.row.submitStatus === 9 && !scope.row.isAvailable " v-permission="['POST /admin/ba/update']" type="success" :disabled="scope.row.has_finish" size="mini" @click="handleFinish(scope.row)">结束</el-button>
          <!--           <el-button v-permission="['POST /admin/applicant/delete']" type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @paginat3ion="getList" />

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="70%">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="right" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="是否审核通过" prop="status">
              <el-select v-model="dataForm.status" prop="status" style="width:100%" @change="onChangeAuditStatus">
                <el-option :value="2" label="通过" />
                <el-option :value="1" label="不通过" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-show="false" :span="8">
            <el-form-item label="受理银行" prop="name">
              <div class="block">
                <el-cascader v-model="dataForm.bankCascader" :options="dataForm.cascaderOptions" :props="{ expandTrigger: 'hover' }" style="width:100%" @change="handleCascaderChange" />
              </div>
            </el-form-item>
          </el-col>
          <el-col v-show="false" :span="8">
            <el-form-item label="经办人" prop="opertator">
              <el-input v-model="dataForm.opertator" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="dataForm.isApprove">
          <el-row>
            <el-col :span="12">
              <el-form-item label="贷款发放日" prop="loanStartDate">
                <el-date-picker
                  v-model="dataForm.loanStartDate"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :picker-options="pickerOptions"
                  style="width:100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="贷款到期日" prop="loanEndDate">
                <el-date-picker
                  v-model="dataForm.loanEndDate"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :picker-options="pickerOptions"
                  style="width:100%"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="贷款期限" prop="periodLoan">
                <el-input v-model="dataForm.periodLoan" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="贷款金融" prop="loanFinance">
                <el-input v-model="dataForm.loanFinance" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-col :span="20">
            <el-form-item label="贷款凭证">
              <el-upload
                :action="uploadPath"
                :limit="100"
                :file-list="loanVoucherUrlList"
                :headers="headers"
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
          </el-col>
          <!-- <el-row>
            <el-col :span="8">
              <el-form-item label="授信额度(万元)" prop="credit">
                <el-input v-model="dataForm.credit" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="放贷日期" prop="lendingDate">
                <el-date-picker
                  v-model="dataForm.lendingDate"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :picker-options="pickerOptions"
                  style="width:100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="贷款期限" prop="periodLoan">
                <el-input v-model="dataForm.periodLoan" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="还款方式" prop="repayment">
                <el-input v-model="dataForm.repayment" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="利率(%)" prop="interest">
                <el-input v-model="dataForm.interest" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="利息/期" prop="interestPeriod">
                <el-input v-model="dataForm.interestPeriod" />
              </el-form-item>
            </el-col>
          </el-row> -->
        </el-row>
        <el-form-item label="银行受理情况" prop="auditComment">
          <el-input v-model="dataForm.auditComment" type="textarea" :rows="7" />
        </el-form-item>
        <el-input v-model="dataForm.applicantId" type="hidden" />
        <el-input v-model="dataForm.id" type="hidden" />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确定</el-button>
        <!-- <el-button v-else type="primary" @click="updateData">确定</el-button> -->
      </div>
    </el-dialog>

    <!-- 查看详情对话框 -->
    <el-dialog title="受理详情" :visible.sync="dialogAduitFormVisible" width="70%">
      <template>
        <el-table :data="dataForm.applicantBank" stripestyle="width: 100%">
          <el-table-column align="center" prop="bankName" label="银行" />
          <el-table-column align="center" prop="subBranch" label="分行" />
          <el-table-column align="center" prop="loanStartDate" label="贷款发放日" />
          <el-table-column align="center" prop="loanEndDate" label="贷款到期日" />
          <el-table-column align="center" prop="loanFinance" label="贷款金融" />
          <!-- <el-table-column align="center" prop="credit" label="授信额度(万元)" />
          <el-table-column align="center" prop="opertator" label="经办人" />
          <el-table-column align="center" prop="lendingDate" label="放贷日期" width="180" />
          <el-table-column align="center" prop="periodLoan" label="还款方式" />
          <el-table-column align="center" prop="repayment" label="还款方式" />
          <el-table-column align="center" prop="interest" label="利率(%)" />
          <el-table-column align="center" prop="interestPeriod" label="利息/期" /> -->
          <el-table-column align="center" prop="auditComment" label="银行受理情况" width="180" />
          <el-table-column align="center" prop="status" label="受理状态" />
        </el-table>
      </template>
    </el-dialog>

    <!-- 结束对话框 -->
    <el-dialog title="结束审批流程" :visible.sync="dialogFinnishFormVisible" width="70%">
      <template>
        <el-table ref="multipleTable" :data="dataForm.applicantBank" stripestyle="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column align="center" prop="bankName" label="银行" />
          <el-table-column align="center" prop="subBranch" label="分行" />
          <el-table-column align="center" prop="loanStartDate" label="贷款发放日" />
          <el-table-column align="center" prop="loanEndDate" label="贷款到期日" />
          <el-table-column align="center" prop="loanFinance" label="贷款金融" />
          <!-- <el-table-column align="center" prop="credit" label="授信额度(万元)" />
          <el-table-column align="center" prop="opertator" label="经办人" />
          <el-table-column align="center" prop="lendingDate" label="放贷日期" width="180" />
          <el-table-column align="center" prop="periodLoan" label="还款方式" />
          <el-table-column align="center" prop="repayment" label="还款方式" />
          <el-table-column align="center" prop="interest" label="利率(%)" />
          <el-table-column align="center" prop="interestPeriod" label="利息/期" /> -->
          <el-table-column align="center" prop="auditComment" label="银行受理情况" width="180" />
          <el-table-column align="center" prop="status" label="受理状态" />
        </el-table>
      </template>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFinnishFormVisible = false">取消</el-button>
        <el-button type="primary" :disabled="canFinish" @click="createFinishAudit">确定</el-button>
      </div>
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
import { readApplicantBank, listApplicant, createAlicantBank, createFinishAudit } from '@/api/bankAudit'
import { uploadPath } from '@/api/storage'
import { getToken } from '@/utils/auth'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

const queryStatusMap = {
  '7': '待审核',
  '8': '不通过',
  '9': '通过',
  '10': '放贷'
}

export default {
  name: 'Applicant',
  components: { Pagination },
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
        '担保公司审核待补充',
        '担保公司审核不通过',
        '担保公司审核通过',
        '银行审核不通过',
        '银行审核受理',
        '银行审核通过'
      ],
      setepStatusArray: [
        { step: 0, status: 'success' },
        { step: 1, status: 'wait' },
        { step: 1, status: 'error' },
        { step: 1, status: 'success' },
        { step: 2, status: 'wait' },
        { step: 2, status: 'error' },
        { step: 2, status: 'success' },
        { step: 3, status: 'error' },
        { step: 3, status: 'process' },
        { step: 3, status: 'finish' }
      ],
      queryStatusMap: queryStatusMap,
      downloadLoading: false,
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
      dataForm: {
        id: null,
        opertator: '',
        applicantId: null,
        bankList: [],
        cascaderOptions: [],
        bankCascader: [],
        bankId: null,
        loanStartDate: null,
        loanEndDate: null,
        loanFinance: null,
        credit: null,
        lendingDate: null,
        periodLoan: null,
        repayment: null,
        interest: null,
        interestPeriod: null,
        auditComment: null,
        status: null,
        applicantBank: [],
        isApprove: false,
        loanVoucherUrl: []
      },
      dialogFormVisible: false,
      dialogAduitFormVisible: false,
      dialogFinnishFormVisible: false,
      canFinish: true,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '受理'
      },
      rules: {
        name: [
          { required: true, message: '此字段不能为空', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '此字段不能为空', trigger: 'change' }
        ]
      },
      multipleSelection: [],
      loanVoucherUrlList: []
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
          for (let index = 0; index < this.list.length; index++) {
            var element = this.list[index]
            if (element.submitStatus !== 7) {
              element['has_edit'] = true
            }
            if (element.submitStatus !== 9) {
              element['has_finish'] = true
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
    createData() {
      createAlicantBank(this.dataForm)
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
    },
    resetForm() {
      this.dataForm = {
        id: undefined,
        name: '',
        desc: '',
        floorPrice: undefined,
        picUrl: undefined
      }
    },
    handleCascaderChange(value) {
      this.dataForm.bankId = value[0]
      if (this.dataForm.applicantBank.length > 1) {
        for (var i = 0; i < this.dataForm.applicantBank.length; i++) {
          if (this.dataForm.applicantBank[i].id === value[0]) {
            var applicantBank = this.dataForm.applicantBank[i]
            this.dataForm.id = applicantBank.id
            this.dataForm.opertator = applicantBank.opertator
            this.dataForm.applicantId = applicantBank.applicantId
            this.dataForm.credit = applicantBank.credit
            this.dataForm.lendingDate = applicantBank.lendingDate
            this.dataForm.periodLoan = applicantBank.periodLoan
            this.dataForm.repayment = applicantBank.repayment
            this.dataForm.interest = applicantBank.interest
            this.dataForm.interestPeriod = applicantBank.interestPeriod
            this.dataForm.auditComment = applicantBank.auditComment
            this.dataForm.status = applicantBank.status
          }
        }
      }
    },
    handleFinish(row) {
      // 显示银行受理数据
      readApplicantBank({ 'id': row.id })
        .then(response => {
          var finishData = []
          for (let x = 0; x < response.data.data.applicantBank.length; x++) {
            var a = response.data.data.applicantBank[x]
            if (a.status === 2) {
              a.status = '通过'
            } else {
              a.status = '不通过'
            }
            for (let j = 0; j < response.data.data.bankslist.length; j++) {
              var b = response.data.data.bankslist[j]
              if (a.bankId === b.id) {
                a['bankName'] = b.name
                a['subBranch'] = b.subBranch
              }
            }
            finishData.push(a)
          }
          this.dataForm.applicantBank = finishData
          this.dataForm.applicantId = row.id
          this.dialogFinnishFormVisible = true
        }).catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.data.errmsg
          })
        })
    },
    createFinishAudit() {
      createFinishAudit(this.dataForm)
        .then(response => {
          this.dialogFinnishFormVisible = false
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
    },
    handleSelectionChange(val) {
      if (val.length > 1) {
        this.$alert('', '只能选择一条数据', {
          confirmButtonText: '确定',
          callback: action => {
            this.$refs.multipleTable.clearSelection()
          }
        })
      } else if (val.length === 1) {
        var applicantBank = val[0]
        this.dataForm.id = applicantBank.id
        this.dataForm.bankId = applicantBank.bankId
        this.dataForm.credit = applicantBank.credit
        this.dataForm.lendingDate = applicantBank.lendingDate
        this.dataForm.periodLoan = applicantBank.periodLoan
        this.dataForm.repayment = applicantBank.repayment
        this.dataForm.interest = applicantBank.interest
        this.dataForm.interestPeriod = applicantBank.interestPeriod
        this.dataForm.auditComment = applicantBank.auditComment
        this.dataForm.loanStartDate = applicantBank.loanStartDate
        this.dataForm.loanEndDate = applicantBank.loanEndDate
        this.dataForm.loanFinance = applicantBank.loanFinance
        this.dataForm.loanVoucherUrl = applicantBank.loanVoucherUrl
        this.canFinish = false
      }
    },
    handleAudit(row) {
      // 显示银行数据
      readApplicantBank({ 'id': row.id })
        .then(response => {
          console.log(response)
          this.dataForm.cascaderOptions = []
          this.dataForm.bankList = response.data.data.bankslist
          this.dataForm.applicantBank = response.data.data.applicantBank
          for (var i = 0; i < this.dataForm.bankList.length; i++) {
            var bank = this.dataForm.bankList[i]
            this.dataForm.cascaderOptions.push({
              value: bank.id,
              label: bank.name,
              children: [{
                value: bank.subBranch,
                label: bank.subBranch
              }]
            })
          }

          if (this.dataForm.applicantBank.length === 1) {
            var applicantBank = this.dataForm.applicantBank[0]
            this.dataForm.id = applicantBank.id
            this.dataForm.opertator = response.data.data.opertator
            this.dataForm.applicantId = row.id
            var subBranch = null
            for (var i = 0; i < this.dataForm.bankList.length; i++) {
              if (this.dataForm.bankList[i].id === applicantBank.bankId) {
                subBranch = this.dataForm.bankList[i].subBranch
              }
            }
            if (subBranch) {
              this.dataForm.bankCascader = [applicantBank.bankId, subBranch]
            }
            this.dataForm.bankId = applicantBank.bankId
            this.dataForm.credit = applicantBank.credit
            this.dataForm.lendingDate = applicantBank.lendingDate
            this.dataForm.periodLoan = applicantBank.periodLoan
            this.dataForm.repayment = applicantBank.repayment
            this.dataForm.interest = applicantBank.interest

            this.dataForm.loanStartDate = applicantBank.loanStartDate
            this.dataForm.loanEndDate = applicantBank.loanEndDate
            this.dataForm.loanFinance = applicantBank.loanFinance
            this.dataForm.loanVoucherUrl = applicantBank.loanVoucherUrl
            this.dataForm.interestPeriod = applicantBank.interestPeriod
            this.dataForm.auditComment = applicantBank.auditComment
            this.dataForm.status = applicantBank.status
          }

          this.dialogStatus = 'create'
          this.dialogFormVisible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
        }).catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.data.errmsg
          })
        })
    },
    handleView(row) {
      this.$router.push({ path: '/ba/detailView', query: { id: row.id, action: row.submitStatus }})
    },
    handleUpdate(row) {
      this.$router.push({ path: '/ba/edit', query: { id: row.id }})
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
      if (value === 2) {
        this.dataForm.isApprove = true
      } else {
        this.dataForm.isApprove = false
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
    handleRemove: function(file, fileList) {
      for (var i = 0; i < this.dataForm.loanVoucherUrl.length; i++) {
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

        if (this.dataForm.loanVoucherUrl[i] === url) {
          this.dataForm.loanVoucherUrl.splice(i, 1)
        }
      }
    },
    handleExtraPicUrl: function(response) {
      if (response.errno === 0) {
        if (this.dataForm.loanVoucherUrl == null) {
          this.dataForm.loanVoucherUrl = []
        }
        this.dataForm.loanVoucherUrl.push(response.data.url)
      }
    }
  }
}
</script>
