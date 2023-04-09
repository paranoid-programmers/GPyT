// client that wraps the API

import * as apiclient from "gpyt";

const config = apiclient.createConfiguration({
    baseServer: {
        makeRequestContext: (endpoint: string, httpMethod: apiclient.HttpMethod) => {
            const apiBaseUrl = `${window.location.protocol}//${window.location.host}`;
            return new apiclient.RequestContext(
                `${apiBaseUrl}${endpoint}`,
                httpMethod
            );
        },
    },
});


export const api = new apiclient.CodeTutorialApi(config)
