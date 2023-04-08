# .CodeTutorialApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**affirmationApiV1CodeTutorialAffirmationPost**](CodeTutorialApi.md#affirmationApiV1CodeTutorialAffirmationPost) | **POST** /api/v1/code-tutorial/affirmation | Affirmation
[**giveUpApiV1CodeTutorialGiveUpPost**](CodeTutorialApi.md#giveUpApiV1CodeTutorialGiveUpPost) | **POST** /api/v1/code-tutorial/give-up | Give Up
[**giveUpApiV1CodeTutorialMoreQuestionsPost**](CodeTutorialApi.md#giveUpApiV1CodeTutorialMoreQuestionsPost) | **POST** /api/v1/code-tutorial/more-questions | Give Up
[**giveUpApiV1CodeTutorialReportQuestionPost**](CodeTutorialApi.md#giveUpApiV1CodeTutorialReportQuestionPost) | **POST** /api/v1/code-tutorial/report-question | Give Up
[**hintApiV1CodeTutorialHintPost**](CodeTutorialApi.md#hintApiV1CodeTutorialHintPost) | **POST** /api/v1/code-tutorial/hint | Hint
[**newCodeTutorialApiV1CodeTutorialNewCodeTutorialPost**](CodeTutorialApi.md#newCodeTutorialApiV1CodeTutorialNewCodeTutorialPost) | **POST** /api/v1/code-tutorial/new-code-tutorial | New Code Tutorial


# **affirmationApiV1CodeTutorialAffirmationPost**
> PositiveAffirmationResponse affirmationApiV1CodeTutorialAffirmationPost(positiveAffirmationRequest)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .CodeTutorialApi(configuration);

let body:.CodeTutorialApiAffirmationApiV1CodeTutorialAffirmationPostRequest = {
  // PositiveAffirmationRequest
  positiveAffirmationRequest: {
    tutorialUuid: "tutorialUuid_example",
    attemptsTaken: 1,
  },
};

apiInstance.affirmationApiV1CodeTutorialAffirmationPost(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **positiveAffirmationRequest** | **PositiveAffirmationRequest**|  |


### Return type

**PositiveAffirmationResponse**

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

# **giveUpApiV1CodeTutorialGiveUpPost**
> GiveUpResponse giveUpApiV1CodeTutorialGiveUpPost(giveUpRequest)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .CodeTutorialApi(configuration);

let body:.CodeTutorialApiGiveUpApiV1CodeTutorialGiveUpPostRequest = {
  // GiveUpRequest
  giveUpRequest: {
    tutorialUuid: "tutorialUuid_example",
    questionUuid: "questionUuid_example",
    userCode: {
      code: "code_example",
      language: "language_example",
    },
  },
};

apiInstance.giveUpApiV1CodeTutorialGiveUpPost(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **giveUpRequest** | **GiveUpRequest**|  |


### Return type

**GiveUpResponse**

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

# **giveUpApiV1CodeTutorialMoreQuestionsPost**
> MoreQuestionsResponse giveUpApiV1CodeTutorialMoreQuestionsPost(moreQuestionsRequest)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .CodeTutorialApi(configuration);

let body:.CodeTutorialApiGiveUpApiV1CodeTutorialMoreQuestionsPostRequest = {
  // MoreQuestionsRequest
  moreQuestionsRequest: {
    tutorialUuid: "tutorialUuid_example",
  },
};

apiInstance.giveUpApiV1CodeTutorialMoreQuestionsPost(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **moreQuestionsRequest** | **MoreQuestionsRequest**|  |


### Return type

**MoreQuestionsResponse**

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

# **giveUpApiV1CodeTutorialReportQuestionPost**
> ReportQuestionResponse giveUpApiV1CodeTutorialReportQuestionPost(reportQuestionRequest)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .CodeTutorialApi(configuration);

let body:.CodeTutorialApiGiveUpApiV1CodeTutorialReportQuestionPostRequest = {
  // ReportQuestionRequest
  reportQuestionRequest: {
    tutorialUuid: "tutorialUuid_example",
    questionUuid: "questionUuid_example",
    category: "category_example",
    details: "details_example",
    shouldRegenerate: true,
  },
};

apiInstance.giveUpApiV1CodeTutorialReportQuestionPost(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **reportQuestionRequest** | **ReportQuestionRequest**|  |


### Return type

**ReportQuestionResponse**

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

# **hintApiV1CodeTutorialHintPost**
> HintResponse hintApiV1CodeTutorialHintPost(hintRequest)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .CodeTutorialApi(configuration);

let body:.CodeTutorialApiHintApiV1CodeTutorialHintPostRequest = {
  // HintRequest
  hintRequest: {
    tutorialUuid: "tutorialUuid_example",
    questionUuid: "questionUuid_example",
    userCode: {
      code: "code_example",
      language: "language_example",
    },
  },
};

apiInstance.hintApiV1CodeTutorialHintPost(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **hintRequest** | **HintRequest**|  |


### Return type

**HintResponse**

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

# **newCodeTutorialApiV1CodeTutorialNewCodeTutorialPost**
> NewCodeTutorialResponse newCodeTutorialApiV1CodeTutorialNewCodeTutorialPost(newTutorialRequest)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .CodeTutorialApi(configuration);

let body:.CodeTutorialApiNewCodeTutorialApiV1CodeTutorialNewCodeTutorialPostRequest = {
  // NewTutorialRequest
  newTutorialRequest: {
    context: {
      tone: "tone_example",
      interests: [
        "interests_example",
      ],
    },
    concept: "concept_example",
  },
};

apiInstance.newCodeTutorialApiV1CodeTutorialNewCodeTutorialPost(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **newTutorialRequest** | **NewTutorialRequest**|  |


### Return type

**NewCodeTutorialResponse**

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


