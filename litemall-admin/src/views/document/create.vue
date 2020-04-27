<template>
  <div class="app-container">
    <el-form ref="document" :rules="rules" :model="document" status-icon label-position="left" label-width="100px" style="width: 80%; margin-left:50px;">
      <el-row>
        <el-col :span="12">
          <el-form-item label="类型" prop="docType">
            <el-select v-model="document.docType" placeholder="请选择" style="width:100%">
              <el-option v-for="item in docTypes" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="active">
            <el-select v-model="document.active" placeholder="请选择" style="width:100%">
              <el-option v-for="item in actives" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="标题" prop="docName">
        <el-input v-model="document.docName" />
      </el-form-item>
      <el-form-item label="专题内容" prop="detail">
        <editor v-model="document.detail" :init="editorInit" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </div>
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
import { createDocument } from '@/api/document'
import { createStorage } from '@/api/storage'
import BackToTop from '@/components/BackToTop'
import Editor from '@tinymce/tinymce-vue'
import { getToken } from '@/utils/auth'

export default {
  name: 'DocumentEdit',
  components: { BackToTop, Editor },
  data() {
    return {
      id: 0,
      document: {
      },
      addVisiable: false,

      listLoading: false,
      docTypes: [
        { code: 'policy', name: '贷款政策说明' },
        { code: 'workflow', name: '贷款流程说明' },
        { code: 'bank', name: '银行说明' },
        { code: 'dongfang', name: '东方农商行银行说明' },
        { code: 'suzhou', name: '苏州银行说明' },
        { code: 'jiangsu', name: '江苏银行说明' },
        { code: 'caizheng_policy', name: '财政部政策说明' },
        { code: 'danbao_desc', name: '用户须知' },
        { code: 'undertaking', name: '承诺书' },
        { code: 'bank_desc', name: '选择银行须知' }],
      actives: [{ code: true, name: '启动' }, { code: false, name: '不启用' }],
      rules: {
        docName: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        docType: [
          { required: true, message: '类型不能为空', trigger: 'change' }
        ],
        detail: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ]
      },
      editorInit: {
        language: 'zh_CN',
        convert_urls: false,
        height: 500,
        plugins: [
          'advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount'
        ],
        toolbar: [
          'searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample',
          'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen'
        ],
        images_upload_handler: function(blobInfo, success, failure) {
          const formData = new FormData()
          formData.append('file', blobInfo.blob())
          createStorage(formData)
            .then(res => {
              success(res.data.data.url)
            })
            .catch(() => {
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
  },
  methods: {
    handleCancel() {
      this.$router.push({ path: '/sys/document' })
    },
    handleConfirm() {
      this.$refs['document'].validate(valid => {
        if (valid) {
          createDocument(this.document).then(response => {
            this.$router.push({ path: '/sys/document' })
          })
            .catch(response => {
              this.$notify.error({
                title: '失败',
                message: response.data.errmsg
              })
            })
        }
      })
    }
  }
}
</script>
