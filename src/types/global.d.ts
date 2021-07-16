import { Loading } from '@/components/common/extend'
declare global {
  interface Window {
    app: {
      $loading: Loading
    } | null
  }
}