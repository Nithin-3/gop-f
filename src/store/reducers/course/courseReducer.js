const courseReducer = (state = { courseData: null }, action) => {
    switch (action.type) {
      case "Create_Course":
        return { ...state, courseData: action?.payload };
      default:
        return state;
    }
  };
  
  export default courseReducer;
  