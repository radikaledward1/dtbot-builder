import React, {useEffect, useState} from 'react';
import './Actions-Modal.css';

export default function ActionsModal({handleClose, open, nodes, onJoin, source}) {

    useEffect(() => {}, [])

    const joinNode = (id) => {
        let objjoin ={id: `join-n${source}-n${id}`, source: source, target: id, type: 'step'}
        onJoin(objjoin);
    }

     return (
       <div id="modal-action" className={(open) ? `modal display-block` : `modal display-none`}>
         <div className="modal-main">
           <div className="header">
             Select an action to join
           </div>
           <div className="body list-container">

               {
                        nodes.filter(n => {return n.id != source}).map((node, index) => (
                            (node.type && node.type == 'custom') ?
                                <div key={node.id} onClick={() =>{joinNode(node.id)}}>{node.data.title}</div>
                            : ''
                        ))
               }

           </div>
           <div className="footer">
              <button type="button" className="btn btn-cancel" onClick={handleClose}>Cancelar</button>
           </div>
         </div>
       </div>
     );
}