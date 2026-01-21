import React, { useState } from "react";
import style from "./styles.module.css";
import Main from "./mainContainer/main";
import ShowData from "./teachersData/teachersData";
import { useDispatch } from "react-redux";
import { getTeachers } from "../../../../store/actions/admin/dashboardAction";
import { toast } from "react-toastify";
import { useWindowDimensions } from "../../../../utils/util";

const AdminTeachers = () => {
  const { width } = useWindowDimensions()
  const dispatch = useDispatch();
  const [teacherApiCalled, setTeacherApiCalled] = useState(false)
  const [allTeachers, setAllTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = React.useState();
  const [showpopup, setShowPopUp] = React.useState(false)
  // const [page, setPage] = React.useState(1);
  const [searchInput, setSearchInput] = React.useState("");

  React.useEffect(() => {
    setShowPopUp(true)
  }, [selectedTeacher])

  React.useEffect(() => {
    setTeacherApiCalled(true);
    getAllTeachers();
    // }, [dispatch, page, !teacherApiCalled, searchInput]);
  }, [dispatch, !teacherApiCalled, searchInput]);
  const getAllTeachers = async () => {
    try {
      // Show Loader
      document.getElementById('loader').style.display = 'flex'
      const result = await dispatch(getTeachers(searchInput));

      // Hide Loader
      document.getElementById('loader').style.display = 'none'
      if (result?.status === 200) {
        setAllTeachers(result?.data?.data || []);
        setSelectedTeacher(result?.data?.data?.[0]);
      }
      else {
        setAllTeachers(null);
        setSelectedTeacher(null);
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to fetch data");
    }
  }
  const refresh = () => {
    getAllTeachers();
  }
  return (
    <div className={style.adminDashboard}>
      <Main
        verificationType="Teacher"
        teachers={allTeachers}
        selectedTeacher={selectedTeacher}
        setSelectedTeacher={setSelectedTeacher}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      {width >= 992 ?
        selectedTeacher && <ShowData selectedTeacher={selectedTeacher} verificationType="Teacher" setTeacherApiCalled={setTeacherApiCalled} refresh={refresh} />
        :
        showpopup && <ShowData selectedTeacher={selectedTeacher} verificationType="Teacher" setTeacherApiCalled={setTeacherApiCalled} refresh={refresh} setShowPopUp={setShowPopUp} />
      }

    </div>
  );
};

export default AdminTeachers;
