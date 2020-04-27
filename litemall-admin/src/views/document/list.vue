<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.docName" clearable class="filter-item" style="width: 200px;" placeholder="请输入富文本标题" />
      <el-button v-permission="['GET /admin/Document/list']" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <div class="operator-container">
      <el-button v-permission="['POST /admin/Document/create']" class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column align="center" label="ID" prop="id" />
      <el-table-column align="center" label="文本类型" prop="docType">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.docTypeName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" prop="active">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.active ? "启用" : "未启用" }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="文本标题" min-width="200" prop="docName" />
      <el-table-column align="center" label="文本详情" prop="content">
        <template slot-scope="scope">
          <el-dialog :visible.sync="contentDialogVisible" title="文本详情">
            <div v-html="contentDetail" />
          </el-dialog>
          <el-button type="primary" size="mini" @click="showContent(scope.row.detail)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-permission="['POST /admin/Document/update']" type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button v-permission="['POST /admin/Document/delete']" type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>

  </div>
</template>

<style>
.el-dialog {
  width: 800px;
}
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
import { listDocument, deleteDocument, batchDeleteDocument } from '@/api/document'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import _ from 'lodash'

export default {
  name: 'Document',
  components: { BackToTop, Pagination },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        docName: undefined,
        sort: 'add_time',
        order: 'desc'
      },
      options: [{
        value: 'id',
        label: '按序号排序'
      }],
      multipleSelection: [],
      contentDetail: '',
      contentDialogVisible: false,
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      listDocument(this.listQuery)
        .then(response => {
          for (let index = 0; index < response.data.data.list.length; index++) {
            const element = response.data.data.list[index]
            if (element.docType === 'policy') {
              element['docTypeName'] = '贷款政策说明'
            } else if (element.docType === 'workflow') {
              element['docTypeName'] = '贷款流程说明'
            } else if (element.docType === 'caizheng_policy') {
              element['docTypeName'] = '财政部政策说明'
            } else if (element.docType === 'danbao_desc') {
              element['docTypeName'] = '用户须知'
            } else if (element.docType === 'undertaking') {
              element['docTypeName'] = '承诺书'
            } else if (element.docType === 'bank_desc') {
              element['docTypeName'] = '选择银行须知'
            } else if (element.docType === 'bank') {
              element['docTypeName'] = '银行说明'
            } else if (element.docType === 'dongfang') {
              element['docTypeName'] = '东方农商行银行说明'
            } else if (element.docType === 'suzhou') {
              element['docTypeName'] = '苏州银行说明'
            } else if (element.docType === 'jiangsu') {
              element['docTypeName'] = '江苏银行说明'
            }
          }
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
    handleCreate() {
      this.$router.push({ path: '/sys/document-create' })
    },
    handleUpdate(row) {
      this.$router.push({ path: '/sys/document-edit', query: { id: row.id }})
    },
    handleDelete(row) {
      deleteDocument(row)
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '删除富文本成功'
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    showContent(content) {
      this.contentDetail = content
      this.contentDialogVisible = true
    },
    handleBatchDelete() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请选择至少一条记录')
        return
      }
      const ids = []
      _.forEach(this.multipleSelection, function(item) {
        ids.push(item.id)
      })
      batchDeleteDocument({ ids: ids })
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '批量删除专题成功'
          })
          this.getList()
        })
        .catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.data.errmsg
          })
        })
    }
  }
}
</script>
