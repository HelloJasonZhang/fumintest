<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入申请人" />
      <el-select v-model="listQuery.submitStatusArray" style="width: 200px" class="filter-item" placeholder="请选择审核状态" clearable>
        <el-option v-for="(key, value) in queryStatusMap" :key="key" :label="key" :value="value" />
      </el-select>
      <el-button v-permission="['GET /admin/assure/list']" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <!--      <el-button v-permission="['POST /admin/applicant/create']" class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">创建</el-button> -->
      <!--
      <el-button v-permission="['POST /admin/applicant/create']" class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">担保公司审核</el-button>
      <el-button v-permission="['POST /admin/applicant/create']" class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">银行审核</el-button> -->
      <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row @selection-change="handleApplicantSelectionChange">
      <el-table-column type="selection" min-width="30px" />
      <el-table-column align="center" label="ID" min-width="50px" prop="id" />
      <el-table-column align="center" label="姓名" prop="name" />
      <el-table-column align="center" label="身份证号" prop="idCardNumber" />
      <el-table-column align="center" label="联系方式" prop="phoneNumber" />
      <el-table-column align="center" label="类别" prop="applicantTypeLable" />
      <el-table-column align="center" label="银行" prop="bankName" />
      <el-table-column align="center" label="申请额度(万元)" prop="applicantAmount" />
      <el-table-column align="center" label="贴息类型" prop="hsDiscount">
        <template slot-scope="scope">
          <el-tag size="mini">{{ scope.row.hsDiscount }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" prop="isAvailable">
        <template slot-scope="scope">
          <el-tag size="mini">{{ scope.row.isAvailable ? "作废" : "有效" }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="审核状态"
        width="200"
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
      <el-table-column align="center" label="操作" width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleView(scope.row)">查看</el-button>
          <el-button type="success" :disabled="scope.row.has_edit" size="mini" @click="handleAudit(scope.row)">复核</el-button>
          <!--           <el-button v-permission="['POST /admin/applicant/delete']" type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" append-to-body>
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="right" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="是否审核通过" prop="status">
          <el-select v-model="dataForm.status" style="width:100%" @change="onChangeHrSubmitstatus">
            <el-option :value="9" label="通过" />
            <el-option :value="6" label="不通过" />
          </el-select>
        </el-form-item>
        <el-form-item label="复核意见" prop="scComment">
          <el-input v-model="dataForm.scComment" type="textarea" :rows="7" />
        </el-form-item>
        <el-form-item v-if="dataForm.isApproval" label="电子签名">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateData">确定</el-button>
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
import { listApplicant, updateApplicant } from '@/api/assureReview'
import { getToken } from '@/utils/auth'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { MessageBox } from 'element-ui'
import { readSignature } from '@/api/signature'
import { qrCodeUrl, uuid2 } from '@/utils'
import QRCode from 'qrcodejs2'

const queryStatusMap = {
  '5': '待审核',
  '6': '待补充',
  '7': '复核不通过',
  '8': '待复核',
  '9': '复核通过',
  '10': '银行待受理',
  '11': '银行已受理',
  '12': '银行复核',
  '13': '结束'
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
        submitStatusArray: '8',
        order: 'asc'
      },
      dataForm: {
        id: undefined,
        status: '',
        qrCodeSignature: ''
      },
      rules: {
        status: [{ required: true, message: '此字段不能为空', trigger: 'change' }]
      },
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
        { step: 1, status: 'process' }, // 人社通过 4
        { step: 1, status: 'success' }, // 人社复核 5
        { step: 2, status: 'wait' }, // 担保公司待补充 6
        { step: 2, status: 'error' }, // 担保公司不通过 7
        { step: 2, status: 'process' }, // 担保公司通过 8
        { step: 2, status: 'success' }, // 担保公司复核 9
        { step: 3, status: 'error' }, // 银行待不通过 10
        { step: 3, status: 'process' }, // 银行通过 11
        { step: 3, status: 'success' }, // 银行复核 12
        { step: 3, status: 'finish' } // 银行复核 结束 13
      ],
      queryStatusMap: queryStatusMap,
      downloadLoading: false,
      multipleSelection: [],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '复核',
        create: '复核'
      },
      uuid: '',
      qrCodeDialogVisible: false,
      isApproval: false
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
            element['has_edit'] = true
            if (element.submitStatus === 8) {
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
    handleAudit(row) {
      this.resetForm()
      this.dataForm = Object.assign({}, row)
      this.dataForm.status = null
      this.dataForm.scComment = null
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleView(row) {
      this.$router.push({ path: '/assure/reivewDetailView', query: { id: row.id, action: row.submitStatus }})
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
    resetForm() {
      this.dataForm = {
        id: undefined,
        status: null,
        qrCodeSignature: null
      }
    },
    updateData() {
      if (this.dataForm.isApproval && (this.dataForm.qrCodeSignature == null || this.dataForm.qrCodeSignature === '')) {
        MessageBox.alert('请上传电子签名', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return
      }
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.dataForm.submitStatus = this.dataForm.status
          updateApplicant(this.dataForm)
            .then(() => {
              this.getList()
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
    onChangeHrSubmitstatus: function(value) {
      if (value === 9) {
        this.dataForm.isApproval = true
      } else {
        this.dataForm.isApproval = false
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
          this.dataForm.qrCodeSignature = response.data.data.signatureUrl
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
