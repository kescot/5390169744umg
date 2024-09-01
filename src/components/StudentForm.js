import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = () => {
    const [carnet, setCarnet] = useState('');
    const [student, setStudent] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://test-deploy-12.onrender.com/estudiantes/${carnet}`);
            console.log(response.data);  // Verifica qué se recibe del API

            // Verifica si la respuesta tiene datos y accede al primer elemento del arreglo
            if (response.data && response.data.length > 0) {
                setStudent(response.data[0]);
            } else {
                setStudent(null);
                alert("No se encontró el estudiante con el carnet proporcionado.");
            }
        } catch (error) {
            console.error("Hubo un error al buscar los datos del estudiante!", error);
            alert("Hubo un problema al comunicarse con el servidor. Por favor, intenta más tarde.");
        }
    };

    const handleClear = () => {
        setCarnet('');
        setStudent(null);
    };

    return (
        <div style={styles.container}>
            <h1>Consulta de alumnos</h1>
            <div style={styles.formGroup}>
                <label>Carnet:</label>
                <input 
                    type="text" 
                    value={carnet} 
                    onChange={(e) => setCarnet(e.target.value)} 
                    style={styles.input}
                />
            </div>
            <div style={styles.buttonGroup}>
                <button onClick={handleSearch} style={styles.button}>Buscar</button>
                <button onClick={handleClear} style={styles.button}>Limpiar</button>
                <button style={styles.button}>Cancelar</button>
            </div>
            {student && (
                <div style={styles.studentInfo}>
                    <p><strong>Nombres:</strong> {student.Estudiante}</p>
                    <p><strong>Correo Electrónico:</strong> {student.Email}</p>
                    <p><strong>Sección:</strong> {student.Seccion}</p>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '20px',
        maxWidth: '500px',
        margin: 'auto'
    },
    formGroup: {
        marginBottom: '10px'
    },
    input: {
        width: '100%',
        padding: '8px',
        margin: '5px 0'
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        cursor: 'pointer'
    },
    studentInfo: {
        marginTop: '20px',
        textAlign: 'left'
    }
};

export default StudentForm;

