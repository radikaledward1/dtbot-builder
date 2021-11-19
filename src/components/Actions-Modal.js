import React, {useEffect, useState} from 'react';
import './Actions-Modal.css';

export default function ActionsModal({handleClose, open, nodes, onJoin, source}) {

    useEffect(() => {}, [])

    const joinNode = (id) => {
        let objjoin ={id: `join-n${source}-n${id}`, source: source, target: id, type: 'step'}
        onJoin(objjoin);
    }

     return (
       <div className={(open) ? `modal display-block` : `modal display-none`}>
         <div className="modal-main">
           <div className="list-container">
               <ul>
                   {
                        nodes.filter(n => {return n.id != source}).map((node, index) => (
                            (node.type && node.type == 'custom') ?
                                <li key={node.id} onClick={() =>{joinNode(node.id)}}>{node.data.title}</li>
                            : ''
                        ))
                   }
               </ul>
           </div>
           <button type="button" style={{float: 'right', margin: '5px'}}onClick={handleClose}>Cancel</button>
         </div>
       </div>
     );
}