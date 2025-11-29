<?php
/**
 * Plugin Name:       Overlay Container Block
 * Description:       Provides an overlay container block with base and overlay areas for stacking arbitrary blocks.
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Version:           1.0.0
 * Author:            ChatGPT
 * Text Domain:       overlay-container-block
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */

if ( ! defined( 'ABSPATH' ) ) {
exit;
}

add_action( 'init', 'overlay_container_block_init' );

/**
 * Registers the block assets using the block.json file.
 */
function overlay_container_block_init() {
register_block_type( __DIR__ . '/block.json' );
}
