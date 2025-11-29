import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

const overlayClasses = ( { verticalAlign, horizontalAlign, padding } ) =>
	[
		`overlay-align-vertical-${ verticalAlign }`,
		`overlay-align-horizontal-${ horizontalAlign }`,
		padding !== 'none' ? `overlay-padding-${ padding }` : null,
	]
		.filter( Boolean )
		.join( ' ' );

export default function save( { attributes } ) {
	const { verticalAlign, horizontalAlign, padding } = attributes;
	const blockProps = useBlockProps.save( {
		className: overlayClasses( { verticalAlign, horizontalAlign, padding } ),
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
