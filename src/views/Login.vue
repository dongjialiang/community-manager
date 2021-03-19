<template>
  <user-manager
    :manager-method="'login'"
    :manager-name="'登录'"
  />
</template>

<script>
import UserManager from '../components/UserManager.vue'

export default {
  name: 'Login',
  components: { UserManager }
}
</script>
