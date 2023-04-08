# GPyT

# Basic Setup

## API and Content Gen services

### Environment Variables

For the API:
* `SUPABASE_KEY`
* `SUPABASE_URL`
* `CONTENT_GEN_URL`
    * Example: `http://host/content_gen/v1`
    * `http` or `https` is required
    * `/content_gen/v1` path is needed
    * No trailing `/` allowed
* `CONTENT_GEN_KEY`
    * This is non-functional currently
* `ENV_IS_DEV` (`true` or `false`)
    * If true, it ignores `CONTENT_GEN_URL` and returns mock values

For
* `OPENAI_API_KEY`

### Python environment

The API and the content gen service share a python environment

```sh
python -m venv venv
. ./venv/bin/activate
# ./venv/Scripts/activate # windows

pip install -r requirements.txt
```

### Running

API Server:

```sh
PYTHONPATH=./src/ uvicorn --reload src.be.api.main:app
```

Content generation server:
```sh
PYTHONPATH=./src/ uvicorn --reload src.be.content_gen.main:app
```
