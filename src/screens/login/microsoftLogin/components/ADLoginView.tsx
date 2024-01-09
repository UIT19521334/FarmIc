/* eslint-disable prefer-const */
/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable react/no-string-refs */
import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import WebView, {WebViewNavigation} from 'react-native-webview';
import CookieManager from '@react-native-cookies/cookies';
import ReactNativeAD, {CONST} from './ReactNativeAD';
import {ADConfig, ADCredentials} from './types';

const loginUrl =
  'https://login.microsoftonline.com/<tenant id>/oauth2/authorize';

const styleWebView = {
  flex: 1,
  alignSelf: 'stretch',
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export interface IProps {
  onSuccess?: (adc: ADCredentials | null) => void;
  onURLChange?: (e: WebViewNavigation) => void;
  onVisibilityChange?: (isVisible: boolean) => void;

  needLogout?: boolean;
  style?: any;
  context: ReactNativeAD;
  hideAfterLogin?: boolean;
  userAgent?: string;

  authority_host?: string;
  tenant?: string;
  needRedirect?: boolean;
}

const AdLoginView = ({
  needLogout,
  style,
  context,
  hideAfterLogin,
  userAgent,
  authority_host,
  tenant,
  needRedirect,
  onSuccess,
  onVisibilityChange,
  onURLChange,
}: IProps) => {
  const [lock, setLock] = useState<boolean>(false);
  // CookieManager.clearAll();

  const getLoginUrl = (): string => {
    const authUrl = String(authority_host || loginUrl).replace(
      '<tenant id>',
      tenant!,
    );
    const redirect = context.getConfig().redirect_uri;
    const {prompt} = context.getConfig();
    const {login_hint} = context.getConfig();

    if (context !== null) {
      let result = `${
        `${authUrl}?response_type=code` +
        `&client_id=${context.getConfig().client_id}`
      }${
        redirect
          ? `&redirect_url=${
              context.getConfig().redirect_uri
            }&nonce=rnad-${Date.now()}`
          : ''
      }${prompt ? `&prompt=${context.getConfig().prompt}` : ''}${
        login_hint ? `&login_hint=${context.getConfig().login_hint}` : ''
      }`;

      if (needRedirect) {
        result = `https://login.windows.net/${
          context.getConfig().client_id
        }/oauth2/logout`;
      }
      return result;
    }
    throw new Error('AD context should not be null/undefined.');
  };

  /**
   * Get access token for each resources
   * @param {string} code The authorization code from `onNavigationStateChange`
   *                      callback.
   * @return {Promise<void>}
   */
  const getResourceAccessToken = (code: string): Promise<void> => {
    if (!context) {
      throw new Error(
        'property `context` of ADLoginView should not be null/undefined',
      );
    }

    const adConfig: ADConfig = context.getConfig();

    let {
      client_id = null,
      redirect_uri = null,
      client_secret = null,
      resources = null,
    } = adConfig;
    // Transform resource string to array
    if (typeof resources === 'string') resources = [resources];
    else if (!Array.isArray(resources) || resources.length === 0) {
      resources = ['common'];
    }

    const [resourceFirst, ...resourcesOther] = resources;
    const config : any = {
      client_id,
      redirect_uri,
      code,
      client_secret,
      resource: resourceFirst,
    };

    return context
      .grantAccessToken(CONST.GRANT_TYPE.AUTHORIZATION_CODE, config)
      .then((cred) => {
        // remove AUTHORIZATION_CODE specific properties because we are now going to use the REFRESH_TOKEN for all the remaining resources
        delete config.code;
        delete config.redirect_uri;
        config.refresh_token = cred.response.refresh_token;

        // get array of promises for all the resource token acquisitions to perform in parallel
        const promises = resourcesOther.map((resource) => {
          const cfg = {...config, resource};
          return context.grantAccessToken(CONST.GRANT_TYPE.REFRESH_TOKEN, cfg);
        });

        // wait on the resource promises, then finalize
        return Promise.all(promises)
          .then(() => {
            if (onSuccess) {
              // CookieManager.clearAll();
              onSuccess(context.getCredentials());
            }
          })
          .catch((err) => {
            throw new Error(err);
          });
      });
  };
  /**
   * An interceptor for handling webview url change, when it detects possible
   * authorization code in url, it will triggers authentication flow.
   * @param  {object} e Navigation state change event object.
   */
  const handleADToken = (e: WebViewNavigation): any => {
    if (lock) {
      return true;
    }
    let code: RegExpExecArray | string | null = /((\?|\&)code\=)[^\&]+/.exec(
      e.url,
    );

    if (needRedirect) {
      return true;
    }

    if (onURLChange) {
      onURLChange(e);
    }

    if (code !== null) {
      setLock(true);
      code = String(code[0]).replace(/(\?|\&)?code\=/, '');
      
      // this.setState({visible: !this.props.hideAfterLogin});
      if (onVisibilityChange) {
        onVisibilityChange(false);
      }
      getResourceAccessToken(code).catch();
      return true;
    }
    return true;
  };

  const js = `document.getElementsByTagName('body')[0].style.height = '${
    Dimensions.get('window').height
  }px';`;

  return (
    <WebView
      automaticallyAdjustContentInsets={false}
      style={[style, styleWebView]}
      source={{uri: getLoginUrl()}}
      javaScriptEnabled
      domStorageEnabled
      decelerationRate="normal"
      javaScriptEnabledAndroid
      onNavigationStateChange={(e) => handleADToken(e)}
      onShouldStartLoadWithRequest={(e) => {
        return true;
      }}
      userAgent={userAgent}
      startInLoadingState={false}
      injectedJavaScript={js}
      incognito
    />
  );
};

AdLoginView.defaultProps = {
  authority_host: loginUrl,
  tenant: 'common',
};

export default AdLoginView;
