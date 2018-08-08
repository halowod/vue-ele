

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

export const del_token = (state, token) => {
	state.access_token = '';
	sessionStorage.removeItem('access_token');
}
