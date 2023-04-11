<template>
  <v-container>
    <v-card class="login-card">
      <v-form
        class="row flex-center flex"
        validate-on="submit"
        @submit.prevent="handleLoginUsingMagicEmail"
      >
        <div class="col-6 form-widget">
          <div class="form-header">
            <h1 class="v-alert-title">
              Login
            </h1>
            <p class="v-card-subtitle">
              Sign in using a magic email link
            </p>
          </div>

          <div class="form-body">
            <div>
              <v-text-field
                label="Email Address"
                required
                type="email"
                placeholder="cool@person.com"
                :rules="emailRules"
                v-model="this.email"
                variant="outlined"
              />
            </div>
            <div>
              <v-btn
                :disabled="this.loading"
                variant="outlined"
                type="submit"
                class="mt-2"
              >
                {{ this.loading ? 'Loading' : 'Send magic link' }}
              </v-btn>
            </div>

            <div v-if="successMessage != '' && errorMessage != ''">
              <v-label
                :text="successMessage"
                class="success-message"
              />
              <v-label
                :text="errorMessage"
                class="error-message"
              />
            </div>
          </div>
        </div>
      </v-form>

      <v-divider />

      <!-- Login with other accounts -->
      <div class="row flex-center flex">
        <div class="col-6 form-widget">
          <h3 class="v-card-subtitle mb-5">
            Or login with another account
          </h3>
          <div class="button-container">
            <v-btn
              @click="handleLoginUsingGoogle"
              append-icon="mdi-google"
              variant="outlined"
            >
              Login with Google
            </v-btn>

            <v-btn
              @click="handleLoginUsingGithub"
              append-icon="mdi-github"
              variant="outlined"
            >
              Login with GitHub
            </v-btn>
          </div>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {defineComponent, inject} from 'vue'
import {supabase} from '@/supabase'
import { AuthApi } from 'gpyt';

export default defineComponent({
  data(): {
    errorMessage: string,
    successMessage: string,
    loading: boolean;
    email: string,
    emailRules: ((value: any) => (boolean | string))[];
    vantaOptions: {
      mouseControls: boolean,
      touchControls: boolean,
      minHeight: number,
      minWidth: number,
      scale: number,
      scaleMobile: number
    }
  } {
    return {
      errorMessage: '',
      successMessage: '',
      loading: false,
      email: '',
      emailRules: [
        value => {
          if (value) return true
          return 'E-mail is required.'
        },
        value => {
          if (/.+@.+\..+/.test(value)) return true
          return 'E-mail must be valid.'
        },
      ],
      vantaOptions: {
        mouseControls: true,
        touchControls: true,
        minHeight: 500.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00
      }
    }
  },
  methods: {
    async handleLoginUsingMagicEmail() {
      this.loading = true
      this.successMessage = '';
      this.errorMessage = '';

      const {error} = await supabase.auth.signInWithOtp({
        email: this.email,
      })
      if (error) {
        this.errorMessage = "Failed to sign in, please try again.";
        this.loading = false
        return
      }
      this.successMessage = "Check your email inbox and click the login link!"
      this.loading = false
    },

    async handleLoginUsingGithub() {
      this.api
      ?.loginViaOAuthApiV1AuthLoginViaOAuthPost({
        redirectUrl: 'http://localhost:3000',

      })
      .then((response) => {
        this.affirmationResp = response
        this.affirmationLoading = false
      })
    },

    async handleLoginUsingGoogle() {

    }
  },
  setup() {
    var api = inject<AuthApi>('$api')
    return { api }
  },
})
</script>

<style scoped>
  .form-widget {
    text-align: center;
    padding: 24px;
    display: flex;
    flex-direction: column;
  }

  .form-header {
    margin-bottom: 24px;
  }

  .success-message {
    color: green;
  }

  .error-message {
    color: red;
  }

  .login-card {
    margin: 10% auto auto;
    max-width: 500px;
  }

  .button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .button-container > * {
    margin-bottom: 10px;
  }
</style>
