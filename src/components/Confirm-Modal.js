import React, {useEffect, useState} from 'react';
import './Confirm-Modal.css';

export default function ConfirmModal({onClose, onConfirm, open}) {

    useEffect(() => {}, [])

     return (
       <div id="modal-confirm" className={open ? `modal display-block` : `modal display-none`}>
         <div className="modal-main">
           <div className="header">
                Header
           </div>
           <div className="body">
               Body
           </div>
           <div className="footer">
             <button type="button" className="btn btn-cancel" onClick={onClose}>Cancel</button>
             <button type="button" className="btn btn-accept" onClick={onConfirm}>Accept</button>
           </div>
         </div>
       </div>
     );
}