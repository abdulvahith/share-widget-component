import { action, makeObservable, observable } from "mobx";

class WidgetListViewStore {
  state = {
    data: [],
    totalItems: 0,
    showDetailedPopup: false,
    pageNumber: 1,
    toastr: {
      message: "",
      type: "",
    },
    selected: null,
    buttonAction: "",
    showRetryViewModal: false,
    retryFileDetail: {},
    refresh: false,
    loading: false,
  };

  formData = {};
  isLoadingFormData = false;
  updatedFormData: any = {};

  constructor() {
    makeObservable(this, {
      state: observable,
      formData: observable,
      isLoadingFormData: observable,
      updatedFormData: observable,
      updateStore: action,
      setFormData: action,
      setLoading: action,
      updateFormData: action,
    });
  }

  updateStore = (payload: any) => {
    Object.assign(this.state, payload);
  };

  setFormData = (data: any = []) => {
    this.formData = data;
  };

  setLoading = (isLoading: boolean) => {
    this.isLoadingFormData = isLoading;
  };

  updateFormData = ({ formName, formIndex, data }: any) => {
    this.updatedFormData[formName][formIndex] = data;
  };

  updateNormalizedFormData = (data: any) => {
    this.updatedFormData = data;
  };
}

export const SetWidgetListViewStore = new WidgetListViewStore();
