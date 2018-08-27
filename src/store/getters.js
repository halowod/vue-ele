export const count = state => state.count

export const incrementGetters = state => {
	return state.count * 2;
}

// 获取 token 信息
export const getToken = state => {
	return state.user.access_token;
}


// 获取 loading 信息
export const getLoading = state => {
	return state.loading;
}










