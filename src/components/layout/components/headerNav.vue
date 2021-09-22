<template>
	<div id="headerNav">
		<i class="collapse-ctrl" :class="`el-icon-s-${!menuStatus ? 'fold' : 'unfold'}`" @click="toggleMenuCollapse" />
		<div class="other-ctrl">
			<img class="img setting" src="@/assets/images/setting.png" @click="showSettingDrawer" />
			<screenFull class="mr16" style="display:inline-block" />
			<img class="img" :src="avatar" />
			<el-dropdown trigger="hover" class="trangle-position">
				<i class="el-icon-caret-bottom" />
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>
						<a target="_blank" href="https://github.com/xl-wolf/vue-element-template">项目地址</a>
					</el-dropdown-item>
					<el-dropdown-item>
						<div @click="logout">退出登录</div>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
		<settingDrawer :visible="drawerVisible" @beforeDrawerClose="handleBeforeDrawerClose" />
	</div>
</template>

<script>
import { mapGetters } from "vuex"
import { getAvatarSession } from "@/utils/index"
import settingDrawer from "./settingDrawer"
import screenFull from "./fullScreen"
export default {
	name: "headerNav",
	components: { settingDrawer, screenFull },
	data() {
		return {
			drawerVisible: false,
		}
	},
	computed: {
		...mapGetters(["menuStatus"]),
		avatar() {
			return getAvatarSession()
		},
	},
	methods: {
		toggleMenuCollapse() {
			this.$store.dispatch("app/toggleMenu", !this.menuStatus)
		},
		logout() {
			this.$store
				.dispatch("user/logout")
				.then(() => {
					this.$router.replace({ name: "login" })
				})
				.catch((err) => {
					console.log(err)
				})
		},
		showSettingDrawer() {
			this.drawerVisible = true
		},
		handleBeforeDrawerClose() {
			this.drawerVisible = false
		},
	},
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";
#headerNav {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.collapse-ctrl {
		width: 24px;
		cursor: pointer;
		font-size: 24px;
		transition: 0.7s;
		color: #fff;
		&:hover {
			color: $primaryColor;
		}
	}
	.other-ctrl {
		display: flex;
		align-items: center;
		.img {
			width: 40px;
			height: 40px;
			margin-right: 12px;
			&.setting {
				width: 28px;
				height: 28px;
				cursor: pointer;
			}
		}
		.trangle-position {
			color: #fff;
			position: relative;
			top: 16px;
			cursor: pointer;
		}
	}
}
</style>
