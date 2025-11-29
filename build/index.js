(()=>{
    const { registerBlockType } = wp.blocks;
    const { __ } = wp.i18n;
    const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
    const { PanelBody, SelectControl } = wp.components;
    const { createElement: el, Fragment } = wp.element;

    const metadata = {
        apiVersion: 3,
        name: 'overlay/container',
        title: 'Overlay Container',
        category: 'layout',
        icon: 'screenoptions',
        description: 'Stack two arbitrary blocks so one overlays the other.',
        attributes: {
            verticalAlign: {
                type: 'string',
                enum: ['start', 'center', 'end'],
                default: 'center',
            },
            horizontalAlign: {
                type: 'string',
                enum: ['start', 'center', 'end'],
                default: 'center',
            },
            padding: {
                type: 'string',
                enum: ['none', 'small', 'medium', 'large'],
                default: 'none',
            },
        },
        supports: {
            html: false,
            align: ['wide', 'full'],
            spacing: {
                margin: true,
                padding: true,
            },
        },
    };

    const TEMPLATE = [
        ['core/group', { className: 'overlay-base' }],
        ['core/group', { className: 'overlay-layer' }],
    ];

    const alignmentOptions = [
        { label: __('Start', 'overlay-container-block'), value: 'start' },
        { label: __('Center', 'overlay-container-block'), value: 'center' },
        { label: __('End', 'overlay-container-block'), value: 'end' },
    ];

    const paddingOptions = [
        { label: __('None', 'overlay-container-block'), value: 'none' },
        { label: __('Small', 'overlay-container-block'), value: 'small' },
        { label: __('Medium', 'overlay-container-block'), value: 'medium' },
        { label: __('Large', 'overlay-container-block'), value: 'large' },
    ];

    const overlayClasses = ({ verticalAlign, horizontalAlign, padding }) =>
        [
            `overlay-align-vertical-${verticalAlign}`,
            `overlay-align-horizontal-${horizontalAlign}`,
            padding !== 'none' ? `overlay-padding-${padding}` : null,
        ]
            .filter(Boolean)
            .join(' ');

    const Edit = ({ attributes, setAttributes }) => {
        const { verticalAlign, horizontalAlign, padding } = attributes;
        const blockProps = useBlockProps({
            className: overlayClasses({ verticalAlign, horizontalAlign, padding }),
        });

        return el(
            Fragment,
            null,
            el(
                InspectorControls,
                null,
                el(
                    PanelBody,
                    { title: __('Overlay alignment', 'overlay-container-block') },
                    el(SelectControl, {
                        label: __('Vertical alignment', 'overlay-container-block'),
                        value: verticalAlign,
                        onChange: (value) => setAttributes({ verticalAlign: value }),
                        options: alignmentOptions,
                    }),
                    el(SelectControl, {
                        label: __('Horizontal alignment', 'overlay-container-block'),
                        value: horizontalAlign,
                        onChange: (value) => setAttributes({ horizontalAlign: value }),
                        options: alignmentOptions,
                    })
                ),
                el(
                    PanelBody,
                    {
                        title: __('Overlay padding', 'overlay-container-block'),
                        initialOpen: false,
                    },
                    el(SelectControl, {
                        label: __('Padding', 'overlay-container-block'),
                        value: padding,
                        onChange: (value) => setAttributes({ padding: value }),
                        options: paddingOptions,
                    })
                )
            ),
            el(
                'div',
                blockProps,
                el(InnerBlocks, {
                    template: TEMPLATE,
                    templateLock: false,
                    __experimentalLayout: { type: 'constrained' },
                })
            )
        );
    };

    const save = ({ attributes }) => {
        const { verticalAlign, horizontalAlign, padding } = attributes;
        const blockProps = useBlockProps.save({
            className: overlayClasses({ verticalAlign, horizontalAlign, padding }),
        });

        return el(
            'div',
            blockProps,
            el(InnerBlocks.Content)
        );
    };

    registerBlockType(metadata.name, {
        ...metadata,
        edit: Edit,
        save,
    });
})();
