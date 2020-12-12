import React, {useState} from 'react';
import styles from './index.module.css';
import {connect} from "react-redux";
import ImageUpload from "../../uploadService";
import {updateProjectAction, deleteProjectAction, addProjectAction} from "../../actions/user";
import DeleteButton from "../DeleteButton";

function EditProjectPage(props) {

    const [access_level, setAccessLevel] = useState(props.data.access_level);
    const [error, setError] = useState("")

    let [pictures, setPictures] = useState(props.data.pictures);
    let initial_name = props.data.name
    let handleChange = event => {
        setError("")
        const key = event.target.name;
        props.data[key] = event.target.value;
    };

    let changeAccessLevel = event => {
        event.preventDefault();
        setAccessLevel(access_level === 'public' ? 'private' : 'public')
        props.data.access_level = (props.data.access_level === 'public' ? 'private' : 'public');
    }

    let editProject = event => {
        event.preventDefault();
        const created = event.target.getAttribute('data-arg1');
        let pics = Array.from(pictures.values())
        if (!pics)
            pics = []

        if (props.data.name.length == 0) {
            setError("Project name can't be empty")
        } else {
            if (created === 'false') {
                props.addProject(props.user, props.data, pics).then(() => {
                    props.endEditing();
                }).catch((error)=>{});
            } else {
                props.updateProject(props.user, props.data, pics, initial_name).then(() => {
                    props.endEditing();
                }).catch((error)=>{});
            }
        }
    };

    let deleteProject = event => {
        event.preventDefault();

        props.deleteProject(props.user, initial_name).then(() => {
            props.endEditing();
        });
    };

    let created = props.created;
    let is_error = (error.length !== 0);

    return (
        <div className={styles.project}>
            <div className={styles.box}>
                <div className={styles.heading}>
                    <div className={styles.row}>
                        <div> Project Name </div>
                        <button className={styles.private_button} onClick={changeAccessLevel}> {
                            access_level === 'public' ? 'make private' : 'make public'
                        }</button>
                    </div>
                    { is_error && <p className={styles.error_text}>{error}</p>}
                    <input className={styles.name} onChange={handleChange} name='name'
                          defaultValue={props.data.name} />

                </div>
                <div> Description </div>
                <textarea className={styles.description} onChange={handleChange} name='description'
                          defaultValue={props.data.description}/>
                <div>
                    {pictures.map(picture =>
                        <div className={styles.row}>
                            <img key={picture.id} src={picture.src} alt="" className={styles.image}/>
                            <DeleteButton pictures={pictures} setPictures={setPictures} picture_id={picture.id} />
                        </div>)}
                </div>

                <ImageUpload pictures={pictures} setPictures = {setPictures} />
                <div className={styles.footer}>
                    <button onClick = {editProject} data-arg1={created} className={styles.submitButton}>
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
        project: state.userReducer.project,
        errorMessage: state.userReducer.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addProject: (...args) => dispatch(addProjectAction(...args)),
        updateProject: (...args) => dispatch(updateProjectAction(...args)),
        deleteProject: (...args) => dispatch(deleteProjectAction(...args)),
        endEditing: () => dispatch({
            type: 'END_EDITING_PROJECT'
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProjectPage);