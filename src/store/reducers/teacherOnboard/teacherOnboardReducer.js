const teacherOnboardReducer = (state = { teacherDashboardData: null }, action) => {
    switch (action.type) {
      case "GET_TEACHER_ONBOARD_DATA":
        return { ...state, teacherOnboardData: action?.payload };
      default:
        return state;
    }
  };
  
  export default teacherOnboardReducer;
  