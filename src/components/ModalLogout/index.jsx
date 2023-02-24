import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from "react-modal"
import StoreContext from '../../Context';

import './index.css'

export default function ModalLogout(props) {
    const { isOpen, onRequestClose, onRequestLogout } = props
    const { currentTheme } = useContext(StoreContext)
    const { t } = useTranslation()
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            ariaHideApp={false}
            contentLabel="Modal"
            className={{
                base: `modal-base ${currentTheme?.themeName}-theme-modal`,
                afterOpen: 'modal-base_after-open',
                beforeClose: 'modal-base_before-close'
            }

            }
            overlayClassName={{
                base: 'overlay-base',
                afterOpen: 'overlay-base_after-open',
                beforeClose: 'overlay-base_before-close'
            }}
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={2000}
        >
            <p className='logout-model-para'> {t('Are you sure you want to logout')} ?</p>

            <div className="logout-model-btn-box">
                <button className={`logout-model-cancle-btn ${currentTheme?.themeName}-logout-model-cancle-btn`} onClick={onRequestClose}> {t('cancle')} </button>
                <button className='logout-model-logout-btn' onClick={onRequestLogout}> {t('confirm')} </button>
            </div>
        </Modal>
    )
}
