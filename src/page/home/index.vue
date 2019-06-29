<template>
    <div class="login-wrap">
        <div>
            手机号
            <input
                type="text"
                v-model="phone"
            >
        </div>
        <div>
            验证码
            <input
                type="text"
                v-model="veriCode"
            >
            <button
                class="get-vericode"
                :disabled="disabledGetVeriCodeBtn"
                @click="getVeriCode()"
            >{{ timer }}</button>
        </div>
        <div class="submit-btn">
            <button
                @click="login()"
            >登录</button>
        </div>
        <div
            class="msg"
            :style="{ 'color': color }"
        >
            {{ msg }}
        </div>
        <p>
            <b>我的手机</b>
        </p>
        <div class="monitor">
            <p>模拟手机接收短信</p>
            手机验证码为： <span class="real-vericode">{{ realVeriCode }}</span>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            phone: '10012345678',
            veriCode: '',
            disabledGetVeriCodeBtn: false,
            timer: '获取验证码',
            msg: '',
            color: '',
            realVeriCode: '',
            realPhone: ''
        }
    },
    methods: {
        async getVeriCode() {
            if (!this.phone) {
                this.setMsg('请填写手机号')
                return;
            }
            const { data: { code, phone } } = await this.$http({
                method: 'get',
                url: '/getverifycode',
                data: {
                    phone: this.phone
                }
            })
            this.realVeriCode = code
            this.realPhone = phone
            this.setMsg('')
            this.disabledGetVeriCodeBtn = true
            this.setTimer()
        },
        setMsg(value, color = 'red') {
            this.msg = value
            this.color = color
        },
        setTimer() {
            const text = '秒倒计时'
            let start = 60
            let timeId = setInterval(() => {
                if (start === 1) {
                    clearInterval(timeId)
                    timeId = null
                    this.timer = '获取验证码'
                    this.disabledGetVeriCodeBtn = false
                    return;
                }
                this.timer = `${--start}${text}`
            }, 1000)
            this.timer = `${start}${text}`
        },
        login() {
            if (!this.veriCode || !this.phone) {
                this.setMsg('请填写完整信息')
                return;
            }
            if (this.veriCode !== this.realVeriCode) {
                this.setMsg('验证码错误')
                return;
            }
            if(this.phone !== this.realPhone) {
                this.setMsg('手机号错误')
                return;
            }
            this.setMsg('登录成功！', 'green')
        }
    }
}
</script>
<style lang="scss">
.login-wrap {
    position: absolute;
    left: 0;
    right: 0;
    width: 200px;
    height: 200px;
    margin: auto;
    input {
        width: 100%;
        border: 1px solid #ccc;
    }
    .submit-btn {
        padding-top: 35px;
        button {
            width: 200px;
            height: 35px;
            cursor: pointer;
        }
    }
    .msg {
        text-align: center;
        color: red;
    }
    .monitor {
        width: 100%;
        height: 300px;
        border: 1px solid #000;
        .real-vericode {
            font-weight: 700;
            color: #ffc830;
        }
    }
}
</style>


