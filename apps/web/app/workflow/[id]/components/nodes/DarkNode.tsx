import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import '../../styles/style.css';
import Image from 'next/image';

const DarkNode: React.FC<NodeProps> = ({ data }) => {
    return (
        <div className="bg-[#414344] rounded-lg border-2 border-white text-white p-2 flex flex-col justify-center items-center">
            <Handle
                id='input'
                type="target"
                position={Position.Left}
                style={{ background: '#ffffff', width: '8px', height: '8px' }}
                isValidConnection={(connection) => connection.sourceHandle === 'output'}
            />
            {data.icon && <Image src={data.icon as string} width={20} height={20} alt={data.code as string} />}
            <div>{String(data.label)}</div>
            <Handle
                id='output'
                type="source"
                position={Position.Right}
                style={{ background: '#ffffff', width: '8px', height: '8px' }}
                isValidConnection={(connection) => connection.sourceHandle === 'input'}
            />
        </div>
    );
};

export default DarkNode;

