import React from 'react';
import axios from "axios";

function filterResults (results) {
    let filteredResults = [];
    for (var i = 0; i < results.length; ++i) {
        if (i === 0) {
            filteredResults.push(results[i]);
            continue;
        }

        if (results[i].decodedText !== results[i - 1].decodedText) {
            filteredResults.push(results[i]);
        }
    }
    return filteredResults;
}

// const currentPath = window.location.pathname.substr(23)

// const attendance = async () => {
//    axios.post("http://localhost:3000/teacher/record/attendance",{session_id: currentPath, student_id: student_id, time: time},{ withCredentials: true })
//    .then((result) => {
//      console.log('success!!!')
//      })
//    .catch(error => console.log(error));
// }

const ResultContainerTable = ({ data }) => {
    const results = filterResults(data);
    return (
        <table className={'Qrcode-result-table'}>
            <thead>
                <tr>
                    <td>#</td>
                    <td>Decoded Text</td>
                    <td>Format</td>
                </tr>
            </thead>
            <tbody>
                {
                    results.map((result, i) => {
                        console.log(result);
                        return (<tr key={i}>
                            <td>{i}</td>
                            <td>{result.decodedText}</td>
                            <td>{result.result.format.formatName}</td>
                        </tr>);
                    })
                }
            </tbody>
        </table>
    );
};

const ResultContainerPlugin = (props) => {
    const results = filterResults(props.results);
    return (
        <div className='Result-container'>
            <div className='Result-header'>Scanned results ({results.length})</div>
            <div className='Result-section'>
                <ResultContainerTable data={results} />
            </div>
        </div>
    );
};

export default ResultContainerPlugin;
