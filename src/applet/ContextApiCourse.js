import React from 'react';
const CourseContext = React.createContext('')
const StudentContext = React.createContext({});

export default function ContextApiCourse() {
    const [course, setCourse] = React.useState('');

    const changeCourse = (e) => {
        setCourse(e.target.value);
    }

    return (
        <>
            
            <div>
                <CourseContext.Provider value={course}>
                과정명 : <input type="text" onChange={changeCourse} size="30em"/>
                    <Students/>
                </CourseContext.Provider>
            </div>
        </>
    )
}
function Students(){
    const course = React.useContext(CourseContext)
    const [student, setStudent] = React.useState('');
    const [age, setAge] = React.useState(0); //
    const [studentlist, setStudentlist] = React.useState([]); // 학생 목록

    const changeStudent = (e) => {
        setStudent(e.target.value);
    };

    const changeAge = (e) => {
        if (!isNaN(e.target.value) && e.target.value !==NaN){
            setAge(parseInt(e.target.value));
            }
    };

    const enroll = () =>{ // 학생 등록
        let newstud = {course:course, student:student, age:age};
        setStudentlist([...studentlist, newstud ]);

    }

    
    return(
        <div>
            <StudentContext.Provider value={{studentlist, setStudentlist}}>
            학생이름 : <input type="text" onChange={changeStudent} size="10em"/>
            나이 : <input type="text" onChange={changeAge} size="10em"/>
            <button onClick={enroll}>등록</button>
            <StudentList/>
            </StudentContext.Provider>
        </div>
    )
}
function StudentList(){
    const {studentlist, setStudentlist}= React.useContext(StudentContext)

    const deletelist = (e) =>{
        let num = parseInt(e.target.parentNode.getAttribute('val'));
        setStudentlist([...studentlist.slice(0,num),
            ...studentlist.slice(num+1,studentlist.length)]);
    }

    return(
        studentlist.map((v,i) => {
            return (<div key={i} val={i} className="info-box">
                {v.student} / {v.age} / {v.course} 
                / <button onClick={deletelist}>삭제</button>
                </div>);
        })
    );
}
