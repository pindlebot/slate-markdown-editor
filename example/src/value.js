/** @jsx h */
// @flow
// eslint-disable-next-line
import { createHyperscript } from 'slate-hyperscript';

const h = createHyperscript({
    blocks: {
        heading: 'header_two',
        paragraph: 'paragraph',
        blockquote: 'blockquote'
    }
});

const value = (
    <value>
        <document>
            <paragraph>
            {'lorem'}
            </paragraph>
        </document>
    </value>
);

export default value;