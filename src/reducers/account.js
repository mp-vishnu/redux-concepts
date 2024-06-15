function accountReducer(state = { amount: 1, status: 'idle', error: null }, action) {
    switch (action.type) {
        case inc:
            return { ...state, amount: state.amount + 1 };
        case dec:
            return { ...state, amount: state.amount - 1 };
        case incByAm:
            return { ...state, amount: state.amount + action.payload };
        case init:
            return { ...state, amount: action.payload };
        case fetchPending:
            return { ...state, status: 'pending', error: null };
        case fetchFulfilled:
            return { ...state, status: 'fulfilled', amount: action.payload };
        case fetchError:
            return { ...state, status: 'error', error: action.payload };
        default:
            return state;
    }
}