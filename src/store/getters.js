const getters = {
  redirect: state => state.app.redirect,
  menuStatus: state => state.app.menuStatus,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  projectName: state => state.user.projectName
}
export default getters
