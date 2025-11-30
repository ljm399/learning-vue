  <template>
    <div class="app">
      <!-- slot插槽 -->
      <!-- 1,基本使用和默认值 -->
      <!-- <slot>
        <p>i am default</p>
      </slot> -->

      <!-- 2,具名函数 -->
      <div class="nav-bar">
        <div class="left">
          <slot name="left">
            <button>left</button>
          </slot>
        </div>

        <div class="mid">
          <slot name="mid">
            <button>mid</button>
          </slot>
        </div>      

        <div class="right">
          <slot name="right">
            <button>right</button>
          </slot>
        </div>
      </div>    

    </div>
  </template>

  <script>
  export default {
    props:{
      name:String
    }
  }
  </script>

  <style scoped>
    .nav-bar{
      display: flex;
      width: 200px;
      justify-content: space-between;
    }
    .left,.mid,.right{
      flex: 1;
      text-align: center;
      height: 50px;
      line-height: 50px;
    }
    .left{
      background-color: red;
    }
    .mid{
      background-color: green;
    }
    .right{
      background-color: blue;
    }
  </style>

