import React, {useEffect, useState} from 'react';
import ReactFlow, { Handle, removeElements } from 'react-flow-renderer';
import cryptoRandomString from 'crypto-random-string';

import ActionsModal from './Actions-Modal';
import ConfirmModal from './Confirm-Modal';

import './Builder.css';

export default function Builder() {

    const [nodes, setNodes] = useState([]);

    const [showactionsmodal, setShowActionsModal] = useState(false);
    const [showconfirmmodal, setShowConfirmModal] = useState(false);

    const [sourcenode, setSourceNode] = useState();
    const [removenodeid, setRemoveNodeId] = useState();

    useEffect(() => {}, [])
    
    /*const nodes = [
      {
        id: "1",
        type: "custom", // input node
        data: { label: "Nodo 1" },
        position: { x: 250, y: 25 },
        data: { text: 'Nodo Custom 1' }
      },
      {
        id: '2',
        type: 'custom', // input node
        data: { label: 'Nodo 2' },
        position: { x: 150, y: 150 },
        data: { text: 'Nodo Custom 2' }
      }
    ];*/

    /**This component is not on State so never have updated access to other states like the principal Nodes Array, so
     * console.log(nodes) could show length 0 or a empty object.
     */

    const CustomNodeComponent = ({ id, data }) => {
      return (
        <div className="custom-node">
          <Handle type="target" position="top" id={`node_tgt_${id}`} style={{ borderRadius: 0 }} />
            <div style={{fontWeight: "bold", padding: "5px"}}>{data.type}</div>
            <div className="body">{data.title}</div>
            <div className="footer">
                <button type="button" onClick={() => {showConfirmModal(id)}} className={`btn delete`} title="Delete"></button>
                <button type="button" onClick={() => {showActionsModal(id)}} className={`btn join`} title="Join"></button>
                <button type="button" onClick={() => {getData(data)}} className={`btn properties`} title="Properties"></button>
            </div>
          <Handle type="source" position="bottom" id={`node_src_${id}`} style={{ borderRadius: 0 }} />
        </div>
      );
    };
      
    const nodeTypes = {
        custom: CustomNodeComponent,
    };

    const nodeProperties = (e) => {
        alert("The node with Id " + e + " was clicked.");
    }

    const showActionsModal = (id) => {
        let showactions = (showactionsmodal) ? false : true;
        setShowActionsModal(showactions);
        setSourceNode(id);
    }

    const createJoinNode = (obj) => {
        setNodes(nodes => [...nodes, obj]);
        
        let showactions = (showactionsmodal) ? false : true;
        setShowActionsModal(showactions);
    }

    const showConfirmModal = (id) => {
      let showconfirm = (showconfirmmodal) ? false : true;
      setShowConfirmModal(showconfirm);
      setRemoveNodeId(id);
    }

    const removeNodeById = () => {
      let elementsToRemove = nodes.filter(n => {return n.id == removenodeid || n.source == removenodeid || n.target == removenodeid})
      console.log(elementsToRemove);
      setNodes((els) => removeElements(elementsToRemove, els));

      let showconfirm = (showconfirmmodal) ? false : true;
      setShowConfirmModal(showconfirm);
    }

    const getData = (data) => {
      console.log(data);
    }

     const itemClicked = (e) => {
        //alert(`The item ${e} been clicked!!`);
        let _id = cryptoRandomString({length: 10});
        let structure = {};
        let tmparr = [];
        let num = null;
        let title = null;

        switch (e) {
            case 'text':

                tmparr = nodes.filter(n => {return n.data.type == 'Text'})
                num = (tmparr.length > 0) ? (tmparr[tmparr.length - 1].number) + 1 : (tmparr.length + 1) ;
                title = (num > 1) ? `Text (${num})` : 'Text'; 

                structure = {
                    id: _id,
                    type: "custom",
                    position: { x: 50, y: 25 },
                    number: num,
                    data: { title: title, type: 'Text', showData: getData}
                }
                //_nodes = [...nodes, structure];
                setNodes(nodes => [...nodes, structure]);
                break;
            case 'menulist':
                
                tmparr = nodes.filter(n => {return n.data.type == 'Menu List'})
                num = (tmparr.length > 0) ? (tmparr[tmparr.length - 1].number) + 1 : (tmparr.length + 1) ;
                title = (num > 1) ? `Menu List (${num})` : 'Menu List';

                structure = {
                    id: _id,
                    type: "custom",
                    position: { x: 50, y: 25 },
                    number: num,
                    data: { title: title, type: 'Menu List'}
                }
                //_nodes = [...nodes, structure];
                setNodes(nodes => [...nodes, structure]);
                break;
            default:
                break;
        }
    }

    return (
      <div className="App">
        <div className="container">
          <div className="editor">
            <ReactFlow elements={nodes} nodeTypes={nodeTypes} />
            <ActionsModal open={showactionsmodal} handleClose={showActionsModal} nodes={nodes} source={sourcenode} onJoin={createJoinNode}/>
            <ConfirmModal open={showconfirmmodal} onClose={showConfirmModal} onConfirm={removeNodeById}/>
          </div>
          <div className="sidebar">
              <div className="item" onClick={() => {itemClicked('text')}}>Text</div>
              <div className="item" onClick={() => {itemClicked('menulist')}}>Menu List</div>
          </div>
        </div>
      </div>
    );
}