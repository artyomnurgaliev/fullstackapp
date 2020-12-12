import React from 'react';
import styles from './index.module.css';

export default class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {file: '',imagePreviewUrl: ''};
    }

    _handleSubmit(e) {
        e.preventDefault();
        if (this.props.pictures) {
            this.props.setPictures( [...this.props.pictures, {id: Date.now(), src: this.state.imagePreviewUrl}]);
        }
        if (this.props.setPhoto) {
            this.props.setPhoto(this.state.imagePreviewUrl);
        }
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className={styles.previewText}>Please select an Image for Preview</div>);
        }

        return (
            <div className={styles.previewComponent}>
                <form onSubmit={(e)=>this._handleSubmit(e)}>
                    <input className={styles.fileInput}
                           type="file"
                           accept=".png, .jpg, .jpeg"
                           onChange={(e)=>this._handleImageChange(e)} />
                    <button className={styles.submitButton}
                            type="submit"
                            onClick={(e)=>this._handleSubmit(e)}>Добавить изображение</button>
                </form>
                <div className={styles.imgPreview}>
                    {$imagePreview}
                </div>
            </div>
        )
    }
}
