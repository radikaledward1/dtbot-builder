import React, {useEffect, useState} from 'react';
import ReactFlow, { Handle } from 'react-flow-renderer';
import cryptoRandomString from 'crypto-random-string';

import ActionsModal from './Actions-Modal';

import './Builder.css';

export default function Builder() {

    const [nodes, setNodes] = useState([]);
    const [showactionsmodal, setShowActionsModal] = useState(false);
    const [sourcenode, setSourceNode] = useState();

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

    const CustomNodeComponent = ({ id, data }) => {
      return (
        <div className="custom-node">
          <Handle type="target" position="top" id={`node_tgt_${id}`} style={{ borderRadius: 0 }} />
            <div style={{fontWeight: "bold", padding: "5px"}}>{data.type}</div>
            <div className="body">{data.title}</div>
            <div className="footer">
                <button type="button" className={`btn delete`} title="Delete"></button>
                <button type="button" onClick={() => {showActionsModal(id)}} className={`btn join`} title="Join"></button>
                <button type="button" onClick={() => {nodeProperties(id)}} className={`btn properties`} title="Properties"></button>
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

    const itemClicked = (e) => {
        //alert(`The item ${e} been clicked!!`);
        let _id = cryptoRandomString({length: 10});
        let structure = {};

        switch (e) {
            case 'text':
                structure = {
                    id: _id,
                    type: "custom",
                    position: { x: 50, y: 25 },
                    data: { title: 'New Node', type: 'Text'}
                }
                //_nodes = [...nodes, structure];
                setNodes(nodes => [...nodes, structure]);
                break;
            case 'menulist':
                structure = {
                    id: _id,
                    type: "custom",
                    position: { x: 50, y: 25 },
                    data: { title: 'New Node', type: 'Menu List'}
                }
                //_nodes = [...nodes, structure];
                setNodes(nodes => [...nodes, structure]);
                break;
            default:
                break;
        }
    }

    const createJoinNode = (obj) => {
        setNodes(nodes => [...nodes, obj]);
        
        let showactions = (showactionsmodal) ? false : true;
        setShowActionsModal(showactions);
    }

    return (
      <div className="App">
        <div className="container">
          <div className="editor">
            <ReactFlow elements={nodes} nodeTypes={nodeTypes}/>
            <ActionsModal open={showactionsmodal} handleClose={showActionsModal} nodes={nodes} source={sourcenode} onJoin={createJoinNode}/>
          </div>
          <div className="sidebar">
              <div className="item" onClick={() => {itemClicked('text')}}>Text</div>
              <div className="item" onClick={() => {itemClicked('menulist')}}>Menu List</div>
          </div>
        </div>
      </div>
    );
}