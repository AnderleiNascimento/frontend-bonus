import { ref } from 'vue'
import MeService from '@/services/MeService'

export const useGrant = () => {
  const hasGrant = (permission) => {
    let show = ref(false)

    if (permission && typeof permission === 'object') {
      for (const key in permission) {
        show =
          MeService.getUser() === null
            ? false
            : MeService.getUser().permissions.includes(permission[key])

        if (show === true) {
          return show
        }
      }
    } else if (typeof permission === 'string') {
      show = MeService.getUser().permissions.includes(permission)
    } else if (typeof permission === 'undefined') {
      show = true
    }

    return show
  }

  return { hasGrant }
}