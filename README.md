# A Vanilla JavaScript App with Authentication

This example app shows how to use Vanilla JavaScript to build an app and add authentication with Okta.

Please read [Add Authentication to Your Vanilla JavaScript App in 20 Minutes](https://developer.okta.com/blog/2018/06/05/authentication-vanilla-js) to see how this app was created.

**Prerequisites:** [Node.js](https://nodejs.org/).

> [Okta](https://developer.okta.com/) has Authentication and User Management APIs that reduce development time with instant-on, scalable user infrastructure. Okta's intuitive API and expert support make it easy for developers to authenticate, manage, and secure users and roles in any application.

* [Getting Started](#getting-started)
* [Links](#links)
* [Help](#help)
* [License](#license)

## Getting Started

To install this example application, run the following commands:

```bash
git clone https://github.com/oktadeveloper/okta-vanilla-js-example.git
cd okta-vanilla-js-example
```

This will get a copy of the project installed locally. To install all of its dependencies and start each app, follow the instructions below.

To run the app:
 
```bash
node .
```

### Setup Okta

Log in to your Okta Developer account (or [sign up](https://developer.okta.com/signup/) if you don’t have an account) and navigate to **Applications** > **Add Application**. Click **Single-Page App**, click **Next**, and give the app a name you’ll remember. Click **Done**.

#### Server Configuration

Open `index.js` and replace `{YOUR_OKTA_DOMAIN}` in the following code block. 

```js
const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://{YOUR_OKTA_DOMAIN}/oauth2/default'
})
```

**NOTE:** The value of `{YOUR_OKTA_DOMAIN}` should be something like `dev-123456.oktapreview.com`. Make sure you don't include `-admin` in the value!

#### Client Configuration

For the client, set the `baseUrl` and copy the `clientId` into `public/main.js`.

```js
this.signIn = new OktaSignIn({
  baseUrl: 'https://{YOUR_OKTA_DOMAIN}',
  clientId: '{YOUR_CLIENT_ID}',
  redirectUri: 'http://localhost:8080',
  authParams: {
    issuer: 'default',
    responseType: ['id_token','token']
  },
  logo: '//placehold.it/200x40?text=Your+Logo',
  i18n: {
    en: {
      'primaryauth.title': 'Sign in to Calorie Tracker'
    }
  }
})
```

## Links

This example uses the following libraries provided by Okta:

* [Okta JWT Verifier](https://github.com/okta/okta-oidc-js/tree/master/packages/jwt-verifier)
* [Okta Sign-In Widget](https://github.com/okta/okta-signin-widget)

## Help

Please post any questions as comments on the [blog post](https://developer.okta.com/blog/2018/06/05/authentication-vanilla-js), or visit our [Okta Developer Forums](https://devforum.okta.com/). You can also email developers@okta.com if would like to create a support ticket.

## License

Apache 2.0, see [LICENSE](LICENSE).
