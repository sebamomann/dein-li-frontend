export class LinkUtil {
  /**
   * Take passed link an open it in a new browser tab
   *
   * @param link String   Link to open
   */
  public static openLinkInNewTab(link: string): void {
    window.open(link, '_blank');
  }

  /**
   * Take passed link an open it in the same tab
   *
   * @param link String   Link to open
   */
  public static openLinkInSameTab(link: string): void {
    window.open(link, "_self");
  }

  /**
   * Replace the current page with the passed link, so going back skips the current page
   *
   * @param link String   Link to open
   */
  public static replaceLocation(link: string): void {
    window.location.replace(link);
  }
}
