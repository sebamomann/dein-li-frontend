export class StringUtil {
  /**
   * Copy passed string to users clipboard.<br/>
   * Creates temporary textfield with the passed string as value.<br/>
   * Execute copy command on textfield
   *
   * @param string String   String to copy
   */
  public static copyToClipboard(string: string): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = string;

    document.body.appendChild(selBox);

    selBox.focus();
    selBox.select();

    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
