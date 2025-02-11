declare module 'react-quill' {
    import React from 'react';

    export interface ReactQuillProps {
        id?: string;
        className?: string;
        theme?: string;
        style?: React.CSSProperties;
        readOnly?: boolean;
        value?: string;
        defaultValue?: string;
        placeholder?: string;
        tabIndex?: number;
        bounds?: string | HTMLElement;
        scrollingContainer?: string | HTMLElement;
        onChange?: (content: string) => void;
        onChangeSelection?: (range: Range, source: string, editor: any) => void;
        onFocus?: (range: Range, source: string, editor: any) => void;
        onBlur?: (previousRange: Range, source: string, editor: any) => void;
        onKeyPress?: (event: Event) => void;
        onKeyDown?: (event: Event) => void;
        onKeyUp?: (event: Event) => void;
        preserveWhitespace?: boolean;
        modules?: any;
        formats?: string[];
    }

    export default class ReactQuill extends React.Component<ReactQuillProps> { }
}
