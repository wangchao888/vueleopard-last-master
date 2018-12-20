<template>
   <div>
   <ToolBar>
      <i-input placeholder="请输入用户昵称！" style="width: 220px;"></i-input>
      <i-button type="primary" @click="queryList()">查询</i-button>
      <div style="float: right">
         <i-button type="primary"  @click="openModal('add')">添加</i-button>
      </div>
    </ToolBar>
    <Table :height="queryHeight" :columns="columns1" :data="applicationData"></Table>
    <ToolBar>
     <Page :total="total" :current="currentPage" :page-size="pageSize" @on-change="tocurrentChange" show-elevator/>
   </ToolBar>
   <ToModal 
        :dialogTitle="dialogTitle" 
        :dialogFormVisible="dialogFormVisible"  
        @cancel="dialogFormVisible = false">
    </ToModal>
  </div>
</template>
<script>
    import ToolBar from '@/components/common/ToolBar/ToolBar.vue';
    import {queryApplication} from '../../api/application';
    import ToModal from './add.vue';
    export default {
      created(){
          this.queryList();
      },
      data () {
        return {
            applicationData: [],
            total:0,
            currentPage:1,
            pageSize:10,
            dialogTitle: '',
            dialogFormVisible: false,
            columns1: [
            {
                type: 'index',
                width: 60,
                align: 'center'
            },
            {
                title: '应用管理',
                key: 'appname'
            },
            {
                title: 'ip',
                key: 'appip'
            },
            {
                title: '域名',
                key: 'domain'
            },
            {
                title: '端口',
                key: 'appport'
            },
            {
                title: '视图',
                key: 'webview'
            }
            ]
        }
    },
    computed:{
         queryHeight(){
            /*  return document.body.clientHeight - 240  */
          }
        },
    methods:{
       openModal(msg) {
          if(msg=='add'){
             this.dialogTitle = '应用添加'
             this.dialogFormVisible = true;
          }else if(msg=='edit'){
             this.dialogTitle = '应用编辑'
             this.dialogFormVisible = true;
          }      
        },
        queryList(){ 
             const datas = {currentPage:this.currentPage,pageSize:this.pageSize} 
             queryApplication(datas).then(data => {
              let {code,msg,applicationData} = data                
              this.applicationData = applicationData.list    
              this.total = applicationData.total
          });
         },
        tocurrentChange(msg){
        this.currentPage = msg;
        this.queryList()
       },
    },
    components: {
        ToolBar,ToModal
       }
    }
</script>
