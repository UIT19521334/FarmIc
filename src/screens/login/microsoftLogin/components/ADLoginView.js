/* eslint-disable no-shadow */
/* eslint-disable react/no-string-refs */
/* eslint-disable prettier/prettier */
// @flow
import React from 'react';
import { Dimensions, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import CookieManager from '@react-native-cookies/cookies';
import CONST from './const.js';
import ReactNativeAD from './ReactNativeAD.js';
import log from './logger';

const loginUrl = 'https://login.microsoftonline.com/<tenant id>/oauth2/authorize';
const styleWebView = { flex: 1, alignSelf: 'stretch', width: Dimensions.get('window').width, height: Dimensions.get('window').height };

export default class ADLoginView extends React.Component {
    state;

    static defaultProps = {
        authority_host: loginUrl,
        tenant: 'common',
        onSuccess: () => {},
        renderError: () => {},
        onPageRequest: null,
    };

    _needRedirect;

    _onTokenGranted;

    _lock;

    _accessToken;

    constructor(props) {
        super(props);
        if (!(this.props.context instanceof ReactNativeAD)) {
            throw new Error('Property `context` of ADLoginView should be an instance of ReactNativeAD, but got ' + this.props.context);
        }
        const { context } = this.props;
        const { tenant } = context.getConfig();
        this._needRedirect = this.props.needLogout || false;
        this.state = {
            page: this._getLoginUrl(tenant || 'common'),
            visible: true,
        };
        this._lock = false;
    }

    componentDidMount() {
        CookieManager.clearAll().then(res => {
            // Alert.alert('cookies cleared');
        });
    }

    UNSAFE_componentWillUpdate(nextProps, nextState) {
        if (this.state.visible === nextState.visible && this.state.page === nextState.page) {
            return false;
        }
        return true;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.visible !== this.state.visible) {
            this.props.onVisibilityChange && this.props.onVisibilityChange(this.state.visible);
        }
        log.debug('ADLoginView updated.');
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!this.props.needLogout && nextProps.needLogout) {
            const { context } = this.props;
            const { tenant } = context.getConfig();
            this._needRedirect = nextProps.needLogout || false;
            this.setState({
                page: this._getLoginUrl(tenant || 'common'),
                visible: true,
            });
        }
    }

    render() {
        // Fix visibility problem on Android webview
        const js = `document.getElementsByTagName('body')[0].style.height = '${Dimensions.get('window').height}px';`;
        const renderError = this.props.renderError || function () {};
        return this.state.visible ? (
            <WebView
                ref="ADLoginView"
                automaticallyAdjustContentInsets={false}
                style={[this.props.style, styleWebView]}
                source={{ uri: this.state.page }}
                javaScriptEnabled
                domStorageEnabled
                onLoadEnd={() => {
                    if (this._needRedirect) {
                        this._needRedirect = false;
                        const tenant = this.props.context.getConfig().tenant || 'common';
                        this.setState({ page: this._getLoginUrl(tenant) });
                    }
                }}
                decelerationRate="normal"
                javaScriptEnabledAndroid
                onNavigationStateChange={this._handleADToken.bind(this)}
                onShouldStartLoadWithRequest={e => {
                    return true;
                }}
                userAgent={this.props.userAgent}
                renderError={() => renderError(this.refs.ADLoginView.reload)}
                startInLoadingState={false}
                injectedJavaScript={js}
            />
        ) : null;
    }

    /**
     * Get authority host URI,
     * @param {string} tenant Custom tenant ID, this filed is optional, default
     *                        values is `common`.
     * @return {string} The Authority host URI.
     */
    _getLoginUrl(tenant = 'common') {
        const authUrl = String(this.props.authority_host || loginUrl).replace('<tenant id>', tenant);
        const context = this.props.context || null;
        const redirect = context.getConfig().redirect_uri;
        const { prompt } = context.getConfig();
        const { login_hint } = context.getConfig();

        if (context !== null) {
            let result = `${`${authUrl}?response_type=code` + `&client_id=${context.getConfig().client_id}`}${
                redirect ? `&redirect_url=${context.getConfig().redirect_uri}&nonce=rnad-${Date.now()}` : ''
            }${prompt ? `&prompt=${context.getConfig().prompt}` : ''}${login_hint ? `&login_hint=${context.getConfig().login_hint}` : ''}`;

            if (this._needRedirect) {
                result = `https://login.windows.net/${this.props.context.getConfig().client_id}/oauth2/logout`;
            }
            return result;
        }
        throw new Error('AD context should not be null/undefined.');
    }

    /**
     * An interceptor for handling webview url change, when it detects possible
     * authorization code in url, it will triggers authentication flow.
     * @param  {object} e Navigation state change event object.
     */
    _handleADToken(e) {
        log.verbose('ADLoginView navigate to', e.url);
        if (this._lock) {
            return true;
        }
        let code = /((\?|\&)code\=)[^\&]+/.exec(e.url);
        if (this._needRedirect) {
            // this._needRedirect = false
            return true;
        }

        if (this.props.onURLChange) {
            this.props.onURLChange(e);
        }

        if (code !== null) {
            this._lock = true;
            code = String(code[0]).replace(/(\?|\&)?code\=/, '');
            this.setState({ visible: !this.props.hideAfterLogin });
            this.props.onVisibilityChange && this.props.onVisibilityChange(false);
            this._getResourceAccessToken(code).catch();
            return true;
        }
        return true;
    }

    /**
     * Check required properties and show error.
     * @param  {ReactNativeADConfig} config Configuration object input.
     */
    _checkProperties(config) {
        ['client_id', 'redirect_uri', 'authority_host'].forEach(prop => {
            if (!config.hasOwnProperty(prop)) {
                throw new Error(`ReactNativeAD config object must have \`${prop}\` property`);
            }
        });
    }

    /**
     * Get access token for each resources
     * @param {string} code The authorization code from `onNavigationStateChange`
     *                      callback.
     * @return {Promise<void>}
     */
    _getResourceAccessToken(code) {
        const { context } = this.props;
        if (!context) {
            throw new Error('property `context` of ADLoginView should not be null/undefined');
        }

        const adConfig = this.props.context.getConfig();

        let { client_id = null, redirect_uri = null, client_secret = null, resources = null } = adConfig;
        // Transform resource string to array
        if (typeof resources === 'string') {
            resources = [resources];
        } else if (!Array.isArray(resources) || resources.length === 0) {
            resources = ['common'];
        }

        log.verbose('ADLoginView get access token for resources=', resources);

        const [resourceFirst, ...resourcesOther] = resources;
        const config = {
            client_id,
            redirect_uri,
            code,
            client_secret,
            resource: resourceFirst,
        };

        return context.grantAccessToken(CONST.GRANT_TYPE.AUTHORIZATION_CODE, config).then(cred => {
            // remove AUTHORIZATION_CODE specific properties because we are now going to use the REFRESH_TOKEN for all the remaining resources
            delete config.code;
            delete config.redirect_uri;
            config.refresh_token = cred.response.refresh_token;

            // get array of promises for all the resource token acquisitions to perform in parallel
            const promises = resourcesOther.map(resource => {
                const cfg = { ...config, resource };
                return context.grantAccessToken(CONST.GRANT_TYPE.REFRESH_TOKEN, cfg);
            });

            // wait on the resource promises, then finalize
            return Promise.all(promises)
                .then(resp => {
                    log.verbose('ADLoginView response access info ', resp);
                    if (!this.props.context) {
                        throw new Error('value of property `context` is invalid=', this.props.context);
                    }
                    const { context } = this.props;
                    const onSuccess = this.props.onSuccess || function () {};
                    // trigger login finished event
                    if (context !== null && typeof this.props.onSuccess === 'function') {
                        onSuccess(context.getCredentials());
                    }
                    this._lock = false;
                })
                .catch(err => {
                    throw new Error('Failed to acquire token for resources', err.stack);
                });
        });
    }
}
