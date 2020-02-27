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
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" label="ID" min-width="20px" prop="id" />
      <el-table-column align="center" label="申请人姓名" prop="name" />
      <el-table-column align="center" label="性别" prop="sex" />
      <el-table-column align="center" label="婚姻状况" prop="maritalStatus" />
      <el-table-column align="center" label="身份证号" prop="idCardNumber" />
      <el-table-column align="center" label="联系方式" prop="phoneNumber" />
      <el-table-column align="center" label="申请人类别" prop="applicantType" />
      <el-table-column align="center" label="申请额度" prop="applicantAmount" />
      <!--  <el-table-column align="center" label="审批状态" prop="statusLable" /> -->
      <!--   <el-table-column align="center" label="审核状态" prop="statusName" > -->
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
      <el-table-column align="center" label="操作" width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-permission="['POST /admin/ba/update']" type="primary" size="mini" @click="handleView(scope.row)">查看</el-button>
          <el-button v-permission="['POST /admin/ba/update']" type="primary" :disabled="scope.row.has_edit" size="mini" @click="handleAudit(scope.row)">审核</el-button>
          <!--           <el-button v-permission="['POST /admin/applicant/delete']" type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @paginat3ion="getList" />

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="right" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="受理银行" prop="name">
              <el-select v-model="dataForm.bankId" placeholder="选择审核银行">
                <el-option
                  v-for="item in dataForm.bankList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="支行" prop="subBranch">
              <el-select v-model="dataForm.subBranch" placeholder="选择支行">
                <el-option
                  v-for="item in dataForm.bankList"
                  :key="item.id"
                  :label="item.subBranch"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经办人" prop="opertator">
              <el-input v-model="dataForm.opertator" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="授信额度" prop="credit">
              <el-input v-model="dataForm.credit" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="放贷日期" prop="bLendingDate">
              <el-date-picker
                v-model="dataForm.bLendingDate"
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
              <el-input v-model="dataForm.bPeriodLoan" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="还款方式" prop="pepayment">
              <el-input v-model="dataForm.bRepayment" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="利率" prop="interestRate">
              <el-input v-model="dataForm.bInterestRate" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="利息/期" prop="interestPeriod">
              <el-input v-model="dataForm.bInterestPeriod" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="银行受理情况" prop="comment">
          <el-input v-model="dataForm.bComment" type="textarea" :rows="7" />
        </el-form-item>
        <el-form-item label="是否审核通过" prop="submitStatus">
          <el-select v-model="dataForm.status" prop="submitStatus" style="width:25%">
            <el-option :value="2" label="通过" />
            <el-option :value="1" label="不通过" />
          </el-select>
        </el-form-item>
        <el-input v-model="dataForm.scAuditDate" type="hidden" />
        <el-input v-model="dataForm.scOperator" type="hidden" />
        <el-input v-model="dataForm.applicantId" type="hidden" />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确定</el-button>
        <el-button v-else type="primary" @click="updateData">确定</el-button>
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
import { readApplicantBank, listApplicant, createAlicantBank } from '@/api/bankAudit'
import { getToken } from '@/utils/auth'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

const queryStatusMap = {
  '7': '待审核',
  '8': '不通过',
  '9': '通过'
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
      statusMap: [
        '申请人已提交',
        '人社审核待补充',
        '人社审核不通过',
        '人社审核通过',
        '担保公司审核待补充',
        '担保公司审核不通过',
        '担保公司审核通过',
        '银行审核不通过',
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
        bName: '',
        opertator: '',
        applicantId: null,
        bankList: []
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      rules: {
        name: [
          { required: true, message: '品牌商名称不能为空', trigger: 'blur' }
        ]
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
              // element['has_edit'] = true
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
    handleCreate(row) {

    },
    handleAudit(row) {
      // 显示银行数据
      console.log(row)
      readApplicantBank({ 'id': row.id })
        .then(response => {
          // console.log(response.data.data)
          this.dataForm.opertator = response.data.data.opertator
          this.dataForm.bankList = response.data.data.bankslist
          this.dataForm.applicantId = row.id
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
      // if (row.submitStatus != 3 && row.submitStatus != 6 && row.submitStatus != 8 && row.submitStatus != 9) {
      //   this.$router.push({ path: '/ba/detail', query: { id: row.id, action: row.submitStatus }})
      // } else {
      //   this.$message.error({
      //     title: '失败',
      //     message: '数据已审核，无法操作'
      //   })
      // }
    },
    handleView(row) {
      this.$router.push({ path: '/ba/detailView', query: { id: row.id, action: row.submitStatus }})
    },
    handleUpdate(row) {
      this.$router.push({ path: '/ba/edit', query: { id: row.id }})
    },
    updateData() {

    },
    handleDownload() {
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
          this.list,
          filterVal,
          '申请人'
        )
        this.downloadLoading = false
      })
    }
  }
}
</script>
