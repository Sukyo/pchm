import { ElLoading } from 'element-plus';
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type';
export interface Loading {
  loadingInstance: ILoadingInstance | null;
  show: () => void;
  hide: () => void;
}
export const $loading = {
  loadingInstance: null,
  show() {
    this.loadingInstance = ElLoading?.service()
  },
  hide() {
    this.loadingInstance?.close();
  }
} as Loading