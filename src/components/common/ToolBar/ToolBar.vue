<template>
  <div class="toolbar">
    <div style="padding:8px;">
      <slot></slot>
    </div>
  </div>
</template>

<style>
  .toolbar {
    width: calc(100% - 2px);
    padding:0;
    background-color: #ffffff;
    overflow: hidden;
    line-height: 32px;
    border: 1px solid #e6ebf5;
    text-align:left;
    margin-bottom: 8px;
    margin-top:8px;
  }
</style>

