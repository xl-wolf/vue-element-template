<template>
	<div class="app-main-container ptb20 plr20">
		<el-card shadow="hover">
			<vue-typing :text="typingText" :cursorOptions="myCursor" />
		</el-card>
	</div>
</template>

<script>
import VueTyping from "@/components/xl-vue-typing"
export default {
	name: "home",
	components: { VueTyping },
	data() {
		return {
			typingText: null,
			myCursor: { blinking: true, cursor: "|", color: "black", framerate: 24 },
		}
	},

	mounted() {
		this.startType()
	},

	methods: {
		startType() {
			this.typingText = `I'm home page,you can now begin your development in this frame,enjoy yourself a good journey!`
		},
	},
}
</script>
