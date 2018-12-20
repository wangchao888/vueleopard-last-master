<style lang="less">
  .ivu-tabs-ink-bar{
    background-color: #fff;
  }
  .main-breadcrumb{
    padding:0;
  }
  .ivu-tabs-bar{
    border-bottom: 0px;
  }
  .main-header .header-middle-con2{
    right: auto;
  }
</style>
 <template>
    <div>
       <Tabs type="line" @on-click="handleSelect" >
          <TabPane v-for="(item, index) in top_routers" :key="index" :label="item.name" :name="item.path"></TabPane>
      </Tabs>
    </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  export default {
    computed: {
      ...mapGetters([
        'top_routers'
      ])
    },
    methods: {
       handleSelect(url){
        this.$store.commit('increment', url)
        this.$router.push(url)
      }
    }
  }
</script>
