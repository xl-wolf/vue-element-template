<template>
	<div class="login-container" id="form-bg">
		<MagicBgChanger class="bg-changer-position" @click="changeBG" />
		<el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
			<MagicTitle x="50%" y="75%" />
			<el-form-item prop="username" class="input-box-shadow">
				<span class="icon-container">
					<i class="iconfont xl-icon-user" />
				</span>
				<el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username" type="text" tabindex="1" auto-complete="on" />
			</el-form-item>

			<el-form-item prop="password" class="input-box-shadow">
				<span class="icon-container">
					<i class="iconfont xl-icon-password" />
				</span>
				<el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="Password" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
				<i @click="showPwd" class="iconfont" :class="`xl-icon-${passwordType === 'password' ? 'eye-close' : 'open-eyes'}`" />
			</el-form-item>
			<MagicButton @click="handleLogin" />
		</el-form>
	</div>
</template>

<script>
import { validUsername } from "@/utils/validate"

export default {
	name: "Login",
	components: {
		MagicBgChanger: () => import("@/components/MagicBgChanger/TextTwo.vue"),
		MagicTitle: () => import("@/components/MagicTitle/index"),
		MagicButton: () => import("@/components/MagicButton/ButtonTwo.vue"),
	},
	data() {
		const validateUsername = (rule, value, callback) => {
			if (!validUsername(value)) {
				callback(new Error("Please enter the correct user name"))
			} else {
				callback()
			}
		}
		const validatePassword = (rule, value, callback) => {
			if (value.length < 6) {
				callback(new Error("The password can not be less than 6 digits"))
			} else {
				callback()
			}
		}
		return {
			loginForm: {
				username: "admin", //  admin，guest
				password: "222222",
			},
			loginRules: {
				username: [{ required: true, trigger: "blur", validator: validateUsername }],
				password: [{ required: true, trigger: "blur", validator: validatePassword }],
			},
			loading: false,
			passwordType: "password",
			clearRef: null,
			curBgIndex: 0,
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
			this.curBgIndex = this.curBgIndex === 4 ? 1 : ++this.curBgIndex
			this.clearRef()
			this.loadModulesRandom(this.curBgIndex)
		},
		removeLastChild() {
			const DOM = document.getElementById("form-bg")
			const children = DOM.children
			DOM.removeChild(children[children.length - 1])
		},
		loadModulesRandom(idx) {
			const random = idx || Math.ceil(Math.random() * 4)
			switch (random) {
				case 1:
					import("./plugins/canvas01").then(({ drawCanvas, clearFunc }) => {
						this.clearRef = clearFunc
						drawCanvas("form-bg")
					})
					break
				case 2:
					import("./plugins/webgl04").then(({ drawCanvas, clearFunc }) => {
						this.clearRef = clearFunc
						drawCanvas("form-bg")
					})
					break
				case 3:
					import("./plugins/canvas09").then(({ drawCanvas, clearFunc }) => {
						this.clearRef = clearFunc
						drawCanvas("form-bg")
					})
					break
				case 4:
					import("./plugins/canvas10").then(({ drawCanvas, clearFunc }) => {
						this.clearRef = clearFunc
						drawCanvas("form-bg")
					})
					break
				default:
					break
			}
		},
		showPwd() {
			this.passwordType = this.passwordType === "password" ? "" : "password"
			this.$nextTick(() => {
				this.$refs.password.focus()
			})
		},
		handleLogin() {
			this.$refs.loginForm.validate((valid) => {
				if (valid) {
					this.loading = true
					this.$store
						.dispatch("user/login", this.loginForm)
						.then(() => {
							this.$router.push({ name: "home" })
							this.loading = false
						})
						.catch(() => {
							this.loading = false
						})
				} else {
					console.log("error submit!!")
					return false
				}
			})
		},
	},
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";
$bg: #283443;
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
			color: $primaryColor;
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
@import "@/styles/variables.scss";

.login-container {
	min-height: 100%;
	width: 100%;
	overflow: hidden;
	.bg-changer-position {
		z-index: 2;
		position: fixed;
		right: 0;
		top: 0;
	}
	.login-form {
		position: absolute;
		left: 0;
		right: 0;
		z-index: 7;
		width: 520px;
		max-width: 100%;
		padding: 160px 35px 0;
		margin: 0 auto;
	}

	.icon-container {
		padding: 6px 5px 6px 15px;
		color: $primaryColor;
		vertical-align: middle;
		width: 30px;
		display: inline-block;
	}

	.input-box-shadow {
		box-shadow: inset 0 0 0 1px $primaryColor;
		color: $primaryColor;
	}
}
</style>
