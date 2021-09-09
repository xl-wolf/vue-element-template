<template>
    <div class="login-container" id="form-bg">
        <div class="bg-changer" @click="changeBG">点击切换背景</div>
        <!-- <svg class="bg-changer-svg-text">
            <text x="100%" y="75%" @click="changeBG">点击切换背景</text>
        </svg>-->
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
            <div class="title-container">
                <svg class="admin-title-svg-text">
                    <text x="50%" y="75%" @click="changeBG">vue-element-template</text>
                </svg>
                <!-- <h3 class="title">vue-element-template</h3> -->
            </div>

            <el-form-item prop="username" class="miaobian">
                <span class="icon-container">
                    <i class="iconfont xl-icon-user" />
                </span>
                <el-input
                    ref="username"
                    v-model="loginForm.username"
                    placeholder="Username"
                    name="username"
                    type="text"
                    tabindex="1"
                    auto-complete="on"
                />
            </el-form-item>

            <el-form-item prop="password" class="miaobian">
                <span class="icon-container">
                    <i class="iconfont xl-icon-password" />
                </span>
                <el-input
                    :key="passwordType"
                    ref="password"
                    v-model="loginForm.password"
                    :type="passwordType"
                    placeholder="Password"
                    name="password"
                    tabindex="2"
                    auto-complete="on"
                    @keyup.enter.native="handleLogin"
                />
                <span class="show-pwd" @click="showPwd">
                    <i class="iconfont" :class="passwordType === 'password' ? 'xl-icon-eye-close' : 'xl-icon-open-eyes'" />
                </span>
            </el-form-item>

            <el-button :loading="loading" size="large" type="primary" class="miaobian-btn" @click.native.prevent="handleLogin">登录</el-button>
        </el-form>
    </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
    name: 'Login',
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!validUsername(value)) {
                callback(new Error('Please enter the correct user name'))
            } else {
                callback()
            }
        }
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('The password can not be less than 6 digits'))
            } else {
                callback()
            }
        }
        return {
            loginForm: {
                username: 'admin', //  admin，guest
                password: '222222'
            },
            loginRules: {
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePassword }]
            },
            loading: false,
            passwordType: 'password',
            clearRef: null,
            curBgIndex: 0
        }
    },
    mounted() {
        this.loadModulesRandom()
    },
    computed: {},
    watch: {},
    beforeDestroy() {
        this.clearRef()
    },
    methods: {
        changeBG() {
            this.removeLastChild()
            this.curBgIndex = this.curBgIndex === 3 ? 1 : ++this.curBgIndex
            this.clearRef()
            this.loadModulesRandom(this.curBgIndex)
        },
        removeLastChild() {
            const DOM = document.getElementById('form-bg')
            const children = DOM.children
            DOM.removeChild(children[children.length - 1])
        },
        loadModulesRandom(idx) {
            console.log(77)
            const random = idx || Math.ceil(Math.random() * 3)
            switch (random) {
                case 1:
                    import('./plugins/canvas01').then(({ drawCanvas, clearFunc }) => {
                        this.clearRef = clearFunc
                        drawCanvas('form-bg')
                    })
                    break
                case 2:
                    import('./plugins/webgl04').then(({ drawCanvas, clearFunc }) => {
                        this.clearRef = clearFunc
                        drawCanvas('form-bg')
                    })
                    break
                case 3:
                    import('./plugins/canvas09').then(({ drawCanvas, clearFunc }) => {
                        this.clearRef = clearFunc
                        drawCanvas('form-bg')
                    })
                    break
                default:
                    break
            }
        },
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = ''
            } else {
                this.passwordType = 'password'
            }
            this.$nextTick(() => {
                this.$refs.password.focus()
            })
        },
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true
                    this.$store
                        .dispatch('user/login', this.loginForm)
                        .then(() => {
                            this.$router.push({ name: 'home' })
                            this.loading = false
                        })
                        .catch(() => {
                            this.loading = false
                        })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
    }
}
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

/* reset element-ui css */
.login-container {
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;

        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            caret-color: $cursor;

            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: $cursor !important;
            }
        }
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
    min-height: 100%;
    width: 100%;
    overflow: hidden;

    .login-form {
        position: absolute;
        left: 0;
        right: 0;
        z-index: 7;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;
    }

    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .icon-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .title-container {
        position: relative;

        .title {
            font-size: 26px;
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
    }

    .miaobian {
        color: #69ca62;
        box-shadow: inset 0 0 0 1px rgb(105, 202, 196);
    }

    .miaobian-btn {
        width: 99%;
        position: relative;
        margin-bottom: 30px;
        &::before {
            box-shadow: inset 0 0 0 2px #69cac4;
            border-radius: 8px;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            content: '';
            z-index: -1;
            margin: -2px;
            animation: clipMe 1s ease-in-out infinite;
        }
    }

    .bg-changer {
        font-size: 18px;
        position: fixed;
        z-index: 2;
        right: 0;
        top: 0;
        padding: 20px 30px;
        background: transparent;
        cursor: pointer;
        text-shadow: 0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500, 0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00,
            0 0 98px #ff0000;
        color: #fff6a9;
        font-family: 'Sacramento', cursive;
        text-align: center;
        animation: blink 12s infinite;
    }

    .admin-title-svg-text {
        width: 100%;
        font-size: 36px;
        text {
            text-anchor: middle;
            stroke: rgb(120, 243, 243);
            stroke-width: 1;
            animation: textAnimate 5s infinite;
        }
    }

    .bg-changer-svg-text {
        width: 100%;
        height: 40px;
        padding-right: 30px;
        font-size: 20px;
        position: fixed;
        z-index: 2;
        right: 0;
        top: 0;
        text {
            text-anchor: end;
            cursor: pointer;
            stroke: #ffa500;
            stroke-width: 1;
            animation: textAnimate 5s infinite alternate;
        }
    }
}
@keyframes blink {
    20%,
    24%,
    55% {
        color: #111;
        text-shadow: none;
    }
    0%,
    19%,
    21%,
    23%,
    25%,
    54%,
    56%,
    100% {
        text-shadow: 0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500, 0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00,
            0 0 98px #ff0000;
        color: #fff6a9;
    }
}
@keyframes textAnimate {
    0% {
        stroke-dasharray: 0 50%;
        stroke-dashoffset: 20%;
        fill: hsl(189, 68%, 75%);
    }
    100% {
        stroke-dasharray: 50% 0;
        stroke-dashoffstet: -20%;
        fill: rgba(255, 255, 255, 0.1);
    }
}
@keyframes clipMe {
    0%,
    100% {
        clip: rect(0px, 225px, 23px, 0px);
    }
    25% {
        clip: rect(23px, 225px, 45px, 0px);
    }

    50% {
        clip: rect(23px, 450px, 45px, 225px);
    }
    75% {
        clip: rect(0px, 450px, 23px, 225px);
    }
}
</style>
