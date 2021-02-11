const initialState = {
  isLoading: false,
  hasError: false,
  errorMessage: "",
  data: [],
  pagination: {
    currentPage: 0,
    hasNext: false,
    total: 0,
  },
}

export default (state = initialState, action: any) => {
  switch (action.type) {
    default:
      return state
  }
}
