import React from 'react';
import styles from './index.module.css';
import {connect} from "react-redux";

function EditProjectPage(props) {
    let initial_name = props.data.name;
    console.log('initial name', initial_name);

    let handleChange = event => {
        const key = event.target.name;
        props.data[key] = event.target.value;
    };

    let editProject = event => {
        event.preventDefault();
        const {name, access_level, description, pictures} = props.data;
        console.log('deleting', props.data);
        props.dispatch({
            type: 'DELETE_PROJECT',
            placeholder: initial_name
        });

        props.dispatch({
            type: 'EDIT_PROJECT',
            placeholder: {name, access_level, description, pictures}
        })
    };

    let deleteProject = event => {
        event.preventDefault();
        props.dispatch({
            type: 'DELETE_PROJECT',
            placeholder: initial_name
        });
    };

    let created = (props.data.name !== '');
    console.log('created', created);

    return (
        <div className={styles.project}>
            <div className={styles.box}>
                <div className={styles.heading}>
                    <div> Project Name </div>
                    <input className={styles.name} onChange={handleChange} name='name'
                           placeholder={created ? '' : 'Название проекта'} defaultValue={props.data.name} />
                   
                </div>
                <div> Description </div>
                <textarea className={styles.description} onChange={handleChange} name='description'
                          placeholder={created ? '' : 'Описание проекта'} defaultValue={props.data.description}/>
                <div>
                    <button onClick = {editProject} className={styles.button}>
                        {created ? 'Изменить' : 'Добавить проект' }
                    </button>
                    {created && <button onClick={deleteProject} className={styles.button}> Удалить </button>}
                </div>
            </div>
        </div>
    );
}


export default connect()(EditProjectPage);