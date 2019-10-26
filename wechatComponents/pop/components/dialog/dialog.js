// components/dialog/dialog.js
Component({
  data:{
    isShow:true,
  },
  properties:{
    /**
     * 配置可自定义属性
     */
    title:{
      type:String,
      value:"学习自定义组件"
    },
    desc:{
      type:String,
      value:"自定义一个弹出窗口"
    },
    cancelText:{
      type:String,
      value:"确定"
    },
    confirmText:{
      type:String,
      value:"取消"
    }
  },
  /**
   * 组件的方法列表
   */
  methods:{
    /**
     * 公有方法
     * 外部调用showDialog方法显示遮罩
     */
    showDialog(){
      this.setData({
        isShow:!this.data.isShow
      })
    },
    /**
     * 隐藏遮罩，这里为什么归为公有方法，是因为可能会在外部调用该方法隐藏窗口
     */
    hideDialog(){
      this.setData({
        isShow:!this.data.isShow
      })
    },

    /**
     * 私有方法
     * 该方法只是组件使用，所以称为私有方法，私有方法在命名上通常会以_开头。
     */
    _cancelEvent(){
      this.triggerEvent("cancelEvent");
    },

    _fonfirmEvent(){
      this.triggerEvent("confirmEvent");
    }
  },
  
})