<template>
    <div v-if="isShowDialog" class="obt-wrap">
        <div class="obt">
            <div class="cls" @click="cls"></div>
            <p>恭喜获得 {{prize}}，请复制代码兑换</p>
            <div class="copy">
                <input readonly id="tg-link" :value="coupon"/>
                <span class="tag-read" :data-clipboard-text="coupon" @click="copy">复制</span>
            </div>
            <a @click="exchange" href="javascript:;" id="links" target="_blank"><img src="./img/a-click.png" alt=""></a>
        </div>
    </div>
</template>


<script>
    import Clipboard from "clipboard"
    export default{
        props:{
            isShowDialog:Boolean,
            prize:String,
            coupon:String
        },
        methods:{
            cls(){
              this.$emit('close')
            },
            copy() {
                let clipboard = new Clipboard('.tag-read')
                clipboard.on('success', e => {
                    this.flag = true
                    this.$message({
                        type: 'success',
                        message: '复制成功'
                    })
                    // 释放内存
                    clipboard.destroy()
                })
                clipboard.on('error', e => {
                    // 不支持复制
                    console.log('该浏览器不支持自动复制')
                    // 释放内存
                    clipboard.destroy()
                })
            },
            // 去个人中心
            exchange() {
                if (this.flag) {
                    if (this.isMobile) {
                        this.$router.push('/mobile/user/discounts')
                    } else {
                        this.$router.push('/user/discounts')
                    }
                } else {
                    this.$message({
                        type: 'info',
                        message: '请先复制代码并去账户中心进行兑换'
                    })
                }
            },
        }
    }
</script>

<style lang="stylus" src="./alert.styl" scoped></style>