<template>
	<div id="siderbar" :style="{ backgroundColor: bgColor }">
		<el-menu :default-active="activeMenuItem" :background-color="bgColor" text-color="#fff" :active-text-color="activeTextColor" :collapse="menuStatus">
			<!-- 侧边栏顶部logo和项目名称 -->
			<div class="logo-container" :style="{ backgroundColor: bgColor }">
				<img class="img" :src="avatar" />
				<span :title="projectName">{{ projectName }}</span>
			</div>
			<!-- 左侧菜单栏 -->
			<recursionMenu :menuTree="menuTree" />
		</el-menu>
	</div>
</template>

<script>
import { getProjectNameSession, getAvatarSession } from "@/utils/index"
import { mapGetters } from "vuex"
import recursionMenu from "./recursionMenu"
import { routes } from "@/router"
import { primaryColor, sidebarAndHeaderBg } from "@/styles/variables.scss"

export default {
	name: "siderbar",
	components: { recursionMenu },
	computed: {
		avatar() {
			return getAvatarSession()
		},
		projectName() {
			return getProjectNameSession()
		},
		...mapGetters(["menuStatus", "activeMenuItem"]),
		menuTree() {
			const menuTree = []
			routes.forEach((menu) => {
				if (menu.children && menu.children.length) {
					menuTree.push(...menu.children)
				}
			})
			return menuTree.sort((a, b) => a.sort - b.sort)
		},
		activeTextColor() {
			return primaryColor
		},
		bgColor() {
			return sidebarAndHeaderBg
		},
	},
}
</script>

<style lang="scss">
#siderbar {
	.el-menu {
		border: 0;
		height: inherit;
		.logo-container {
			height: 60px;
			line-height: 60px;
			padding: 0 14px;
			white-space: nowrap;
			.img {
				position: relative;
				top: -12px;
				width: 36px;
				height: 36px;
				margin-right: 10px;
			}
			span {
				width: calc(100% - 44px);
				font-size: 14px;
				font-weight: 700;
				display: inline-block;
				white-space: nowrap;
				text-align: left;
				overflow: hidden;
				text-overflow: ellipsis;
				color: #fff;
			}
		}
	}
	height: 100%;
}
</style>
