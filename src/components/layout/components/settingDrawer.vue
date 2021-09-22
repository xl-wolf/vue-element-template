<template>
	<el-drawer :visible.sync="visible" :direction="direction" :show-close="false" :before-close="handleClose" :with-header="false">
		<div class="setting-header">
			<span>系统设置</span>
			<i class="el-icon-close" @click="handleClose" />
		</div>
		<div class="setting-body">
			<span class="label">主题色配置</span>
			<div class="values">
				<div v-for="item in primaryColorList" :key="item" class="item" :style="{ 'background-color': item }" @click="changePrimaryColor(item)" />
			</div>
		</div>
	</el-drawer>
</template>

<script>
import scss from "@/styles/variables.scss"
export default {
	props: {
		visible: {
			type: Boolean,
		},
	},
	data() {
		return {
			drawer: false,
			direction: "rtl",
			primaryColorList: ["#00c78c", "#228b22", "#ffd04b", "#67C23A", "#7e46f2", "#24a9f4"],
		}
	},
	methods: {
		handleClose() {
			this.$emit("beforeDrawerClose")
		},
		changePrimaryColor(PC) {
			scss.primaryColor = PC
			this.handleClose()
		},
	},
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";
.el-drawer.rtl{
	width: 300px !important;
}
.setting-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 60px;
	border-bottom: 1px solid #e8e8e8;
	box-sizing: border-box;
	padding: 0 20px;
	font-size: 16px;
	.el-icon-close {
		transition: 0.5s;
		cursor: pointer;
		&:hover {
			color: $primaryColor;
			transform: rotate(180deg) scale(1.1);
		}
	}
}
.setting-body {
	display: flex;
	align-items: center;
	height: 60px;
	border-bottom: 1px dashed #e8e8e8;
	margin: 0 20px;

	.label {
		font-size: 14px;
		color: rgba(0, 0, 0, 0.65);
	}
	.values {
		display: flex;
		align-items: center;
		margin-left: 14px;
		overflow: auto;
		width: calc(100% - 84px);
		.item {
			width: 30px;
			height: 30px;
			min-width: 30px;
			cursor: pointer;
		}
	}
}
</style>
