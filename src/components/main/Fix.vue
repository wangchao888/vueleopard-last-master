<template>

  <div class="switch-theme-con">
    <Row class="switch-theme" type="flex" justify="center" align="middle">
        <a @click="setTheme">
          <Icon color="#495060" :style="{marginTop: '-2px', verticalAlign: 'middle'}" :size="18" type="ios-pricetags"></Icon>
        </a>
    </Row>
  </div>
</template>
<script>
  export default {
    name: 'fixBtn',
    data () {
      return {
      };
    },
    methods: {
      setTheme () {
        this.$store.commit('ChangeFixState')
      }
    }
  }
</script>

