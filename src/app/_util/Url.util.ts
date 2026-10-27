import {environment} from '../../environments/environment';

export class UrlUtil {
  /**
   * Get the base API URL.<br/>
   * Base URL is the domain only, without protocol.
   *
   * @return String   Domain
   */
  public static getApiDomain(): string {
    let url = this.getApiUrl();
    url = url.replace('http://', '');
    url = url.replace('https://', '');

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

  /**
   * Get the base API URL.<br/>
   * Base URL is the domain only, without protocol.
   *
   * @return String   Domain
   */
  public static getBaseDomain(): string {
    let url = this.getBaseUrl();
    url = url.replace('http://', '');
    url = url.replace('https://', '');

    return url;
  }

  /**
   * Fetch the API URL from the environment
   *
   * @return String   API URL
   */
  public static getBaseUrl(): string {
    return environment.BASE_URL;
  }

  /**
   * Host name of a URL without "www.", for showing where a link leads
   *
   * @param url String   Full URL
   */
  public static domainOf(url: string): string {
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch {
      return url;
    }
  }

  /**
   * Split a URL for display: scheme, host and the rest, the rest cut before / ? & # so it can wrap there.<br/>
   * Unparsable URLs come back whole as the rest.
   */
  public static partsOf(url: string): { scheme: string, host: string, rest: string[] } {
    try {
      const parsed = new URL(url);
      const rest = url.slice(url.indexOf(parsed.host) + parsed.host.length);

      return {
        scheme: parsed.protocol + '//',
        host: parsed.host,
        rest: rest.split(/(?=[\/?&#])/).filter((part) => part),
      };
    } catch {
      return {scheme: '', host: '', rest: [url]};
    }
  }
}
