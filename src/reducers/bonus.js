function bonusReducer(state = { bonus: 0 }, action) {
    switch (action.type) {
        case addBonus:
            return { bonus: state.bonus + action.payload };
        default:
            return state;
    }
}