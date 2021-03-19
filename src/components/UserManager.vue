<template>
  <div class="box">
    <input
      v-model="admin"
      class="input"
      type="text"
      placeholder="输入管理员账户名"
      autofocus
    >
    <input
      v-model="pwd"
      class="input"
      type="password"
      placeholder="输入密码"
    >
    <div class="autocomplete-box">
      <input
        v-model="location"
        class="input"
        placeholder="输入地址"
        @input="getGeolocation"
      >
      <ul
        v-show="locationList?.length > 0"
        class="autocomplete"
      >
        <li
          v-for="(locationItem, index) in locationList"
          :key="index"
          @click="setLocation(locationItem.address)"
        >
          <button class="autocomplete-btn">
            <b>{{ locationItem.title }}</b>
            <span>{{ locationItem.address }}</span>
          </button>
        </li>
      </ul>
    </div>
    <button
      class="submit"
      @click="modalAction(submit, managerName)"
    >
      {{ managerName }}
    </button>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import createStore from '../store'
import Admin from '../services/Admin'
import modal from '../services/modal'
import { useRouter } from 'vue-router'
import md5 from 'blueimp-md5'

export default {
  name: 'UserManager',
  props: {
    managerMethod: {
      type: String,
      required: true
    },
    managerName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const admin = ref('')
    const pwd = ref('')
    const location = ref('')

    const router = useRouter()
    const store = createStore()

    const modalAction = modal().modalAction

    const submit = async () => {
      const res = await Admin[props.managerMethod]({
        admin: admin.value,
        pwd: pwd.value,
        location: location.value,
      })

      if (res?.status === 200) {
        const data = res.data
        store.setToken(data.token)
        store.setUser(data.body)

        router.push('home')
      }
    }

    const geocoderUrl = ref('')
    const locationList = ref([])

    const qqMapApi = 'https://apis.map.qq.com'
    const key = import.meta.env.VITE_APPID
    const signKey = import.meta.env.VITE_SIGNKEY
    const output = 'jsonp'
    const region = '东莞'
    const getParamsUrl = (paramsApi, params) => {
      const paramsStr = Object.entries(params).map(
        ([key, val]) => `${key}=${val}`).join('&')
      return `${paramsApi}?${paramsStr}`
    }
    watch(geocoderUrl, () => {
      const script = document.createElement('script');
      script.type = 'text/javascript'
      script.src = geocoderUrl.value
      document.body.appendChild(script)
      document.body.removeChild(script)
    })
    window.getMap = (res) => {
      locationList.value = res.data
    }

    const getGeolocation = () => {
      const paramsUrl = getParamsUrl('/ws/place/v1/suggestion', {
        callback: 'getMap',
        key,
        keyword: location.value,
        output,
        region
      })
      const sig = md5(`${paramsUrl}${signKey}`)
      geocoderUrl.value = `${qqMapApi}${paramsUrl}&sig=${sig}`
    }
    const setLocation = (address) => {
      location.value = address
      locationList.value = []
    }

    return {
      admin, pwd, submit, modalAction,
      location, locationList, getGeolocation, setLocation
    }
  },
};
</script>
<style scoped>
.input {
  display: block;
  width: 18em;
  height: 1.4em;
  line-height: 1.4em;
  margin: 0.5em auto;
  font-size: 1.2em;
  font-weight: 500;
  outline: none;
  border-width: 0 0 1px;
  border-radius: 0;
}
.submit {
  margin: 0.5em auto;
  width: 16em;
  line-height: 2em;
  font-size: 1.2em;
  color: #fff;
  border-radius: 0.3em;
  box-shadow: 0.1em 0.1em 0.2em #ccc;
  font-weight: 500;
  background: mediumpurple;
  transition: color padding box-shadow cubic-bezier(0.445, 0.05, 0.55, 0.95)
    0.3s;
}
.submit:active {
  padding: 0.1em 0 0;
  color: #eee;
  box-shadow: inset .1em .1em .1em #ccc;
}
.autocomplete-box {
  position: relative;
}
.autocomplete {
  position: absolute;
  list-style: none;
  background-color: #fff;
  padding: 0 .4em;
  left: calc((100% - 24em) / 2);
  border: 1px solid #000;
  top: 0.9em;
  line-height: 1.5em;
}
.autocomplete-btn {
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: .8em;
  border-bottom: 1px solid #000;
  border-radius: 0;
}
.autocomplete-btn:focus {
  background-color: var(--main-bg-color);
}
</style>
