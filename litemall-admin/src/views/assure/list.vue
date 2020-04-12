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
      <el-table-column align="center" label="操作" width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleView(scope.row)">查看</el-button>
          <el-button type="success" :disabled="scope.row.has_edit" size="mini" @click="handleAudit(scope.row)">审核</el-button>
          <!--           <el-button v-permission="['POST /admin/applicant/delete']" type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
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
import { listApplicant } from '@/api/assure'
import { getToken } from '@/utils/auth'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

const queryStatusMap = {
  '5': '待审核',
  '6': '待补充',
  '7': '通过',
  '8': '复核通过'
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
      dataForm: {
        id: undefined,
        name: '',
        desc: '',
        floorPrice: undefined,
        picUrl: undefined
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
      console.log(this.listQuery)
      listApplicant(this.listQuery)
        .then(response => {
          this.list = response.data.data.list
          this.total = response.data.data.total
          this.listLoading = false
          for (let index = 0; index < this.list.length; index++) {
            var element = this.list[index]
            if (element.submitStatus !== 6 && element.submitStatus !== 5) {
              element['has_edit'] = true
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
    handleCreate() {
      this.$router.push({ path: '/assure/create' })
    },
    handleAudit(row) {
      this.$router.push({ path: '/assure/detail', query: { id: row.id, action: row.submitStatus }})
    },
    handleView(row) {
      this.$router.push({ path: '/assure/detailView', query: { id: row.id, action: row.submitStatus }})
    },
    handleUpdate(row) {
      this.$router.push({ path: '/hr/edit', query: { id: row.id }})
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
    }
  }
}
</script>
