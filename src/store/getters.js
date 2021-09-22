export default {
	menuStatus: (state) => state.app.menuStatus,
	activeMenuItem: (state) => state.app.activeMenuItem,
	screenStatus: (state) => state.app.screenStatus,
	token: (state) => state.user.token,
	avatar: (state) => state.user.avatar,
	projectName: (state) => state.user.projectName,
}
