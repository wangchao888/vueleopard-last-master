
<template>
    <Modal
        :title="dialogTitle"
        v-model="dialogFormVisible"
        @on-cancel= "$emit('cancel')"      
        class-name="vertical-center-modal">
       <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="应用名称" prop="appname">
                <Input v-model="formValidate.appname" placeholder="Enter your name"></Input>
            </FormItem>
           <!--  <FormItem label="是否核心应用" prop="swith">
                <i-switch v-model="formItem.switch" size="large">
                    <span slot="open">On</span>
                    <span slot="close">Off</span>
                </i-switch>
            </FormItem>  -->
            <FormItem label="IP" prop="appip">
                <Input v-model="formValidate.appip" placeholder="Enter your name"></Input>
            </FormItem>
            <FormItem label="域名" prop="domain">
                <Input v-model="formValidate.domain" placeholder="Enter your name"></Input>
            </FormItem>
            <FormItem label="端口" prop="appport">
                <Input v-model="formValidate.appport" placeholder="Enter your name"></Input>
            </FormItem>
            <FormItem label="视图" prop="webview">
                <Input v-model="formValidate.webview" placeholder="Enter your name"></Input>
            </FormItem>
            <FormItem label="应用说明" prop="appdesc">
                <Input v-model="formValidate.appdesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button size="large" type="default" @click="$emit('cancel');">取消</Button>
            <Button size="large" type="primary" @click="handleSubmit('formValidate')">确定</Button>
        </div>
    </Modal>
</template>
<script>
    import {addApplication} from '../../api/application';
    export default {
       name: "ToModal",
       props: {
          dialogFormVisible: Boolean,
          dialogTitle: String,
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                      var datas = {
                        appname: this.formValidate.appname,
                        appip: this.formValidate.appip,
                        domain: this.formValidate.domain,
                        appport: this.formValidate.appport,
                        webview: this.formValidate.webview,
                        appdesc: this.formValidate.appdesc
                      };
                      addApplication(datas).then(data => {
                        let { msg, code } = data;
                        if (code == "200") {
                          this.$Message.success(msg);                         
                        } else {
                           this.$Message.error(msg);
                        }
                      });
                       this.$emit("cancel");
                    } else {
                        this.$Message.error('验证不通过!');
                        return false;
                    }
                })
            }
        },
     computed:{
        formValidate(){
            return {
              appname: '',
              appip:'',
              domain:'',
              appport: '',
              webview: '',
              appdesc:''
            }
         },
          ruleValidate() {
            return {
                appname: [
                    { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                ]
            }
          }
       },
    }
</script>

