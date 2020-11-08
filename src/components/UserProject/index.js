import React from 'react';
import styles from './index.module.css';
import edit from '../../images/edit.png';

export default function UserProject({name, description, access_level, pictures, logged_in}) {
    return (
        <div className={styles.project}>
            <div className={styles.row}>
                <div className={styles.heading}>
                    <div className={styles.name}>
                        {name}
                    </div>
                    <div className={styles.access_level}>
                        {access_level}
                    </div>

                </div>
                <div>
                    { logged_in && <button onClick={editProject} className={styles.button}><img className={styles.edit} src={edit}
                                                                                alt="edit"/></button>}
                </div>
            </div>
            <div className={styles.description}>
                {description}
            </div>
            <div>
                {pictures.map(picture => <img key={picture.id} src={picture.src} alt="" className={styles.image}/>)}
            </div>
        </div>
    );


}
let editProject = (event) =>{
    event.preventDefault();
    console.log('edit');
}