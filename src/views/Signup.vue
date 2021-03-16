<template>
  <user-manager
    :manager-method="'signup'"
    :manager-name="'注册'"
  />
</template>

<script>
import UserManager from '../components/UserManager.vue'

export default {
  name: 'Signup',
  components: { UserManager }
}
</script>
