/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Calculate staleness gradient color for a card based on its last modified timestamp
 *
 * @param {number} lastModified - Unix timestamp of card's last modification
 * @param {number} newestTimestamp - Unix timestamp of the newest card in the stack
 * @param {number} oldestTimestamp - Unix timestamp of the oldest card in the stack
 * @return {string} - Hex color string from #FFFFFF (newest) to #FFB2B2 (oldest)
 */
export function calculateStalenessColor(lastModified, newestTimestamp, oldestTimestamp) {
	// If all cards have the same timestamp, return white
	if (newestTimestamp === oldestTimestamp) {
		return '#FFFFFF'
	}

	// Calculate the ratio of staleness (0 = newest, 1 = oldest)
	const staleness = (newestTimestamp - lastModified) / (newestTimestamp - oldestTimestamp)

	// Clamp between 0 and 1
	const clampedStaleness = Math.max(0, Math.min(1, staleness))

	// Interpolate between #FFFFFF (RGB: 255, 255, 255) and #FFB2B2 (RGB: 255, 178, 178)
	// Only the green and blue channels change: 255 -> 178
	const green = Math.round(255 - (clampedStaleness * (255 - 178)))
	const blue = Math.round(255 - (clampedStaleness * (255 - 178)))

	// Red channel stays at 255
	const red = 255

	// Convert to hex
	const toHex = (value) => value.toString(16).padStart(2, '0')
	return `#${toHex(red)}${toHex(green)}${toHex(blue)}`
}
