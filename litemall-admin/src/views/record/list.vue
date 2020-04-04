<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入姓名" />
      <el-input v-model="listQuery.bankName" clearable class="filter-item" style="width: 200px;" placeholder="请输入货款银行" />
      <el-button v-permission="['GET /admin/record/list']" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button v-permission="['POST /admin/record/create']" class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
      <el-button v-permission="['POST /admin/record/importData']" :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button>
      <el-button v-permission="['POST /admin/record/create']" :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-upload" @click="handleImport">导入</el-button>
      <el-button v-permission="['POST /admin/record/create']" :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownloadTemplte">模板下载</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row @selection-change="handleApplicantSelectionChange">
      <el-table-column type="selection" min-width="30px" />
      <el-table-column align="center" label="ID" min-width="50px" prop="id" />
      <el-table-column align="center" label="姓名" prop="name" />
      <el-table-column align="center" label="身份证号" property="idCardNo" />
      <el-table-column align="center" label="贷款发放日期" prop="loanStartDate" />
      <el-table-column align="center" label="贷款到期日期" prop="loanEndDate" />
      <el-table-column align="center" label="贷款期限" prop="periodLoan" />
      <el-table-column align="center" label="贷款金额" prop="credit" />
      <el-table-column align="center" label="利率" prop="interest" />
      <el-table-column align="center" label="贷款银行" prop="bankName" />
      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-permission="['POST /admin/record/update']" type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button v-permission="['POST /admin/record/delete']" type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="dataForm.name" />
        </el-form-item>
        <el-form-item label="身份证号" prop="idCardNo">
          <el-input v-model="dataForm.idCardNo" />
        </el-form-item>
        <el-form-item label="贷款发放日期" prop="loanStartDate">
          <el-date-picker
            v-model="dataForm.loanStartDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            style="width:100%"
          />
        </el-form-item>
        <el-form-item label="贷款到期日期" prop="loanEndDate">
          <el-date-picker
            v-model="dataForm.loanEndDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            style="width:100%"
          />
        </el-form-item>
        <el-form-item label="贷款期限" prop="periodLoan">
          <el-input v-model="dataForm.periodLoan" />
        </el-form-item>
        <el-form-item label="贷款金额" prop="credit">
          <el-input v-model="dataForm.credit" />
        </el-form-item>
        <el-form-item label="利率" prop="interest">
          <el-input v-model="dataForm.interest" />
        </el-form-item>
        <el-form-item label="贷款银行" prop="bankName">
          <el-input v-model="dataForm.bankName" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确定</el-button>
        <el-button v-else type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogUploadVisible">
      <div class="app-container">
        <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
        <el-table :data="tableData" border highlight-current-row height="250" style="width: 100%;margin-top:20px;">
          <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUploadVisible = false">取消</el-button>
        <el-button type="primary" @click="saveImportData">确定</el-button>

      </div>
    </el-dialog>

  </div>
</template>

<style>
.avatar-uploader .el-upload {
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
import { listRecord, createRecord, updateRecord, deleteRecord, importData } from '@/api/record'
import { getToken } from '@/utils/auth'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import moment from 'moment'

export default {
  name: 'Record',
  components: { Pagination, UploadExcelComponent },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        idCardNo: undefined,
        name: undefined,
        bankName: undefined,
        sort: 'add_time',
        order: 'desc'
      },
      dataForm: {
        id: undefined,
        name: '',
        desc: '',
        floorPrice: undefined,
        picUrl: undefined
      },
      dialogFormVisible: false,
      dialogUploadVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建',
        upload: '上传'
      },
      rules: {
        name: [
          { required: true, message: '品牌商名称不能为空', trigger: 'blur' }
        ]
      },
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
      tableData: [],
      tableHeader: [],
      multipleSelection: []
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
      listRecord(this.listQuery)
        .then(response => {
          // for (let index = 0; index < response.data.data.list.length; index++) {
          //   //const element = response.data.data.list[index]
          //   // element['loanStartDate'] = moment(element['loanStartDate']).format('YYYY-MM-DD')
          //   // element['loanEndDate'] = moment(element['loanEndDate']).format('YYYY-MM-DD')
          // }
          this.list = response.data.data.list
          this.total = response.data.data.total
          this.listLoading = false
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
    resetForm() {
      this.dataForm = {
        id: undefined,
        name: '',
        desc: '',
        floorPrice: undefined,
        picUrl: undefined
      }
    },
    handleCreate() {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          createRecord(this.dataForm)
            .then(response => {
              this.list.unshift(response.data.data)
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
        }
      })
    },
    handleUpdate(row) {
      this.dataForm = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          updateRecord(this.dataForm)
            .then(() => {
              for (const v of this.list) {
                if (v.id === this.dataForm.id) {
                  const index = this.list.indexOf(v)
                  this.list.splice(index, 1, this.dataForm)
                  break
                }
              }
              this.dialogFormVisible = false
              this.$notify.success({
                title: '成功',
                message: '更新成功'
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
    handleDelete(row) {
      deleteRecord(row)
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
        })
        .catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.data.errmsg
          })
        })
    },
    handleDownload() {
      if (this.multipleSelection.length > 0) {
        this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = [
          '姓名',
          '身份证号',
          '贷款发放日期',
          '贷款到期日期',
          '贷款期限',
          '贷款金额',
          '利率',
          '贷款银行'
        ]
        const filterVal = ['name', 'idCardNo', 'loanStartDate', 'loanEndDate', 'periodLoan', 'credit', 'interest', 'bankName']
        excel.export_json_to_excel2(
          tHeader,
          this.multipleSelection,
          filterVal,
          '贷款记录'
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
    handleDownloadTemplte() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = [
            '姓名',
            '身份证号',
            '贷款发放日期',
            '贷款到期日期',
            '贷款期限',
            '贷款金额',
            '利率',
            '贷款银行'
          ]
          const filterVal = ['name', 'idCardNo', 'loanStartDate', 'loanEndDate', 'periodLoan', 'credit', 'interest', 'bankName']
          excel.export_json_to_excel2(
            tHeader,
            [],
            filterVal,
            '历史数据模板'
          )
          this.downloadLoading = false
        })
    },
    handleImport() {
      this.dialogUploadVisible = true
      this.dialogStatus = 'upload'
      this.tableData = []
      this.tableHeader = []
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 2

      if (isLt1M) {
        return true
      }

      this.$message({
        message: '请不要上传超过2M的文件.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      for (let index = 0; index < results.length; index++) {
        const element = results[index]
        element['贷款发放日期'] = moment(element['贷款发放日期']).format('YYYY-MM-DD')
        element['贷款到期日期'] = moment(element['贷款到期日期']).format('YYYY-MM-DD')
      }
      this.tableData = results
      this.tableHeader = header
    },
    saveImportData() {
      if (this.tableData.length === 0) {
        this.$message({
          message: '请上传文件',
          type: 'error'
        })
        return true
      }

      const isValidHeader = Object.keys(this.tableData[0]).toString() !== '姓名,身份证号,贷款发放日期,贷款到期日期,贷款期限,贷款金额,利率,贷款银行'
      if (isValidHeader) {
        this.$message({
          message: 'Excel文件模板不正确,请重新下载模板.',
          type: 'error'
        })
        return false
      }

      var recordList = []
      for (let i = 0; i < this.tableData.length; i++) {
        const jsonData = this.tableData[i]
        const record = {
          name: jsonData['姓名'],
          idCardNo: jsonData['身份证号'],
          loanStartDate: jsonData['贷款发放日期'], // moment(jsonData['贷款发放日期']).format('YYYY-MM-DD hh:mm:ss'),
          loanEndDate: jsonData['贷款到期日期'], // moment(jsonData['贷款到期日期']).format('YYYY-MM-DD hh:mm:ss'),
          periodLoan: jsonData['贷款期限'],
          credit: jsonData['贷款金额'],
          interest: jsonData['利率'],
          bankName: jsonData['贷款银行']
        }
        recordList.push(record)
      }
      importData(recordList)
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '上传数据成功'
          })
          this.listQuery.page = 1
          this.getList()
          this.dialogUploadVisible = false
        })
        .catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.data.errmsg
          })
        })
    },
    handleApplicantSelectionChange(value) {
      this.multipleSelection = value
    }
  }
}
</script>
