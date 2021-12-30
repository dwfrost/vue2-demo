import router from '@/router'

export function logRoute() {
    console.log(router.app._route === router.currentRoute)
}
