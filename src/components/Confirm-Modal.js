import React, {useEffect, useState} from 'react';
import './Confirm-Modal.css';

export default function ConfirmModal({onClose, onConfirm, open}) {

    useEffect(() => {}, [])

     return (
       <div className={open ? `modal display-block` : `modal display-none`}>
         <div className="modal-main">
           <div className="header">
                Header
           </div>
           <div className="body">
               Body
           </div>
           <div className="footer">
             <button type="button" className="btm btn-cancel" onClick={onClose}>Cancel</button>
             <button type="button" className="btm btn-accept" onClick={onConfirm}>Accept</button>
           </div>
         </div>
       </div>
     );
}