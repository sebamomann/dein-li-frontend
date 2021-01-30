import {environment} from '../../environments/environment';

export class UrlUtil {
  /**
   * Get the base API URL.<br/>
   * Base URL is the domain only, without protocol.
   *
   * @return String   Domain
   */
  public static getApiDomain(): string {
    const url = this.getApiUrl();
    url.replace('http://', '');
    url.replace('https://', '');

    return url;
  }

  /**
   * Fetch the API URL from the environment
   *
   * @return String   API URL
   */
  public static getApiUrl(): string {
    return environment.API_URL;
  }
}
