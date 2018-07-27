export const count = state => state.count

export const incrementGetters = state => {
	return state.count * 2;
}

export const getToken = state => {
	return state.user.access_token;
}
