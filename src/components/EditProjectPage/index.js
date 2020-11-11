import React, {useState} from 'react';
import styles from './index.module.css';
import {connect} from "react-redux";
import ImageUpload from "../../uploadService";
import {setProjectAction, deleteProjectAction} from "../../actions/user";
import delete_img from "../../images/delete.png";
import DeleteButton from "../DeleteButton";

function EditProjectPage(props) {

    const [access_level, setAccessLevel] = useState(props.data.access_level);

    let [pictures, setPictures] = useState(props.data.pictures);
    let initial_name = props.data.name;

    let handleChange = event => {
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
        if (props.data.name === '' || !props.data.name) {
            props.data.name = '' + Date.now();
        }

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
                    <div className={styles.row}>
                        <div> Project Name </div>
                        <button className={styles.private_button} onClick={changeAccessLevel}> {
                            access_level === 'public' ? 'make private' : 'make public'
                        }</button>
                    </div>
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