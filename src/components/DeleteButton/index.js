import styles from "../DeleteButton/index.module.css";
import delete_img from "../../images/delete.png";
import React from "react";

export default function DeleteButton({pictures, setPictures, picture_id}) {

    let deletePicture = event => {
        event.preventDefault();
        console.log('deleting picture with id', picture_id);
        setPictures(pictures.filter(picture => (picture.id !== picture_id)));
    }

    return (
        <button onClick={deletePicture} className={styles.deleteButton}>
            <img className={styles.delete} src={delete_img} alt="delete"/></button>
    );

}