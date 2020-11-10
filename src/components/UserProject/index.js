import React from 'react';
import styles from './index.module.css';
import edit from '../../images/edit.png';
import {connect} from "react-redux";

function UserProject(props) {
    let editProject = (event) => {
        event.preventDefault();
        const name = props.name;
        const description = props.description;
        const access_level = props.access_level;
        const pictures = props.pictures;
        props.dispatch({
            type: 'EDITING_PROJECT',
            project: {name, description, access_level, pictures}
        });
    }

    return (
        <div className={styles.project}>
            <div className={styles.row}>
                <div className={styles.heading}>
                    <div className={styles.name}>
                        {props.name}
                    </div>
                    <div className={styles.access_level}>
                        {props.access_level}
                    </div>

                </div>
                <div>
                    {props.logged_in &&
                    <button onClick={editProject} className={styles.button}><img className={styles.edit} src={edit}
                                                                                 alt="edit"/></button>}
                </div>
            </div>
            <pre className={styles.description}>
                    {props.description}
            </pre>
            <div>
                {props.pictures.map(picture => <img key={picture.id} src={picture.src} alt=""
                                                    className={styles.image}/>)}
            </div>
        </div>
    );
}

export default connect()(UserProject);