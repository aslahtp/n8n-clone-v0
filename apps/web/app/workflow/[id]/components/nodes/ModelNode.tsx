import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import '../../styles/style.css';
import Image from 'next/image';

export const ModelNode: React.FC<NodeProps> = ({ data }) => {
    return (
        <div className="flex flex-col text-white items-center justify-center gap-2 bg-[#414344] p-3 border-2 border-purple-500 rounded-lg">
            {data.icon && <Image src={data.icon as string} width={20} height={20} alt={data.code as string} />}
            <div>{String(data.label)}</div>
            <Handle
                id='input'
                type="target"
                position={Position.Left}
                style={{ background: '#ffffff', width: '8px', height: '8px' }}
                isValidConnection={(connection) => connection.sourceHandle === 'output'}
            />
            <Handle
                id='model-output'
                type="source"
                position={Position.Right}
                style={{ background: '#ffffff', width: '8px', height: '8px' }}
                isValidConnection={(connection) => connection.sourceHandle === 'input'}
            />
        </div>
    );
};

