<template>
  <AuthLayout>
    <b-col lg="4" class="mx-auto">
      <b-card no-body>
        <b-card-body class="p-0 bg-black auth-header-box rounded-top">
          <div class="text-center p-3">
            <router-link to="/" class="logo logo-admin">
              <img :src="logoSm" height="50" alt="logo" class="auth-logo" />
            </router-link>
            <h4 class="mt-3 mb-1 fw-semibold text-white fs-18">
              Let's Get Started Rizz
            </h4>
            <p class="text-muted fw-medium mb-0">
              Sign in to continue to Rizz.
            </p>
          </div>
        </b-card-body>
        <b-card-body class="pt-0">
          <b-form class="my-4" @submit.prevent="handleLogin">
            <b-form-group class="mb-2" label="Email" label-for="email">
              <b-form-input
                type="text"
                placeholder="Digite seu email"
                id="email"
                v-model="v.email.$model"
              />
              <div v-if="v.email.$error" class="text-danger">
                <span v-for="(err, idx) in v.email.$errors" :key="idx">
                  {{ err.$message }}
                </span>
              </div>
            </b-form-group>

            <b-form-group
              class="mb-2"
              label="Senha"
              label-for="userpassword"
            >
              <b-form-input
                type="password"
                placeholder="Digite sua senha"
                id="userpassword"
                v-model="v.password.$model"
              />
              <div v-if="v.password.$errors" class="text-danger">
                <span v-for="(err, idx) in v.password.$errors" :key="idx">
                  {{ err.$message }}
                </span>
              </div>
            </b-form-group>

            <div class="form-group row mt-3">
              <b-col sm="6">
                <div class="form-switch-success">
                  <b-form-checkbox switch>Remember me</b-form-checkbox>
                </div>
              </b-col>
              <b-col sm="6" class="text-end">
                <router-link to="/auth/reset-pass" class="text-muted font-13"
                  ><i class="dripicons-lock"></i> Forgot password?</router-link
                >
              </b-col>
            </div>

            <b-form-group class="mb-0 row">
              <b-col cols="12">
                <div class="d-grid mt-3">
                  <b-button variant="primary" type="submit"
                    >Log In <i class="fas fa-sign-in-alt ms-1"></i
                  ></b-button>
                </div>
              </b-col>
            </b-form-group>
          </b-form>
        </b-card-body>
      </b-card>
    </b-col>
  </AuthLayout>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from "vue";

import logoSm from "@/assets/images/logo-sm.png";
import { required, email } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import AuthLayout from "@/layouts/AuthLayout.vue";

import { useAuthStore } from "@/stores/auth";

const credentials = reactive({
  email: null,
  password: null,
});

const vuelidateRules = computed(() => ({
  email: { required, email },
  password: { required },
}));

const v = useVuelidate(vuelidateRules, credentials);

const useAuth = useAuthStore();

const error = ref("");

const handleLogin = async () => {
  const result = await v.value.$validate();

  if (result) {
    await useAuth.login(credentials)
  }
};
</script>
