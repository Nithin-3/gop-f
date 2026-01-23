import React from "react";

function AboutMe(props) {
  const { width, teacherData } = props;

  return (
    <div
      style={{
        marginTop: "10px",
        borderRadius: "10px",
        width: width >= 992 ? "100%" : "90%",
        backgroundColor: "#fefeff",
        padding: "20px",
      }}>
      <div style={{ marginBottom: "10px", fontWeight: "bold" }}>About Me</div>
      {teacherData?.selfIntro?.data || "No introduction provided."}
      {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. */}
    </div>
  );
}

export default AboutMe;
