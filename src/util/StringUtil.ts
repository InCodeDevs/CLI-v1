/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */

export class StringUtil {

    public static getTextBetweenChars(text: string, chars: string): string {
        return text.substring(
            text.lastIndexOf(chars) + 1,
            text.lastIndexOf(chars)
        );
    }
}
