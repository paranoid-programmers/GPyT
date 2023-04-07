import supabase


class SupabaseWrapper:

    def __init__(self, url: str, key: str):
        self.supabase_client = supabase.create_client(url, key)

    def login(self, email: str, password: str):
        return self.supabase_client.auth.sign_in_with_password({
            "email": email,
            "password": password
        })

    def sign_up(self, email: str, password: str, account_type: str):
        return self.supabase_client.auth.sign_up({
            "email": email,
            "password": password,
            "options": {
                "data": {
                    "account_type": account_type,
                }
            }
        })
