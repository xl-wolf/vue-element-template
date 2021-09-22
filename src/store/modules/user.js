import { loginApi, logoutApi } from "@/apis/user"
import { setTokenSession, setAvatarSession, setProjectNameSession, resetTokenSession, resetAvatarSession, resetProjectNameSession } from "@/utils/index"
const getDefaultState = () => {
	return {
		token: null,
		projectName: null,
		avatar: null,
	}
}

const state = getDefaultState()

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	RESET_TOKEN: (state) => {
		state.token = null
	},
	SET_PROJECT_NAME: (state, projectName) => {
		state.projectName = projectName
	},
	RESET_PROJECT_NAME: (state) => {
		state.projectName = null
	},
	SET_AVATAR: (state, avatar) => {
		state.avatar = avatar
	},
	RESET_AVATAR: (state) => {
		state.avatar = null
	},
}

const actions = {
	// user login
	login({ commit }, userInfo) {
		const { username, password } = userInfo
		return new Promise((resolve, reject) => {
			loginApi({ username: username.trim(), password: password })
				.then((response) => {
					// console.log(response);
					const { data } = response

					commit("SET_TOKEN", data.token)
					setTokenSession(data.token)

					commit("SET_PROJECT_NAME", data.projectName)
					setProjectNameSession(data.projectName)

					commit("SET_AVATAR", data.avatar)
					setAvatarSession(data.avatar)

					resolve()
				})
				.catch((error) => {
					reject(error)
				})
		})
	},
	logout({ commit }, token) {
		return new Promise((resolve, reject) => {
			logoutApi({ token })
				.then(() => {
					commit("RESET_TOKEN")
					resetTokenSession()

					commit("RESET_PROJECT_NAME")
					resetProjectNameSession()

					commit("RESET_AVATAR")
					resetAvatarSession()

					resolve()
				})
				.catch((error) => {
					reject(error)
				})
		})
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}
