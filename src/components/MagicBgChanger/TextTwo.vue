<template>
	<div class="bg-changer" @click="$emit('click')">
		<p v-for="(char, idx) in label" :key="idx">{{ char }}</p>
	</div>
</template>

<script>
export default {
	props: {
		label: {
			type: String,
			require: false,
			default: "点击切换背景",
		},
	},
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.bg-changer {
	cursor: pointer;
	padding: 0 20px;
	text-align: center;
	p {
		display: inline-block;
		text-transform: uppercase;
		text-align: center;
		font-size: 32px;
		font-family: arial;
		font-weight: 600;
		transform: scale(0.5);
		color: $primaryColor;
		-webkit-text-stroke: 2px gray;
		&:nth-child(1) {
			animation: hover 1s infinite;
		}
		&:nth-child(2) {
			animation: hover 1s infinite 0.125s;
		}
		&:nth-child(3) {
			animation: hover 1s infinite 0.25s;
		}
		&:nth-child(4) {
			animation: hover 1s infinite 0.375s;
		}
		&:nth-child(5) {
			animation: hover 1s infinite 0.5s;
		}
		&:nth-child(6) {
			animation: hover 1s infinite 0.675s;
		}
		@keyframes hover {
			0% {
				transform: scale(0.5);
				color: $primaryColor;
				-webkit-text-stroke: 2px gray;
			}

			20% {
				transform: scale(1);
				color: cyan;
				-webkit-text-stroke: 3px red;
				filter: drop-shadow(0 0 1px black) drop-shadow(0 0 1px black) drop-shadow(0 0 3px red) drop-shadow(0 0 5px red) hue-rotate(10turn);
			}

			50% {
				transform: scale(0.5);
				color: $primaryColor;
				-webkit-text-stroke: 2px gray;
			}
		}
	}
}
</style>
