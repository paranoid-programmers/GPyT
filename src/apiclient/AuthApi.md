# .AuthApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**loginViaOauthApiV1AuthLoginViaOauthPost**](AuthApi.md#loginViaOauthApiV1AuthLoginViaOauthPost) | **POST** /api/v1/auth/login-via-oauth | Login Via Oauth
[**protectedApiV1AuthProtectedGet**](AuthApi.md#protectedApiV1AuthProtectedGet) | **GET** /api/v1/auth/protected | Protected


# **loginViaOauthApiV1AuthLoginViaOauthPost**
> OAuthLoginResponse loginViaOauthApiV1AuthLoginViaOauthPost(oAuthLoginRequest)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .AuthApi(configuration);

let body:.AuthApiLoginViaOauthApiV1AuthLoginViaOauthPostRequest = {
  // OAuthLoginRequest
  oAuthLoginRequest: {
    provider: "provider_example",
  },
};

apiInstance.loginViaOauthApiV1AuthLoginViaOauthPost(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **oAuthLoginRequest** | **OAuthLoginRequest**|  |


### Return type

**OAuthLoginResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **protectedApiV1AuthProtectedGet**
> any protectedApiV1AuthProtectedGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .AuthApi(configuration);

let body:.AuthApiProtectedApiV1AuthProtectedGetRequest = {
  // string
  token: "token_example",
};

apiInstance.protectedApiV1AuthProtectedGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **token** | [**string**] |  | defaults to undefined


### Return type

**any**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


