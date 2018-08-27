

export const increment = state => {
  state.count++
}

export const decrement = state => {
  state.count--
}

// 登陆成功 - 处理 token 信息
export const set_token = (state, token) => {
	state.user.access_token = token;
	sessionStorage.setItem('access_token', token);
}

// 用户退出登录 删除相关的token信息
export const del_token = state => {
	state.user.access_token = '';
	sessionStorage.removeItem('access_token');
	sessionStorage.removeItem('expired_at');
	sessionStorage.removeItem('refresh_at');
}

// loading 展示, 其中 loading_flag 为 【true、false】
export const loading = (state, loading_flag) => {
	state.loading = loading_flag;
}
