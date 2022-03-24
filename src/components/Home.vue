<template>
  <div class="container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>成员信息</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片展示区 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7"
          ><el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
            ></el-button> </el-input
        ></el-col>
        <el-col :span="6">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 表格展示区 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-style="tableRowsStyle"
        :header-cell-style="tableHeaderColor"
      >
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="name" label="name"> </el-table-column>
        <el-table-column prop="tell" label="tell"> </el-table-column>
        <el-table-column prop="qq" label="qq"> </el-table-column>
        <el-table-column prop="grade" label="grade"> </el-table-column>
        <el-table-column prop="major" label="major"> </el-table-column>
        <el-table-column prop="qq" label="qq"> </el-table-column>
        <el-table-column prop="direction" label="direction"> </el-table-column>
        <el-table-column label="操作">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="showDialog"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteUser"
          ></el-button>
        </el-table-column>
      </el-table>

      <!-- 分页功能区 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 3, 5, 7]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </el-card>

    <!-- 编辑 对话框 -->
    <el-dialog title="修改用户" :visible.sync="dialogVisible" width="30%">
      <el-form :model="ruleForm" :rules="rules" ref="editRef">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  background-image: url(../../src/assets/bac.jpg);
  background-size: cover;
  overflow: hidden;
}

.el-breadcrumb {
  margin-top: 12px;
}

.el-card {
  margin-top: 20px;
  margin-right: 10px;
  margin-left: 10px;
  background: black;
  opacity: 0.6;
  border: black;
}

.el-table {
  margin-top: 13px;
}

.el-pagination {
  margin-top: 10px;
}
</style>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: '王小虎',
          tell: '1234567',
          qq: '7654321',
          grade: '2021',
          major: '通信工程',
          direction: '前端'
        },
        {
          name: '王小虎',
          tell: '1234567',
          qq: '7654321',
          grade: '2021',
          major: '通信工程',
          direction: '前端'
        },
        {
          name: '王小虎',
          tell: '1234567',
          qq: '7654321',
          grade: '2021',
          major: '通信工程',
          direction: '前端'
        },
        {
          name: '王小虎',
          tell: '1234567',
          qq: '7654321',
          grade: '2021',
          major: '通信工程',
          direction: '前端'
        },
        {
          name: '王小虎',
          tell: '1234567',
          qq: '7654321',
          grade: '2021',
          major: '通信工程',
          direction: '前端'
        },
        {
          name: '王小虎',
          tell: '1234567',
          qq: '7654321',
          grade: '2021',
          major: '通信工程',
          direction: '前端'
        },
        {
          name: '王小虎',
          tell: '1234567',
          qq: '7654321',
          grade: '2021',
          major: '通信工程',
          direction: '前端'
        },
        {
          name: '王小虎',
          tell: '1234567',
          qq: '7654321',
          grade: '2021',
          major: '通信工程',
          direction: '前端'
        },
        {
          name: '王小虎',
          tell: '1234567',
          qq: '7654321',
          grade: '2021',
          major: '通信工程',
          direction: '前端'
        },
        {
          name: '王小虎',
          tell: '1234567',
          qq: '7654321',
          grade: '2021',
          major: '通信工程',
          direction: '前端'
        }
      ],
      queryInfo: {
        query: '',
        pagesize: 10,
        pagenum: 1
      },
      total: 10,
      dialogVisible: false,
      ruleForm: {
        username: 'jcj'
      },
      rules: {
        username: [{ required: true, message: '编辑不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 监听pagesize变化事件
    handleSizeChange(newpage) {
      this.queryInfo.pagesize = newpage
    },

    // 监听pagenum变化事件
    handleCurrentChange(newNum) {
      this.queryInfo.pagenum = newNum
    },

    // 修改table tr行的背景色
    tableRowsStyle({ row, column, rowIndex, columnIndex }) {
      return {
        'background-color': 'black',
        color: '#fff'
      }
    },

    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: black;color: #fff;font-weight: 500;'
      }
    },

    // 展示对话框
    showDialog() {
      this.dialogVisible = true
    },

    // 关闭对话框， 提交申请
    confirmEdit() {
      this.$refs.editRef.validate((valid) => {
        if (!valid) {
          return this.$message.warning('请完善信息后提交!')
        }
        this.dialogVisible = false
        this.$message.success('修改成功!')
      })
    },

    // 删除用户
    async deleteUser() {
      const result = await this.$confirm(
        '该操作无法撤销, 确定吗??',
        '删除用户',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }
      ).catch((err) => err)
      if (result !== 'confirm') {
        return this.$message.info('已取消')
      }
      this.$message.success('删除成功')
    }
  }
}
</script>
