export interface IConnection {
    source: {
        node: string;
        type?: string;
    };
    destination: {
        node: string;
        type?: string;
    };
    index?: string;
}

export interface INode {
    id: string;
    name: string;
    type: string;
    code: string;
    icon?: string;
    position: [number, number];
    parameters?: Record<string, unknown>;
    credentials?: Record<string, unknown>;
}

export interface Iworkflow {
    id: string;
    userId: string;
    title: string;
    enabled: boolean;
    nodes?: INode[];
    connections?: IConnection[];
}

export interface ParameterSchema {
    type: 'string' | 'number' | 'boolean';
    required: boolean;
    label?: string;
    placeholder?: string;
}

export interface CredentialSchema {
    type: 'username' | 'password' | 'number' | 'boolean';
    required: boolean;
    label?: string;
    placeholder?: string;
}

export interface DBTrigger {
    name: string;
    type: string;
    parameters?: Record<string, unknown>;
    credentials?: Record<string, unknown>;
}

export interface DBNode {
    name: string;
    code: string;
    type: string;
    icon?: string;
    parameters?: Record<string, ParameterSchema>;
    credentials?: Record<string, CredentialSchema>;
}

