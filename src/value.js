/** @jsx h */
// @flow
// eslint-disable-next-line
import { createHyperscript } from 'slate-hyperscript';

const h = createHyperscript({
    blocks: {
        heading: 'heading',
        paragraph: 'paragraph',
        blockquote: 'blockquote'
    }
});

const value = (
    <value>
        <document>
            <paragraph>
            </paragraph>
        </document>
    </value>
);

export default value;