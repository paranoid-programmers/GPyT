// client that wraps the API

import * as apiclient from "gpyt";

const config = apiclient.createConfiguration({
    baseServer: {
        makeRequestContext: (endpoint: string, httpMethod: apiclient.HttpMethod) => {
            return new apiclient.RequestContext(
                `http://localhost:3000${endpoint}`,
                httpMethod,
            );
        }
    }
})

export const api = new apiclient.CodeTutorialApi(config)
