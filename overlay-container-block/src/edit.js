import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

const TEMPLATE = [
	[
		'core/group',
		{
			className: 'overlay-base',
		},
	],
	[
		'core/group',
		{
			className: 'overlay-layer',
		},
	],
];

const alignmentOptions = [
	{ label: __( 'Start', 'overlay-container-block' ), value: 'start' },
	{ label: __( 'Center', 'overlay-container-block' ), value: 'center' },
	{ label: __( 'End', 'overlay-container-block' ), value: 'end' },
];

const paddingOptions = [
	{ label: __( 'None', 'overlay-container-block' ), value: 'none' },
	{ label: __( 'Small', 'overlay-container-block' ), value: 'small' },
	{ label: __( 'Medium', 'overlay-container-block' ), value: 'medium' },
	{ label: __( 'Large', 'overlay-container-block' ), value: 'large' },
];

const overlayClasses = ( { verticalAlign, horizontalAlign, padding } ) =>
	[
		`overlay-align-vertical-${ verticalAlign }`,
		`overlay-align-horizontal-${ horizontalAlign }`,
		padding !== 'none' ? `overlay-padding-${ padding }` : null,
	]
		.filter( Boolean )
		.join( ' ' );

export default function Edit( { attributes, setAttributes } ) {
	const { verticalAlign, horizontalAlign, padding } = attributes;
	const blockProps = useBlockProps( {
		className: overlayClasses( { verticalAlign, horizontalAlign, padding } ),
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Overlay alignment', 'overlay-container-block' ) }>
					<SelectControl
						label={ __( 'Vertical alignment', 'overlay-container-block' ) }
						value={ verticalAlign }
						onChange={ ( value ) => setAttributes( { verticalAlign: value } ) }
						options={ alignmentOptions }
					/>
					<SelectControl
						label={ __( 'Horizontal alignment', 'overlay-container-block' ) }
						value={ horizontalAlign }
						onChange={ ( value ) => setAttributes( { horizontalAlign: value } ) }
						options={ alignmentOptions }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Overlay padding', 'overlay-container-block' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Padding', 'overlay-container-block' ) }
						value={ padding }
						onChange={ ( value ) => setAttributes( { padding: value } ) }
						options={ paddingOptions }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<InnerBlocks
					template={ TEMPLATE }
					templateLock={ false }
					__experimentalLayout={ { type: 'constrained' } }
				/>
			</div>
		</>
	);
}
