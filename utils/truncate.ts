/**
 * Truncates a string to a specified length and adds ellipsis if needed
 * @param text - The text to truncate
 * @param maxLength - Maximum length of the truncated text (default: 50)
 * @param ellipsis - The ellipsis string to append (default: "...")
 * @returns The truncated string with ellipsis if it was truncated
 */
export function truncate(
  text: string,
  maxLength: number = 50,
  ellipsis: string = "..."
): string {
  if (!text || text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength - ellipsis.length) + ellipsis;
}

