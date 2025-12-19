import { Link } from "react-router-dom";

function StudentCard({ student }) {
  const houseCrests = {
    Gryffindor:
      "https://www.wizardingworld.com/images/products/houses/gryffindor.png",
    Slytherin:
      "https://www.wizardingworld.com/images/products/houses/slytherin.png",
    Hufflepuff:
      "https://www.wizardingworld.com/images/products/houses/hufflepuff.png",
    Ravenclaw:
      "https://www.wizardingworld.com/images/products/houses/ravenclaw.png",
  };
  return (
    <>
      <div className="student-card">
        <div className="student-info">
          <div className="student-top">
            <div className="student-img-crest">
              <img src={student.image} alt={student.name} />
              <img
                src={houseCrests[student.house]}
                alt={`Crest of ${student.house}`}
                className="house-badge"
              />
            </div>
          </div>
          <h2 className="student-name">{student.name}</h2>

          <ul className="academic-grades">
            <p>Academic Grades</p>
            {Object.entries(student.academicGrades).map(([subject, grade]) => (
              <li key={subject}>
                <strong>{subject}:</strong> {grade}
              </li>
            ))}
          </ul>

          <p id="personal-skills">
            <span>Personal Skills:</span>
            <ul>
              {student.personalSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </p>
        </div>
        <Link to={`/students/${student.id}`} className="details-link">
          <button>Student Details</button>
        </Link>
      </div>
    </>
  );
}

export default StudentCard;
