import React from 'react';

function List(){

    const students=[
        {name:'이수만',age:'60',address:'인천'},
        {name:'유희열',age:'45',address:'서울'},
        {name:'방시혁',age:'43',address:'부산'},
        {name:'박진영',age:'34',address:'광주'}
        ];
    
    return(
        <table>
            <thead>
                <tr>
                    <th>이름</th>
                    <th>나이</th>
                    <th>주소</th>
                </tr>
            </thead>
            <tbody>
                {
                    students.map(
                        (student,i) =>{
                            return (<tr key={i}>
                                <td>{student.name}</td>
                                <td>{student.age}</td>
                                <td>{student.address}</td>
                            </tr>);
                        }
                    )
                }
                
            </tbody>
        </table>

    );
        

}


export default List;
