import React, {useState} from 'react';
import styles from './index.module.css';
import {connect} from "react-redux";
import ImageUpload from "../../uploadService";
import {setProjectAction, deleteProjectAction} from "../../actions/user";

function EditProjectPage(props) {
    const [pictures, setPictures] = useState(props.data.pictures);
    let initial_name = props.data.name;

    let handleChange = event => {
        const key = event.target.name;
        props.data[key] = event.target.value;
    };

    let editProject = event => {
        event.preventDefault();
        props.setProject(props.user, props.data, pictures, initial_name).then(() => {
            props.endEditing();
        });
    };

    let deleteProject = event => {
        event.preventDefault();

        props.deleteProject(props.user, initial_name).then(() => {
            props.endEditing();
        });
    };

    let created = (props.data.name !== '');

    return (
        <div className={styles.project}>
            <div className={styles.box}>
                <div className={styles.heading}>
                    <div> Project Name </div>
                    <input className={styles.name} onChange={handleChange} name='name'
                          defaultValue={props.data.name} />
                   
                </div>
                <div> Description </div>
                <textarea className={styles.description} onChange={handleChange} name='description'
                          defaultValue={props.data.description}/>
                <div>
                    {pictures.map(picture => <img key={picture.id} src={picture.src} alt=""
                                                        className={styles.image}/>)}
                </div>

                <ImageUpload pictures={pictures} setPictures = {setPictures} />
                <div className={styles.footer}>
                    <button onClick = {editProject} className={styles.submitButton}>
                        {created ? 'Изменить' : 'Добавить проект' }
                    </button>
                    {created && <button onClick={deleteProject} className={styles.submitButton}> Удалить </button>}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        project: state.userReducer.project
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setProject: (...args) => dispatch(setProjectAction(...args)),
        deleteProject: (...args) => dispatch(deleteProjectAction(...args)),
        endEditing: () => dispatch({
            type: 'END_EDITING_PROJECT',
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProjectPage);