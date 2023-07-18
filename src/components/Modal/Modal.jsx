import PropTypes from "prop-types";
import { React, useEffect } from 'react';
import { ModalOpen, Overlay } from "./Modal.styled";


const Modal = ({imgUrl, onClose}) => {

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [onClose]);


    const handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
           onClose();
        }
    }


    return (
        <Overlay onClick={handleBackdropClick}>
            <ModalOpen>
                <img src={imgUrl} alt="picture" />
            </ModalOpen>
        </Overlay>
    )
};


Modal.proptTypes = {
    onClose: PropTypes.func.isRequired,
    imgUrl: PropTypes.string.isRequired,
};

export default Modal;